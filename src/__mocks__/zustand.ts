// src/__mocks__/zustand.ts

type State = Record<string, unknown>;
type PartialState<T extends State> = Partial<T> | ((state: T) => Partial<T>);

const mockStore = <T extends State>(initialState: T) => {
  let state = initialState;
  const listeners = new Set<() => void>();

  const setState = (partial: PartialState<T>) => {
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

export const create = <T extends State>(createState: () => T) => {
  const store = mockStore(createState());
  return () => store;
};