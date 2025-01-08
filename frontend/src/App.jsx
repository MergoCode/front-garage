import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import "./App.css";
import LoginRegister from "./Login-Register.tsx";
import LandingPage from "./LandingPage";
import NotFoundPage from './NotFound';
import Layout from "./components/Layout";
import NewsPage from './pages/NewsPage.tsx';
const App = () => {
  return(
    <Router id="App">
      <Routes>
         <Route path="/login-register" element={<LoginRegister/>} />
         <Route path="*" element={<NotFoundPage/>}/>
         {/*нижче сторінки де має бути лейаут */}
         <Route path="/" element={<Layout />}>

          <Route path="home" element={<LandingPage />} />
          <Route path="news/:news_id" element={<NewsPage/>}></Route>
        </Route>
      </Routes>
    </Router>
  );
}
export default App;