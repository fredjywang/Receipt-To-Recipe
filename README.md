# Receipt To Recipe

### What our app does
We created this app because we realized that as people are staying at home more, which means that people are likely cooking at home a lot more than before. However, not everyone is an expert at cooking, or even knows what dishes they are able to cook with the ingredients they have on hand. This app was made to help solve that issue. The app leverages Taggun's Optical Character Recognition (OCR) technology as well as Spoonacular API to allow users to scan their grocery receipts and display possible recipes they can make with the items scanned from the receipt. The app is able to also tell users their "missed" ingredients -- this means that if a user is a couple of ingredients short from a recipe, the app will still tell the user the name of the recipe along with the additional receipes they would need to make that recipe. As well, we used React's webcam module in order to allow the user to capture pictures through the app.

### How we built it
As said in the project description above, we used React's webcam module to allow the user to capture images through the application. These images were then processed with Taggun API (available at [here](https://api.taggun.io/)). From there, we used Spoonacular's recipe API (available [here](https://spoonacular.com/food-api)) in order to determine what recipes were available based on the list of ingredients provided. The app was put together using React and will be deployed soon.

