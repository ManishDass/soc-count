import React, { useState } from 'react';
import Widget from './Widget';
import ClockIcon1 from '../assets/icons/clock.png'
import ClockIcon2 from '../assets/icons/clock2.png'
import WeatherIcon1 from '../assets/icons/cloud.png'
import WeatherIcon2 from '../assets/icons/sunny.png'
import YoutubeIcon1 from '../assets/icons/video.png'
import YoutubeIcon2 from '../assets/icons/youtube.png'
import YoutubeIcon3 from '../assets/icons/play.png'

const HeroSection = () => {
  const [openTab, setOpenTab] = useState(1);

  return (
    <div className="bg-gray-100 font-sans flex h-screen items-center justify-center">
      <div className="p-8">
        <div className="max-w-md mx-auto">
          <div className="mb-4 flex space-x-1 p-1 bg-neutral-200 rounded-lg shadow-md">
            <button onClick={() => setOpenTab(1)} className={`flex-1 py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-blue transition-all duration-300 ${openTab === 1 ? 'bg-white text-black' : ''}`}>Basic</button>
            <button onClick={() => setOpenTab(2)} className={`flex-1 py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-blue transition-all duration-300 ${openTab === 2 ? 'bg-white text-black' : ''}`}>Social</button>
            <button onClick={() => setOpenTab(3)} className={`flex-1 py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-blue transition-all duration-300 ${openTab === 3 ? 'bg-blue-600 text-white' : ''}`}>Extra</button>
          </div>

          <div className={`transition-all duration-300 bg-white p-4 rounded-lg shadow-md border-l-4 border-blue-600 ${openTab === 1 ? '' : 'hidden'}`}>
          <Widget imagePath={ClockIcon1} api={'http://192.168.1.150/set-display-type?type=4'} label={'yt'} />
          </div>

          <div className={`transition-all duration-300 bg-white p-4 rounded-lg shadow-md border-l-4 border-blue-600 ${openTab === 2 ? '' : 'hidden'}`}>
          <Widget imagePath={YoutubeIcon3} api={'http://192.168.1.150/set-display-type?type=0'} label={'yt'} />
          </div>

          <div className={`transition-all duration-300 bg-white p-4 rounded-lg shadow-md border-l-4 border-blue-600 ${openTab === 3 ? '' : 'hidden'}`}>
            <h2 className="text-2xl font-semibold mb-2 text-blue-600">Section 3 Content</h2>
            <p className="text-gray-700">Fusce hendrerit urna vel tortor luctus, nec tristique odio tincidunt. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
