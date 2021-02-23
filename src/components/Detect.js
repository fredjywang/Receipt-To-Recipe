// Import dependencies
import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import Webcam from "react-webcam";
import "../App.css";
import Recipe from "./Recipe";

const Detect = () => {
  // Creating references
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  // Initializing img state
  const [img, setImg] = useState("");
  const [showRecipe, setShowRecipe] = useState(false);
  const [receiptData, setReceiptData] = useState([]);

  // Take a photo using webcam
  const capture = React.useCallback(() => {
    let imgSrc = webcamRef.current.getScreenshot();
    setImg(imgSrc);
    getReceiptData(imgSrc);
  }, [webcamRef]);

  // Call Taggun API
  const getReceiptData = (image) => {
    const base_url = "https://api.taggun.io/api/receipt/v1/verbose/encoded";
    const data = {
      image: image.slice(23, image.length - 1),
      filename: "example.jpg",
      contentType: "image/jpeg",
      refresh: false,
      incognito: false,
      ipAddress: "32.4.2.223",
    };
    // Send a POST request
    axios
      .post(base_url, data, {
        headers: {
          accept: "application/json",
          apikey: process.env.REACT_APP_TAGGUN_KEY,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setReceiptData(res.data.amounts.map((item, index) => item.text));
        setShowRecipe(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

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

      <button onClick={capture} className='positionInBottom'>
        Take a photo
      </button>
      {img && <img src={img} alt='this is me' />}
      <>{showRecipe && <Recipe ingredientArray={receiptData} />}</>
    </div>
  );
};

export default Detect;
