// Import dependencies
import React, { useRef, useState, useEffect } from "react";
// import * as tf from "@tensorflow/tfjs";
// // 1. TODO - Import required model here
// import * as tf_mobilenet from "@tensorflow-models/mobilenet";
import axios from "axios";
import Webcam from "react-webcam";
import "../App.css";
// 2. TODO - Import drawing utility here
// e.g. import { drawRect } from "./utilities";

const Detect = () => {
  // Creating references
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  // Initializing img state
  const [img, setImg] = useState('');
  const [receiptData, setreceiptData] = useState([]);

  // Take a photo using webcam
  const capture = React.useCallback(
    () => {
      let imgSrc = webcamRef.current.getScreenshot();
      setImg(imgSrc);
      getReceiptData(imgSrc);
    },
    [webcamRef]
  );
  

  // Call Taggun API
  const getReceiptData = (img) => {
    const TAGGUN_KEY = process.env.REACT_APP_TAGGUN_KEY;
    console.log(TAGGUN_KEY);
    const base_url = "https://api.taggun.io/api/receipt/v1/verbose/encoded";
    axios
      .post(
        `${base_url}`,
        {
          headers: {
            "Content-Type": null,
            "apikey": TAGGUN_KEY
          },
          body: {
            "body": img
          }
        }
      )
      .then((res) => {
        console.log(res.data);
        setreceiptData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    }

  // // Create states
  // const [prediction, setPrediction] = useState("");
  // const [probability, setProbability] = useState("");

  // // // Main function
  // // const runMobileNet = async () => {
  // //   // 3. TODO - Load network
  // //   const net = await tf_mobilenet.load();
  // //   console.log("Successfully loaded model.");

  // //   //  Loop and detect hands
  // //   setInterval(() => {
  // //     detect(net);
  // //   }, 10);
  // // };

  // const detect = async (net) => {
  //   // Check data is available
  //   if (
  //     typeof webcamRef.current !== "undefined" &&
  //     webcamRef.current !== null &&
  //     webcamRef.current.video.readyState === 4
  //   ) {
  //     // Get Video Properties
  //     const video = webcamRef.current.video;
  //     const videoWidth = webcamRef.current.video.videoWidth;
  //     const videoHeight = webcamRef.current.video.videoHeight;

  //     // Set video width
  //     webcamRef.current.video.width = videoWidth;
  //     webcamRef.current.video.height = videoHeight;

  //     // Set canvas height and width
  //     canvasRef.current.width = videoWidth;
  //     canvasRef.current.height = videoHeight;

  //     // 4. TODO - Make Detections
  //     // e.g. const obj = await net.detect(video);
  //     // const webcam = await tf.data.webcam(video);

  //     while (true) {
  //       const img = await tf.browser.fromPixels(video);
  //       // Capture + classify video image
  //       // const img = await webcam.capture();
  //       const result = await net.classify(img);

  //       // Set states
  //       setPrediction(result[0].className);
  //       setProbability(result[0].probability);

  //       // Dispose tensor
  //       img.dispose();

  //       // Wait for next animation frame
  //       await tf.nextFrame();
  //     }

  //     // Draw mesh
  //     //const ctx = canvasRef.current.getContext("2d");

  //     // 5. TODO - Update drawing utility
  //     // drawSomething(obj, ctx)
  //   }
  // };

  // useEffect(() => {
  //   runMobileNet();
  // }, []);

  return (
    <div className='App'>
      {/* <>
        {prediction && probability && (
          <h1>
            prediction : {prediction}
            <br />
            probability : {probability}
          </h1>
        )}
      </> */}
      <header className='App-header'>
        <Webcam
          ref={webcamRef}
          muted={true}
          screenshotFormat='image/jpeg'
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
        />

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

      <button onClick={capture} className='positionInBottom'>Take a photo</button>
      {img && (
        <img 
          src = {img}
          alt = "this is me"
        />
      )}

    </div>
  );
};

export default Detect;
