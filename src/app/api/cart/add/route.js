import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// In-memory store for development
export let cartItems = [];

// Path to cart.json file
const cartFilePath = path.join(process.cwd(), "cart.json");

// Load cart data from the file on startup
try {
  if (fs.existsSync(cartFilePath)) {
    const data = fs.readFileSync(cartFilePath, "utf8");
    cartItems = JSON.parse(data);
    console.log("Loaded cart from file:", cartItems);
  } else {
    // Initialize empty cart file if it doesn't exist
    fs.writeFileSync(cartFilePath, JSON.stringify(cartItems, null, 2));
    console.log("Created new cart file");
  }
} catch (error) {
  console.error("Error loading cart from file:", error);
}

// Function to save cart to the file
function saveCartToFile() {
  try {
    fs.writeFileSync(cartFilePath, JSON.stringify(cartItems, null, 2));
    console.log("Cart saved to file");
    return true;
  } catch (error) {
    console.error("Error saving cart to file:", error);
    return false;
  }
}

export async function POST(request) {
  try {
    const game = await request.json();

    // Find existing item in cart
    const existingIndex = cartItems.findIndex((item) => item.id === game.id);

    if (existingIndex >= 0) {
      // Do nothing, you can't add more than one quantity of the same game to the cart
      console.log("You already have this game in your cart");
    } else {
      // Determine the price to use for calculations (discounted price if available, otherwise regular price)
      const priceToUse =
        game.hasDiscount && game.discountedPrice
          ? game.discountedPrice
          : game.price;

      // Add new item to cart with the correct price structure
      cartItems.push({
        ...game,
        // Keep the original price in the price field for display purposes
        price: game.price, // Original price (for crossed-out display)
        // Add a separate field for the actual price to pay
        priceToPay: priceToUse, // Price after discount (for calculations)
        quantity: 1,
      });
      console.log(
        "Game added to cart with original price:",
        game.price,
        "and price to pay:",
        priceToUse
      );
    }

    // Save cart to file
    saveCartToFile();

    // Return success response with updated cart
    return NextResponse.json({
      success: true,
      cart: cartItems,
    });
  } catch (error) {
    console.error("Error in cart add route:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
