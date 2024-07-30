
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import SearchFood from './components/screen_2/SearchFood';
import 'bootstrap/dist/css/bootstrap.min.css';
import CaloriesBarChart from './components/screen3/CaloriesBarChart';
import Main from './components/Main';

function App () {

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/search/:date" element={<SearchFood />} />
          <Route path="/chart" element={<CaloriesBarChart />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

