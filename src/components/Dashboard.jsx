import React,{useState,useEffect} from 'react';
import DisplayPlaceholder from '../assets/elements/display.png';

const Dashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); // Update every 1 second

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array to run effect only once on mount

  return (
    <div className='h-[30%] flex items-center justify-center space-x-4 ' >
      <ion-icon name="chevron-back-outline" size="large" style={{ color: "grey" }}></ion-icon>
      <div className="relative">
        <img className='w-[60vw] md:w-[200px]' src={DisplayPlaceholder} alt='display' />
        <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-10 text-white text-4xl">{currentTime.toLocaleTimeString()}</h1>
      </div>
      <ion-icon name="chevron-forward-outline" size="large" style={{ color: "grey" }}></ion-icon>
    </div>
  );
};

export default Dashboard;
