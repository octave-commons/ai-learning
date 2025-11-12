import type { AIRoutingDecision, RoutingStrategy, TaskCategory, ModelCapabilities } from './types.js';
import { PerformanceTracker } from './performance-tracker.js';
/**
 * Model Router - Intelligent routing of AI tasks to optimal models
 */
export declare class ModelRouter {
    private performanceTracker;
    private availableModels;
    private routingHistory;
    private defaultStrategy;
    constructor(performanceTracker: PerformanceTracker, defaultStrategy?: RoutingStrategy);
    /**
     * Register an available model with its capabilities
     */
    registerModel(modelName: string, capabilities: ModelCapabilities): void;
    /**
     * Get the best model for a given task
     */
    selectBestModel(prompt: string, availableModels?: string[], strategy?: RoutingStrategy, context?: {
        jobType?: 'generate' | 'chat' | 'embedding';
        messages?: Array<{
            role: string;
            content: string;
        }>;
        taskId?: string;
    }): Promise<AIRoutingDecision>;
    /**
     * Record feedback on a routing decision
     */
    recordRoutingFeedback(decisionId: string, actualScore: number): void;
    /**
     * Get routing statistics
     */
    getRoutingStatistics(): {
        totalRoutings: number;
        modelUsage: Record<string, number>;
        categoryDistribution: Record<TaskCategory, number>;
        averageConfidence: number;
        strategy: RoutingStrategy;
    };
    /**
     * Get recent routing decisions
     */
    getRecentRoutings(limit?: number): AIRoutingDecision[];
    /**
     * Update routing strategy
     */
    setRoutingStrategy(strategy: RoutingStrategy): void;
    /**
     * Get available models
     */
    getAvailableModels(): string[];
    /**
     * Get model capabilities
     */
    getModelCapabilities(modelName: string): ModelCapabilities | null;
    /**
     * Select model based on routing strategy
     */
    private selectModelByStrategy;
    /**
     * Calculate balanced score for model selection
     */
    private calculateBalancedScore;
    /**
     * Calculate routing confidence
     */
    private calculateRoutingConfidence;
    /**
     * Generate reasoning for routing decision
     */
    private generateReasoning;
    /**
     * Assess risk level of routing decision
     */
    private assessRiskLevel;
    /**
     * Clear routing history
     */
    clearHistory(): void;
}
//# sourceMappingURL=model-router.d.ts.map