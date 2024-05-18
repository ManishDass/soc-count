import React, { useState } from 'react';
import ApiESP from '../service/ApiESP';

const Widget = ({ imagePath, controlType, value, label }) => {
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
  };

  return (
    <div
      className={`p-4 rounded-md transition-all duration-500 ${clicked ? 'bg-neutral-200' : 'bg-transparent'}`}
      onClick={handleClick}
    >
      <img className='w-[70px]' src={imagePath} alt={label} />
      <p>{label}</p>
    </div>
  );
};

export default Widget;
