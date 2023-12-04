import greet from "../src";

describe("test", () => {
  test("greetings", async () => {
    expect(await greet()).toBe("Hello World!");
  });
});
