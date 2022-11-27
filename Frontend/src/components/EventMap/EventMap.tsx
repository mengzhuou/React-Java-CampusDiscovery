import { GoogleMap, Marker, InfoWindow } from 'react-google-maps';
import React, {useEffect, useRef, useState} from 'react';

interface IMap{
    mapType: google.maps.MapTypeId,
    mapTypeControl?: boolean;
}

type GoogleLatLng = google.maps.LatLng;
type Googlemap = google.maps.Map;


const EventMap: React.FC <IMap> =(mapType, mapTypeControl = false) => {
    const ref = useRef<HTMLDivElement>(null);
    const [map, setMap] = useState<Googlemap>();

    const startMap =() : void => {
        if (!map){
            //TODO
        }
    };

    useEffect(startMap, [map]);

    const defaultMapStart =(): void => {
        const defaultAddress = new google.maps.LatLng(33.75,84.38);
        initMap(5,defaultAddress);
    };

    const initMap = (zoomLevel:number, address: GoogleLatLng): void =>{
        if (ref.current){
            setMap(
                new google.maps.Map(ref.current, {
                    zoom: zoomLevel,
                    center: address,
                    mapTypeControl: mapTypeControl,
                    //streeViewControl: false,
                    zoomControl:true,
                    //mapTypeId: mapType
                })
            );
        }
    };

    return (
        <div className = "map-container">
            <div ref = {ref} className = "map-map"></div>
        </div>
    );
};


export default EventMap;