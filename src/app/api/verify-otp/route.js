export async function POST(req) {
    const data = await req.formData();
    const otp = data.get("otp");
  
    // Example OTP verification logic
    if (otp === "123456") { // Replace with actual verification logic
      return new Response(JSON.stringify({ status: "success" }), { status: 200 });
    } else {
      return new Response(JSON.stringify({ status: "failed" }), { status: 400 });
    }
  }