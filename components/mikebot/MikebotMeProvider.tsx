"use client";
import { ConvexProvider, ConvexReactClient, useMutation, useQuery } from "convex/react";
import { useContext, createContext, useMemo, useState, useEffect } from "react";
import { Doc, Id } from "../../convex/_generated/dataModel";
import { api } from "../../convex/_generated/api";

interface Props {
  children: React.ReactNode;
}

const storageKey = "mikebot_me_userId";

export const MikebotMeProvider: React.FC<Props> = ({ children }) => {
  const [mikebotUserId, setMikebotUserId] = useState<Id<"users"> | null>(
    () => localStorage[storageKey]
  );
  const createAnonymousUser = useMutation(api.users.createAnonymousUser);
  const me = useQuery(api.users.findUser, mikebotUserId ? { id: mikebotUserId } : "skip");

  useEffect(() => {
    if (mikebotUserId) return;
    createAnonymousUser()
      .then((id) => {
        localStorage[storageKey] = id;
        setMikebotUserId(id);
      })
      .catch(console.error);
  }, [mikebotUserId]);

  return <MikebotMeContext.Provider value={me}>{children}</MikebotMeContext.Provider>;
};

export const MikebotMeContext = createContext<Doc<"users"> | null | undefined>(null);

export const useMe = () => useContext(MikebotMeContext);
