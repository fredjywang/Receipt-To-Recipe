// Import dependencies
import React, { useRef, useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
// 1. TODO - Import required model here
import * as tf_mobilenet from "@tensorflow-models/mobilenet";
import Webcam from "react-webcam";
import "./App.css";
// 2. TODO - Import drawing utility here
// e.g. import { drawRect } from "./utilities";

function App() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  // Create states
  const [videoSrc, setvideoSrc] = useState(null);
  const [prediction, setPrediction] = useState('');
  const [probability, setProbability] = useState('');

  // Main function
  const runMobileNet = async () => {
    // 3. TODO - Load network 
    const net = await tf_mobilenet.load();
    console.log("Successfully loaded model.");
    
    //  Loop and detect hands
    setInterval(() => {
      detect(net);
    }, 10);
  };

  const detect = async (net) => {
    // // Check data is available
    // if (
    //   typeof webcamRef.current !== "undefined" &&
    //   webcamRef.current !== null &&
    //   webcamRef.current.video.readyState === 4
    // ) {
    //   // Get Video Properties
    //   const video = webcamRef.current.video;
    //   const videoWidth = webcamRef.current.video.videoWidth;
    //   const videoHeight = webcamRef.current.video.videoHeight;

    //   // Set video width
    //   webcamRef.current.video.width = videoWidth;
    //   webcamRef.current.video.height = videoHeight;

    //   // Set canvas height and width
    //   canvasRef.current.width = videoWidth;
    //   canvasRef.current.height = videoHeight;

      // 4. TODO - Make Detections
      // e.g. const obj = await net.detect(video);
      const webcam = await tf.data.webcam(webcamRef.current);
      while(true) {
        // Capture + classify video image
        const img = await webcam.capture();
        const result = await net.classify(img);

        // Set states
        setPrediction(result[0].className);
        setProbability(result[0].probability);


        // Dispose tensor
        img.dispose();

        // Wait for next animation frame
        // await tf.nextFrame();
      }

      // Draw mesh
      const ctx = canvasRef.current.getContext("2d");

      // 5. TODO - Update drawing utility
      // drawSomething(obj, ctx)  
    // }
  };

  useEffect(()=>{
    runMobileNet();
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia;
    if (navigator.getUserMedia) {
        navigator.getUserMedia({video: true}, handleVideo, videoError);
    }
  },[]);


  // Handle video function
  function handleVideo (stream) {
    // Update the state, triggering the component to re-render with the correct stream
    setvideoSrc({videoSrc: window.URL.createObjectURL(stream)});
  }

  // Video error function 
  function videoError () {

  }

  return (
    <div className="App">
      <>
        {prediction && probability && (
          <h1>
            prediction : {prediction}
            probability : {probability}
          </h1>
        )}
      </>
      <header className="App-header">
        <div>
          <video src={videoSrc} autoPlay="true" ref={webcamRef}/>
        </div>
        {/* <Webcam
          ref={webcamRef}
          muted={true} 
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: 640,
            height: 480,
          }}
        /> */}

        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 8,
            width: 640,
            height: 480,
          }}
        />
      </header>
    </div>
  );

}

export default App;
