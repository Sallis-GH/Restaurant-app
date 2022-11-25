import React from 'react'
import loadingGif from '../images/loading.gif'
import '../__style__/loading.css';




const Loading = () => {
    return (
<>
<img className="loadingGif" src={loadingGif} alt="my-gif" /> 
</>
    );
    }
  
  export default Loading;
