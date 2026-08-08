import { describe, it, expect } from "vitest";
import AboutSection from "../about/AboutSection";

describe("AboutSection", () => {
  it("exports the AboutSection component", () => {
    expect(AboutSection).toBeDefined();
    expect(typeof AboutSection).toBe("function");
  });
});