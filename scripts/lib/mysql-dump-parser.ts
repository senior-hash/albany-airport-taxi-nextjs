/**
 * Minimal parser for mysqldump-style INSERT statements.
 * Handles the specific quoting/escaping mysqldump produces (backslash-escaped
 * single-quoted strings), which is more reliable here than a general SQL
 * parser choking on huge multi-row VALUES lists with embedded HTML.
 */

export type SqlValue = string | number | null;
export type SqlRow = Record<string, SqlValue>;

/** Extracts every `INSERT INTO \`table\` (...) VALUES (...);` statement for one table. */
export function extractInsertRows(sql: string, table: string): SqlRow[] {
  const rows: SqlRow[] = [];
  const insertRe = new RegExp(
    `INSERT INTO \`${table}\`\\s*\\(([^)]*)\\)\\s*VALUES\\s*`,
    "g"
  );

  let match: RegExpExecArray | null;
  while ((match = insertRe.exec(sql)) !== null) {
    const columns = match[1]
      .split(",")
      .map((c) => c.trim().replace(/^`|`$/g, ""));

    // Parse tuples starting right after this match, until the statement's
    // terminating `;` (which mysqldump always places outside any string).
    let pos = insertRe.lastIndex;
    while (true) {
      pos = skipWhitespace(sql, pos);
      if (sql[pos] === ";") {
        pos += 1;
        break;
      }
      if (sql[pos] !== "(") {
        throw new Error(
          `Expected '(' or ';' at position ${pos} while parsing ${table}, got: ${sql.slice(pos, pos + 40)}`
        );
      }
      const { values, nextPos } = parseTuple(sql, pos);
      pos = nextPos;
      const row: SqlRow = {};
      columns.forEach((col, i) => {
        row[col] = values[i] ?? null;
      });
      rows.push(row);

      pos = skipWhitespace(sql, pos);
      if (sql[pos] === ",") {
        pos += 1;
        continue;
      }
      if (sql[pos] === ";") {
        pos += 1;
        break;
      }
    }
    insertRe.lastIndex = pos;
  }

  return rows;
}

function skipWhitespace(sql: string, pos: number): number {
  while (pos < sql.length && /\s/.test(sql[pos])) pos += 1;
  return pos;
}

/** Parses one `(val1, val2, ...)` tuple starting at `pos` (which must be `(`). */
function parseTuple(
  sql: string,
  pos: number
): { values: SqlValue[]; nextPos: number } {
  const values: SqlValue[] = [];
  pos += 1; // consume '('

  while (true) {
    pos = skipWhitespace(sql, pos);
    const ch = sql[pos];

    if (ch === "'") {
      const { value, nextPos } = parseQuotedString(sql, pos);
      values.push(value);
      pos = nextPos;
    } else if (sql.startsWith("NULL", pos) && !/[a-zA-Z0-9_]/.test(sql[pos + 4] ?? "")) {
      values.push(null);
      pos += 4;
    } else {
      // number (int/decimal, possibly negative)
      const numMatch = /^-?\d+(\.\d+)?/.exec(sql.slice(pos));
      if (!numMatch) {
        throw new Error(`Unrecognized value at position ${pos}: ${sql.slice(pos, pos + 40)}`);
      }
      values.push(Number(numMatch[0]));
      pos += numMatch[0].length;
    }

    pos = skipWhitespace(sql, pos);
    if (sql[pos] === ",") {
      pos += 1;
      continue;
    }
    if (sql[pos] === ")") {
      pos += 1;
      break;
    }
    throw new Error(`Expected ',' or ')' at position ${pos}: ${sql.slice(pos, pos + 40)}`);
  }

  return { values, nextPos: pos };
}

/** Parses a mysqldump-style '...' string with backslash escapes, starting at the opening quote. */
function parseQuotedString(sql: string, pos: number): { value: string; nextPos: number } {
  let i = pos + 1; // skip opening quote
  let out = "";
  while (true) {
    const ch = sql[i];
    if (ch === undefined) {
      throw new Error(`Unterminated string starting at position ${pos}`);
    }
    if (ch === "\\") {
      const next = sql[i + 1];
      switch (next) {
        case "n":
          out += "\n";
          break;
        case "r":
          out += "\r";
          break;
        case "t":
          out += "\t";
          break;
        case "0":
          out += "\0";
          break;
        case "'":
        case '"':
        case "\\":
          out += next;
          break;
        default:
          // mysqldump escapes backslash before any char it's unsure about too
          out += next ?? "";
      }
      i += 2;
      continue;
    }
    if (ch === "'") {
      // could be closing quote, or an escaped '' pair (mysqldump doesn't use
      // this style by default, but tolerate it)
      if (sql[i + 1] === "'") {
        out += "'";
        i += 2;
        continue;
      }
      return { value: out, nextPos: i + 1 };
    }
    out += ch;
    i += 1;
  }
}
