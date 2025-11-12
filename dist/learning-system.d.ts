import type { AIPerformanceScore, AIModelPerformance, AIRoutingDecision, PerformanceQuery, PerformanceAnalysis, LearningMetrics, TaskCategory, ModelCapabilities, RoutingStrategy } from './types.js';
/**
 * AI Learning System - Main orchestrator for intelligent AI model management
 */
export declare class AILearningSystem {
    private performanceTracker;
    private modelRouter;
    private isInitialized;
    constructor(options?: {
        maxCacheSize?: number;
        defaultStrategy?: RoutingStrategy;
    });
    /**
     * Initialize the learning system with available models
     */
    initialize(models: Record<string, ModelCapabilities>): Promise<void>;
    /**
     * Route a task to the best model
     */
    routeTask(prompt: string, options?: {
        availableModels?: string[];
        strategy?: RoutingStrategy;
        context?: {
            jobType?: 'generate' | 'chat' | 'embedding';
            messages?: Array<{
                role: string;
                content: string;
            }>;
            taskId?: string;
        };
    }): Promise<AIRoutingDecision>;
    /**
     * Record performance feedback for a completed task
     */
    recordPerformance(score: AIPerformanceScore): void;
    /**
     * Record multiple performance scores
     */
    recordPerformanceBatch(scores: AIPerformanceScore[]): void;
    /**
     * Get performance data for a specific model and category
     */
    getModelPerformance(modelName: string, taskCategory?: TaskCategory): AIModelPerformance | null;
    /**
     * Query performance data with filters
     */
    queryPerformance(query: PerformanceQuery): AIPerformanceScore[];
    /**
     * Get comprehensive performance analysis
     */
    getPerformanceAnalysis(): PerformanceAnalysis;
    /**
     * Get overall learning metrics
     */
    getLearningMetrics(): LearningMetrics;
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
     * Record feedback on a routing decision
     */
    recordRoutingFeedback(decisionId: string, actualScore: number): void;
    /**
     * Update routing strategy
     */
    setRoutingStrategy(strategy: RoutingStrategy): void;
    /**
     * Register a new model
     */
    registerModel(modelName: string, capabilities: ModelCapabilities): void;
    /**
     * Get available models
     */
    getAvailableModels(): string[];
    /**
     * Get model capabilities
     */
    getModelCapabilities(modelName: string): ModelCapabilities | null;
    /**
     * Classify a task
     */
    classifyTask(prompt: string, context?: {
        jobType?: 'generate' | 'chat' | 'embedding';
        messages?: Array<{
            role: string;
            content: string;
        }>;
        taskId?: string;
    }): TaskCategory;
    /**
     * Get task category information
     */
    getTaskCategories(): TaskCategory[];
    /**
     * Clear all learning data
     */
    clearAllData(): void;
    /**
     * Export learning data for backup or analysis
     */
    exportData(): {
        performanceScores: AIPerformanceScore[];
        routingHistory: AIRoutingDecision[];
        modelCapabilities: Record<string, ModelCapabilities>;
    };
    /**
     * Import learning data from backup
     */
    importData(data: {
        performanceScores?: AIPerformanceScore[];
        routingHistory?: AIRoutingDecision[];
        modelCapabilities?: Record<string, ModelCapabilities>;
    }): void;
    /**
     * Get system health and status
     */
    getSystemHealth(): {
        isInitialized: boolean;
        totalModels: number;
        totalPerformanceEntries: number;
        totalRoutings: number;
        averageConfidence: number;
        lastActivity: string | null;
    };
    /**
     * Generate recommendations for system optimization
     */
    generateRecommendations(): string[];
}
//# sourceMappingURL=learning-system.d.ts.map