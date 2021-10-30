import React from 'react'
import { useSelector } from 'react-redux'

export const Weather = () => {

    const { icon, maxTemp, minTemp } = useSelector(state => state.ui.weatherState)

    return (
        <>
            <div>
                {
                    !!icon
                        ? <img className="weather-icon" src={`https://developer.accuweather.com/sites/default/files/${(icon) < 10 ? `0${icon}` : icon}-s.png`}></img>
                        : <span className="weather-icon">Weather not available</span>
                }
            </div>
            <div className="weather-temperature">
                {
                    !!icon && <div><span>Max: {maxTemp}°C</span><span>Min: {minTemp}°C</span></div>
                }
            </div>
        </>
    )
}
