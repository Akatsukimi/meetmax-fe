"use client";

import ConversationPanel from "@/components/conversations/conversation-panel";
import { AuthContext } from "@/providers/auth-provider";
import { getConversationMessages } from "@/services/conversations";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useContext } from "react";

const ConversationIdPage = () => {
  const { user } = useContext(AuthContext);
  const params = useParams<{ conversationId: string }>();
  const { data, isLoading } = useQuery({
    queryKey: ["conversations", params.conversationId],
    queryFn: () => getConversationMessages(params.conversationId),
    staleTime: Infinity,
  });
  if (isLoading || !user) return <div>Loading...</div>;

  console.log("🚀 ~ ConversationIdPage ~ data:", data.messages);
  return (
    <ConversationPanel
      messages={data.messages}
      isMessagesLoading={isLoading}
      userId={user.id}
    />
  );
};

export default ConversationIdPage;
