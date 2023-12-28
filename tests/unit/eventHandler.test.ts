import { describe, expect, it, vitest } from "vitest";
import { eventHandler } from "../../src/events/events";

describe("eventHandler", () => {
  it("should handle event correctly", () => {
    const callback = vitest.fn();
    eventHandler.subscribe(1, callback);
    eventHandler.publish(1, "data");
    expect(callback).toBeCalledWith("data");
  });
});
