# @promethean-os/ai-learning

Intelligent AI model routing and performance learning system for the Promethean Framework.

## 🎯 Overview

The AI Learning System provides intelligent routing of AI tasks to optimal models based on historical performance data, task classification, and configurable routing strategies. It continuously learns from model performance to improve routing decisions over time.

## 🚀 Features

- **Task Classification**: Automatically categorizes tasks into 10 specialized categories
- **Intelligent Routing**: Multiple routing strategies (best-performance, fastest, cheapest, most-reliable, balanced)
- **Performance Tracking**: Comprehensive performance analysis with confidence metrics
- **Continuous Learning**: Adapts routing decisions based on historical performance
- **Model Management**: Dynamic model registration and capability tracking
- **Analytics**: Detailed insights into model utilization and effectiveness

## 📦 Installation

```bash
pnpm add @promethean-os/ai-learning
```

## 🔧 Quick Start

```typescript
import { AILearningSystem, type ModelCapabilities } from '@promethean-os/ai-learning';

// Initialize with available models
const models: Record<string, ModelCapabilities> = {
  'qwen3:8b': {
    maxTokens: 8192,
    supportsStreaming: true,
    supportsJson: true,
    supportsFunctionCalling: false,
    costPerToken: 0.00001,
    speed: 'fast',
    reliability: 0.85,
  },
  'gpt-oss:20b-cloud': {
    maxTokens: 32768,
    supportsStreaming: true,
    supportsJson: true,
    supportsFunctionCalling: true,
    costPerToken: 0.00005,
    speed: 'slow',
    reliability: 0.95,
  },
};

const aiSystem = new AILearningSystem({
  maxCacheSize: 1000,
  defaultStrategy: 'balanced',
});

await aiSystem.initialize(models);

// Route a task to the best model
const routing = await aiSystem.routeTask(
  'Fix this TypeScript error: Property "name" does not exist',
  { context: { jobType: 'generate', taskId: 'task-001' } },
);

console.log(`Selected model: ${routing.selectedModel}`);
console.log(`Confidence: ${routing.confidence}`);
console.log(`Reasoning: ${routing.reasoning}`);

// Record performance feedback
aiSystem.recordPerformance({
  modelName: routing.selectedModel,
  taskCategory: routing.taskCategory,
  score: 0.8,
  scoreSource: 'user-feedback',
  scoreReason: 'Successfully fixed the error',
  timestamp: new Date().toISOString(),
  executionTime: 2500,
  prompt: 'Fix this TypeScript error...',
});
```

## 🎯 Task Categories

The system automatically classifies tasks into these categories:

- `buildfix-ts-errors` - TypeScript error fixing
- `buildfix-general` - General build fixes
- `code-review` - Code review and analysis
- `tdd-analysis` - Test-driven development
- `documentation` - Documentation generation
- `refactoring` - Code refactoring suggestions
- `debugging` - Debugging assistance
- `planning` - Development planning
- `security` - Security analysis
- `general` - General AI tasks

## 🛣️ Routing Strategies

### `best-performance`

Selects the model with the highest historical performance score for the task category.

### `fastest`

Prioritizes response speed over other factors.

### `cheapest`

Selects the most cost-effective model per token.

### `most-reliable`

Chooses the model with the highest reliability score.

### `balanced` (default)

Uses a weighted combination of performance, speed, cost, and reliability.

## 📊 Performance Tracking

The system tracks comprehensive performance metrics:

```typescript
// Get model-specific performance
const performance = aiSystem.getModelPerformance('qwen3:8b', 'buildfix-ts-errors');
console.log(`Average score: ${performance.averageScore}`);
console.log(`Success rate: ${performance.successRate}`);
console.log(`Confidence: ${performance.confidence}`);

// Get system-wide analysis
const analysis = aiSystem.getPerformanceAnalysis();
console.log(`Total entries: ${analysis.totalEntries}`);
console.log(`Recommendations:`, analysis.recommendations);

// Get learning metrics
const metrics = aiSystem.getLearningMetrics();
console.log(`Performance trend: ${metrics.performanceTrend}`);
```

## 🔍 Advanced Usage

### Custom Routing with Context

```typescript
const routing = await aiSystem.routeTask('Review this React component for performance issues', {
  strategy: 'best-performance',
  availableModels: ['qwen3:14b', 'gpt-oss:20b-cloud'],
  context: {
    jobType: 'generate',
    messages: [{ role: 'user', content: 'Please review this component...' }],
    taskId: 'review-001',
  },
});
```

### Batch Performance Recording

