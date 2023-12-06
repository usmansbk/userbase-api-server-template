import type { AppContext } from "types";
import createMockContext from "./graphql/context";

describe("Database", () => {
  let ctx: AppContext | undefined;

  beforeEach(async () => {
    ctx = await createMockContext();
  });

  test("prisma should be available", async () => {
    const expectedUser = {
      email: "test@email.com",
      firstName: "Test",
      password: "test",
    };

    await ctx?.prismaClient.user.create({
      data: expectedUser,
    });

    const user = await ctx?.prismaClient.user.findFirst({
      where: {
        email: expectedUser.email,
      },
    });

    expect(user!.firstName).toBe(expectedUser.firstName);
  });
});
