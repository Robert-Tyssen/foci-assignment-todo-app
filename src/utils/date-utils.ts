/**
 * Converts the UTC value of a given date into an absolute value by preserving the
 * year, month and date, but converting the timestamp to midnight local time. This
 * makes it easier to perform time- and timezone-agnostic date comparisons by
 * removing any timezone shift from the date value.
 *
 * For example, a UTC date of "Jan 1, 2026" would be converted to "Jan 1, 2026" at
 * midnight local time, regardless of the UTC time or the local timezone.
 * 
 * @returns the date converted to midnight local time
 */
export const toAbsoluteDate = (d: Date): Date => {
  return new Date(
    d.getUTCFullYear(),
    d.getUTCMonth(),
    d.getUTCDate(),
    0,
    0,
    0,
    0
  );
};

/**
 * Helper function to get the current date in midnight local time.
 * 
 * @returns the current date, in midnight local time
 */
export const getLocalToday = (): Date => {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
};
