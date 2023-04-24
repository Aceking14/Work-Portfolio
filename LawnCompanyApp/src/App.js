// Persistent Components
import Header from './components/Header';
import Footer from './components/Footer';
import Loading from './components/Loading';

// Pages
// import HomePage from './pages/HomePage';
import CompanyInfoPage from './pages/CompanyInfoPage'
import HomePage from './pages/HomePage';

// Help   Pages
import HelpPage from './pages/CompanyHelpPage';
import CompanyMissionPage from './pages/CompanyInfoPage/Mission';
import CompanyPrivacyPage from './pages/CompanyInfoPage/Policy';
import CompanyPage from './pages/CompanyInfoPage/Company';

import PostFormPage from './pages/ServicePostFormPage';
import NotFoundPage from './pages/NotFoundPage';
import PostItemPage from './pages/ServicePostItemPage';

// Routes
import { Routes, Route } from 'react-router-dom';

//database
import { useEffect, useState } from 'react';
import * as database from './database';
import { setPosts } from './redux/postSlice';
import { useDispatch } from 'react-redux';

// Default App
export default function App() {
  
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
     
   (async () => {
      const data = await database.load();
      console.log('Loaded data: ', data);
      dispatch(setPosts(data));
      setIsLoading(false);
    })();

  } , [])

  return (
    <>
      <Header />
      {isLoading ? (<Loading/>) : ( <Routes>

          <Route path='/' element={<HomePage />} />
          <Route path='/posts/add' element={<PostFormPage/>}/>
          <Route path='posts/:id' element={<PostItemPage/>} />
          
          <Route path='/companyInfo' element={<CompanyInfoPage />}>
            <Route path='' element={<CompanyPage />} />
            <Route path='mission' element={<CompanyMissionPage />} />
            <Route path='policy' element={<CompanyPrivacyPage />} />
          </Route>

          <Route path='/help' element={<HelpPage/>} />

          <Route path='*' element={<NotFoundPage />}/>
        </Routes>)}

      <Footer />
    
    </>
  );
}
