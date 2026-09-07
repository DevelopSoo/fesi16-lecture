import { create } from "zustand";

interface CounterState {
  count: number;
  increment: () => void;
  decrement: () => void;
}

const useCounterStore = create<CounterState>()((set) => ({
  count: 0, // 기본값
  increment: () => set((state) => ({ count: state.count + 1 })), // 증가
  decrement: () => set((state) => ({ count: state.count - 1 })), // 감소
}));

export default useCounterStore;
