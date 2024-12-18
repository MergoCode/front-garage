import { useNavigate } from "react-router";


const NotFoundPage = () => {4

    const navigate = useNavigate();


    const handleRedirect = () => {
        navigate('/home');
    }

    return(<>
        <h1>404 page not found</h1>
        <button onClick={handleRedirect}>
            GO home 
        </button>
    </>);
};

export default NotFoundPage;