"use client";

import React, { useState } from "react";
import { FiX } from "react-icons/fi";
import agentService from "../../services/productService";
import { Agent } from "../../Types/Agent";
import axios, { AxiosError } from 'axios';

interface AgentCreateDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAgentCreated: (agent: Agent) => void;
}

export const AgentCreateDialog = ({
  isOpen,
  onClose,
  onAgentCreated,
}: AgentCreateDialogProps) => {
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCreateAgent = async () => {
    try {
      setIsCreating(true);
      setError(null);
      
      const response = await agentService.create();
      console.log('Agent creation response:', response);
      
      // The response.data should contain the agent details
      if (response && response.data && response.data.id) {
        onAgentCreated(response.data);
        onClose();
      } else {
        setError("Invalid response format from server");
      }
    } catch (err: unknown) {
      console.error("Failed to create agent:", err);
      
      let errorMessage = "Failed to create agent. Please try again.";
      
      if (axios.isAxiosError(err)) {
        if (err.response) {
          errorMessage = `Server error: ${err.response.status} - ${err.response.statusText}`;
          console.error('Response data:', err.response.data);
        } else if (err.request) {
          errorMessage = "No response received. Check server connection.";
        }
      }
      
      setError(errorMessage);
    } finally {
      setIsCreating(false);
    }
  };
  

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-stone-950/50 flex items-center justify-center z-50">
      <div 
        className="bg-white rounded-lg shadow-xl border-stone-300 border overflow-hidden w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Dialog content */}
        <div className="flex items-center justify-between border-b border-stone-200 p-4">
          <h2 className="text-lg font-medium">Create New Agent</h2>
          <button 
            onClick={onClose}
            className="text-stone-500 hover:text-stone-700"
          >
            <FiX />
          </button>
        </div>
        
        <div className="p-4">
          <p className="text-sm text-stone-600 mb-4">
            This will create a new trading agent with default configuration. 
            You can customize the agent after creation.
          </p>
          
          {error && (
            <div className="mb-4 p-2 bg-red-100 text-red-700 text-sm rounded">
              {error}
            </div>
          )}
          
          <div className="flex justify-end gap-2 mt-6">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm text-stone-600 border border-stone-300 rounded hover:bg-stone-100"
              disabled={isCreating}
            >
              Cancel
            </button>
            <button
              onClick={handleCreateAgent}
              disabled={isCreating}
              className="px-4 py-2 text-sm text-white bg-violet-600 rounded hover:bg-violet-700 disabled:opacity-70"
            >
              {isCreating ? "Creating..." : "Create Agent"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};