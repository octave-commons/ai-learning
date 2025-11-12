import type { EidolonClassificationResult, LearningStats } from './types.js';
export declare class EidolonFieldClassifier {
    private attractors;
    private tasks;
    private embeddingDim;
    private fieldDim;
    private embeddingModel;
    constructor(embeddingDim?: number, fieldDim?: number, embeddingModel?: string);
    private generateHashEmbedding;
    private reduceEmbedding;
    addTask(taskId: string, prompt: string, category?: string, performance?: number): Promise<void>;
    private updateAttractor;
    classifyTask(taskId: string, prompt: string): Promise<EidolonClassificationResult>;
    getFieldStats(): Promise<LearningStats>;
    evolveField(iterations?: number): Promise<void>;
    reset(): Promise<void>;
}
//# sourceMappingURL=eidolon-field-classifier.d.ts.map