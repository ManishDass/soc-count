import './App.css';
import Header from './components/Header'
import Dashboard from './components/Dashboard';
import HeroSection from './components/HeroSection';
import Footer from './components/Footer'

function App() {
  return (
    <div className="App">
      <Header/>
      <Dashboard/>
      <HeroSection/>
      <Footer/>
    </div>
  );
}

export default App;
