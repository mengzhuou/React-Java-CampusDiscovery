import { useJsApiLoader } from '@react-google-maps/api';
import { useNavigate } from 'react-router-dom';

export const withFuncProps = (Component: any) => {
  const Wrapper = (props: any) => {
    const navigate = useNavigate();
    const { isLoaded } = useJsApiLoader({
      id: 'google-map-script',
      googleMapsApiKey: "AIzaSyCqcmw27n2Z66yVih4M47FZGLj2vKcJnkA"
    })
    
    return (
      <Component
        navigate={navigate}
        isLoaded={isLoaded}
        {...props}
        />
    );
  };
  
  return Wrapper;
};