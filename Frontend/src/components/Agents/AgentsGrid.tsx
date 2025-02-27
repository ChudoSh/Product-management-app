import React from "react";
import { AgentsList } from "./AgentsList";
import { AgentsStats } from "./AgentsStats";
import { AgentsPerformance } from "./AgentsPerformance";
import { Agent } from "../../Types/Agent";

interface AgentGridProps {
  newAgent: Agent | null;
}

export const AgentsGrid = ({ newAgent }: AgentGridProps) => {
  return (
    <div className="px-4 grid gap-3 grid-cols-12">
      <AgentsStats />
      <AgentsPerformance />
      <AgentsList newAgent={newAgent} />
    </div>
  );
};