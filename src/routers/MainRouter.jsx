
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from '../views/Home';
import Feed from '../views/Feed';
import DetailsPublication from '../views/DetailsPublication';

export const MainRouter=()=>{
  return(
    <BrowserRouter>
      <Routes>
                <Route path="/" element={<Home></Home>}/>,
                <Route path="/feed" element={<Feed></Feed>}/>
                <Route path="/description" element={<DetailsPublication></DetailsPublication>}/>
      </Routes>
      </BrowserRouter>
  )
}
