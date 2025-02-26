import {create} from "zustand";


type CounterStore = {
    count: number,
    increment: () => void,
    decrement: () => void,
    incrementByAmount: (payload: number) => void,
}


export const useCounterStore = create<CounterStore>((set) => ({
    count: 0,
    increment: () => {
        set((state) => ({count: state.count+1}));
    },
    decrement: () => {
        set((state) => ({count: state.count-1}));
    },
    incrementByAmount: (payload: number) => {
        set((state) => ({count: state.count + payload}));
    },
}));