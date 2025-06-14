"use client";

import { columns } from "@/components/columns";
import { DataTable } from "@/components/data-table";
import { EmptyState } from "@/components/empty-state";
import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { ResponsiveDialog } from "@/components/responsive-dialog";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useAgentsFilters } from "../../hooks/use-agents-filters";
import { DataPagination } from "@/components/data-pagination";

export const AgentView = () => {
  const [filters, setFilters] = useAgentsFilters();

  const trpc = useTRPC();
  const { data } = useSuspenseQuery(
    trpc.agents.getMany.queryOptions({ ...filters })
  );

  return (
    <div>
      <ResponsiveDialog
        title="Responsive Test"
        description="Responsive test description"
        open={false}
        onOpenChange={() => {}}
      >
        Hello
      </ResponsiveDialog>
      <div className="flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-4">
        <DataTable data={data.items} columns={columns} />
        <DataPagination
          page={filters.page}
          totalPages={data.totalPages}
          onPageChange={(page) => setFilters({ page })}
        />
        {data.items.length === 0 && (
          <EmptyState
            title="Create your first agent"
            description="Create an agent to join your meetings. Each agent will follow your instructions and can interact with participants during the call."
          />
        )}
      </div>
    </div>
  );
};

export const AgentsViewLoading = () => {
  return (
    <LoadingState
      title="Loading agents"
      description="This may take a moment."
    />
  );
};

export const AgentsViewError = () => {
  return (
    <ErrorState
      title="Error loading agents"
      description="Please try again later"
    />
  );
};
