import { Horizontal, Vertical } from "gls/lib";
import * as React from "react";
import { Modal } from "../Modal";
import { AlgoliaHit } from "../../pages/api/algolia/types";
import { useWindowSize } from "../../utils/useWindowSize";
import { CloseButton } from "../CloseButton";
import { getAlgoliaIndex } from "../../utils/algolia";
import { SearchResult } from "./SearchResult";

interface Props {
  onClose: () => any;
}

export const SearchModal: React.FC<Props> = ({ onClose }) => {
  const [term, setTerm] = React.useState("");
  const [results, setResults] = React.useState<Array<AlgoliaHit>>([]);
  //const windowSize = useWindowSize();
  const [input, setInput] = React.useState<HTMLInputElement | null>(null);
  const { innerHeight, innerWidth } = useWindowSize();

  React.useEffect(() => {
    getAlgoliaIndex()
      .search(term)
      .then((resp) => {
        console.log("algolia response", resp);
        setResults(resp.hits as any);
      });
  }, [term]);

  React.useEffect(() => {
    if (!input) return;
    input.focus();
  }, [input]);

  React.useEffect(() => {
    const onEvent = (e: KeyboardEvent) => {
      if (e.key == "Escape") onClose();
    };
    window.addEventListener("keyup", onEvent);
    return () => window.removeEventListener("keyup", onEvent);
  }, [onClose]);

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
        {results.map((hit) => (
          <SearchResult key={hit.objectID} hit={hit} onClick={onClose} />
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
