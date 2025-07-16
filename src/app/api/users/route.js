import { NextResponse } from "next/server";
import { users } from "./update/route";

export async function GET() {
  try {
    return NextResponse.json(users);
  } catch (error) {
    console.error("Error in users get route:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
