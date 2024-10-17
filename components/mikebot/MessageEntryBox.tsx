import { Grid, Vertical, Horizontal, Stretch } from "gls/lib";
import * as React from "react";
import { format } from "date-fns";
import Link from "next/link";
import { style } from "typestyle";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useSessionMutation } from "convex-helpers/react/sessions";
import { Id } from "../../convex/_generated/dataModel";

interface Props {
  userId: Id<"users">;
  threadId: Id<"threads">;
}

export const MessageEntryBox: React.FC<Props> = ({ userId, threadId }) => {
  const [message, setMessage] = React.useState("");
  const createMessage = useMutation(api.messages.sendMessageToThreadFromUser);
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  const handleSubmit = () => {
    createMessage({
      message,
      userId,
      threadId,
    }).catch(console.error);
    setMessage("");
  };

  React.useEffect(() => {
    if (!textareaRef.current) return;
    textareaRef.current.style.height = "40px";
    textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
  }, [message]);

  return (
    <Horizontal padding="8px" spacing={"5px"}>
      <Stretch verticalAlign="center">
        <textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey && !e.ctrlKey) {
              e.preventDefault();
              handleSubmit();
            }
          }}
          placeholder="Your message..."
          style={{
            height: "40px",
            width: "100%",
            minHeight: "40px",
            maxHeight: "120px",
            resize: "none",
            border: "1px solid #ccc",
            borderRadius: "4px",
            padding: "8px",
            fontFamily: "inherit",
            fontSize: "inherit",
            overflow: "hidden",
          }}
        />
      </Stretch>
      <Horizontal verticalAlign="center">
        <button
          onClick={handleSubmit}
          style={{
            height: "40px",
            width: "40px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            background: "#f0f0f0",
            cursor: "pointer",
          }}
        >
          ➡️
        </button>
      </Horizontal>
    </Horizontal>
  );
};
