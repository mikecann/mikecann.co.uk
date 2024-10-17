import { Grid, Vertical } from "gls/lib";
import * as React from "react";
import { format } from "date-fns";
import Link from "next/link";
import { Id } from "../../convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { listMessagesForUserThread } from "../../convex/messages";
import { MessageRow } from "./MessageRow";

interface Props {
  threadId: Id<"threads">;
  userId: Id<"users">;
}

export const MessagesList: React.FC<Props> = ({ threadId, userId }) => {
  const messages = useQuery(api.messages.listMessagesForUserThread, {
    threadId,
    userId,
  });

  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <Vertical spacing="5px" width="100%" style={{ maxHeight: "300px", overflowY: "auto" }}>
      {messages?.map(message => (
        <MessageRow key={message._id} message={message} />
      ))}
      <div ref={messagesEndRef} />
    </Vertical>
  );
};
