import path from 'node:path';
import { fileURLToPath } from 'node:url';
import baseConfig from '../../config/ava.config.base.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const workspaceRoot = path.resolve(__dirname, '../..');
const mockPolyfill = path.join(workspaceRoot, 'config', 'ava-mock-polyfill.cjs');

export default {
  ...baseConfig,
  files: ['src/**/*.test.ts'],
  extensions: ['ts'],
  require: [mockPolyfill],
  nodeArguments: ['--enable-source-maps', '--loader=ts-node/esm'],
};
