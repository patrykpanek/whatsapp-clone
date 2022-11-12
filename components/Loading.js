import React from 'react';

function Loading() {
  return (
    <center style={{ display: 'grid', placeItems: 'center', height: '100vh' }}>
      <div>
        <img
          src="https://cdn2.downdetector.com/static/uploads/logo/whatsapp-messenger.png"
          height={200}
          alt="whatsapp"
        />
      </div>
    </center>
  );
}

export default Loading;
