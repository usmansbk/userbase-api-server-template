import main from "../src";

describe("test", () => {
  test("main", async () => {
    expect(await main()).toBe("Hello World!");
  });
});
