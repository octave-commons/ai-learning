import { PerformanceTracker } from './performance-tracker.js';
import { ModelRouter } from './model-router.js';
import { TaskClassifier } from './task-classifier.js';
/**
 * AI Learning System - Main orchestrator for intelligent AI model management
 */
export class AILearningSystem {
    performanceTracker;
    modelRouter;
    isInitialized = false;
    constructor(options) {
        this.performanceTracker = new PerformanceTracker(options?.maxCacheSize);
        this.modelRouter = new ModelRouter(this.performanceTracker, options?.defaultStrategy || 'balanced');
    }
    /**
     * Initialize the learning system with available models
     */
    async initialize(models) {
        // Register all available models
        for (const [modelName, capabilities] of Object.entries(models)) {
            this.modelRouter.registerModel(modelName, capabilities);
        }
        this.isInitialized = true;
    }
    /**
     * Route a task to the best model
     */
    async routeTask(prompt, options) {
        if (!this.isInitialized) {
            throw new Error('AILearningSystem must be initialized before routing tasks');
        }
        return this.modelRouter.selectBestModel(prompt, options?.availableModels, options?.strategy, options?.context);
    }
    /**
     * Record performance feedback for a completed task
     */
    recordPerformance(score) {
        this.performanceTracker.recordScore(score);
    }
    /**
     * Record multiple performance scores
     */
    recordPerformanceBatch(scores) {
        this.performanceTracker.recordScores(scores);
    }
    /**
     * Get performance data for a specific model and category
     */
    getModelPerformance(modelName, taskCategory) {
        return this.performanceTracker.getModelPerformance(modelName, taskCategory);
    }
    /**
     * Query performance data with filters
     */
    queryPerformance(query) {
        return this.performanceTracker.getScores(query);
    }
    /**
     * Get comprehensive performance analysis
     */
    getPerformanceAnalysis() {
        return this.performanceTracker.getPerformanceAnalysis();
    }
    /**
     * Get overall learning metrics
     */
    getLearningMetrics() {
        return this.performanceTracker.getLearningMetrics();
    }
    /**
     * Get routing statistics
     */
    getRoutingStatistics() {
        return this.modelRouter.getRoutingStatistics();
    }
    /**
     * Get recent routing decisions
     */
    getRecentRoutings(limit) {
        return this.modelRouter.getRecentRoutings(limit);
    }
    /**
     * Record feedback on a routing decision
     */
    recordRoutingFeedback(decisionId, actualScore) {
        this.modelRouter.recordRoutingFeedback(decisionId, actualScore);
    }
    /**
     * Update routing strategy
     */
    setRoutingStrategy(strategy) {
        this.modelRouter.setRoutingStrategy(strategy);
    }
    /**
     * Register a new model
     */
    registerModel(modelName, capabilities) {
        this.modelRouter.registerModel(modelName, capabilities);
    }
    /**
     * Get available models
     */
    getAvailableModels() {
        return this.modelRouter.getAvailableModels();
    }
    /**
     * Get model capabilities
     */
    getModelCapabilities(modelName) {
        return this.modelRouter.getModelCapabilities(modelName);
    }
    /**
     * Classify a task
     */
    classifyTask(prompt, context) {
        return TaskClassifier.classifyTask(prompt, context);
    }
    /**
     * Get task category information
     */
    getTaskCategories() {
        return TaskClassifier.getAllCategories();
    }
    /**
     * Clear all learning data
     */
    clearAllData() {
        this.performanceTracker.clearData();
        this.modelRouter.clearHistory();
    }
    /**
     * Export learning data for backup or analysis
     */
    exportData() {
        return {
            performanceScores: this.performanceTracker.getScores({}),
            routingHistory: this.modelRouter.getRecentRoutings(10000),
            modelCapabilities: Object.fromEntries(this.modelRouter.getAvailableModels().map((name) => {
                const capabilities = this.modelRouter.getModelCapabilities(name);
                return capabilities ? [name, capabilities] : [name, {}];
            })),
        };
    }
    /**
     * Import learning data from backup
     */
    importData(data) {
        if (data.performanceScores) {
            this.performanceTracker.recordScores(data.performanceScores);
        }
        if (data.modelCapabilities) {
            for (const [modelName, capabilities] of Object.entries(data.modelCapabilities)) {
                if (capabilities) {
                    this.modelRouter.registerModel(modelName, capabilities);
                }
            }
        }
        // Note: Routing history is not imported as it's primarily for learning
        // and would be regenerated from new routing decisions
    }
    /**
     * Get system health and status
     */
    getSystemHealth() {
        const metrics = this.getLearningMetrics();
        const routingStats = this.getRoutingStatistics();
        const recentScores = this.performanceTracker.getScores({ limit: 1 });
        return {
            isInitialized: this.isInitialized,
            totalModels: this.getAvailableModels().length,
            totalPerformanceEntries: metrics.totalJobs,
            totalRoutings: routingStats.totalRoutings,
            averageConfidence: routingStats.averageConfidence,
            lastActivity: recentScores.length > 0 ? recentScores[0]?.timestamp || null : null,
        };
    }
    /**
     * Generate recommendations for system optimization
     */
    generateRecommendations() {
        const analysis = this.getPerformanceAnalysis();
        const recommendations = [];
        // Add performance-based recommendations
        recommendations.push(...analysis.recommendations);
        // Add routing-specific recommendations
        const routingStats = this.getRoutingStatistics();
        if (routingStats.averageConfidence < 0.5) {
            recommendations.push('Low routing confidence detected - consider gathering more performance data');
        }
        // Add model utilization recommendations
        const metrics = this.getLearningMetrics();
        const totalModels = this.getAvailableModels().length;
        const activeModels = Object.keys(metrics.modelUtilization).length;
        if (activeModels < totalModels * 0.5) {
            recommendations.push('Many models are underutilized - consider specializing models for specific task categories');
        }
        return recommendations;
    }
}
//# sourceMappingURL=learning-system.js.map