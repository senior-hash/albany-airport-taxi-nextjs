import slugifyLib from "slugify";

/** Base slug for a name, no collision handling. */
export function baseSlug(name: string): string {
  return slugifyLib(name, { lower: true, strict: true });
}

/**
 * Assigns unique slugs for a list of items keyed by name, appending a
 * disambiguator (derived from `disambiguator(item)`, e.g. the county name)
 * only to the items that collide with another item's base slug.
 */
export function assignUniqueSlugs<T>(
  items: T[],
  getName: (item: T) => string,
  disambiguator: (item: T) => string
): Map<T, string> {
  const bySlug = new Map<string, T[]>();
  for (const item of items) {
    const s = baseSlug(getName(item));
    const list = bySlug.get(s) ?? [];
    list.push(item);
    bySlug.set(s, list);
  }

  const result = new Map<T, string>();
  for (const [s, group] of bySlug) {
    if (group.length === 1) {
      result.set(group[0], s);
      continue;
    }
    for (const item of group) {
      const disambiguated = `${s}-${baseSlug(disambiguator(item))}`;
      result.set(item, disambiguated);
    }
  }
  return result;
}
