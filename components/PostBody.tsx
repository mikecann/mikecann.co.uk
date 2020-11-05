import * as React from "react";

interface Props {
  content: string;
}

export const PostBody: React.FC<Props> = ({ content }) => {
  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
};
