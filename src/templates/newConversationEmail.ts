// Backend/src/templates/newConversationEmail.ts

interface NewConversationEmailProps {
    visitorName: string;
    conversationId: string;
    timestamp: string;
}

export function newConversationEmailTemplate({
    visitorName,
    conversationId,
    timestamp,
}: NewConversationEmailProps): string {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Chat Conversation</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
    <table role="presentation" style="width: 100%; border-collapse: collapse;">
        <tr>
            <td style="padding: 40px 0; text-align: center;">
                <table role="presentation" style="width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                    <!-- Header -->
                    <tr>
                        <td style="padding: 40px 40px 20px; text-align: center; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 8px 8px 0 0;">
                            <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: bold;">
                                💬 New Chat Started
                            </h1>
                        </td>
                    </tr>

                    <!-- Content -->
                    <tr>
                        <td style="padding: 40px;">
                            <h2 style="margin: 0 0 20px; color: #333333; font-size: 20px;">
                                Someone started a conversation!
                            </h2>

                            <p style="margin: 0 0 20px; color: #666666; font-size: 16px; line-height: 1.5;">
                                A visitor has initiated a new chat conversation and is waiting for your response.
                            </p>

                            <!-- Details Box -->
                            <table role="presentation" style="width: 100%; border-collapse: collapse; margin: 30px 0; background-color: #f8f9fa; border-radius: 6px;">
                                <tr>
                                    <td style="padding: 20px;">
                                        <p style="margin: 0 0 10px; color: #333333; font-size: 14px;">
                                            <strong>Visitor Name:</strong>
                                        </p>
                                        <p style="margin: 0 0 20px; color: #667eea; font-size: 18px; font-weight: bold;">
                                            ${visitorName}
                                        </p>

                                        <p style="margin: 0 0 10px; color: #333333; font-size: 14px;">
                                            <strong>Conversation ID:</strong>
                                        </p>
                                        <p style="margin: 0 0 20px; color: #666666; font-size: 14px; font-family: monospace;">
                                            ${conversationId}
                                        </p>

                                        <p style="margin: 0 0 10px; color: #333333; font-size: 14px;">
                                            <strong>Time:</strong>
                                        </p>
                                        <p style="margin: 0; color: #666666; font-size: 14px;">
                                            ${timestamp}
                                        </p>
                                    </td>
                                </tr>
                            </table>

                            <!-- CTA Button -->
                            <table role="presentation" style="width: 100%; border-collapse: collapse; margin: 30px 0;">
                                <tr>
                                    <td style="text-align: center;">
                                        <a href="${process.env.ADMIN_CHAT_URL}/chats/${conversationId}"
                                           style="display: inline-block; padding: 14px 40px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 16px;">
                                            Open Chat Admin
                                        </a>
                                    </td>
                                </tr>
                            </table>

                            <p style="margin: 20px 0 0; color: #999999; font-size: 14px; text-align: center;">
                                Don't keep them waiting! Respond quickly to provide the best experience.
                            </p>
                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td style="padding: 20px 40px; text-align: center; border-top: 1px solid #eeeeee;">
                            <p style="margin: 0; color: #999999; font-size: 12px;">
                                This is an automated notification from your Chat Admin System
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
    `.trim();
}

// Plain text version (fallback)
export function newConversationEmailText({
    visitorName,
    conversationId,
    timestamp,
}: NewConversationEmailProps): string {
    return `
New Chat Conversation Started

A visitor has initiated a new chat conversation.

Visitor Name: ${visitorName}
Conversation ID: ${conversationId}
Time: ${timestamp}

Open your admin panel to respond:
https://your-admin-chat.vercel.app/admin/chats/${conversationId}

Don't keep them waiting!
    `.trim();
}
