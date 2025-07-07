// jest.setup.ts
import '@testing-library/jest-dom';
import { jest } from '@jest/globals';

// Simple Zustand mock that works for most cases
jest.mock('zustand', () => {
  const createMock = jest.fn(() => {
    return (callback: any) => {
      const state = callback();
      return {
        ...state,
        setState: jest.fn((partial) => {
          Object.assign(state, partial);
        }),
      };
    };
  });

  return {
    __esModule: true,
    default: createMock,
    create: createMock,
  };
});