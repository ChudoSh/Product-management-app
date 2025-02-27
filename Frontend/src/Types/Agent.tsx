// src/types/agent.ts
export type AgentStatus =
    | 'Ready'
    | 'Running'
    | 'Paused'
    | 'Stopped'
    | 'Cancelled'
    | 'Failed';

export interface Agent {
    id: string;
    status: AgentStatus;
}
