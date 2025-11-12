export type TaskCategory = 'buildfix-ts-errors' | 'buildfix-general' | 'code-review' | 'tdd-analysis' | 'documentation' | 'coding' | 'testing' | 'refactoring' | 'debugging' | 'general';
export type AIPerformanceScore = {
    score: number;
    scoreSource: 'deterministic' | 'user-feedback' | 'auto-eval';
    scoreReason?: string;
    taskCategory: TaskCategory;
    executionTime?: number;
    tokensUsed?: number;
    modelName: string;
    timestamp: string;
    prompt?: string;
    result?: any;
};
export type AIModelPerformance = {
    modelName: string;
    taskCategory: TaskCategory;
    averageScore: number;
    totalJobs: number;
    successRate: number;
    averageExecutionTime: number;
    lastUpdated: string;
    recentScores: number[];
    confidence: number;
    capabilities: ModelCapabilities;
};
export type ModelCapabilities = {
    maxTokens: number;
    supportsStreaming: boolean;
    supportsJson: boolean;
    supportsFunctionCalling: boolean;
    costPerToken: number;
    speed: 'fast' | 'medium' | 'slow';
    reliability: number;
};
export type AIRoutingDecision = {
    taskId?: string;
    prompt: string;
    taskCategory: TaskCategory;
    selectedModel: string;
    alternativeModels: string[];
    confidence: number;
    reasoning: string;
    timestamp: string;
    expectedPerformance: number;
    riskLevel: 'low' | 'medium' | 'high';
};
export type RoutingStrategy = 'best-performance' | 'fastest' | 'cheapest' | 'most-reliable' | 'balanced';
export type LearningConfig = {
    cacheSize: number;
    similarityThreshold: number;
    maxAgeHours: number;
    minSamplesForRouting: number;
    defaultStrategy: RoutingStrategy;
    enableAutoScoring: boolean;
    enableUserFeedback: boolean;
};
export type PerformanceQuery = {
    taskCategory?: TaskCategory;
    modelName?: string;
    timeRange?: {
        start: string;
        end: string;
    };
    minScore?: number;
    limit?: number;
};
export type PerformanceAnalysis = {
    totalEntries: number;
    models: Record<string, {
        entries: number;
        averageScore: number;
        taskDistribution: Record<TaskCategory, number>;
    }>;
    taskCategories: Record<TaskCategory, {
        totalScore: number;
        count: number;
        averageScore: number;
        bestModel: string;
        modelPerformance: Record<string, {
            averageScore: number;
            count: number;
            confidence: number;
        }>;
    }>;
    recommendations: string[];
    trends: {
        improving: string[];
        declining: string[];
        stable: string[];
    };
};
export type CacheEntry = {
    id: string;
    prompt: string;
    response: any;
    modelName: string;
    jobType: 'generate' | 'chat' | 'embedding';
    createdAt: number;
    embedding?: number[];
    performance?: AIPerformanceScore;
};
export type LearningMetrics = {
    totalJobs: number;
    successfulJobs: number;
    failedJobs: number;
    averageScore: number;
    cacheHitRate: number;
    routingAccuracy: number;
    modelUtilization: Record<string, number>;
    categoryDistribution: Record<TaskCategory, number>;
    performanceTrend: 'improving' | 'stable' | 'declining';
};
export interface TaskEmbedding {
    taskId: string;
    prompt: string;
    embedding: number[];
    category?: string;
    timestamp: number;
    performance?: number;
}
export interface ClusterAttractor {
    id: string;
    center: any;
    strength: number;
    category: string;
    taskCount: number;
    averagePerformance: number;
}
export interface EidolonClassificationResult {
    taskId: string;
    prompt: string;
    embedding: number[];
    predictedCategory: string;
    confidence: number;
    nearestAttractor?: ClusterAttractor;
    distanceToCenter: number;
    clusterMembership: number[];
    reasoning: string;
}
export interface LearningStats {
    totalTasks: number;
    attractorCount: number;
    fieldGridSize: number;
    averageFieldStrength: number;
    attractors: ClusterAttractor[];
}
//# sourceMappingURL=types.d.ts.map