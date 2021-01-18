// Import dependencies
import React, { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";

const Recipe = (props) => {
  const ingredientArray = props.ingredientArray;
  const [recipes, setRecipes] = useState("");
  useEffect(() => {
    console.log(process.env);
    getRecipes();
  }, []);

  useEffect(() => {
    console.log(ingredientArray);
  }, []);

  function getRecipes() {
    const baseURL = "https://api.spoonacular.com/recipes/findByIngredients";
    const ingredientString = "banan,+flour,+sugar";
    axios
      .get(
        `${baseURL}?apiKey=${process.env.REACT_APP_API_KEY}&ingredients=${ingredientString}&number=2`,
        {
          headers: {
            "Content-Type": null,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        setRecipes(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className='App'>
      {recipes.length &&
        recipes.map((recipe, index) => (
          <div key={recipe.id}>{recipe.title}</div>
        ))}
    </div>
  );
};

export default Recipe;
