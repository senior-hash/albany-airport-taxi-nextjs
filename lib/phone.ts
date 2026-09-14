/** Converts a display phone like "(518) 316-5900" into a tel: href. */
export function phoneToTelHref(display: string): string {
  const digits = display.replace(/\D/g, "");
  const withCountryCode = digits.length === 10 ? `1${digits}` : digits;
  return `tel:+${withCountryCode}`;
}
