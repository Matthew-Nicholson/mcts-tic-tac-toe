import { describe, it, expect } from "vitest";

describe("Demo Unit Test", () => {
  it("should pass", () => {
    // Arrange
    const expected = 4;

    // Act
    const result = 2 + 2;

    // Assert
    expect(result).toEqual(expected);
  });
});
