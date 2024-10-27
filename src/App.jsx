// App.jsx

import './assets/css/App.css';
import { PetContext } from "./contexts/PetContext";
import { MainRouter } from './routers/MainRouter';
import { I18nextProvider } from "react-i18next";
import i18n from './i18n.jsx';
import { useCurrentUser } from './hooks/useCurrentUser.jsx';
import { BrowserRouter } from 'react-router-dom';
import { useSavedPosts } from "./hooks/useSavedPosts.jsx";
import { useState, useEffect } from 'react';

function App() {
  const current_user = useCurrentUser();
  const { savedPosts, loading } = useSavedPosts({ userId: current_user?.id });

  const [saved_posts, setSavedPosts] = useState([]);

  useEffect(() => {
    if (!loading) {
      setSavedPosts(savedPosts);
    }
  }, [savedPosts, loading]);

  if (loading) return <div>Cargando...</div>;

  return (
    <div className="App bg-white min-h-screen pb-[70px]">
      <I18nextProvider i18n={i18n}>
        <PetContext.Provider value={{ current_user, saved_posts, setSavedPosts }}>
          <BrowserRouter>
            <MainRouter />
          </BrowserRouter>
        </PetContext.Provider>
      </I18nextProvider>
    </div>
  );
}

export default App;
