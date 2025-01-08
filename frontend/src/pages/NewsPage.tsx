import React, {useEffect} from "react";
import {useParams, useNavigate} from "react-router-dom";
import useFetchNews from "../hooks/useFetchNews";
import useFetchRecentNews from "../hooks/useFetchRecentNews";
import useNewsStore from '../zustandStore/recentNewsState';
import "../css/NewsPage.css";
const newsPage: React.FC = () => {
    const markAsRead = useNewsStore((state) => state.markAsRead);
    const { news_id } = useParams();
    const navigate = useNavigate();

    if (!news_id) {
        alert("Error");
        navigate("/home")
        return null;
    }

    useEffect(() => {
      markAsRead(news_id); 
    }, [news_id, markAsRead]);

    const {newsData, fetchError} = useFetchNews(news_id);
    const {recentNews, recentFetchError} = useFetchRecentNews();
    
    if (!newsData) {
        return(<div>
            <h1>Loading...</h1>
        </div>);
    }


    return(<>
    <div className="news-container container my-5 d-flex justify-content-evenly">
        <div className="news-reading-block col-7">
        <h2 className="news-header">{newsData.news_header}</h2>
        <p className="news-content">{newsData.news_content}</p>
             <div className="col-8 news-image-container">
                <img src={newsData.news_image_url} alt="" className="col-12 news-image"/>
                </div>
        <p className="news-date">{newsData.news_date}</p>
        </div>
        <div className="col-3 news-recent">
        <div className="news-recent-block-header">Останні новини</div>
        <div className="news-recent-block">
        {recentNews && recentNews.map((news, index) => 
        <div key={index} className="news-recent-item">
            <div className="d-flex"><p className="news-recent-item-header col-11">{news.recent_header}</p><p className="col-1 news-recent-star">★</p></div>
        <p className="news-recent-item-content">{news.recent_content}</p>
        </div>)}
        </div></div>

        

    </div>
    </>);
};

export default newsPage;