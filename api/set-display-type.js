// api/set-display-type.js

export default async function handler(req, res) {
    const { type } = req.query;
    const apiKey = process.env.REACT_APP_API_KEY; // API key
   const esp8266IpAddress = process.env.REACT_APP_DDNS_IP; // DDNS cz my ISP Dont provide me static IP
  
    try {
      const response = await fetch(`${esp8266IpAddress}/set-display-type?type=${type}`, {
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
  