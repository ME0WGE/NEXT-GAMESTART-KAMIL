import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const usersFilePath = path.join(process.cwd(), "users.json");
const cartFilePath = path.join(process.cwd(), "cart.json");

function loadUsers() {
  try {
    const data = fs.readFileSync(usersFilePath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error loading users:", error);
    return [];
  }
}

function loadCart() {
  try {
    const data = fs.readFileSync(cartFilePath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error loading cart:", error);
    return [];
  }
}

function saveUsersToFile(users) {
  try {
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
  } catch (error) {
    console.error("Error saving users:", error);
    throw new Error("Failed to save user data");
  }
}

function clearCart() {
  try {
    fs.writeFileSync(cartFilePath, JSON.stringify([], null, 2));
  } catch (error) {
    console.error("Error clearing cart:", error);
    throw new Error("Failed to clear cart");
  }
}

export async function POST(request) {
  try {
    const { userId, total } = await request.json();

    if (!userId || !total) {
      return NextResponse.json(
        { success: false, message: "User ID and total are required" },
        { status: 400 }
      );
    }

    const users = loadUsers();
    const userIndex = users.findIndex((user) => user.id === userId);

    if (userIndex === -1) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    const user = users[userIndex];
    const currentBalance = user.creditBalance || 0;

    // Check if user has sufficient credits
    if (currentBalance < total) {
      return NextResponse.json(
        {
          success: false,
          message: "Insufficient credit balance",
          currentBalance,
          required: total,
        },
        { status: 400 }
      );
    }

    // Load cart items to add to purchased games
    const cartItems = loadCart();

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

    // Deduct credits and add games to purchased list
    users[userIndex].creditBalance = currentBalance - parseFloat(total);
    users[userIndex].purchasedGames = [
      ...currentPurchasedGames,
      ...newPurchases,
    ];

    saveUsersToFile(users);
    clearCart();

    return NextResponse.json({
      success: true,
      message: "Purchase completed successfully with credits",
      user: users[userIndex],
    });
  } catch (error) {
    console.error("Error processing credit purchase:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
