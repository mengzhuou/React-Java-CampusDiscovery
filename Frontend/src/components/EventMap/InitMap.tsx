import React, { Component } from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import "./InitMap.css"
import { withRouter } from "../withRouter";

const containerStyle = {
  width: '100%',
  height: '100vh',
  margin: '30px 0px 0px 0px'
};

const center = {
  lat: 33.7756,
  lng: -84.3963
};

class InitMap extends React.Component<any,any> {
  constructor(props:any){
    super(props);
    this.state = {
      currentLocation: { latitude: 0, longitude: 0},
      firstload: true
      
    };
    this.onMapLoad = this.onMapLoad.bind(this);
  }

  dashboardNav = ()=>{
    this.props.navigate("/Dashboard")
  }

  onMapLoad = () => {
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(({coords: {latitude: lat, longitude: lng}})=>{
        const pos = {lat, lng}
        this.setState({ currentLocation: pos })
      })
    }
  };
  
  render() {
    return (
      <div>
        <div className="topnav">
                    <button className="topnavButton" onClick={this.dashboardNav}>Dashboard</button>
        </div>
        <LoadScript
          googleMapsApiKey="AIzaSyCqcmw27n2Z66yVih4M47FZGLj2vKcJnkA"
          
        >
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}
            onLoad={this.onMapLoad}
          >
          <p className='mapTitle'>Event Map</p>
            { /* Child components, such as markers, info windows, etc. */ }
            <></>
          </GoogleMap>
        </LoadScript>
      </div>
    )
  }
}
export default withRouter(InitMap);