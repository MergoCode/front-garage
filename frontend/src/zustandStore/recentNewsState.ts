import { create } from "zustand";

type RecentNewsState = {
  readNews: number[]; 
  markAsRead: (newsIndex: number) => void; 
  resetReadNews: () => void; 
};

const loadFromLocalStorage = (): number[] => {
  const storedReadNews = localStorage.getItem("readNews");
  try {
    const parsed = storedReadNews ? JSON.parse(storedReadNews) : [];
    return Array.isArray(parsed) ? parsed : []; 
  } catch {
    return [];
  }
};

const useRecentNewsState = create<RecentNewsState>((set) => ({
  readNews: loadFromLocalStorage(),
  markAsRead: (newsIndex) =>
    set((state) => {
      if (!state.readNews.includes(newsIndex)) {
        const updatedReadNews = [...state.readNews, newsIndex];
        localStorage.setItem("readNews", JSON.stringify(updatedReadNews));
        return { readNews: updatedReadNews };
      }
      return state; 
    }),
  resetReadNews: () => {
    localStorage.removeItem("readNews"); 
    set(() => ({ readNews: [] })); 
  },
}));

export default useRecentNewsState;
