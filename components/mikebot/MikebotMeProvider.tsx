"use client";
import { ConvexProvider, ConvexReactClient, useMutation, useQuery } from "convex/react";
import { useContext, createContext, useMemo, useState, useEffect } from "react";
import { Doc, Id } from "../../convex/_generated/dataModel";
import { api } from "../../convex/_generated/api";
import { useQueryWithStatus } from "./helpers";

interface Props {
  children: React.ReactNode;
}

const storageKey = "mikebot_me_userId";

export const MikebotMeProvider: React.FC<Props> = ({ children }) => {
  const [mikebotUserId, setMikebotUserId] = useState<Id<"users"> | null>(
    () => localStorage[storageKey]
  );
  const createAnonymousUser = useMutation(api.users.createAnonymousUser);

  const meQuery = useQueryWithStatus(
    api.users.findUser,
    mikebotUserId ? { id: mikebotUserId } : "skip"
  );

  useEffect(() => {
    if (mikebotUserId) {
      if (meQuery.data) return;
      if (meQuery.status == "pending") return;
      setMikebotUserId(null);
      return;
    }

    createAnonymousUser()
      .then((id) => {
        localStorage[storageKey] = id;
        setMikebotUserId(id);
      })
      .catch(console.error);
  }, [mikebotUserId, meQuery.status, meQuery.data?._id]);

  return <MikebotMeContext.Provider value={meQuery.data}>{children}</MikebotMeContext.Provider>;
};

export const MikebotMeContext = createContext<Doc<"users"> | null | undefined>(null);

export const useMe = () => useContext(MikebotMeContext);
