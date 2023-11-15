import './App.css';
import {BrowserRouter as Router  ,Routes , Route ,Link}  from 'react-router-dom'
import Home from './pages/Home';
import Modify from './pages/Modify';
import Insert from './pages/Insert';

function App() {
  return (
        <Router>
          <Routes>
            <Route path="/" element={<Home/>}  />
            <Route path="/modify/:id" element={<Modify/>}  />
            <Route path="/insert" element={<Insert/>}  />
          </Routes>
        </Router>
    );
}

export default App;
