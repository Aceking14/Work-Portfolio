// Persistent Components
import Header from './components/Header';
import Footer from './components/Footer';
import Loading from './components/Loading';

// Pages
import HomePage from './pages/HomePage';
import PostListPage from './pages/PostListPage';
import PreferencePage from './pages/PreferencesPage';

// About us Pages
import AboutUsPage from './pages/AboutUsPage';
import AboutUsMissionPage from './pages/AboutUsPage/Mission';
import AboutUsPrivacyPage from './pages/AboutUsPage/Policy';
import AboutUsIntroductionPage from './pages/AboutUsPage/introduction';

import PostFormPage from './pages/PostFormPage';
import NotFoundPage from './pages/NotFoundPage';
import PostItemPage from './pages/PostItemPage';

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
          <Route path='/' element={<HomePage/>} />
        
          <Route path='/posts' element={<PostListPage/>} />
          <Route path='/posts/add' element={<PostFormPage/>}/>
          <Route path='posts/:id' element={<PostItemPage/>} />

          <Route path='/preferences' element={<PreferencePage />} />

          <Route path='/about-us' element={<AboutUsPage />}>
            <Route path='' element={<AboutUsIntroductionPage />} />
            <Route path='mission' element={<AboutUsMissionPage />} />
            <Route path='policy' element={<AboutUsPrivacyPage />} />
          </Route>


          <Route path='*' element={<NotFoundPage />}/>
        </Routes>)}

      <Footer />
    
    </>
  );
}
