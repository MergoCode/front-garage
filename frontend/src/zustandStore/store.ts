import {create} from "zustand";




type DateAudienceStore = {
    date: Date,
    time: number,
    campus: "Drago" | "Tarny",
    setDate: (payload: Date) => void,
    setTime: (payload: number) => void,
    setCampus: (payload: "Drago" | "Tarny") => void,
}



type SearchResults = {
    data: object[],
    error: string | null,
    setData: (payload: object[]) => void,
    setError: (payload: string) => void,
    
}

type NewsItem = {
    title: string;
    content: string;
    image: string;
  };
  
  type News = {
    news: NewsItem[];
    setNews: (payload: NewsItem) => void;
  };
  
  export const useCreateNewsStore = create<News>((set) => ({
    news: [],
    setNews: (payload: NewsItem) => {
      set((state) => ({
        news: [...state.news, payload],
      }));
    },
  }));

export const useSearchResultsStore = create<SearchResults>((set) => ({
    data: [],
    error: null,
    setData: (payload: object[]) => {
        set((state) => ({data: payload}));
    },
    setError: (payload: string) => {
        set((state) => ({error: payload}))
    }

}))

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