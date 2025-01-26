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
                console.log("readNews state:", readNews); // Додайте це перед перевіркою includes

                return (
                    <li
                        className='news__card'
                        key={index}
                        onMouseOver={() => handleMouseOver(index)}
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
                            <p className="news__date">30.12.2024 | 11:39</p>
                            <a href="" className="news__readMore"
                            onClick={() => {
                                navigate(`/news/${news.id}`);
                            }}                            
                               >Читати далі...</a>
                        </div>
                    </li>
                );
            })}
        </ul>
    );
};

export default RecentNews;
