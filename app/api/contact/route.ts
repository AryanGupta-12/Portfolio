import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: Request) {
    const resend = new Resend(process.env.RESEND_API_KEY);

    try {
        const { name, email, message } = await request.json();

        // Basic validation
        if (!name || !email || !message) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        // Check for API Key
        if (!process.env.RESEND_API_KEY) {
            console.warn("RESEND_API_KEY is missing in .env file");
            // For development/demo purposes, we simulate success if key is missing
            // so the UI doesn't break for the user immediately.
            // In production, you would want to return an error.
            return NextResponse.json(
                {
                    success: true,
                    message: "Simulation: Email would be sent here. Add RESEND_API_KEY to .env to enable real emails."
                },
                { status: 200 }
            );
        }

        const data = await resend.emails.send({
            from: "Portfolio Contact Form <onboarding@resend.dev>",
            to: ["gargaryan81@gmail.com"], // Replace with your actual email
            subject: `New Message from ${name}`,
            replyTo: email,
            text: `
        Name: ${name}
        Email: ${email}
        
        Message:
        ${message}
      `,
        });

        if (data.error) {
            return NextResponse.json({ error: data.error }, { status: 500 });
        }

        return NextResponse.json({ success: true, data });
    } catch (error) {
        console.error("Email sending error:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
