import { headers } from "next/headers"
import { type NextRequest, NextResponse } from "next/server"
import { Webhook } from "svix"
import { supabase } from "@/lib/supabase"

const webhookSecret = process.env.CLERK_WEBHOOK_SECRET!

export async function POST(req: NextRequest) {
  const body = await req.text()
  const headerPayload = headers()
  const svixId = headerPayload.get("svix-id")
  const svixTimestamp = headerPayload.get("svix-timestamp")
  const svixSignature = headerPayload.get("svix-signature")

  if (!svixId || !svixTimestamp || !svixSignature) {
    return new NextResponse("Error occurred -- no svix headers", { status: 400 })
  }

  const wh = new Webhook(webhookSecret)
  let evt: any

  try {
    evt = wh.verify(body, {
      "svix-id": svixId,
      "svix-timestamp": svixTimestamp,
      "svix-signature": svixSignature,
    })
  } catch (err) {
    console.error("Error verifying webhook:", err)
    return new NextResponse("Error occurred", { status: 400 })
  }

  const { id, email_addresses, first_name, last_name } = evt.data
  const eventType = evt.type

  try {
    if (eventType === "user.created") {
      // Create user in Supabase when they sign up with Clerk
      const { error } = await supabase.from("users").insert({
        clerk_user_id: id,
        email: email_addresses[0]?.email_address,
        first_name: first_name || "",
        last_name: last_name || "",
        user_type: "parent", // Default to parent, can be changed later
      })

      if (error) {
        console.error("Error creating user in Supabase:", error)
        return new NextResponse("Error creating user", { status: 500 })
      }
    }

    if (eventType === "user.updated") {
      // Update user in Supabase when they update their Clerk profile
      const { error } = await supabase
        .from("users")
        .update({
          email: email_addresses[0]?.email_address,
          first_name: first_name || "",
          last_name: last_name || "",
        })
        .eq("clerk_user_id", id)

      if (error) {
        console.error("Error updating user in Supabase:", error)
        return new NextResponse("Error updating user", { status: 500 })
      }
    }

    if (eventType === "user.deleted") {
      // Delete user from Supabase when they delete their Clerk account
      const { error } = await supabase.from("users").delete().eq("clerk_user_id", id)

      if (error) {
        console.error("Error deleting user from Supabase:", error)
        return new NextResponse("Error deleting user", { status: 500 })
      }
    }

    return new NextResponse("Success", { status: 200 })
  } catch (error) {
    console.error("Webhook error:", error)
    return new NextResponse("Error occurred", { status: 500 })
  }
}
