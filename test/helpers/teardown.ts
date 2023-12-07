import Redis from "ioredis-mock";

afterEach(async () => {
  await new Redis().flushall();
});
