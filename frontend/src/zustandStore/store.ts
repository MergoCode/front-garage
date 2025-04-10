import {create} from "zustand";




type DateAudienceStore = {
    date: Date,
    time: number,
    campus: "Drago" | "Tarny",
    setDate: (payload: Date) => void,
    setTime: (payload: number) => void,
    setCampus: (payload: "Drago" | "Tarny") => void,
}




export const useDatePickerStore = create<DateAudienceStore>((set) => ({
    date: new Date(0),
    time: 1,
    campus: "Drago",
    setDate: (payload: Date) => {
        set((state) => ({date: payload}));
    },
    setTime: (payload:  number) => {
        set((state) => ({time: payload}));
    },
    setCampus: (payload: "Drago" | "Tarny") => {
        set((state) => ({campus: payload}));
    }

}))