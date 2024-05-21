import React, { useState, useEffect } from 'react';
import DisplayPlaceholder from '../assets/elements/display.png';
import { useYouTubeStats } from './modules/useYouTubeStats';

const Dashboard = ({ selectedWidget }) => {
  //   useEffect(()=>{
  //     const fetchYoutubeData = () => {
  //         fetch(`https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=UCEGRaTSnDX6zbhjD92e7XOw&key=AIzaSyCYkjwjv7h9rovSpIn4n3nXblNKDjE5q6k`)
  //         .then(res => res.json())
  //         .then(res => {
  //             console.log("Data: ",res)
  //         })
  //     } 

  //     fetchYoutubeData()
  // },[])

  const { youtubeData } = useYouTubeStats();

  const [currentTime, setCurrentTime] = useState(new Date());
  const [displayValue, setDisplayValue] = useState("")

  let displayCurrentTime = () => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); // Update every 1 second
    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }


  let clockDisplayValueHandler = () => {
    if (selectedWidget === 'subscriber') {
      setDisplayValue(`Subs: ${youtubeData.subscriberCount}`)
    }
    else if (selectedWidget === 'views') {
      setDisplayValue(`Views: ${youtubeData.viewCount}`)
    }
    else if (selectedWidget === 'videos') {
      setDisplayValue(`Videos: ${youtubeData.videoCount}`)
    }
    else if (selectedWidget === 'time') {
      setDisplayValue(currentTime.toLocaleTimeString())
    }
  }


  useEffect(() => {
    console.log("Subscriber count:", youtubeData);
    clockDisplayValueHandler()
    let ytIntervalId = setInterval(displayCurrentTime(), 2000)
    return () => clearInterval(ytIntervalId)

  }, [youtubeData, selectedWidget]);

  return (
    <div className='h-[30%] flex items-center justify-center space-x-4'>
      <ion-icon name="chevron-back-outline" size="large" style={{ color: "grey" }}></ion-icon>
      <div className="relative">
        <img className='w-[60vw] md:w-[200px]' src={DisplayPlaceholder} alt='display' />
        <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-1 text-white text-3xl whitespace-nowrap">
          {displayValue}
        </h1>
      </div>
      <ion-icon name="chevron-forward-outline" size="large" style={{ color: "grey" }}></ion-icon>
    </div>
  );
};

export default Dashboard;
