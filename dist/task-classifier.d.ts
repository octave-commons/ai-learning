import type { TaskCategory } from './types.js';
/**
 * Task Classifier - Categorizes AI tasks for routing and performance tracking
 */
export declare class TaskClassifier {
    private static readonly KEYWORD_PATTERNS;
    /**
     * Classify a task based on its prompt/content
     */
    static classifyTask(prompt: string, context?: {
        jobType?: 'generate' | 'chat' | 'embedding';
        messages?: Array<{
            role: string;
            content: string;
        }>;
    }): TaskCategory;
    /**
     * Get confidence scores for all categories
     */
    static getClassificationScores(prompt: string, context?: {
        jobType?: 'generate' | 'chat' | 'embedding';
        messages?: Array<{
            role: string;
            content: string;
        }>;
    }): Record<TaskCategory, number>;
    /**
     * Extract text from prompt or messages
     */
    private static extractText;
    /**
     * Calculate scores for each category based on keyword matching
     */
    private static calculateCategoryScores;
    /**
     * Apply category-specific weighting logic
     */
    private static applyCategoryWeighting;
    /**
     * Get all available task categories
     */
    static getAllCategories(): TaskCategory[];
    /**
     * Get keywords for a specific category
     */
    static getCategoryKeywords(category: TaskCategory): string[];
    /**
     * Add custom keywords to a category (for runtime customization)
     */
    static addKeywords(category: TaskCategory, keywords: string[]): void;
}
//# sourceMappingURL=task-classifier.d.ts.map