import React from 'react';
import { Circle } from 'better-react-spinkit';

function Loading() {
  return (
    <center style={{ display: 'grid', placeItems: 'center', height: '100vh' }}>
      <div>
        <img
          src="https://cdn2.downdetector.com/static/uploads/logo/whatsapp-messenger.png"
          height={200}
          alt="whatsapp"
        />
        <Circle size={60} color="green" />
      </div>
    </center>
  );
}

export default Loading;
