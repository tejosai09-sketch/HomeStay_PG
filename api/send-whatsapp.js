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
            throw new Error("WHATSAPP_ACCESS_TOKEN is missing");
        }

        if (!process.env.WHATSAPP_PHONE_NUMBER_ID) {
            throw new Error("WHATSAPP_PHONE_NUMBER_ID is missing");
        }

        if (!process.env.WHATSAPP_TEST_RECIPIENT) {
            throw new Error("WHATSAPP_TEST_RECIPIENT is missing");
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

    type: "template",

    template: {
        name: "visit_request",

        language: {
            code: "en"
        },

        components: [
            {
                type: "body",

                parameters: [
                    {
                        type: "text",
                        text: name
                    },
                    {
                        type: "text",
                        text: phone
                    },
                    {
                        type: "text",
                        text: date
                    },
                    {
                        type: "text",
                        text: time
                    },
                    {
                        type: "text",
                        text: visitors
                    }
                ]
            }
        ]
    }
})
            }
        );

        const metaData = await metaResponse.json();

        console.log(
            "META WHATSAPP RESPONSE:",
            JSON.stringify(metaData, null, 2)
        );

        // Meta rejected the message
        if (!metaResponse.ok) {

            return res.status(200).json({
                success: false,
                error: "WhatsApp message failed",
                meta_error: metaData
            });

        }

        // Meta accepted the message
        return res.status(200).json({

            success: true,

            message: "WhatsApp message sent successfully",

            whatsapp_message_id:
                metaData.messages?.[0]?.id || null,

            recipient:
                metaData.contacts?.[0]?.wa_id || null

        });

    } catch (error) {

        console.error(
            "SEND WHATSAPP SERVER ERROR:",
            error
        );

        return res.status(500).json({

            success: false,

            error: "Server error",

            details:
                error?.message || String(error)

        });

    }
}