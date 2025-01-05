import { useState, useEffect } from "react";
import api from "../AxiosSetting";

interface NewsData {
    news_header: string;
    news_content: string;
    news_image_url: string;
    news_date: string;
}

export default function useFetchNews(newsID: string) {
    const [newsData, setNewsData] = useState<NewsData | null>(null);
    const [fetchError, setFetchError] = useState<string | null>(null);
    const token = localStorage.getItem("accessToken");

    const defaultBackupData: NewsData = {
        news_header: "Кафедра системного проектування отримала доступ до Google Cloud Skills Boost для розвитку хмарних технологій серед студентів та викладачів",
        news_content: `Кафедра системного проектування факультету електроніки та комп’ютерних технологій Львівського національного університету імені Івана Франка зробила важливий крок у напрямку модернізації навчального процесу.  
        Ця можливість з’явилась завдяки співпраці Міністерства освіти і науки України та компанії Google. Університет отримав доступ до платформи Google Cloud Skills Boost, що стало чудовою можливістю для студентів і викладачів розширити свої знання та навички у сфері хмарних технологій.
        \Кафедра системного проектування факультету електроніки та комп’ютерних технологій Львівського національного університету імені Івана Франка зробила важливий крок у напрямку модернізації навчального процесу.  
        Ця можливість з’явилась завдяки співпраці Міністерства освіти і науки України та компанії Google. Університет отримав доступ до платформи Google Cloud Skills Boost, що стало чудовою можливістю для студентів і викладачів розширити свої знання та навички у сфері хмарних технологій.
        \
        `,
        news_image_url: "https://res.cloudinary.com/dp220hmqm/image/upload/v1736107977/otfflfh7ofmdaxg5tsen.png",
        news_date: "30.12.2024 | 11:39",
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get<NewsData>(`${newsID}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setNewsData(response.data);
            } catch (err: any) {
                setNewsData(defaultBackupData);
                setFetchError(err.message);
            }
        };

        fetchData();
    }, [newsID]);

    return { newsData, fetchError };
}
