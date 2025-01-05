import { useEffect, useState } from "react";
import api from "../AxiosSetting";

type recentNews = {
    recent_header: string,
    recent_content: string,
}

export default function useFetchRecentNews(){
    const [recentNews, setRecentNews] = useState<recentNews[]>([]);
    const [recentFetchError, setFetchError] = useState<string | null>(null);
    const defaultRecentNews: recentNews[] = [
        {
            recent_header: "Наказ Ректора про організацію освітнього процесу в другому семестрі 2024-2025 року",
            recent_content: "Навчальний семестр розпочинається 10-го лютого. Освітній процес для 1-4 курсів OC «Бакалавр», 1-2 курсу ОС «Магістр»...",
        },
        {
            recent_header: "Наказ Ректора про організацію освітнього процесу в другому семестрі 2024-2025 року",
            recent_content: "Навчальний семестр розпочинається 10-го лютого. Освітній процес для 1-4 курсів OC «Бакалавр», 1-2 курсу ОС «Магістр»...",
        },
        {
            recent_header: "Наказ Ректора про організацію освітнього процесу в другому семестрі 2024-2025 року",
            recent_content: "Навчальний семестр розпочинається 10-го лютого. Освітній процес для 1-4 курсів OC «Бакалавр», 1-2 курсу ОС «Магістр»...",
        },
    ];
    const token = localStorage.getItem("accessToken");
    useEffect((
    ) => {
        const fetchData = async () => {
        try {
            const response = await api.get("/recent_news", {headers: {
                Authorization: `Bearer ${token}`,}
            },)
            setRecentNews(response.data.news);
        } catch (err: any) {
            setRecentNews(defaultRecentNews);
            setFetchError(err.message);
            
        }

    }
    fetchData();
}, []);
    return {recentNews, recentFetchError};
};