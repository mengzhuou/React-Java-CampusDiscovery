import React from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';
import "./InitMap.css"
import { withFuncProps } from "../withFuncProps";

const containerStyle = {
  width: '100%',
  height: '100vh',
  margin: '30px 0px 0px 0px'
};

class InitMap extends React.Component<any,any> {
  constructor(props:any){
    super(props);
    this.state = {
      currentLocation: { lat: 33.77777410980573, lng: -84.39852918539553},
      map: null
    };
    this.dashboardNav = this.dashboardNav.bind(this);
    this.onMapLoad = this.onMapLoad.bind(this);
  }

  dashboardNav = ()=>{
    this.props.navigate("/Dashboard")
  }

  onMapLoad = (map: google.maps.Map) => {
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(({coords: {latitude: lat, longitude: lng}})=>{
        const pos = {lat:lat, lng:lng}
        this.setState({ currentLocation: pos, map:map})
      })
    }
  };

  handleclick=(i:number)=>{
    if(window.confirm("Go to Event?")){
      this.props.setEventID(i);
      this.props.navigate("/EventDescriptionPage")
    }
  }

  render() {
    let arr = this.props.getarr();
    let marker = [];
    for(let i = 0; i < arr.length; i++){
      if(arr[i][6] === -1 && arr[i][7] === -1){
        continue;
      }
      marker.push(<Marker 
        key={i} 
        position={{lat:arr[i][6],lng:arr[i][7]}} 
        onClick={()=>this.handleclick(arr[i][5])}
        label={arr[i][0].length > 20 ? arr[i][0].substring(0,20-3) + "..." : arr[i][0]}
        />);
    }
    
    return this.props.isLoaded ? (
      <div>
        <div className="topnav">
          <button className="topnavButton" onClick={this.dashboardNav}>Dashboard</button>
        </div>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={this.state.currentLocation}
            zoom={15}
            onLoad={this.onMapLoad}
          >
          <p className='mapTitle'>Event Map</p>
          { marker }
          </GoogleMap>
      </div>
    ) : <></>
  }
}
export default withFuncProps(InitMap);
