import { NextResponse } from "next/server";
import { users } from "../update/route";
import fs from "fs";
import path from "path";

// Function to save users to the file
function saveUsersToFile() {
  try {
    const usersFilePath = path.join(process.cwd(), "users.json");
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
    console.log("Users saved to file after OAuth sync");
    return true;
  } catch (error) {
    console.error("Error saving users to file:", error);
    return false;
  }
}

export async function POST(request) {
  try {
    const oauthUser = await request.json();

    // Check required fields
    if (!oauthUser.email) {
      console.error("Missing email in OAuth user data");
      return NextResponse.json(
        { success: false, message: "Missing email in OAuth user data" },
        { status: 400 }
      );
    }

    // Check if the OAuth user already exists in our database (by email)
    const existingUserIndex = users.findIndex(
      (user) =>
        user.email === oauthUser.email && user.oauthProvider === "google"
    );

    let userId;

    if (existingUserIndex >= 0) {
      // Update existing user with latest OAuth data but preserve other fields
      const existingUser = users[existingUserIndex];
      users[existingUserIndex] = {
        ...existingUser,
        name: oauthUser.name || existingUser.name,
        email: oauthUser.email,
        avatar_url: oauthUser.image || existingUser.avatar_url,
        isConnected: true,
        oauthProvider: "google",
        creditBalance: existingUser.creditBalance || 0, // Preserve existing credit balance
      };

      userId = existingUser.id;
      console.log(
        "Updated existing Google user:",
        users[existingUserIndex].email
      );
    } else {
      // Create new user from OAuth data with a unique ID
      const newUser = {
        id: Date.now().toString(),
        name: oauthUser.name || "User",
        email: oauthUser.email,
        avatar_url: oauthUser.image || null,
        description: "",
        purchasedGames: [],
        isConnected: true,
        oauthProvider: "google",
        creditBalance: 0, // Initialize with 0 credits
      };

      users.push(newUser);
      userId = newUser.id;
      console.log("Created new Google user:", newUser.email);
    }

    // Save users to file
    saveUsersToFile();

    // Return success with user ID and full user data
    const userIndex = users.findIndex((u) => u.id === userId);
    if (userIndex === -1) {
      return NextResponse.json(
        { success: false, message: "Failed to retrieve user after sync" },
        { status: 500 }
      );
    }

    // Return without password
    const { password, ...userWithoutPassword } = users[userIndex];

    return NextResponse.json({
      success: true,
      userId: userId,
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error("Error in OAuth user sync:", error);
    return NextResponse.json(
      { success: false, message: "Failed to sync OAuth user" },
      { status: 500 }
    );
  }
}
