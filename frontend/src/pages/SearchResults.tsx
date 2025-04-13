import React, { useState, useEffect } from "react";
import { useSearchResultsStore } from "../zustandStore/store";
import AuditorySearchCard from "../components/AuditorySearchCard";
import Loading from "../components/Loading";

const SearchResultsPage: React.FC = () => {

    const searchResults = useSearchResultsStore(state => state.data);
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false)
        }, 1500);
    }, [])

    return (
        <div>
            {isLoading ? <Loading /> : (
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
    )
}

export default SearchResultsPage;
