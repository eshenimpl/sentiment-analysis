import { isEmpty } from "../src/client/js/inputChecker";

describe("Testing isEmpty() function", () => {
  test("When the input is empty, should return true", () => {
    expect(isEmpty("")).toBe(true);
  });
  test("When the input is not empty, should return false", () => {
    expect(isEmpty("have a nice day!")).toBe(false);
  });
});
