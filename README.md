# BlTestTask - React Native

This is a sample e-commerce app built with React Native that includes essential screens like Signup, Login, Home, Cart, and Checkout. The app demonstrates functionality such as navigating between screens, adding items to a cart, and placing an order using a "Cash on Delivery" payment method.

Getting Started

# Prerequisites
Make sure you have Node.js and Yarn installed on your system.
Ensure you have React Native CLI installed for building and running the project.

# Installation
  1. Clone this repository:
  git clone https://github.com/sushantdwivedi/BlTestTask.git
  cd BlTestTask

  2. Install dependencies with Yarn:
  yarn install

# Running the App
  1. Start the Metro bundler:
      yarn start
     
  2. Run the app on an Android or iOS device:

  a. For Android:
      yarn android
  b. For iOS:
      yarn ios

## Screens Overview
  Below is a brief description of each screen in the application.
   ![Home Screen](assets/Splash0001.png)

  1. Signup Screen
      Allows new users to create an account by entering their email, password, and confirming their password.
      Upon successful signup, the user is navigated to the Login Screen.
  2. Login Screen
      Users can log in with their email and password.
      If login is successful, the user is directed to the Home Screen.
  3. Home Screen
      Displays a list of available products with details such as title, price, and a thumbnail image.
      Users can scroll through the product list, add products to the cart, and navigate to the Cart screen.
      Includes a cart icon in the header for quick access to the Cart screen.
  4. Cart Screen
      Shows all products added to the cart.
      Users can view each item’s details, such as title, price, and quantity.
      Options to remove items from the cart and proceed to the Checkout screen are available.
  5. Checkout Screen
      Displays the selected items for checkout and the total amount.
      Currently, the payment method is set to "Cash on Delivery" by default.
      Includes a "Place Order" button which, when pressed, shows a success animation and resets the cart.


     
     
