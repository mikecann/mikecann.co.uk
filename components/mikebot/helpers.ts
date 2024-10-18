import { makeUseQueryWithStatus } from "convex-helpers/react";
import { useQueries, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";

export const useQueryWithStatus = makeUseQueryWithStatus(useQueries);

export const useOptimisticSendMessage = () => {
  return useMutation(api.messages.sendMessageToThreadFromUser).withOptimisticUpdate(
    (localStore, args) => {}
  );
};
