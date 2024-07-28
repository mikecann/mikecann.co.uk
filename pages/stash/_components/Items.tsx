import { Grid, Vertical } from "gls/lib";
import { PostTeaser } from "../../../components/PostTeaser";
import { ResponsiveSidebarLayouts } from "../../../components/layout/ResponsiveSidebarLayouts";
import Head from "next/head";
import { PostWithContent } from "../../../scripts/posts";
import { useQuery } from "convex/react";
import { api } from "../_generated/api";
import { Doc } from "../_generated/dataModel";
import Link from "next/link";

type Props = {};

type Item = {
  _id: string;
  url: string;
  headerImageUrl?: string;
  title: string;
  description: string;
};

const defaultHeaderImageUrl = `https://images.unsplash.com/photo-1617050318658-a9a3175e34cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80`;

export const Items = ({}: Props) => {
  const items: Item[] | null = useQuery(api.items.listForMikesBlog);

  if (!items) return <div>loading..</div>;

  return (
    <div style={{ display: "flex", gap: "1em", flexWrap: "wrap" }}>
      {items.map((item) => (
        <Link href={item.url}>
          <div
            key={item._id}
            style={{
              maxWidth: "280px",
              border: "1px solid rgba(0,0,0,0.2)",
              borderRadius: "6px",
              overflow: "hidden",
              cursor: "pointer",
            }}
          >
            <img
              style={{
                width: "100%",
                height: "100px",
                objectFit: "cover",
              }}
              src={item.headerImageUrl ?? defaultHeaderImageUrl}
            />
            <div style={{ padding: "0px 10px 10px 10px" }}>
              <h3
                style={{
                  marginBottom: "5px",
                  marginTop: "0px",
                }}
              >
                {item.title}
              </h3>
              <div style={{ opacity: 0.5, fontSize: "0.9em" }}>{item.description}</div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};
