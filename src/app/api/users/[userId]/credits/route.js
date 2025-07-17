import { NextResponse } from "next/server";
import { users } from "../../update/route";
import fs from "fs";
import path from "path";

// Function to save users to the file
function saveUsersToFile() {
  try {
    const usersFilePath = path.join(process.cwd(), "users.json");
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
    console.log("Users saved to file");
    return true;
  } catch (error) {
    console.error("Error saving users to file:", error);
    return false;
  }
}

export async function POST(request, { params }) {
  try {
    const userId = params.userId;
    const { amount } = await request.json();

    // Validate amount
    const creditsAmount = parseFloat(amount);
    if (isNaN(creditsAmount) || creditsAmount <= 0) {
      return NextResponse.json(
        { success: false, message: "Invalid credit amount" },
        { status: 400 }
      );
    }

    // Find user index
    const userIndex = users.findIndex((u) => u.id === userId);

    if (userIndex === -1) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    // Initialize credits if not present
    if (users[userIndex].credits === undefined) {
      users[userIndex].credits = 0;
    }

    // Add credits to user account
    users[userIndex].credits += creditsAmount;

    // Save users to file
    saveUsersToFile();

    // Return updated user without password
    const { password, ...userWithoutPassword } = users[userIndex];
    return NextResponse.json({
      success: true,
      user: userWithoutPassword,
      message: `${creditsAmount} credits added successfully`,
    });
  } catch (error) {
    console.error("Error in add credits route:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
