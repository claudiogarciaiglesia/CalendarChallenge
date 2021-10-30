import { fetchWeather } from "../helpers/fetchWeather";
import { toCelsius } from "../helpers/toCelsius";
import { types } from "../types/types";

export const uiShowReminderModal = (payload) => ({
    type: types.uiShowReminderModal,
    payload: payload
});

export const uiStartLoadingWeather = (city, date) => {
    return async (dispatch, getState) => {

        dispatch(setWeather('fetching', null, null, null));

        try {
            let resp = await fetchWeather(`locations/v1/cities/search?apikey=${process.env.REACT_APP_ACCUWEATHER_API_KEY}&q=${city}`);
            let body = await resp.json();

            if (resp.ok) {
                const cityKey = body[0].Key;

                resp = await fetchWeather(`forecasts/v1/daily/5day/${cityKey}?apikey=${process.env.REACT_APP_ACCUWEATHER_API_KEY}`);
                body = await resp.json();
                if (resp.ok) {
                    let found = false;
                    let forecast = {};
                    for (let i = 0; i < body.DailyForecasts.length; i++) {
                        if ((new Date(body.DailyForecasts[i].Date).getFullYear()) === (new Date(date).getFullYear())) {
                        } if ((new Date(body.DailyForecasts[i].Date).getMonth()) === (new Date(date).getMonth())) {
                        } if ((new Date(body.DailyForecasts[i].Date).getDate()) === (new Date(date).getDate())) {
                            found = true;
                            forecast = body.DailyForecasts[i];
                            break;
                        }
                    }
                    if (found) {
                        const icon = forecast.Day.Icon;
                        const maxTemp = forecast.Temperature.Maximum.Value;
                        const minTemp = forecast.Temperature.Minimum.Value;
                        dispatch(setWeather('ok', icon, maxTemp, minTemp));
                    } else {
                        dispatch(uiClearWeather());
                    }



                }
            }
        } catch (error) {
            console.log('Error', error);
        }

    }
}

const setWeather = (status, icon, maxTemp, minTemp) => ({
    type: types.uiSetWeather,
    payload: {
        status: status,
        icon: icon,
        maxTemp: toCelsius(maxTemp),
        minTemp: toCelsius(minTemp)
    }
})

export const uiClearWeather = () => ({
    type: types.uiClearWeather
});