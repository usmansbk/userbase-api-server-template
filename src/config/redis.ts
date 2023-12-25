import { RedisPubSub } from "graphql-redis-subscriptions";
import Redis from "ioredis";

const createRedisClient = () => {
  let redisClient: Redis;
  if (process.env.REDIS_URL) {
    redisClient = new Redis(process.env.REDIS_URL);
  } else if (process.env.REDIS_PORT && process.env.REDIS_HOST) {
    const port = Number.parseInt(process.env.REDIS_PORT, 10);

    redisClient = new Redis(port, process.env.REDIS_HOST);
  } else {
    redisClient = new Redis();
  }

  return redisClient;
};

export const pubsub = new RedisPubSub({
  publisher: createRedisClient(),
  subscriber: createRedisClient(),
});

let redisClient: Redis;

const getRedisClientInstance = () => {
  if (!redisClient) {
    redisClient = createRedisClient();
  }

  return redisClient;
};

export default getRedisClientInstance();
