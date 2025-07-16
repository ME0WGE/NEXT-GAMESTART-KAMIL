import { NextResponse } from "next/server";
import { users } from "../update/route";

export async function GET(request) {
  try {
    // Get email from query params
    const url = new URL(request.url);
    const email = url.searchParams.get("email");

    if (!email) {
      return NextResponse.json(
        { success: false, message: "Email parameter is required" },
        { status: 400 }
      );
    }

    // Find user by email
    const user = users.find((user) => user.email === email);

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    // Return user data without password
    const { password, ...userWithoutPassword } = user;

    return NextResponse.json({
      success: true,
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error("Error in user lookup route:", error);
    return NextResponse.json(
      { success: false, message: "Failed to look up user" },
      { status: 500 }
    );
  }
}
