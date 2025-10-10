import { json } from "@sveltejs/kit";
import { s as supabase } from "../../../../chunks/supabaseClient.js";
const POST = async ({ request }) => {
  try {
    const { email } = await request.json();
    if (!email || typeof email !== "string") {
      return json({ error: "Valid email address is required" }, { status: 400 });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return json({ error: "Invalid email format" }, { status: 400 });
    }
    const { data: profile, error: profileError } = await supabase.from("profiles").select("id, email").eq("email", email.toLowerCase()).single();
    if (profileError || !profile) {
      return json({ error: "No account found with this email address" }, { status: 404 });
    }
    const { error: authError } = await supabase.auth.signInWithOtp({
      email: email.toLowerCase(),
      options: {
        shouldCreateUser: false,
        // Don't create user, just send link
        emailRedirectTo: `${request.url.split("/api")[0]}/login`
      }
    });
    if (authError) {
      console.error("Failed to send invite:", authError);
      return json({
        error: "Failed to send invitation. Please try again later."
      }, { status: 500 });
    }
    return json({
      success: true,
      message: "Invitation sent successfully"
    });
  } catch (error) {
    console.error("Resend invite error:", error);
    return json({
      error: "Internal server error"
    }, { status: 500 });
  }
};
export {
  POST
};
