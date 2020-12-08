import { Vertical, Grid } from "gls/lib";
import { ResponsiveSidebarLayouts } from "../components/layout/ResponsiveSidebarLayouts";
import * as React from "react";
import { getAlgoliaIndex } from "../utils/algolia";
import { AlgoliaHit } from "./api/algolia/types";
import { SearchResult } from "../components/searchModal/SearchResult";

type Props = {};

const NotFoundPage = ({}: Props) => {
  const [results, setResults] = React.useState<Array<AlgoliaHit>>([]);

  const term = (() => {
    if (!global.window) return "";
    const parts = window.location.href.split("/");
    return parts[parts.length - 1];
  })();

  React.useEffect(() => {
    getAlgoliaIndex()
      .search(term)
      .then((resp) => {
        if (resp.hits.length != 0) setResults(resp.hits as any);
        else
          getAlgoliaIndex()
            .search("")
            .then((resp) => setResults(resp.hits as any));
      });
  }, [term]);

  for (let hit of results) if (hit.slug == term) window.open(`/posts/${term}`, "_self");

  return (
    <ResponsiveSidebarLayouts>
      <Vertical spacing={20}>
        <h1>Page Not Found</h1>
        <p>It seems like that page has moved, heres some similar posts:</p>
        <Vertical spacing={20}>
          {results.map((hit) => (
            <SearchResult key={hit.slug} hit={hit} />
          ))}
        </Vertical>
      </Vertical>
    </ResponsiveSidebarLayouts>
  );
};

export default NotFoundPage;
