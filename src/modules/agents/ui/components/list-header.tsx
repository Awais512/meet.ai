"use client";
import { Button } from "@/components/ui/button";
import { PlusIcon, XCircleIcon } from "lucide-react";
import React, { useState } from "react";
import { AgentDialog } from "./agent-dialog";
import { useAgentsFilters } from "../../hooks/use-agents-filters";
import { AgentsSearchFilters } from "./agents-search-filters";
import { DEFAULT_PAGE } from "@/constants";

export const ListHeader = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [filters, setFilters] = useAgentsFilters();

  const isAnyFilterModified = !!filters.search;

  const onClearFilters = () => {
    setFilters({
      search: "",
      page: DEFAULT_PAGE,
    });
  };

  return (
    <>
      <AgentDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
      <div className="py-4 px-4 md:px-8 flex flex-col gap-y-4">
        <div className="flex items-center justify-between">
          <h5 className="font-medium text-xl">My Agents</h5>
          <Button onClick={() => setIsDialogOpen(true)}>
            <PlusIcon /> New Agent
          </Button>
        </div>
        <div className="flex items-center gap-x-2 p-1">
          <AgentsSearchFilters />
          {isAnyFilterModified && (
            <Button onClick={onClearFilters} variant="outline" size="sm">
              <XCircleIcon />
              Clear
            </Button>
          )}
        </div>
      </div>
    </>
  );
};
