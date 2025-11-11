import { create } from "zustand";

interface CounterState {
  count: number;
  inc: () => void;
  setCount: (n: number) => void;
}

const useCounter = create<CounterState>((set) => ({
  count: 0,
  inc: () => set((s) => ({ count: s.count + 1 })),
  setCount: (n: number) => set({ count: n }),
}));

export default useCounter;