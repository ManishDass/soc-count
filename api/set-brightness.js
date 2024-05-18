// api/set-brightness.js

export default async function handler(req, res) {
    const { brightness } = req.query;
    const apiKey = 'ae55df63-7f1f-4c41-be1e-c1bfcb1a4a7e'; // Replace with your API key
    const esp8266IpAddress = 'http://117.209.106.78:80'; // Replace with your ESP8266 IP address
  
    try {
      const response = await fetch(`${esp8266IpAddress}/set-brightness?brightness=${brightness}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${apiKey}`
        }
      });
      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  