```typescript
const scores = [
  {
    modelName: 'qwen3:8b',
    taskCategory: 'buildfix-ts-errors',
    score: 0.8,
    scoreSource: 'user-feedback' as const,
    timestamp: new Date().toISOString(),
    executionTime: 2500,
  },
  // ... more scores
];

aiSystem.recordPerformanceBatch(scores);
```

### System Health Monitoring

```typescript
const health = aiSystem.getSystemHealth();
console.log('System Health:', {
  initialized: health.isInitialized,
  totalModels: health.totalModels,
  totalEntries: health.totalPerformanceEntries,
  averageConfidence: health.averageConfidence,
});
```

### Data Export/Import

```typescript
// Export learning data
const data = aiSystem.exportData();
// Save to file or database...

// Import learning data
aiSystem.importData({
  performanceScores: data.performanceScores,
  modelCapabilities: data.modelCapabilities,
});
```

## 📈 Integration Examples

### With Ollama Queue

```typescript
// In your ollama-queue implementation
const routing = await aiSystem.routeTask(prompt, {
  context: { jobType, messages, taskId },
});

// Submit job with selected model
const jobId = await ollamaQueue.submitJob({
  modelName: routing.selectedModel,
  jobType,
  prompt,
  // ... other options
});

// Record performance when job completes
const result = await ollamaQueue.getJobResult(jobId);
aiSystem.recordPerformance({
  modelName: routing.selectedModel,
  taskCategory: routing.taskCategory,
  score: result.success ? 0.8 : -0.5,
  scoreSource: 'auto-eval',
  timestamp: new Date().toISOString(),
  executionTime: result.executionTime,
});
```

### With BuildFix System

```typescript
// Route BuildFix tasks intelligently
const routing = await aiSystem.routeTask(errorContext, {
  strategy: 'best-performance',
  context: { jobType: 'generate', taskId: errorId },
});

// Use the selected model for fixing
const fixResult = await applyFix(routing.selectedModel, errorContext);

// Record the outcome
a iSystem.recordPerformance({
  modelName: routing.selectedModel,
  taskCategory: 'buildfix-ts-errors',
  score: fixResult.success ? 0.9 : -0.3,
  scoreSource: 'deterministic',
  scoreReason: fixResult.reason,
  timestamp: new Date().toISOString(),
  executionTime: fixResult.executionTime,
});
```

## 🛠️ API Reference

### Classes

#### `AILearningSystem`

Main orchestrator class for AI learning and routing.

**Methods:**

- `initialize(models)` - Initialize with available models
- `routeTask(prompt, options?)` - Route task to optimal model
- `recordPerformance(score)` - Record single performance score
- `recordPerformanceBatch(scores)` - Record multiple scores
- `getModelPerformance(modelName, category?)` - Get model performance
- `queryPerformance(query)` - Query performance data
- `getPerformanceAnalysis()` - Get comprehensive analysis
- `getLearningMetrics()` - Get learning metrics
- `getRoutingStatistics()` - Get routing statistics
- `getSystemHealth()` - Get system health status
- `exportData()` - Export learning data
- `importData(data)` - Import learning data

#### `TaskClassifier`

Static methods for task classification.

**Methods:**

- `classifyTask(prompt, context?)` - Classify task into category
- `getAllCategories()` - Get all available categories
- `getClassificationScores(prompt, context?)` - Get classification scores

#### `PerformanceTracker`

Tracks and analyzes model performance.

**Methods:**

- `recordScore(score)` - Record performance score
- `getScores(query)` - Get filtered scores
- `getModelPerformance(modelName, category?)` - Get model analysis
- `getPerformanceAnalysis()` - Get comprehensive analysis

#### `ModelRouter`

Intelligent model routing logic.

**Methods:**

- `selectBestModel(prompt, options?)` - Select optimal model
- `registerModel(name, capabilities)` - Register model
- `getRoutingStatistics()` - Get routing stats

### Types

#### `ModelCapabilities`

```typescript
type ModelCapabilities = {
  maxTokens: number;
  supportsStreaming: boolean;
  supportsJson: boolean;
  supportsFunctionCalling: boolean;
  costPerToken: number;
  speed: 'fast' | 'medium' | 'slow';
  reliability: number; // 0 to 1
};
```

#### `AIPerformanceScore`

```typescript
type AIPerformanceScore = {
  score: number; // -1 to 1
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
```

#### `AIRoutingDecision`

