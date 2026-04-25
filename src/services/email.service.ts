// Backend/src/services/email.service.ts
import { resend } from "../lib/resend.js";
import {
    newConversationEmailTemplate,
    newConversationEmailText
} from "../templates/newConversationEmail.js";

interface SendNewConversationEmailParams {
    visitorName: string;
    conversationId: string;
}

export async function sendNewConversationEmail({
    visitorName,
    conversationId,
}: SendNewConversationEmailParams) {
    try {
        const timestamp = new Date().toLocaleString("en-US", {
            dateStyle: "full",
            timeStyle: "short",
        });

        const { data, error } = await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: [process.env.ADMIN_EMAIL!],
            subject: `🔔 New Chat: ${visitorName}`,
            html: newConversationEmailTemplate({
                visitorName,
                conversationId,
                timestamp,
            }),
            text: newConversationEmailText({
                visitorName,
                conversationId,
                timestamp,
            }),
        });

        if (error) {
            console.error("❌ Failed to send email:", error);
            return { success: false, error };
        }

        console.log("✅ Email sent successfully:", data?.id);
        return { success: true, data };
    } catch (error) {
        console.error("❌ Email service error:", error);
        return { success: false, error };
    }
}
