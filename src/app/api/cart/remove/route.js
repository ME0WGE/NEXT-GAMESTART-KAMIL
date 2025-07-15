import { NextResponse } from "next/server";
import { cartItems } from "../add/route";
import fs from "fs";
import path from "path";

// Path to cart.json file
const cartFilePath = path.join(process.cwd(), "cart.json");

// Function to save cart to the file
function saveCartToFile() {
  try {
    fs.writeFileSync(cartFilePath, JSON.stringify(cartItems, null, 2));
    console.log("Cart saved to file after removal");
    return true;
  } catch (error) {
    console.error("Error saving cart to file:", error);
    return false;
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const gameId = searchParams.get("gameId");

    if (!gameId) {
      return NextResponse.json(
        { success: false, message: "Game ID is required" },
        { status: 400 }
      );
    }

    // Filter out the item with the matching ID
    // Since we're modifying the original array reference, this will affect all routes
    const index = cartItems.findIndex((item) => item.id === parseInt(gameId));
    if (index !== -1) {
      cartItems.splice(index, 1);
      // Save cart to file after removal
      saveCartToFile();
    }

    // Return success response with updated cart
    return NextResponse.json({
      success: true,
      cart: cartItems,
    });
  } catch (error) {
    console.error("Error in cart remove route:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
