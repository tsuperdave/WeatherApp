import React from 'react';

const Weather = props => {
    return (
        <div className="container text-light">
            <div className="cards pt-4">
                <h1>{props.city}</h1>
                <h5 className="py-4">
                    <i className={`wi ${props.weathericon} display-1`}></i>
                </h5>

                {props.temp_farenheit ? (
                    <h1 className="py-2">{props.temp_farenheit}&deg;F</h1>
                ): null}
                               

                {/** show min and max temp */}
                {minMaxTemp(props.temp_min, props.temp_max)}

                <h4 className="py-3">{props.description}</h4>
            </div>
        </div>
    );
}

function minMaxTemp(min, max){
    if(min && max) {
        return(
            <h3>
            <span className="px-4">{min}&deg;F</span>
            <span className="px-4">{max}&deg;F</span>
        </h3>
        );
    }
    
}

export default Weather;