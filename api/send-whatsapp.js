export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({
            error: "Method not allowed"
        });
    }

    try {
        const {
            name,
            phone,
            date,
            time,
            visitors
        } = req.body || {};

        // Check environment variables
        if (!process.env.WHATSAPP_ACCESS_TOKEN) {
            console.error("Missing WHATSAPP_ACCESS_TOKEN");
            return res.status(500).json({
                error: "WhatsApp access token is missing"
            });
        }

        if (!process.env.WHATSAPP_PHONE_NUMBER_ID) {
            console.error("Missing WHATSAPP_PHONE_NUMBER_ID");
            return res.status(500).json({
                error: "WhatsApp phone number ID is missing"
            });
        }

        if (!process.env.WHATSAPP_TEST_RECIPIENT) {
            console.error("Missing WHATSAPP_TEST_RECIPIENT");
            return res.status(500).json({
                error: "WhatsApp recipient is missing"
            });
        }

        const message = `
🏠 New Visit Request — Home Stay PG

👩 Name: ${name || "Not provided"}
📞 Phone: ${phone || "Not provided"}
📅 Date: ${date || "Not specified"}
🕒 Time: ${time || "Not specified"}
👥 Sharing: ${visitors || "Not specified"}

Please contact the visitor to confirm.
        `.trim();

        const metaResponse = await fetch(
            `https://graph.facebook.com/v25.0/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`,
            {
                method: "POST",

                headers: {
                    Authorization:
                        `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}`,
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    messaging_product: "whatsapp",

                    to: process.env.WHATSAPP_TEST_RECIPIENT,

                    type: "text",

                    text: {
                        body: message
                    }
                })
            }
        );

        const metaData = await metaResponse.json();

console.log("WHATSAPP API RESPONSE:", data);
        if (!metaResponse.ok) {
            return res.status(200).json({
                success: false,
                error: "WhatsApp message failed",
                meta_error: metaData
            });
        }

        return res.status(200).json({
            success: true,
            message: "WhatsApp message sent successfully",
            whatsapp_message_id:
                metaData.messages?.[0]?.id || null,
            recipient:
                metaData.contacts?.[0]?.wa_id || null
        });

   } catch (error) {

    console.error("SEND WHATSAPP SERVER ERROR:", error);

    return res.status(200).json({
        success: false,
        error: "Server error",
        details: error?.message || String(error),
        error_name: error?.name || "Unknown"
    });
}
}