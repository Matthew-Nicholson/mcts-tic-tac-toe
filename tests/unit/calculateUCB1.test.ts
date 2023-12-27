import { describe, it, expect } from "vitest";
import { calculateUCB1 } from "../../src/ai/calculateUCB1";

describe("calculateUCB1", () => {
  it("should calculate UCB1 correctly", () => {
    // Test case 1
    expect(calculateUCB1(10, 100, 1000)).toBeCloseTo(0.47);

    // Test case 2
    expect(calculateUCB1(5, 50, 500)).toBeCloseTo(0.6);

    // Test case 3
    expect(calculateUCB1(0, 10, 100)).toBeCloseTo(0.96);

    // Test case 4
    expect(calculateUCB1(100, 1000, 10000)).toBeCloseTo(0.24);

    // Test case 5
    expect(calculateUCB1(0, 0, 0)).toBe(Infinity);
  });
});
