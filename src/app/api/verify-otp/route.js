export async function POST(req) {
    const data = await req.formData(); // Extract form data from the request
    const otp = data.get("otp"); // Get the OTP value
  
    // Verify the OTP (this is a placeholder; you'd implement your own logic)
    if (otp === "123456") {
      // Example: if OTP is correct, send a success response
      return new Response(JSON.stringify({ status: "success" }), { status: 200 });
    } else {
      // If OTP is incorrect
      return new Response(JSON.stringify({ status: "failed" }), { status: 400 });
    }
  }
  