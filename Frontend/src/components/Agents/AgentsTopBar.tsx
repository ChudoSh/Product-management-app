"use client";

import React, { useState } from "react";
import { FiPlus, FiFilter } from "react-icons/fi";
import { AgentCreateDialog } from "./AgentCreateDialog";
import { Agent } from "../../Types/Agent";

export const AgentsTopBar = ({ onAgentCreated }: { onAgentCreated: (agent: Agent) => void }) => {
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const handleAgentCreated = (agent: any) => {
    // In a real implementation, this would update the agent list
    // or trigger a refetch
    onAgentCreated(agent);
    setIsCreateDialogOpen(false);
    console.log("Agent created:", agent);
    window.location.reload(); // Simple refresh for demo purposes
  };

  return (
    <div className="border-b px-4 mb-4 mt-2 pb-4 border-stone-200">
      <div className="flex items-center justify-between p-0.5">
        <div>
          <span className="text-sm font-bold block">🤖 Agents</span>
          <span className="text-xs block text-stone-500">
            Manage your trading agents
          </span>
        </div>

        <div className="flex gap-2">
          <button className="flex text-sm items-center gap-2 bg-stone-100 transition-colors hover:bg-stone-200 px-3 py-1.5 rounded">
            <FiFilter />
            <span>Filter</span>
          </button>
          <button 
            onClick={() => setIsCreateDialogOpen(true)}
            className="flex text-sm items-center gap-2 bg-violet-100 text-violet-700 transition-colors hover:bg-violet-200 px-3 py-1.5 rounded"
          >
            <FiPlus />
            <span>New Agent</span>
          </button>
        </div>
      </div>

      <AgentCreateDialog 
        isOpen={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
        onAgentCreated={onAgentCreated}
      />
    </div>
  );
};