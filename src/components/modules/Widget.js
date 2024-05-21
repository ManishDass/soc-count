import React, { useState } from 'react';
import ApiESP from '../../service/ApiESP';

const Widget = ({ imagePath, controlType, value, label, setSelectedWidget }) => {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    // Set clicked state to true
    setClicked(true);

    // Execute API call based on controlType and value
    if (controlType === 'displayType') {
      ApiESP.setDisplayType(value);
    } else {
      ApiESP.setBrightness(value);
    }

    // Reset clicked state after 500 milliseconds
    setTimeout(() => {
      setClicked(false);
    }, 500);

    if (value === 0) setSelectedWidget('subscriber')
    else if (value === 1) setSelectedWidget('views')
    else if (value === 3) setSelectedWidget('videos')
    else if (value === 4) setSelectedWidget('time')
    console.log("Called")
  };

  return (
    <div
      className={`p-4 rounded-md transition-all duration-500 ${clicked ? 'bg-neutral-200' : 'bg-transparent'}`}
      onClick={handleClick}
      style={{ width: '90px', height: '120px' }} >
      <div className="flex justify-center items-center" style={{ width: '70px', height: '70px', overflow: 'hidden' }}>
        <img className='object-contain w-full h-full' src={imagePath} alt={label} />
      </div>
      <p>{label}</p>
    </div>
  );
};

export default Widget;
