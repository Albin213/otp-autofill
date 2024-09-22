export async function POST(req) {
    const data = await req.formData();
    const otp = data.get("otp");
  
    // Example verification logic (replace with your own)
    if (otp === "123456") { // Replace with actual OTP verification logic
      return new Response(JSON.stringify({ status: "success" }), { status: 200 });
    } else {
      return new Response(JSON.stringify({ status: "failed" }), { status: 400 });
    }
  }
  