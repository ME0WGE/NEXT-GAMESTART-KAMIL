import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// In-memory store for development
export let users = [
  {
    id: "1",
    name: "admin",
    email: "a@a.a",
    password: "123",
    description: "Administrator account",
    purchasedGames: [],
    isConnected: false,
  },
];

// Path to users.json file
const usersFilePath = path.join(process.cwd(), "users.json");

// Load users data from the file on startup
try {
  if (fs.existsSync(usersFilePath)) {
    const data = fs.readFileSync(usersFilePath, "utf8");
    users = JSON.parse(data);
    console.log("Loaded users from file:", users);
  } else {
    // Initialize users file if it doesn't exist
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
    console.log("Created new users file");
  }
} catch (error) {
  console.error("Error loading users from file:", error);
}

// Function to save users to the file
function saveUsersToFile() {
  try {
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
    console.log("Users saved to file");
    return true;
  } catch (error) {
    console.error("Error saving users to file:", error);
    return false;
  }
}

export async function POST(request) {
  try {
    const userData = await request.json();
    const { email } = userData;

    // Check if user exists
    const userIndex = users.findIndex((user) => user.email === email);

    if (userIndex >= 0) {
      // Update existing user
      users[userIndex] = { ...users[userIndex], ...userData };
      console.log("User updated:", users[userIndex]);
    } else {
      // Add new user
      const newUser = {
        ...userData,
        id: Date.now().toString(),
        purchasedGames: [],
      };
      users.push(newUser);
      console.log("New user added:", newUser);
    }

    // Save users to file
    saveUsersToFile();

    // Return success response with updated user
    return NextResponse.json({
      success: true,
      user: userIndex >= 0 ? users[userIndex] : users[users.length - 1],
    });
  } catch (error) {
    console.error("Error in users update route:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
