import test from 'ava';
import { AILearningSystem } from './learning-system.js';
import type { AIPerformanceScore, ModelCapabilities, TaskCategory } from './types.js';

const mockModels: Record<string, ModelCapabilities> = {
  'model-alpha': {
    maxTokens: 4096,
    supportsStreaming: true,
    supportsJson: true,
    supportsFunctionCalling: false,
    costPerToken: 0.0005,
    speed: 'medium',
    reliability: 0.7,
  },
  'model-beta': {
    maxTokens: 8192,
    supportsStreaming: true,
    supportsJson: true,
    supportsFunctionCalling: true,
    costPerToken: 0.0004,
    speed: 'fast',
    reliability: 0.9,
  },
};

const baseTimestamp = Date.parse('2024-01-01T00:00:00.000Z');

const makeScore = (
  modelName: string,
  taskCategory: TaskCategory,
  score: number,
  offsetMs: number = 0,
): AIPerformanceScore => ({
  score,
  scoreSource: 'auto-eval',
  taskCategory,
  executionTime: 150,
  tokensUsed: 256,
  modelName,
  timestamp: new Date(baseTimestamp + offsetMs).toISOString(),
  prompt: `${taskCategory}-${modelName}`,
  result: { ok: true },
});

test('routes buildfix tasks to the highest performing model', async (t) => {
  const system = new AILearningSystem({ defaultStrategy: 'best-performance' });
  await system.initialize(mockModels);

  system.recordPerformance(makeScore('model-alpha', 'buildfix-ts-errors', 0.2));
  system.recordPerformance(makeScore('model-beta', 'buildfix-ts-errors', 0.85, 1_000));

  const decision = await system.routeTask('TS2304: Cannot find name runtime', {
    context: { taskId: 'job-123' },
  });

  t.is(decision.selectedModel, 'model-beta');
  t.is(decision.taskCategory, 'buildfix-ts-errors');
  t.true(decision.confidence > 0);

  const routingStats = system.getRoutingStatistics();
  t.is(routingStats.totalRoutings, 1);
  t.is(routingStats.modelUsage['model-beta'], 1);
});

test('learning metrics and recommendations reflect recorded performance', async (t) => {
  const system = new AILearningSystem();
  await system.initialize(mockModels);

  system.recordPerformanceBatch([
    makeScore('model-alpha', 'coding', -0.4),
    makeScore('model-beta', 'coding', 0.9, 2_000),
  ]);

  const metrics = system.getLearningMetrics();
  t.is(metrics.totalJobs, 2);
  t.is(metrics.successfulJobs, 1);
  t.is(metrics.failedJobs, 1);

  const performance = system.getModelPerformance('model-beta', 'coding');
  t.truthy(performance);
  t.true((performance?.averageScore ?? 0) > 0.7);

  const analysis = system.getPerformanceAnalysis();
  t.is(analysis.totalEntries, 2);

  const recommendations = system.generateRecommendations();
  t.true(recommendations.some((item) => item.includes('model-alpha')));
});
