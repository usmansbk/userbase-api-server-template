const query = `
	mutation SampleQuery {
		doSomething {
			id
		}
	}
`;

describe("Mutation", () => {
  describe("doSomething", () => {
    test("should run some mutations", () => {
      expect(query).toBeDefined();
    });
  });
});
