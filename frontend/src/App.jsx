import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import "./App.css";
import LoginRegister from "./Login-Register.tsx";
import LandingPage from "./LandingPage";
import NotFoundPage from './pages/NotFound.tsx';
import Layout from "./components/Layout";
import NewsPage from './pages/NewsPage.tsx';
import Account from "./pages/Account.tsx"
import AudiencePage from './pages/AudiencePage.tsx';
import ContactsPage from './pages/ContactsPage.tsx';
import SearchPage from './pages/SearchPage.tsx';
import GoogleCallback from './components/GoogleCallback.jsx'
import GoogleLogin from './components/GoogleLogin.jsx';
import RatePage from './pages/RatePage.tsx';
import SearchResultsPage from './pages/SearchResults.tsx';
import CreateDocumentPage from './pages/CreateDocumentPage.tsx'
const App = () => {
  return(
    <Router id="App">
      <Routes>
         <Route path="/login-register" element={<LoginRegister/>} />
         <Route path="/api/auth/google/callback" element={<GoogleCallback />} />
         {/*нижче сторінки де має бути лейаут */}
          <Route path="/" element={<Layout />}>
          <Route path="/createDocx" element={<CreateDocumentPage />} />
          <Route path='/rating' element={<RatePage/>}/>
          <Route path="*" element={<NotFoundPage/>}/>
          <Route path='/audience-picker' element={<AudiencePage/>}/>
          <Route path='/search' element={<SearchPage/>}></Route>
          <Route path='/contacts' element={<ContactsPage />} />
          <Route path="home" element={<LandingPage />} />
          <Route path="news/:news_id" element={<NewsPage/>}></Route>
          <Route path="/account" element={<Account />} />
          <Route path="/search-results" element={<SearchResultsPage/>}></Route>
        </Route>
      </Routes>
    </Router>
  );
}
export default App;