import 'bootstrap/dist/css/bootstrap.min.css';
import { register } from 'swiper/element/bundle';
register();

import { MainRouter } from './router/MainRouter';
import { Libraries, LoadScript } from '@react-google-maps/api';
import { useState, useEffect } from 'react';
import { useVerifyAuth } from './hooks/useVerifyAuth';

function App() {
  const [libraries] = useState<Libraries>(['places']);
  const verify = useVerifyAuth();
  
  useEffect(() => {
    verify();
  });

  return (
    <>
      <LoadScript
        googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_KEY}
        libraries={libraries}
      >
        <MainRouter />
      </LoadScript>
    </>
  )
}

export default App
