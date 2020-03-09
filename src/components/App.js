import React from 'react';
import axios from 'axios';
import SearchBar from './SearchBar';
import CurrentWeather from './CurrentWeather';
import NextFive from './NextFive';
import Spinner from './Spinner';



class App extends React.Component{
   //State 
   state = {
      name: '',
      icon:'',
      des: '',
      maxTemp: null,
      minTemp: null,
      pressure: null,
      humidity: null,
      speed: null,
      lat: null,
      errMessage : ''
   };

   //  Api request to the openweathermap
   onSearchSubmit = async (input) =>{
      const apiKey = 'ee562214bd7a53e65252f59d99738075';

      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${apiKey}`)
      
      console.log(response.data);
      this.setState({ 
         name: response.data.name,
         icon: response.data.weather[0].icon,
         des: response.data.weather[0].main,
         maxTemp: response.data.main.temp_max,
         minTemp: response.data.main.temp_min,
         pressure: response.data.main.pressure,
         humidity: response.data.main.humidity,
         speed: response.data.wind.speed
       });
   }

   componentDidMount(){
      window.navigator.geolocation.getCurrentPosition(
          position => this.setState({lat : position.coords.latitude}),
          err => this.setState({errMessage: err.message})
      );
  }

  // Render content condition's
   renderContent(){
      if(this.state.errMessage && !this.state.name){
         return (
            <div style={{color: 'white' , padding: '2rem'}}>
               <h3>Error: {this.state.errMessage}</h3>
               <h4>Now Search it Manually</h4>
            </div>
         );   
      }

      if(this.state.lat && !this.state.name){
         return (
            <div style={{color: 'white' , padding: '2rem'}}>
               <h5>Failed To fetch your current location</h5>
               <h5>Now Search it Manually</h5>
            </div>
         );
      }

      if(this.state.name != '' ){
         return (
            <CurrentWeather 
            location ={this.state.name}
            icon = {this.state.icon}
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
