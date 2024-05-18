import React from 'react';
import ApiESP from '../service/ApiESP';

const Widget = ({ imagePath, controlType, value, label }) => {
  return (
    <div onClick={() => {
      if (controlType === 'displayType') {
        ApiESP.setDisplayType(value);
      } else {
        ApiESP.setBrightness(value);
      }
    }}>
      <img src={imagePath} alt={label} />
      <p>{label}</p>
    </div>
  );
};

export default Widget;
