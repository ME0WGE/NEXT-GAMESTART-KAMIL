import { NextResponse } from "next/server";
import { users } from "../update/route";
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

export async function GET(request, { params }) {
  try {
    const userId = params.userId;

    // Find user by ID
    const user = users.find((u) => u.id === userId);

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    // Return user without password
    const { password, ...userWithoutPassword } = user;
    return NextResponse.json({
      success: true,
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error("Error in get user route:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PATCH(request, { params }) {
  try {
    const userId = params.userId;
    const updates = await request.json();

    // Find user index
    const userIndex = users.findIndex((u) => u.id === userId);

    if (userIndex === -1) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    // Update user data
    users[userIndex] = { ...users[userIndex], ...updates };

    // Save users to file
    saveUsersToFile();

    // Return updated user without password
    const { password, ...userWithoutPassword } = users[userIndex];
    return NextResponse.json({
      success: true,
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error("Error in update user route:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
