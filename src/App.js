// Import dependencies
import React, { useRef, useState, useEffect } from "react";
import Detect from "./components/Detect";
import Recipe from "./components/Recipe";

function App() {
  return (
    <div className='App'>
      <Detect />
      <Recipe />
    </div>
  );
}

export default App;