```typescript
type AIRoutingDecision = {
  taskId?: string;
  prompt: string;
  taskCategory: TaskCategory;
  selectedModel: string;
  alternativeModels: string[];
  confidence: number; // 0 to 1
  reasoning: string;
  timestamp: string;
  expectedPerformance: number;
  riskLevel: 'low' | 'medium' | 'high';
};
```

## 🧪 Testing

Run the example to see the system in action:

```bash
pnpm tsx packages/ai-learning/example.ts
```

## 📚 Documentation

- **[Vector Compression Research](./docs/vector-compression-research.md)** - Comprehensive analysis of cutting-edge vector compression solutions for improving Eidolon field integration performance
- **[Eidolon Field Integration Status](./EIDOLON_FIELD_INTEGRATION_STATUS.md)** - Current status and implementation details for Eidolon field classification

## 🤝 Contributing

This package is part of the Promethean Framework. Please follow the contribution guidelines in the main repository.

## 📄 License

MIT License - see LICENSE file in the main repository.

## Promethean Packages (Remote READMEs)

- Back to [riatzukiza/promethean](https://github.com/riatzukiza/promethean#readme)

<!-- BEGIN: PROMETHEAN-PACKAGES-READMES -->
- [riatzukiza/agent-os-protocol](https://github.com/riatzukiza/agent-os-protocol#readme)
- [riatzukiza/ai-learning](https://github.com/riatzukiza/ai-learning#readme)
- [riatzukiza/apply-patch](https://github.com/riatzukiza/apply-patch#readme)
- [riatzukiza/auth-service](https://github.com/riatzukiza/auth-service#readme)
- [riatzukiza/autocommit](https://github.com/riatzukiza/autocommit#readme)
- [riatzukiza/build-monitoring](https://github.com/riatzukiza/build-monitoring#readme)
- [riatzukiza/cli](https://github.com/riatzukiza/cli#readme)
- [riatzukiza/clj-hacks-tools](https://github.com/riatzukiza/clj-hacks-tools#readme)
- [riatzukiza/compliance-monitor](https://github.com/riatzukiza/compliance-monitor#readme)
- [riatzukiza/dlq](https://github.com/riatzukiza/dlq#readme)
- [riatzukiza/ds](https://github.com/riatzukiza/ds#readme)
- [riatzukiza/eidolon-field](https://github.com/riatzukiza/eidolon-field#readme)
- [riatzukiza/enso-agent-communication](https://github.com/riatzukiza/enso-agent-communication#readme)
- [riatzukiza/http](https://github.com/riatzukiza/http#readme)
- [riatzukiza/kanban](https://github.com/riatzukiza/kanban#readme)
- [riatzukiza/logger](https://github.com/riatzukiza/logger#readme)
- [riatzukiza/math-utils](https://github.com/riatzukiza/math-utils#readme)
- [riatzukiza/mcp](https://github.com/riatzukiza/mcp#readme)
- [riatzukiza/mcp-dev-ui-frontend](https://github.com/riatzukiza/mcp-dev-ui-frontend#readme)
- [riatzukiza/migrations](https://github.com/riatzukiza/migrations#readme)
- [riatzukiza/naming](https://github.com/riatzukiza/naming#readme)
- [riatzukiza/obsidian-export](https://github.com/riatzukiza/obsidian-export#readme)
- [riatzukiza/omni-tools](https://github.com/riatzukiza/omni-tools#readme)
- [riatzukiza/opencode-hub](https://github.com/riatzukiza/opencode-hub#readme)
- [riatzukiza/persistence](https://github.com/riatzukiza/persistence#readme)
- [riatzukiza/platform](https://github.com/riatzukiza/platform#readme)
- [riatzukiza/plugin-hooks](https://github.com/riatzukiza/plugin-hooks#readme)
- [riatzukiza/report-forge](https://github.com/riatzukiza/report-forge#readme)
- [riatzukiza/security](https://github.com/riatzukiza/security#readme)
- [riatzukiza/shadow-conf](https://github.com/riatzukiza/shadow-conf#readme)
- [riatzukiza/snapshots](https://github.com/riatzukiza/snapshots#readme)
- [riatzukiza/test-classifier](https://github.com/riatzukiza/test-classifier#readme)
- [riatzukiza/test-utils](https://github.com/riatzukiza/test-utils#readme)
- [riatzukiza/utils](https://github.com/riatzukiza/utils#readme)
- [riatzukiza/worker](https://github.com/riatzukiza/worker#readme)
<!-- END: PROMETHEAN-PACKAGES-READMES -->

<!-- READMEFLOW:BEGIN -->
# @promethean-os/ai-learning

AI learning system for intelligent model routing and performance tracking

[TOC]


## Install

```bash
pnpm -w add -D @promethean-os/ai-learning
```

## Quickstart

```ts
// usage example
```

## Commands

- `build`
- `test`
- `clean`
- `dev`
- `lint`
- `typecheck`


### Package graph

### Pantheon dependency graph
See [Pantheon Graph Pattern](../pantheon/docs/graph-pattern.md) for the maintained dependency view.



## Promethean Packages (Remote READMEs)

- Back to [riatzukiza/promethean](https://github.com/riatzukiza/promethean#readme)

<!-- BEGIN: PROMETHEAN-PACKAGES-READMES -->
- [riatzukiza/agent-os-protocol](https://github.com/riatzukiza/agent-os-protocol#readme)
- [riatzukiza/ai-learning](https://github.com/riatzukiza/ai-learning#readme)
- [riatzukiza/apply-patch](https://github.com/riatzukiza/apply-patch#readme)
- [riatzukiza/auth-service](https://github.com/riatzukiza/auth-service#readme)
- [riatzukiza/autocommit](https://github.com/riatzukiza/autocommit#readme)
- [riatzukiza/build-monitoring](https://github.com/riatzukiza/build-monitoring#readme)
- [riatzukiza/cli](https://github.com/riatzukiza/cli#readme)
- [riatzukiza/clj-hacks-tools](https://github.com/riatzukiza/clj-hacks-tools#readme)
- [riatzukiza/compliance-monitor](https://github.com/riatzukiza/compliance-monitor#readme)
- [riatzukiza/dlq](https://github.com/riatzukiza/dlq#readme)
- [riatzukiza/ds](https://github.com/riatzukiza/ds#readme)
- [riatzukiza/eidolon-field](https://github.com/riatzukiza/eidolon-field#readme)
- [riatzukiza/enso-agent-communication](https://github.com/riatzukiza/enso-agent-communication#readme)
- [riatzukiza/http](https://github.com/riatzukiza/http#readme)
- [riatzukiza/kanban](https://github.com/riatzukiza/kanban#readme)
- [riatzukiza/logger](https://github.com/riatzukiza/logger#readme)
- [riatzukiza/math-utils](https://github.com/riatzukiza/math-utils#readme)
- [riatzukiza/mcp](https://github.com/riatzukiza/mcp#readme)
- [riatzukiza/mcp-dev-ui-frontend](https://github.com/riatzukiza/mcp-dev-ui-frontend#readme)
- [riatzukiza/migrations](https://github.com/riatzukiza/migrations#readme)
- [riatzukiza/naming](https://github.com/riatzukiza/naming#readme)
- [riatzukiza/obsidian-export](https://github.com/riatzukiza/obsidian-export#readme)
- [riatzukiza/omni-tools](https://github.com/riatzukiza/omni-tools#readme)
- [riatzukiza/opencode-hub](https://github.com/riatzukiza/opencode-hub#readme)
- [riatzukiza/persistence](https://github.com/riatzukiza/persistence#readme)
- [riatzukiza/platform](https://github.com/riatzukiza/platform#readme)
- [riatzukiza/plugin-hooks](https://github.com/riatzukiza/plugin-hooks#readme)
- [riatzukiza/report-forge](https://github.com/riatzukiza/report-forge#readme)
- [riatzukiza/security](https://github.com/riatzukiza/security#readme)
- [riatzukiza/shadow-conf](https://github.com/riatzukiza/shadow-conf#readme)
- [riatzukiza/snapshots](https://github.com/riatzukiza/snapshots#readme)
- [riatzukiza/test-classifier](https://github.com/riatzukiza/test-classifier#readme)
- [riatzukiza/test-utils](https://github.com/riatzukiza/test-utils#readme)
- [riatzukiza/utils](https://github.com/riatzukiza/utils#readme)
- [riatzukiza/worker](https://github.com/riatzukiza/worker#readme)
<!-- END: PROMETHEAN-PACKAGES-READMES -->


<!-- READMEFLOW:END -->

<!-- PACKAGE-DOC-MATRIX:START -->

> This section is auto-generated by scripts/package-doc-matrix.ts. Do not edit manually.

## Internal Dependencies

- [@promethean-os/eidolon-field](../eidolon-field/README.md) — `orgs/riatzukiza/promethean/packages/eidolon-field`
- [@promethean-os/utils](../utils/README.md) — `orgs/riatzukiza/promethean/packages/utils`

## Internal Dependents

_None (external-only)._

_Last updated: 2025-11-16T11:25:38.889Z_

<!-- PACKAGE-DOC-MATRIX:END -->
