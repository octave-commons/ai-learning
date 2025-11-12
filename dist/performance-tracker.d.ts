import type { AIPerformanceScore, AIModelPerformance, PerformanceQuery, PerformanceAnalysis, LearningMetrics, TaskCategory, ModelCapabilities } from './types.js';
/**
 * Performance Tracker - Tracks and analyzes AI model performance
 */
export declare class PerformanceTracker {
    private scores;
    private modelCapabilities;
    private maxCacheSize;
    constructor(maxCacheSize?: number);
    /**
     * Record a performance score
     */
    recordScore(score: AIPerformanceScore): void;
    /**
     * Record multiple scores at once
     */
    recordScores(scores: AIPerformanceScore[]): void;
    /**
     * Get performance scores for a specific query
     */
    getScores(query: PerformanceQuery): AIPerformanceScore[];
    /**
     * Get model performance analysis
     */
    getModelPerformance(modelName: string, taskCategory?: TaskCategory): AIModelPerformance | null;
    /**
     * Get comprehensive performance analysis
     */
    getPerformanceAnalysis(): PerformanceAnalysis;
    /**
     * Get overall learning metrics
     */
    getLearningMetrics(): LearningMetrics;
    /**
     * Set model capabilities
     */
    setModelCapabilities(modelName: string, capabilities: ModelCapabilities): void;
    /**
     * Get model capabilities
     */
    getModelCapabilities(modelName: string): ModelCapabilities | null;
    /**
     * Clear all performance data
     */
    clearData(): void;
    /**
     * Get recent scores for a model
     */
    getRecentScores(modelName: string, count?: number): AIPerformanceScore[];
    /**
     * Calculate confidence based on sample size and consistency
     */
    private calculateConfidence;
    /**
     * Get default capabilities for unknown models
     */
    private getDefaultCapabilities;
    /**
     * Generate recommendations based on analysis
     */
    private generateRecommendations;
    /**
     * Analyze performance trends
     */
    private analyzeTrends;
    /**
     * Calculate overall performance trend
     */
    private calculatePerformanceTrend;
}
//# sourceMappingURL=performance-tracker.d.ts.map