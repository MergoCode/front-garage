import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import '../css/RecentNews.css';
import useFetchRecentNews from "../hooks/useFetchRecentNews";
import useRecentNewsState from '../zustandStore/recentNewsState';
import Loading from "./Loading";
const RecentNews = () => {
    const navigate = useNavigate();
    const {recentNews, recentFetchError } = useFetchRecentNews();
    const [activeIndex, setActiveIndex] = useState(0);
    const [isMouseOver, setIsMouseOver] = useState(false);
    const { readNews, markAsRead } = useRecentNewsState((state) => state);


    useEffect(() => {
        if (!isMouseOver) {
            setActiveIndex(-1);
        }
    }, [isMouseOver]);

    if (!recentNews || recentNews.length === 0) {
        return <Loading />;
    }

    function handleMouseOver(enteredIndex) {
        setActiveIndex(enteredIndex);
        setIsMouseOver(true);
    }

    function handleMouseLeave() { 
        setIsMouseOver(false);
    }

    return (
        <ul className="col-8 news__container" onMouseLeave={handleMouseLeave}>
            {recentNews.map((news, index) => {
                const isActive = index === activeIndex;
                // const blurStyle = isActive ? "none" : "blur(3px)";
                const zIndex = index === 1 ? 2 : (isActive ? 3 : 1);
                const zTranslate = isActive ? 'translateZ(15px)' : 'translateZ(0px)';
                const isRead = Array.isArray(readNews) && readNews.includes(index);

                return (
                    <li
                        className='news__card'
                        key={index}
                        onMouseOver={() => handleMouseOver(index)}
                        onClick={() => {
                            navigate(`/news/${news.id}`);
                        }}  
                        style={{
                            // top: `${index * 120}px`,
                            // filter: blurStyle,
                            zIndex: zIndex,
                            transform: zTranslate
                        }}
                    >
                        <h2 className="news__title col-11"
                        onClick={() => navigate(`/news/${news.id}`)}
                        >{news.recent_header}</h2>
                        <div className="pIcon__row">
                            <div className="icon__wrap col-1">
                            <img
                                className={`news__icon`}
                                height='35px'
                                key={index}
                                src={isRead ? "/assets/star-icon-toggled.svg" : "/assets/star-icon.svg"}
                                alt="icon"
                            />
                            </div>

                            <p className="news__paragraph col-11">{news.recent_content}</p>
                        </div>
                        <div className="dateInfo__row mb-2">
                            <p className="news__date">{(news.id == 1) ? "20.02.2025 || 11:40" : (news.id == 2 ? "23.01.2025 || 17:34" : (news.id == 3 ? "13.04.2025 || 12:02" : "14.08.2024 || 21:01")) }</p>
                            <a href="" className="news__readMore"
                                                      
                               >Читати далі...</a>
                        </div>
                    </li>
                );
            })}
        </ul>
    );
};

export default RecentNews;
