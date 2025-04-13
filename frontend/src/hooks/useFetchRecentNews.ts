import { useEffect, useState } from "react";
import api from "../AxiosSetting";

type recentNews = {
    id: number, 
    recent_header: string,
    recent_content: string,
}

export default function useFetchRecentNews(){
    const [recentNews, setRecentNews] = useState<recentNews[]>([]);
    const [recentFetchError, setFetchError] = useState<string | null>(null);
    const defaultRecentNews: recentNews[] = [
        {
            id: 1, 
            recent_header: "Кафедра системного проектування отримала доступ до Google Cloud Skills Boost для розвитку хмарних технологій серед студентів та викладачів",
            recent_content: "Кафедра системного проектування факультету електроніки та комп’ютерних технологій Львівського національного університету імені Івана Франка зробила важливий крок у напрямку модернізації навчального процесу. Ця можливість з’явилась завдяки співпраці Міністерства освіти і науки України та компанії Google. ",
        },
        {
            id: 2, 
            recent_header: "Що таке сесія?",
            recent_content: "Сесія – це період, коли студенти отримують підсумкові бали із заліків та складають іспити. Розрізняють залікову та екзаменаційну сесії; за результатами останньої формується рейтинг успішності студентів державної форми навчання в межах одного курсу однієї спеціальності (потоку).",
        },
        {
            id: 3, 
            recent_header: "Кафедра системного проектування отримала доступ до Google Cloud Skills Boost для розвитку хмарних технологій серед студентів та викладачів",
            recent_content: "Кафедра системного проектування факультету електроніки та комп’ютерних технологій Львівського національного університету імені Івана Франка зробила важливий крок у напрямку модернізації навчального процесу. Ця можливість з’явилась завдяки співпраці Міністерства освіти і науки України та компанії Google.",
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