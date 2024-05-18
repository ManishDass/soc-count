import './App.css';
import Header from './components/Header'
import Dashboard from './components/Dashboard';
import HeroSection from './components/HeroSection';

function App() {
  return (
    <div className="App">
      <Header/>
      <Dashboard/>
      <HeroSection/>
    </div>
  );
}

export default App;
