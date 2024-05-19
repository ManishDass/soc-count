// api/set-brightness.js

export default async function handler(req, res) {
    const { brightness } = req.query;
    const apiKey = process.env.REACT_APP_API_KEY; // API key
   const esp8266IpAddress = process.env.REACT_APP_DDNS_IP; // DDNS cz my ISP Dont provide me static IP
  
    try {
      const response = await fetch(`http://manishdas.ddns.net/set-brightness?brightness=${brightness}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ae55df63-7f1f-4c41-be1e-c1bfcb1a4a7e`
        }
      });
      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  