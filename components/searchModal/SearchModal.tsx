import { Horizontal, Vertical } from "gls/lib";
import * as React from "react";
import { Modal } from "../Modal";
import algoliasearch from "algoliasearch";
import { ensure } from "../../utils/ensure";
import { AlgoliaHit } from "../../pages/api/algolia/types";

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
    <Modal onClose={onClose} style={{ maxHeight: "100%", overflowY: "scroll" }}>
      <Horizontal>
        <input value={term} ref={setInput} onChange={(e) => setTerm(e.target.value)} />
      </Horizontal>
      {results.map((hit) => (
        <div key={hit.objectID} style={{ marginTop: 40, marginBottom: 40 }}>
          <Teaser hit={hit} />
          {/* <Divider /> */}
        </div>
      ))}
      {results.length == 0 && (
        <div style={{ height: "100%" }}>
          {/* <Header icon>
            <Icon name="search" /> */}
          No posts matching your query.
          {/* </Header> */}
        </div>
      )}
    </Modal>
  );
};

function Teaser({ hit }: { hit: AlgoliaHit }) {
  const { coverImage, createdAt, excerpt, title } = hit;
  return (
    <Horizontal>
      <img src={coverImage} width={60} />
      <div>{title}</div>
    </Horizontal>
  );
  // return (
  //   <PostTeaser
  //     title={frontmatter.title + ""}
  //     coverImg={coverImg}
  //     date={frontmatter.date + ""}
  //     excerpt={hit.excerpt + ""}
  //     url={url + ""}
  //   />
  // );
}
