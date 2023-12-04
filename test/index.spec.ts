import main from "@/index";
import "test/helpers";

describe("test", () => {
  test("main", async () => {
    expect(await main()).toBe("Hello World!");
  });
});
