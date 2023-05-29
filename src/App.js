import './App.css'
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainDash from './components/MainDash/MainDash';
import RightSide from './components/RigtSide/RightSide';
import Sidebar from './components/Sidebar';
import Orders from './components/Orders';
import Clients from './components/Clients';
import Products from './components/Products';
import Analytics from './components/Analytics';

function App() {
  return (
    <div className="App">
      <div className="AppGlass">
        <Router>
          <Sidebar/>
          <Routes>
              <Route path="/orders" element={<Orders/>} />
              <Route path="/clients" element={<Clients/>} />
              <Route path="/products" element={<Products/>} />
              <Route path="/analytics" element={<Analytics/>} />
            </Routes>
          <MainDash/>
          <RightSide/>
        </Router>
      </div>
    </div>
  );
}

export default App;
