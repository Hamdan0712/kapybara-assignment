import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {

  const cookieStore = await cookies();
  cookieStore.set("auth_token", "", { expires: new Date(0) });

  return NextResponse.json({ message: "Logout successful" }, { status: 200 });
}