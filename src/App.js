import './App.css';
import Header from './components/Header'
import Dashboard from './components/Dashboard';
import HeroSection from './components/HeroSection';
import { IoHomeOutline, IoSettingsOutline, IoInformationCircleOutline } from 'react-icons/io5';

function App() {
  return (
    <div className="flex flex-col h-screen">
      <Header/>
      <Dashboard/>
      <HeroSection/>
    </div>
  );
}

export default App;
