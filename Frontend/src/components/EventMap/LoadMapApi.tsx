export const LoadMapApi = () => {
    // const mapsURL = 'https://maps.googleapis.com/maps/api/js?key==&libraries=places$language=no&v=quarterly';
    const mapsURL = 'https://www.google.com/maps/embed/v1/MAP_MODE?key=AIzaSyCqcmw27n2Z66yVih4M47FZGLj2vKcJnkA&Space+Needle,Seattle+WA'
    const scripts = document.getElementsByTagName('script');

    for (let i =0; i < scripts.length; i++) {
        if (scripts[i].src.indexOf(mapsURL) === 0) {
            return scripts[i];
        }
    }

    const googleMapScript = document.createElement('script');
    googleMapScript.src = mapsURL;
    googleMapScript.async = true;
    googleMapScript.defer = true;
    window.document.body.appendChild(googleMapScript);

    return googleMapScript;
}