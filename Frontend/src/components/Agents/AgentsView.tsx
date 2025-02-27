"use client";

import React, { useState } from "react";
import { AgentsTopBar } from "./AgentsTopBar";
import { AgentsGrid } from "./AgentsGrid";
import { Agent } from "../../Types/Agent";

export const AgentsView = () => {
  // State to hold newly created agent
  const [newAgent, setNewAgent] = useState<Agent | null>(null);

  // Handler function to be passed to TopBar
  const handleAgentCreated = (agent: Agent) => {
    setNewAgent(agent);
  };

  return (
    <div className="bg-white rounded-lg pb-4 shadow">
      <AgentsTopBar onAgentCreated={handleAgentCreated} />
      <AgentsGrid newAgent={newAgent} />
    </div>
  );
}