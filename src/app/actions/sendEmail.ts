"use server";

export async function sendEmail(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const message = formData.get("message") as string;

  if (!name || !email || !message) {
    return { success: false, error: "Missing fields" };
  }

  try {
    // EmailJS REST API Integration
    // https://api.emailjs.com/api/v1.0/email/send
    
    // TODO: Zastąp 'YOUR_TEMPLATE_ID' oraz 'YOUR_PUBLIC_KEY' prawidłowymi danymi z panelu EmailJS
    const data = {
      service_id: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
      template_id: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
      user_id: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
      template_params: {
        from_name: name,
        reply_to: email,
        message: message,
      }
    };

    const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      return { success: true };
    } else {
      console.error("EmailJS Error:", await response.text());
      return { success: false, error: "Failed to send email via EmailJS" };
    }
  } catch (error) {
    console.error("Email send error:", error);
    return { success: false, error: "Failed to send email" };
  }
}
