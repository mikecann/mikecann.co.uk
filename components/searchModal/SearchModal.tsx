import { Horizontal, Vertical, VerticalSpacer } from "gls/lib";
import * as React from "react";
import { Modal } from "../Modal";
import algoliasearch from "algoliasearch";
import { ensure } from "../../utils/ensure";
import { AlgoliaHit } from "../../pages/api/algolia/types";
import { useWindowSize } from "../../utils/useWindowSize";
import Image from "next/image";
import { format } from "date-fns";
import { style } from "typestyle";
import Link from "next/link";
import { CloseButton } from "../CloseButton";

interface Props {
  onClose: () => any;
}

const client = algoliasearch("JYZJ63OX7U", "01ddc3505766aa8d46cbbd65006671ec");
const index = client.initIndex("next-mikecann");

export const SearchModal: React.FC<Props> = ({ onClose }) => {
  const [term, setTerm] = React.useState("");
  const [results, setResults] = React.useState<Array<AlgoliaHit>>([]);
  //const windowSize = useWindowSize();
  const [input, setInput] = React.useState<HTMLInputElement | null>(null);
  const { innerHeight, innerWidth } = useWindowSize();

  React.useEffect(() => {
    index.search(term).then((resp) => {
      console.log("algolia response", resp);
      setResults(resp.hits as any);
    });
  }, [term]);

  React.useEffect(() => {
    if (!input) return;
    input.focus();
  }, [input]);

  return (
    <Modal
      onClose={onClose}
      style={{ maxWidth: 600, width: "calc(100% - 50px)", padding: 0, position: "relative" }}
    >
      <CloseButton style={{ position: "absolute", top: -16, right: -16 }} onClick={onClose} />
      <Horizontal style={{ width: "100%", borderBottom: "1px solid #eee", padding: 20 }}>
        <input
          placeholder="Search.."
          style={{ width: "100%" }}
          value={term}
          ref={setInput}
          onChange={(e) => setTerm(e.target.value)}
        />
      </Horizontal>
      <Vertical
        spacing={10}
        style={{
          overflowY: "auto",
          height: innerHeight - 120,
          padding: 20,
          width: "100%",
        }}
      >
        {results
          .sort((a, b) => b.createdAt - a.createdAt)
          .map((hit) => (
            <Teaser key={hit.objectID} hit={hit} onClick={onClose} />
          ))}
        {results.length == 0 && (
          <div style={{ height: "100%" }}>
            {/* <Header icon>
            <Icon name="search" /> */}
            No posts matching your query.
            {/* </Header> */}
          </div>
        )}
      </Vertical>
    </Modal>
  );
};

function Teaser({ hit, onClick }: { hit: AlgoliaHit; onClick: () => any }) {
  const { coverImage, createdAt, excerpt, title, slug } = hit;
  const [isOver, setIsOver] = React.useState(false);
  return (
    <Link href={`/posts/${slug}`}>
      <a onClick={onClick}>
        <Horizontal
          spacing={10}
          width="100%"
          onMouseOver={() => setIsOver(true)}
          onMouseLeave={() => setIsOver(false)}
          style={{
            overflowX: "hidden",
          }}
        >
          {/* <Image
        // layout="fill"
        src={coverImage}
        quality={80}
        width={200}
        height={150}
        style={{ objectFit: "cover", width: 200, height: 150 }}
      /> */}
          <img
            // layout="fill"
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
      </a>
    </Link>
  );
}
