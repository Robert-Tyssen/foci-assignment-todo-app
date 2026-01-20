import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { getLocalToday, toAbsoluteDate } from "./date-utils";

describe("UTC-to-absolute date", () => {
  it("Correctly returns the absolute date", () => {
    // Beginning of year - UTC time
    const d1 = new Date("2026-01-01T00:00:00Z");
    const r1 = toAbsoluteDate(d1);

    expect(r1.getFullYear()).toBe(2026);
    expect(r1.getMonth()).toBe(0); // 0 for Jan
    expect(r1.getDate()).toBe(1);
    expect(r1.getHours()).toBe(0);

    // End of year - UTC time
    const d2 = new Date("2026-12-31T23:59:59Z");
    const r2 = toAbsoluteDate(d2);

    expect(r2.getFullYear()).toBe(2026);
    expect(r2.getMonth()).toBe(11); // 11 for Dec
    expect(r2.getDate()).toBe(31);
    expect(r2.getHours()).toBe(0);
  });
});

describe("Get local today", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-01-01T12:00:00Z"));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("Correctly returns local time at midnight", () => {
    const today = getLocalToday();
    expect(today.getFullYear()).toBe(2026);
    expect(today.getMonth()).toBe(0); // 0 for Jan
    expect(today.getDate()).toBe(1);
    expect(today.getHours()).toBe(0);
  });
});
