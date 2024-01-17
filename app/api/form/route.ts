import { UserSchema } from "@/types";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  // Retrieve the JSON data from the request body
  const body = await request.json();

  // Use Zod to validate the received data against the UserSchema
  const result = UserSchema.safeParse(body);

  // Check if the validation is successful
  if (result.success) {
    return NextResponse.json({ success: true });
  }

  // If validation errors, map them into an object
  const serverErrors = Object.fromEntries(
    result.error?.issues?.map((issue) => [issue.path[0], issue.message]) || []
  );

  // Respond with a JSON object containing the validation errors
  return NextResponse.json({ errors: serverErrors });
}