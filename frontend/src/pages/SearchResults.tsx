import React, { useState, useEffect } from "react";
import { useSearchResultsStore } from "../zustandStore/store";
import AuditorySearchCard from "../components/AuditorySearchCard";
import Loading from "../components/Loading";
import "../css/SearchResults.sass";
import {useNavigate} from "react-router-dom";
const SearchResultsPage: React.FC = () => {
  const searchResults = useSearchResultsStore((state) => state.data);
  const [isLoading, setLoading] = useState(false);
  const searchError = useSearchResultsStore((state) => state.error);
  useEffect(() => {
    setLoading(true);
    console.log(searchResults.length);
    console.log(searchError);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);
  const navigate = useNavigate();

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className="sr-head-block">
            <div className="search-results-title">
              <h1>Результати пошуку</h1>
            </div>
            <div className="sr-title-underline"></div>
          </div>
          <div className="search-results-container">
            {searchResults.length == 0 ? (
              <div className="no-res-div">
                <h1 className="no-results">
                  На жаль, за вашим запитом ніого не знайшлося :(
                </h1>
                <button className="no-results-btn" onClick={() => {navigate("/search")}}>Повернутись на сторінку пошуку</button>
              </div>
            ) : (
              searchResults.map((el, index) => (
                <AuditorySearchCard
                  key={index}
                  name={el.audienceName}
                  time={el.audienceFreePairs}
                  campus={el.campus}
                />
              ))
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default SearchResultsPage;
