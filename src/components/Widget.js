import React, { useState } from 'react'

const Widget = ({imagePath, api, label}) => {
  const [data, setData] = useState();

  const fetchData = async (url) => {
    console.log('fetchData called with url:', url); // This will log when fetchData is called
    try {
      let res = await fetch(url);
      let json = await res.json();
      setData(json);
      console.log(json); // This will log the JSON response
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };
  


  return (
    <div onClick={() => fetchData(api)}>
      <img src={imagePath} alt={label} />
      <p>{label}</p>
    </div>
  )
}

export default Widget