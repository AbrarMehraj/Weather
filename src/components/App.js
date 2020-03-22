import React from 'react';
import axios from 'axios';
import SearchBar from './SearchBar';
import CurrentWeather from './CurrentWeather';
import Spinner from './Spinner';
import Faker from 'faker';


class App extends React.Component{
   //State 
   state = {
      lat: null,
      lon: null,
      location: '',
      icon: '',
      temp: null,
      des: '',
      maxTemp: null,
      minTemp: null,
      pressure: null,
      humidity: null,
      speed: null,
      errMessage : ''
   };


   //  Api request to the openweathermap
   onSearchSubmit = async (input) =>{
      const apiKey = 'ee562214bd7a53e65252f59d99738075';
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${apiKey}`);
      
      console.log(response.data);
      this.addToState(response.data);
     
   }

   // Helper function
   addToState(res){
      this.setState({ 
         location: res.name,
         icon: res.weather[0].icon,
         des: res.weather[0].main,
         temp: res.main.temp,
         maxTemp: res.main.temp_max,
         minTemp: res.main.temp_min,
         pressure: res.main.pressure,
         humidity: res.main.humidity,
         speed: res.wind.speed
       });
   }


   // Search Automatically
   search = async () =>{
      const apiKey = 'ee562214bd7a53e65252f59d99738075';

      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${this.state.lat}&lon=${this.state.lon}&appid=${apiKey}`);

      console.log(response);

      this.addToState(response.data);
   }


  componentDidMount(){
     window.navigator.geolocation.getCurrentPosition(
        position =>{

         this.setState({
            lat : position.coords.latitude,
            lon : position.coords.longitude
         });

         this.search();

     },
     err =>{
         this.setState({errMessage: err.message});
     }
     )
  }


  // Render content condition's
   renderContent(){
      if(this.state.errMessage && !this.state.location){
         return (
            <div style={{color: 'white' , padding: '2rem'}}>
               <h3>Error: {this.state.errMessage}</h3>
               <h4>Now Search it Manually</h4>
            </div>
         );   
      }

   
      if(this.state.location !== ''){
         var iconCode = this.state.icon;
         return (
            <CurrentWeather 
            location ={this.state.location}
            icon = {`http://openweathermap.org/img/wn/${this.state.icon}@2x.png`}
            temp = {this.state.temp}
            des = {this.state.des}
            maxTemp = {this.state.maxTemp}
            minTemp = {this.state.minTemp}
            pressure = {this.state.pressure}
            humidity = {this.state.humidity}
            speed = {this.state.speed} />
         )
      }
      
      return <Spinner message='Please accept the request location...' />
   };


   render(){
      return (
         <div style={{ maxWidth:'700px', margin:'auto'}}>
            <SearchBar onSubmit={this.onSearchSubmit} />
            {this.renderContent()}
         </div>
      );
   }
}


export default App;