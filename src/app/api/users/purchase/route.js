import { NextResponse } from "next/server";
import { users } from "../update/route";
import { cartItems } from "../../cart/add/route";
import fs from "fs";
import path from "path";

// Function to save users to the file
function saveUsersToFile() {
  try {
    const usersFilePath = path.join(process.cwd(), "users.json");
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
    console.log("Users saved to file after purchase");
    return true;
  } catch (error) {
    console.error("Error saving users to file:", error);
    return false;
  }
}

// Function to clear cart
function clearCart() {
  try {
    const cartFilePath = path.join(process.cwd(), "cart.json");
    // Clear cart items array
    cartItems.length = 0;
    // Save empty cart to file
    fs.writeFileSync(cartFilePath, JSON.stringify(cartItems, null, 2));
    console.log("Cart cleared after purchase");
    return true;
  } catch (error) {
    console.error("Error clearing cart:", error);
    return false;
  }
}

export async function POST(request) {
  try {
    const { userId } = await request.json();

    // Find user index
    const userIndex = users.findIndex((u) => u.id === userId);

    if (userIndex === -1) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    // Get current cart items
    if (cartItems.length === 0) {
      return NextResponse.json(
        { success: false, message: "Cart is empty" },
        { status: 400 }
      );
    }

    // Add items to user's purchased games if not already owned
    const currentPurchasedGames = users[userIndex].purchasedGames || [];
    const newPurchases = cartItems.filter(
      (item) => !currentPurchasedGames.some((game) => game.id === item.id)
    );

    // Update user's purchased games
    users[userIndex].purchasedGames = [
      ...currentPurchasedGames,
      ...newPurchases,
    ];

    // Save users to file
    saveUsersToFile();

    // Clear cart
    clearCart();

    // Return updated user without password
    const { password, ...userWithoutPassword } = users[userIndex];
    return NextResponse.json({
      success: true,
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error("Error in purchase route:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
