import React, {useEffect, useState} from 'react';
import "../Dashboard/Dashboard.css";
import "../EventDescription/EventDescriptionPage.css";
import {LoadMapApi} from './LoadMapApi';
import EventMap from './EventMap';


function Map(props:any){
    const[scriptLoaded, setScriptLoaded] = useState(false);

    useEffect( () => {
        const googleMapScript = LoadMapApi();
        googleMapScript.addEventListener('load', function(){
            setScriptLoaded(true);
        })
    }, []
    );

    return (
        <div className = "App">
            <header className="App-header">
                <p>The map of this Event</p>
            </header>

            {scriptLoaded && (
                <EventMap mapType= {google.maps.MapTypeId.ROADMAP} mapTypeControl={true}/>
            )}

        </div>

        
    );
}

export default Map;
/**import React, {useEffect, useState} from 'react';
import {LoadMapApi} from './LoadMapApi';

function Map(){
    const[scriptLoaded, setScriptLoaded] = useState(false);

    useEffect( () => {
        const googleMapScript = LoadMapApi();
        googleMapScript.addEventListener('load', function(){
            setScriptLoaded(true);
        })
    }, []
    );

    return(
        <div>
            {scriptLoaded && (
                <Map mapType= {google.maps.MapTypeId.ROADMAP} mapTypeControl={true}/>
            )}
        </div>
    )

} */