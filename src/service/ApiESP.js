// api.js
import React from 'react';

const apiUrl = 'https://smart-display-liard.vercel.app/api'; // Replace with your Vercel project's API URL
const apiKey = 'ae55df63-7f1f-4c41-be1e-c1bfcb1a4a7e'; // Replace with your API key

// Function to set display type
export const setDisplayType = async (type) => {
  try {
    const response = await fetch(`${apiUrl}/set-display-type?type=${type}`, {
      method: 'GET',
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
export const setBrightness = async (brightness) => {
  try {
    const response = await fetch(`${apiUrl}/set-brightness?brightness=${brightness}`, {
      method: 'GET',
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
