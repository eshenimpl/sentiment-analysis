import { mapScore } from "../src/client/js/formHandler";

describe("Testing mapScore() function", () => {
  test("mapScore returns correct polarity for given tag", () => {
    expect(mapScore("P+")).toBe("Strong positive");
    expect(mapScore("P")).toBe("Positive");
    expect(mapScore("NEU")).toBe("Neutral");
    expect(mapScore("N")).toBe("Negative");
    expect(mapScore("N+")).toBe("Strong negative");
    expect(mapScore("NONE")).toBe("Without polarity");
    expect(mapScore("UNKNOWN")).toBe("N/A");
  });
});
