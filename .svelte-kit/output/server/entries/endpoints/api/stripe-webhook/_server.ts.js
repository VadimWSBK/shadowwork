import { json } from "@sveltejs/kit";
import { s as supabase } from "../../../../chunks/supabaseClient.js";
const POST = async ({ request }) => {
  try {
    const body = await request.text();
    const event = JSON.parse(body);
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const customerEmail = session.customer_details?.email;
      if (!customerEmail) {
        console.error("No customer email found in Stripe session");
        return json({ error: "No customer email" }, { status: 400 });
      }
      const { data: existingProfile } = await supabase.from("profiles").select("id, email").eq("email", customerEmail.toLowerCase()).single();
      if (existingProfile) {
        await supabase.auth.signInWithOtp({
          email: customerEmail.toLowerCase(),
          options: {
            shouldCreateUser: false,
            emailRedirectTo: `${request.url.split("/api")[0]}/login`
          }
        });
      } else {
        const { error: profileError } = await supabase.from("profiles").insert({
          email: customerEmail.toLowerCase(),
          username: customerEmail.split("@")[0],
          // Use email prefix as username
          language: "en",
          created_at: (/* @__PURE__ */ new Date()).toISOString()
        });
        if (profileError) {
          console.error("Failed to create profile:", profileError);
          return json({ error: "Failed to create profile" }, { status: 500 });
        }
        await supabase.auth.signInWithOtp({
          email: customerEmail.toLowerCase(),
          options: {
            shouldCreateUser: true,
            emailRedirectTo: `${request.url.split("/api")[0]}/login`
          }
        });
      }
      console.log(`Payment processed for ${customerEmail}`);
    }
    return json({ received: true });
  } catch (error) {
    console.error("Stripe webhook error:", error);
    return json({ error: "Webhook processing failed" }, { status: 500 });
  }
};
export {
  POST
};
