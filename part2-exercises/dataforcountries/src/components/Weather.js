import { useState, useEffect} from 'react'
import axios from 'axios'

const Weather = ({location}) => {
    const [ isloading, setLoad ] = useState(true)
    const [ weatherdata, setWeather ] = useState({})
    
    function fetchweather(location){
        const url = "http://api.weatherstack.com/current?access_key=" + 
                process.env.REACT_APP_SECRET + "&query=" + location
        console.log("url is",url)
        console.log("fectching weather")
        axios.get(url).then(response => {
            console.log("got the weather")
            console.log(response.data)
            setWeather(response.data.current)
            setLoad(false)
        })
    }
    useEffect(() => {fetchweather(location)}, [location])

    if (isloading){
        return <p>FECTHING DATA PLEASE WAIT!!!!</p>
    }
    else{
        if(weatherdata === undefined) return(<p>Error in fetching, please check console.</p>)
        return (
            <>
                <h1>Weather in {location}</h1>
                <p>Temperature : {weatherdata.temperature}</p>
                <img src={weatherdata.weather_icons[0]} alt="Weather Icon"/>
            </>
        )
    }
}

export default Weather