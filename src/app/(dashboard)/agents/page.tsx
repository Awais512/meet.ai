import { Suspense } from "react";
import {
  AgentsViewLoading,
  AgentsViewError,
  AgentView,
} from "@/modules/agents/ui/view/agent-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { ListHeader } from "@/modules/agents/ui/components/list-header";

const Agents = async () => {
  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(trpc.agents.getMany.queryOptions());

  return (
    <>
      <ListHeader />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<AgentsViewLoading />}>
          <ErrorBoundary fallback={<AgentsViewError />}>
            <AgentView />
          </ErrorBoundary>
        </Suspense>
      </HydrationBoundary>
    </>
  );
};

export default Agents;
