import { Horizontal, Vertical } from "gls/lib";
import * as React from "react";
import { format } from "date-fns";
import Link from "next/link";
import { AlgoliaHit } from "../../scripts/algolia/types";

export function SearchResult({ hit, onClick }: { hit: AlgoliaHit; onClick?: () => any }) {
  const { coverImage, createdAt, excerpt, title, slug } = hit;
  const [isOver, setIsOver] = React.useState(false);
  return (
    <Link href={`/posts/${slug}`} onClick={onClick}>
      <Horizontal
        spacing={10}
        width="100%"
        onMouseOver={() => setIsOver(true)}
        onMouseLeave={() => setIsOver(false)}
        style={{
          overflowX: "hidden",
        }}
      >
        <img
          // layout="fill"
          alt={`${title} post cover image`}
          src={coverImage}
          width={100}
          height={60}
          style={{
            objectFit: "cover",
            borderRadius: 6,
            opacity: isOver ? 1 : 0.7,
            transition: "all 0.1s linear",
          }}
        />
        <Vertical
          verticalAlign="center"
          spacing={5}
          style={{ width: "calc(100% - 140px)", overflow: "hidden" }}
        >
          <div style={{ margin: 0 }}>{title}</div>
          <div style={{ color: "#bbbbbb", fontSize: "0.8em" }}>
            {format(new Date(createdAt), "do MMMM yyyy")}
          </div>
        </Vertical>
      </Horizontal>
    </Link>
  );
}
