/**
 * https://www.npmjs.com/package/graphql-subscriptions#filters
 * withFilter API:
 * asyncIteratorFn: (rootValue, args, context, info) => AsyncIterator<any> : A function that returns AsyncIterator you got from your pubsub.asyncIterator.
 * filterFn: (payload, variables, context, info) => boolean | Promise<boolean> - A filter function, executed with the payload (the published value), variables, context and operation info, must return boolean or Promise<boolean> indicating if the payload should pass to the subscriber.
 *
 * The withFilter function takes two parameters:
 * The first parameter is exactly the function you would use for subscribe if you weren't applying a filter.
 * The second parameter is a filter function that returns true if a subscription update should be sent to a particular client, and false otherwise (Promise<boolean> is also allowed). This function takes two parameters of its own:
 * payload is the payload of the event that was published.
 * variables is an object containing all arguments the client provided when initiating their subscription.
 */
import { withFilter } from "graphql-subscriptions";
import { USER_UPDATED_TOPIC } from "@/constants/subscriptions";
import type { SocketContext } from "types";
import type { SubscriptionUserBasicInfoUpdatedArgs } from "types/graphql";
import type { User } from "@prisma/client";

export default {
  Subscription: {
    ping: {
      // Example using an async generator
      subscribe: async function* () {
        yield { ping: "pong" };
      },
    },
    userBasicInfoUpdated: {
      /**
       * The SocketContext object represents the context of your subscription server,
       * not the GraphQL operation AppContext that's passed to your resolvers.
       */
      subscribe: withFilter(
        (
          _parent: unknown,
          args: SubscriptionUserBasicInfoUpdatedArgs,
          { pubsub }: SocketContext,
        ) => pubsub.asyncIterator([USER_UPDATED_TOPIC]),
        (payload: User, variables: SubscriptionUserBasicInfoUpdatedArgs) =>
          payload.id === variables.id,
      ),
      /**
       * By default subscription resolver expects payload to be in the
       * shape of { userBasicInfoUpdated: User }. So override it because
       * we always make our payloads the mutated objects.
       */
      resolve: (payload: User) => payload,
    },
  },
};
