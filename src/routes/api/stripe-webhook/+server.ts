import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { supabase } from '$lib/supabaseClient';

export const POST: RequestHandler = async ({ request }) => {
  try {
    const body = await request.text();
    
    // Verify webhook signature (you'll need to set up Stripe webhook secret)
    // const signature = request.headers.get('stripe-signature');
    // const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    // const event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    
    // For now, we'll parse the body directly (you should implement proper signature verification)
    const event = JSON.parse(body);
    
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      const customerEmail = session.customer_details?.email;
      
      if (!customerEmail) {
        console.error('No customer email found in Stripe session');
        return json({ error: 'No customer email' }, { status: 400 });
      }
      
      // Check if user already exists
      const { data: existingProfile } = await supabase
        .from('profiles')
        .select('id, email')
        .eq('email', customerEmail.toLowerCase())
        .single();
      
      if (existingProfile) {
        // User already exists, send them a login link
        await supabase.auth.signInWithOtp({
          email: customerEmail.toLowerCase(),
          options: {
            shouldCreateUser: false,
            emailRedirectTo: `${request.url.split('/api')[0]}/login`
          }
        });
      } else {
        // Create new user profile
        const { error: profileError } = await supabase
          .from('profiles')
          .insert({
            email: customerEmail.toLowerCase(),
            username: customerEmail.split('@')[0], // Use email prefix as username
            language: 'en',
            created_at: new Date().toISOString()
          });
        
        if (profileError) {
          console.error('Failed to create profile:', profileError);
          return json({ error: 'Failed to create profile' }, { status: 500 });
        }
        
        // Send invitation email
        await supabase.auth.signInWithOtp({
          email: customerEmail.toLowerCase(),
          options: {
            shouldCreateUser: true,
            emailRedirectTo: `${request.url.split('/api')[0]}/login`
          }
        });
      }
      
      console.log(`Payment processed for ${customerEmail}`);
    }
    
    return json({ received: true });
    
  } catch (error) {
    console.error('Stripe webhook error:', error);
    return json({ error: 'Webhook processing failed' }, { status: 500 });
  }
};
