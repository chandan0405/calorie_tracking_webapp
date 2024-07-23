
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import SearchFood from './components/screen_2/SearchFood';
import 'bootstrap/dist/css/bootstrap.min.css';
import CaloriesBarChart from './components/screen3/CaloriesBarChart';

function App () {


  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchFood />} />
          <Route path="/chart" element={<CaloriesBarChart />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

