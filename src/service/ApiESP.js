// api.js
import React from 'react';

const apiUrl = process.env.API_URL; // Replace with your Vercel project's API URL
const apiKey = process.env.REACT_APP_API_KEY; // API key

// Function to set display type
const setDisplayType = async (type) => {
  try {
    const response = await fetch(`${apiUrl}/set-display-type?type=${type}`, {
      method: 'GET',
      mode: 'no-cors',
      headers: {
        'Authorization': `Bearer ${apiKey}`
      }
    });
    const data = await response.json();
    console.log('Response:', data);
  } catch (error) {
    console.error('Error:', error);
  }
};

// Function to set brightness
const setBrightness = async (brightness) => {
  try {
    const response = await fetch(`${apiUrl}/set-brightness?brightness=${brightness}`, {
      method: 'GET',
      mode: 'no-cors',
      headers: {
        'Authorization': `Bearer ${apiKey}`
      }
    });
    const data = await response.json();
    console.log('Response:', data);
  } catch (error) {
    console.error('Error:', error);
  }
};

export default {
  setDisplayType,
  setBrightness
}
