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
      service_id: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || process.env.EMAILJS_SERVICE_ID,
      template_id: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || process.env.EMAILJS_TEMPLATE_ID,
      user_id: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || process.env.EMAILJS_PUBLIC_KEY,
      template_params: {
        from_name: name,
        reply_to: email,
        message: message,
      }
    };

    if (!data.service_id || !data.template_id || !data.user_id) {
      console.error("EmailJS keys are missing in environment variables!", {
        service: !!data.service_id,
        template: !!data.template_id,
        user: !!data.user_id
      });
      return { success: false, error: "Configuration error" };
    }

    const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      console.log("Email sent successfully via EmailJS");
      return { success: true };
    } else {
      const errorText = await response.text();
      console.error("EmailJS Error Response:", errorText);
      return { success: false, error: `EmailJS Error: ${errorText}` };
    }
  } catch (error) {
    console.error("Email send error:", error);
    return { success: false, error: "Failed to send email" };
  }
}
