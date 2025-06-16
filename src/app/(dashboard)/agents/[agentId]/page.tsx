import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import React, { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

interface Props {
  params: Promise<{ agentId: string }>;
}

const AgentPage = async ({ params }: Props) => {
  const { agentId } = await params;

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.agents.getOne.queryOptions({ id: agentId })
  );

  return (
    <HydrationBoundary>
      <Suspense fallback={<p>Loading</p>}>
        <ErrorBoundary fallback={<p>Error</p>}></ErrorBoundary>
      </Suspense>
    </HydrationBoundary>
  );
};

export default AgentPage;
