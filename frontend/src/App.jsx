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
const App = () => {
  return(
    <Router id="App">
      <Routes>
         <Route path="/login-register" element={<LoginRegister/>} />
         {/*нижче сторінки де має бути лейаут */}
          <Route path="/" element={<Layout />}>
          <Route path="*" element={<NotFoundPage/>}/>
          <Route path='/audience-picker' element={<AudiencePage/>}/>
          <Route path='/contacts' element={<ContactsPage />} />
          <Route path="home" element={<LandingPage />} />
          <Route path="news/:news_id" element={<NewsPage/>}></Route>
          <Route path="/account" element={<Account />} />
        </Route>
      </Routes>
    </Router>
  );
}
export default App;