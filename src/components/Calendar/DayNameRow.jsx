import moment from 'moment';

export const DayNameRow = () => {


    const weekDayNames = moment.weekdays();

    return (
        <div className="day-name-row-wrapper">
            {/* Wrapper for day name boxes */}
            <div className="column-day-name-row-wrapper no-select">
                {
                    weekDayNames.map((day, index) => (
                        <div className="column-day-name-row" key={index}>{day}</div>
                    ))
                }
            </div>
        </div>
    )
}
