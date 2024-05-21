import React, { useState } from 'react';
import Widget from './modules/Widget';
import ClockIcon1 from '../assets/icons/clock.png'
import ClockIcon2 from '../assets/icons/clock2.png'
import WeatherIcon1 from '../assets/icons/cloud.png'
import WeatherIcon2 from '../assets/icons/sunny.png'
import YoutubeIcon1 from '../assets/icons/video.png'
import YoutubeIcon2 from '../assets/icons/youtube.png'
import YoutubeIcon3 from '../assets/icons/play.png'

const HeroSection = ({setSelectedWidget}) => {
  const [openTab, setOpenTab] = useState(1);

  return (
    <div className="h-[65%] bg-gray-100 font-sans fle items-center justify-center">
      <div className="p-8">
        <div className="max-w-md mx-auto">
          <div className="mb-4 flex space-x-1 p-1 bg-neutral-200 rounded-lg shadow-md">
            <button onClick={() => setOpenTab(1)} className={`flex-1 py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-blue transition-all duration-300 ${openTab === 1 ? 'bg-white text-black' : ''}`}>Basic</button>
            <button onClick={() => setOpenTab(2)} className={`flex-1 py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-blue transition-all duration-300 ${openTab === 2 ? 'bg-white text-black' : ''}`}>Social</button>
            <button onClick={() => setOpenTab(3)} className={`flex-1 py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-blue transition-all duration-300 ${openTab === 3 ? 'bg-blue-600 text-white' : ''}`}>Extra</button>
          </div>

          {/* Display three icons per row */}
          <div className="grid grid-cols-3 gap-6 justify-items-center text-center">
    {openTab === 1 && (
      <>
        <Widget imagePath={ClockIcon1} controlType={'displayType'} value={4} label={'Time'} setSelectedWidget={setSelectedWidget}/>
        <Widget imagePath={WeatherIcon1} controlType={'displayType'} value={4} label={'Temperature'} setSelectedWidget={setSelectedWidget}/>
        <Widget imagePath={WeatherIcon2} controlType={'displayType'} value={4} label={'Humidity'} setSelectedWidget={setSelectedWidget}/>
      </>
    )}
    {openTab === 2 && (
      <>
        <Widget imagePath={YoutubeIcon3} controlType={'displayType'} value={0} label={'Subscriber'} setSelectedWidget={setSelectedWidget}/>
        <Widget imagePath={YoutubeIcon3} controlType={'displayType'} value={1} label={'Views'} setSelectedWidget={setSelectedWidget}/>
        <Widget imagePath={YoutubeIcon3} controlType={'displayType'} value={3} label={'Videos'} setSelectedWidget={setSelectedWidget}/>
      </>
    )}
    {openTab === 3 && (
      <div>
        <h2 className="text-2xl font-semibold mb-2 text-blue-600">Coming Soon</h2>
      </div>
    )}
  </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
