import './assets/css/App.css'
import {PetContext} from "./contexts/PetContext"
import { MainRouter } from './routers/MainRouter'
import { I18nextProvider } from "react-i18next";
import i18n from './i18n.jsx'
import Header from './components/template/Header.jsx'
import { useCurrentUser } from './hooks/useCurrentUser.jsx';

function App() {
  const current_user=useCurrentUser();

  return (
    <>
      <div className="App">
        <I18nextProvider i18n={i18n}>
          <PetContext.Provider value={{current_user}}>
            <div>
                <Header/>
                <MainRouter></MainRouter>
            </div>
          </PetContext.Provider> 
        </I18nextProvider>
       </div>
    </>
  )
}

export default App
