import React, {useState, useEffect} from "react";
import { useSearchResultsStore } from "../zustandStore/store";
import AuditorySearchCard from "../components/AuditorySearchCard";
const SearchResultsPage: React.FC = () => {

    const searchResults = useSearchResultsStore(state => state.data);

    return(<div>
        {searchResults.map((el, index) => (<AuditorySearchCard key={index}
        name={el.audienceName} 
        time={el.audienceFreePairs}
        campus={el.campus} />))}
    </div>)

}

export default SearchResultsPage;