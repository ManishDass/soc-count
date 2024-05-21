import React, { useState } from 'react';
import ApiESP from '../../service/ApiESP';

const Slider = () => {
    const [sliderValue, setSliderValue] = useState(0);
    const [timerId, setTimerId] = useState(null);

    const handleSliderChange = (e) => {
        const newValue = e.target.value;
        setSliderValue(newValue);

        // Clear the previous timer
        if (timerId) {
            clearTimeout(timerId);
        }

        // Set a new timer to call setBrightness after 1 second
        const newTimerId = setTimeout(() => {
            setBrightness(newValue);
        }, 1000);

        // Save the new timerId
        setTimerId(newTimerId);
    };

    const setBrightness = (value) => {
        // Assuming ApiESP.setBrightness is the function you implemented to set the brightness
        // Here, we'll only call the API if the value is not 7
        if (value !== '7') {
            ApiESP.setBrightness(value)
                .then(response => {
                    console.log("Brightness set successfully:", response);
                })
                .catch(error => {
                    console.error("Error setting brightness:", error);
                });
        }
    };

    const renderSliderValue = () => {
        if (sliderValue === '7') {
            return 'Max Brightness';
        } 
        else if(sliderValue === '0') {
            return 'OFF';
         }
            else {
            // Convert slider value to percentage
            const percentage = (sliderValue / 7) * 100;
            return `${Math.round(percentage)}%`;
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-lg p-6 relative" style={{ width: '100%' }}>
            <div className="mb-4">
                <label htmlFor="price-range" className="block text-gray-700 font-bold mb-2">
                    Brightness
                </label>
                <input
                    type="range"
                    id="price-range"
                    className="w-full accent-indigo-600"
                    min="0"
                    max="7" // Keep the max value as 7 for the range of 0-7
                    value={sliderValue}
                    onChange={handleSliderChange}
                />
            </div>
            <div className="flex justify-center text-gray-500">
                <span id="maxPrice">{renderSliderValue()}</span>
            </div>
        </div>
    );
};

export default Slider;
