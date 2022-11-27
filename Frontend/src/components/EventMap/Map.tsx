// import "../Dashboard/Dashboard.css";
// import "../EventDescription/EventDescriptionPage.css";
// import {LoadMapApi} from './LoadMapApi';
// import EventMap from './EventMap';
import React, { useMemo, useEffect, useState} from 'react';
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

function Map(){
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY !== undefined? process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY : '',
    });

    if(!isLoaded) return <div>Loading...</div>;
    return <MapRun />;
}

function MapRun(){
    return (
        <div>
            <GoogleMap>
                zoom={10} 
                center={{lat: 44, lng: -88}} 
            </GoogleMap> 
        </div>
    )
}

export default Map;


// function Map(props:any){
//     const[scriptLoaded, setScriptLoaded] = useState(false);

//     useEffect( () => {
//         const googleMapScript = LoadMapApi();
//         googleMapScript.addEventListener('load', function(){
//             setScriptLoaded(true);
//         })
//     }, []
//     );

//     return (
//         <div className = "App">
//             <header className="App-header">
//                 <p>The map of this Event</p>
//             </header>

//             {scriptLoaded && (
//                 <EventMap mapType= {google.maps.MapTypeId.ROADMAP} mapTypeControl={true}/>
//             )}

//         </div>

        
//     );
// }

// export default Map;