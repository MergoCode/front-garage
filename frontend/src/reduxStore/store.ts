import { create } from "zustand";


type CounterStore = {
    count: number,
    increment: () => void,
    decrement: () => void,
    incrementByAmount: (payload: number) => void,
}

type News = {
    title: string,
    content: string,
    image: string
    setNews: (payload: object) => void
}

export const useCreateNewsStore = create<News>((set) => ({
    title: "",
    content: "",
    image: "",
    setNews: (payload: object) => {
        set(state => ({ title: payload.title, content: payload.content, image: payload.image }))
    }
}))


export const useCounterStore = create<CounterStore>((set) => ({
    count: 0,
    increment: () => {
        set((state) => ({ count: state.count + 1 }));
    },
    decrement: () => {
        set((state) => ({ count: state.count - 1 }));
    },
    incrementByAmount: (payload: number) => {
        set((state) => ({ count: state.count + payload }));
    },
}));