import React from 'react';
import DisplayPlaceholder from '../assets/elements/display.png';

const Dashboard = () => {
  return (
    <div className='h-[30%] flex items-center justify-center space-x-4 ' >
      <ion-icon name="chevron-back-outline" size="large" style={{color: "grey"}}></ion-icon>
      <img className='w-[60vw] md:w-[200px]' src={DisplayPlaceholder} alt='display' />
      <ion-icon name="chevron-forward-outline" size="large" style={{color: "grey"}}></ion-icon>

    </div>
  );
};

export default Dashboard;
