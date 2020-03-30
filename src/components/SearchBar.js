import './SearchBar.css';
import React from 'react';



class SearchBar extends React.Component{
   state = {input: ''};

    onFormSubmit = (event) =>{
      event.preventDefault();
      
      this.props.onSubmit(this.state.input);
      this.setState({input: ''});
   };

   render(){
      return (
         <div className="header" >
            <form className="search"  onSubmit={this.onFormSubmit}>
               <button className="search__button">
                   <i className="search icon"></i>
               </button>
               <input type="text" className="search__input"
                  placeholder="Search Location"
                  value={this.state.input} 
                  onChange={e=> this.setState({input: e.target.value})}
                  
                   />
                  
            </form>
            <div className="title">K-Weather</div>
        </div>
      ) ;
   }

}

export default SearchBar;