import * as React from "react";
import { Grid } from "gls/lib";
import Link from "next/link";

interface Props {
  years: string[];
}

export const ArchiveYears: React.FC<Props> = ({ years }) => {
  return (
    <Grid spacing={20} style={{ alignItems: "center" }}>
      {years.map((year) => (
        <>
          <div style={{ fontSize: "2em" }}>
            <Link href="/years/[year]" as={`/years/${year}`}>
              {year}
            </Link>
          </div>
          <div style={{ backgroundColor: "#ddd", width: 10, height: 10, borderRadius: "50%" }} />
        </>
      ))}
    </Grid>
  );
};
