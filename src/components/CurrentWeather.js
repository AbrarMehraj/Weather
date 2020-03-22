import './CurrentWeather.css';
import React from 'react';


const CurrentWeather = (props) => {

   const k2C = (temp)=>{ 

      if(temp != null){ 
         return Math.round(temp - 272.3);
      }
   }
   
   
   return(
      <div className="w-wrapper">
         <div className="w-header">
            <h2 className="w-location"><i className="tiny location arrow icon"></i> {props.location}</h2>
            <img  alt='Loading error' src={props.icon} className= "w-icon" />
            <h3 className = "w-desc">{props.des}</h3>
            <h2 className = "w-temp">{k2C(props.temp)} °C</h2>
            <div className="temp">
               <div className = "temp-min"><i className="long arrow alternate up icon"></i> {k2C(props.maxTemp)} °C</div>
               <div className = "temp-max"><i className="long arrow alternate down icon"></i> {k2C(props.minTemp)} °C</div>
            </div>
         </div>
      
         <div className="w-bottom">
            <div className="w-pressure">Pressure {props.pressure} hps</div>
            <div className="w-pre">Humidity {props.humidity } %</div>
            <div className="w-speed">Speed {props.speed} m/s</div>
         </div>
     </div>
   );
}

export   default CurrentWeather; 