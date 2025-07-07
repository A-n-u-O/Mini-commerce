// src/__mocks__/zustand.ts
const mockStore = (initialState: any) => {
  let state = initialState;
  const listeners = new Set<() => void>();

  const setState = (partial: any) => {
    const nextState = typeof partial === 'function' ? partial(state) : partial;
    state = { ...state, ...nextState };
    listeners.forEach((listener) => listener());
  };

  const getState = () => state;

  const subscribe = (listener: () => void) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };

  return { setState, getState, subscribe };
};

export const create = (createState: any) => {
  const store = mockStore(createState());
  return () => store;
};