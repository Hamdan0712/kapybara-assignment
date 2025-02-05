import { db } from "../../../../db/index"; // ✅ Correct import path
import { tasks } from "../../../../db/schema"; // ✅ No need for users unless required
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken";

// ✅ GET ALL TASKS (For Logged-in User)
export async function GET(req: NextRequest) {
  try {
    const cookieStore = await cookies(); // ✅ FIX: Await cookies()
    const token = cookieStore.get("auth_token")?.value;

    if (!token) {
      console.error("GET /tasks Error: Missing auth token");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    const userId = decoded.id;
    if (!userId) {
      console.error("GET /tasks Error: Invalid token, no user ID found");
      return NextResponse.json({ error: "Invalid token" }, { status: 403 });
    }

    const userTasks = await db.select().from(tasks).where(eq(tasks.userId, userId));
    return NextResponse.json(userTasks, { status: 200 });

  } catch (error:any) {
    console.error("GET /tasks Error:", error);
    return NextResponse.json({ error: "Something went wrong", details: error.message }, { status: 500 });
  }
}

// ✅ CREATE A NEW TASK
export async function POST(req: NextRequest) {
  try {
    const cookieStore = await cookies(); // ✅ FIX: Await cookies()
    const token = cookieStore.get("auth_token")?.value;

    if (!token) {
      console.error("POST /tasks Error: Missing auth token");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    const userId = decoded.id;
    if (!userId) {
      console.error("POST /tasks Error: Invalid token, no user ID found");
      return NextResponse.json({ error: "Invalid token" }, { status: 403 });
    }

    const { title, description, priority = 1, dueDate } = await req.json();
    if (!title) {
      console.error("POST /tasks Error: Missing task title");
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    const [newTask] = await db.insert(tasks).values({ title, description, priority, dueDate, userId }).returning();
    return NextResponse.json(newTask, { status: 201 });

  } catch (error:any) {
    console.error("POST /tasks Error:", error);
    return NextResponse.json({ error: "Something went wrong", details: error.message }, { status: 500 });
  }
}

// ✅ DELETE A TASK
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const taskId = searchParams.get("id");

    if (!taskId) {
      console.error("DELETE /tasks Error: No Task ID Provided");
      return NextResponse.json({ error: "Task ID is required" }, { status: 400 });
    }

    const deletedTask = await db.delete(tasks).where(eq(tasks.id, Number(taskId))).returning();
    
    if (!deletedTask.length) {
      console.error(`DELETE /tasks Error: Task with ID ${taskId} not found`);
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    console.log(`DELETE /tasks: Task with ID ${taskId} deleted successfully`);
    return NextResponse.json({ message: "Task deleted successfully", deletedTask: deletedTask[0] }, { status: 200 });

  } catch (error:any) {
    console.error("DELETE /tasks Error:", error);
    return NextResponse.json({ error: "Something went wrong", details: error.message }, { status: 500 });
  }
}
export async function PUT(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Task ID is required" }, { status: 400 });
    }

    const { priority } = await req.json();

    if (priority < 1 || priority > 3) {
      return NextResponse.json({ error: "Invalid priority value" }, { status: 400 });
    }

    const updatedTask = await db
      .update(tasks)
      .set({ priority })
      .where(eq(tasks.id, Number(id)))
      .returning();

    if (!updatedTask.length) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Task updated successfully" }, { status: 200 });
  } catch (error) {
    console.error("PUT /tasks Error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}