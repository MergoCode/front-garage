import { create } from "zustand";

const useNewsStore = create((set) => ({
  readNews: JSON.parse(localStorage.getItem("readNews")) || {},

  markAsRead: (id) => {
    set((state) => {
      const newReadNews = {
        ...state.readNews,
        [id]: true,
      };
      // оновлюємо стан в localStorage
      localStorage.setItem("readNews", JSON.stringify(newReadNews));
      return { readNews: newReadNews };
    });
  },

  loadReadNews: () => {
    const savedNews = JSON.parse(localStorage.getItem("readNews")) || {};
    set({ readNews: savedNews });
  },
}));

export default useNewsStore;
