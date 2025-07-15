import { NextResponse } from "next/server";
import { cartItems } from "./add/route";

export async function GET() {
  try {
    return NextResponse.json(cartItems);
  } catch (error) {
    console.error("Error in cart get route:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
