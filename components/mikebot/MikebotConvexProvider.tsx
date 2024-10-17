"use client";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { useMemo } from "react";

interface Props {
  children: React.ReactNode;
}

export const MikebotConvexProvider: React.FC<Props> = ({ children }) => {
  const client = useMemo(
    () =>
      new ConvexReactClient(
        process.env.NODE_ENV == "development"
          ? "https://wooden-warbler-780.convex.cloud"
          : "https://groovy-lapwing-575.convex.cloud"
      ),
    []
  );

  return <ConvexProvider client={client}>{children}</ConvexProvider>;
};
