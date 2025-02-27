"use client";

import React, { useState, useEffect } from "react";
import { FiPlay, FiPause, FiTrash2, FiMoreHorizontal, FiRefreshCw } from "react-icons/fi";
import { Gi3dGlasses } from "react-icons/gi";
import { Agent, AgentStatus } from "../../Types/Agent";
import agentService from "../../services/productService";
import axios, { AxiosError } from "axios";


interface AgentListProps {
    newAgent: Agent | null;
}

export const AgentsList = ({ newAgent }: AgentListProps) => {
    const [agents, setAgents] = useState<Agent[]>([]);
    const [loading, setLoading] = useState<boolean>(true);


    useEffect(() => {
      if (newAgent && newAgent.id) {
        setAgents(prevAgents => {
          if (!prevAgents.some(agent => agent.id === newAgent.id)) {
            return [newAgent, ...prevAgents];
          }
          return prevAgents;
        });
      }
    }, [newAgent])

    const fetchAgents = async (preserveState = true) => {
      try {
        setLoading(true);
        const response = await agentService.getAll();
        
        if (!response?.data || !Array.isArray(response.data)) {
          console.error('Invalid response format:', response);
          return;
        }
        
        // Log all agent statuses from server
        console.log('Server agent statuses:', response.data.map(a => 
          `${a.id.substring(0,8)}: ${a.status}`
        ));
        
        if (preserveState && agents.length > 0) {
          // Create lookup map for efficient access
          const existingAgentsMap = Object.fromEntries(
            agents.map(agent => [agent.id, agent])
          );
          
          setAgents(response.data.map(serverAgent => {
            const localAgent = existingAgentsMap[serverAgent.id];
            // Keep local version if it exists and has a different status
            if (localAgent && localAgent.status !== serverAgent.status) {
              console.log(`Preserving ${serverAgent.id} with status ${localAgent.status}`);
              return localAgent;
            }
            return serverAgent;
          }));
        } else {
          // Complete refresh
          setAgents(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch agents:", error);
      } finally {
        setLoading(false);
      }
    };
    
    // Then update your usage
    useEffect(() => {
      fetchAgents(true); // Initial load preserves state (though there won't be any initially)
    }, []);
  
  // 2. Update agent control functions to use atomic state updates
  const handleStartAgent = async (id: string) => {
    // Create a full copy of the current agents array
    const updatedAgents = [...agents];
    
    // Find and update the specific agent
    const agentIndex = updatedAgents.findIndex(a => a.id === id);
    if (agentIndex >= 0) {
      updatedAgents[agentIndex] = {
        ...updatedAgents[agentIndex],
        status: "Running"
      };
      // Update state with the entire new array
      setAgents(updatedAgents);
    }
    
    try {
      const response = await agentService.start(id);
      // No additional state update needed unless you want to sync with server data
    } catch (error) {
      console.error("Failed to start agent:", error);
      // Revert the specific agent on error
      if (agentIndex >= 0) {
        const revertedAgents = [...agents];
        revertedAgents[agentIndex] = {
          ...revertedAgents[agentIndex],
          status: "Ready" // Revert to default state
        };
        setAgents(revertedAgents);
      }
    }
  };

  const handleStopAgent = async (id: string) => {
    try {
      // Optimistic UI update
      setAgents(prevAgents => 
        prevAgents.map(agent => 
          agent.id === id ? { ...agent, status: "Stopped" } : agent
        )
      );
      
      const response = await agentService.stop(id);
      
      // Check the ACTUAL status returned from the server
      if (response?.data) {
        console.log(`Server returned status for ${id}: ${response.data.status}`);
        
        // Update with the correct server status
        setAgents(prevAgents => 
          prevAgents.map(agent => 
            agent.id === id ? response.data : agent
          )
        );
      }
    } catch (error) {
      console.error("Failed to stop agent:", error);
      fetchAgents(false); // Force refresh to get accurate state
    }
  };

  const handleDeleteAgent = async (id: string) => {
    try {
      await agentService.delete(id);
      setAgents(prevAgents => prevAgents.filter(agent => agent.id !== id));
    } catch (error) {
      console.error("Failed to delete agent:", error);
    }
  };


  return (
    <div className="col-span-12 p-4 rounded border border-stone-300">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="flex items-center gap-1.5 font-medium">
          <Gi3dGlasses /> Agent Instances
        </h3>
        <button 
          onClick={() => fetchAgents(true)}
          disabled={loading}
          className="text-sm flex items-center gap-1 text-violet-500 hover:underline"
        >
          <FiRefreshCw className={loading ? "animate-spin" : ""} /> Refresh
        </button>
      </div>
      {loading ? (
        <div className="flex justify-center py-8">
          <FiRefreshCw className="animate-spin text-2xl text-violet-500" />
        </div>
      ) : (
        <table className="w-full table-auto">
          <TableHead />
          <tbody>
            {agents.length === 0 ? (
                <div className="text-center py-8">
                <p className="text-stone-500">No agents found or connection error.</p>
                <button 
                  onClick={() => fetchAgents(false)} 
                  className="mt-4 px-4 py-2 text-sm bg-violet-100 text-violet-700 rounded hover:bg-violet-200"
                >
                  Try Again
                </button>
              </div>
            ) : (
              agents.map((agent, index) => (
                <TableRow
                  key={agent.id}
                  agent={agent}
                  order={index + 1}
                  onStart={handleStartAgent}
                  onStop={handleStopAgent}
                  onDelete={handleDeleteAgent}
                />
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

const TableHead = () => {
  return (
    <thead>
      <tr className="text-sm font-normal text-stone-500">
        <th className="text-start p-1.5">ID</th>
        <th className="text-start p-1.5">Status</th>
        <th className="text-start p-1.5">Created</th>
      </tr>
    </thead>
  );
};

const TableRow = ({
  agent,
  order,
  onStart,
  onStop,
  onDelete,
}: {
  agent: Agent;
  order: number;
  onStart: (id: string) => void;
  onStop: (id: string) => void;
  onDelete: (id: string) => void;
}) => {
  return (
    <tr className={order % 2 ? "bg-stone-100 text-sm" : "text-sm"}>
      <td className="p-1.5 font-mono">{agent.id.slice(0, 8)}</td>
      <td className="p-1.5">
        <StatusBadge status={agent.status} />
      </td>
      <td className="p-1.5">
        <div className="flex justify-center gap-1">
        {agent.status === "Running" ? (
            <button
              onClick={() => onStop(agent.id)}
              className="hover:bg-stone-200 transition-colors grid place-content-center rounded text-sm size-8 text-amber-500"
              title="Stop agent"
            >
              <FiPause />
            </button>
          ) : (
            <button
              onClick={() => onStart(agent.id)}
              className="hover:bg-stone-200 transition-colors grid place-content-center rounded text-sm size-8 text-green-500"
              title="Start agent"
            >
              <FiPlay />
            </button>
          )}
          <button
            onClick={() => onDelete(agent.id)}
            className="hover:bg-stone-200 transition-colors grid place-content-center rounded text-sm size-8 text-red-500"
            title="Delete agent"
          >
            <FiTrash2 />
          </button>
          <button className="hover:bg-stone-200 transition-colors grid place-content-center rounded text-sm size-8">
            <FiMoreHorizontal />
          </button>
        </div>
      </td>
    </tr>
  );
};

const StatusBadge = ({ status }: { status: AgentStatus }) => {
  let bgColor = "bg-gray-100";
  let textColor = "text-gray-700";

  switch (status) {
    case "Ready":
      bgColor = "bg-blue-100";
      textColor = "text-blue-700";
      break;
    case "Running":
      bgColor = "bg-green-100";
      textColor = "text-green-700";
      break;
    case "Paused":
      bgColor = "bg-amber-100";
      textColor = "text-amber-700";
      break;
    case "Stopped":
      bgColor = "bg-stone-100";
      textColor = "text-stone-700";
      break;
    case "Cancelled":
      bgColor = "bg-orange-100";
      textColor = "text-orange-700";
      break;
    case "Failed":
      bgColor = "bg-red-100";
      textColor = "text-red-700";
      break;
  }

  return (
    <span
      className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${bgColor} ${textColor}`}
    >
      {status}
    </span>
  );
};