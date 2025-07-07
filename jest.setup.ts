// jest.setup.js
import '@testing-library/jest-dom';
import { jest } from '@jest/globals';

// Reset all mocks between tests
beforeEach(() => {
  jest.clearAllMocks();
});