import './App.css';
import React,{useState} from 'react';
import Dashboard from './components/Dashboard';
import HeroSection from './components/HeroSection';
import { IoHomeOutline, IoSettingsOutline, IoInformationCircleOutline } from 'react-icons/io5';

function App() {
  const [selectedWidget, setSelectedWidget] = useState('views') //views subscriber videos time 
  return (
    <div className="flex flex-col h-screen">
      <Dashboard selectedWidget={selectedWidget} />
      <HeroSection setSelectedWidget={setSelectedWidget} />
    </div>
  );
}

export default App;
