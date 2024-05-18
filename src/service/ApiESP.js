import React from 'react';

const esp8266IpAddress = 'http://117.209.99.150:80'; // Replace with your ESP8266 IP address
const apiKey = 'ae55df63-7f1f-4c41-be1e-c1bfcb1a4a7e'; // Replace with your API key

// Function to set display type
const setDisplayType = async (type) => {
  try {
    const response = await fetch(`${esp8266IpAddress}/set-display-type?type=${type}`, {
      method: 'GET',
      mode: 'cors',
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
    const response = await fetch(`${esp8266IpAddress}/set-brightness?brightness=${brightness}`, {
      method: 'GET',
      mode: 'cors',
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
};
