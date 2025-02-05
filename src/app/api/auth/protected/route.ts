import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("auth_token")?.value;

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    return NextResponse.json({ message: "Access granted", user: decoded }, { status: 200 });
  } catch (error) {
    console.error("Protected Route Error:", error);
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}