import React,{useEffect, useState} from "react";

export const useYouTubeStats = () => {

    const [youtubeData, setYoutubeData] = useState(2)

    useEffect(()=>{
        const fetchYoutubeData = () => {
            fetch(`https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=UCEGRaTSnDX6zbhjD92e7XOw&key=AIzaSyCYkjwjv7h9rovSpIn4n3nXblNKDjE5q6k`)
            .then(res => res.json())
            .then(res => {
                //console.log("Dataa: ",res)
                setYoutubeData(res.items[0].statistics)
               // console.log("Subs: ",res.items[0].statistics.subscriberCount)
            }).catch(err => console.error(err))
        } 

        fetchYoutubeData()
    },[])

    return { youtubeData }
}
