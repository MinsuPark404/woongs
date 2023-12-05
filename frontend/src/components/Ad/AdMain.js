import React, { useEffect } from 'react';

function AdMain() {
  useEffect(() => {
    console.log('현재 페이지 URL:', window.location.href);
  }, []);
  return (
    <>
      <iframe
        src="http://localhost:3000/"
        width="100%"
        height="100%"
        frameborder="0"
        title="AdMain"
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-presentation allow-top-navigation allow-same-origin"
      />
      {/* <a href="http://localhost:5001/" target="_blank" rel="noopener noreferrer">
            </a> */}
    </>
  );
}

export default AdMain;
