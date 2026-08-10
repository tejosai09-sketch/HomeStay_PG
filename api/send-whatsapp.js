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
        } = req.body;

        const message = `
🏠 New Visit Request — Home Stay PG

👩 Name: ${name}
📞 Phone: ${phone}
📅 Date: ${date}
🕒 Time: ${time}
👥 Sharing: ${visitors}

Please contact the visitor to confirm.
        `.trim();

        const response = await fetch(
            `https://graph.facebook.com/v25.0/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`,
            {
                method: "POST",

                headers: {
                    "Authorization":
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

        const data = await response.json();
        
console.log(
    "META WHATSAPP RESPONSE:",
    JSON.stringify(data, null, 2)
);


        if (!response.ok) {

            console.error("WhatsApp API error:", data);

            return res.status(response.status).json({
                error: "WhatsApp message failed",
                meta_error: data
            });
        }

return res.status(200).json({
    success: true,
    message: "WhatsApp message sent successfully",
    whatsapp_message_id: data.messages?.[0]?.id || null,
    recipient: data.contacts?.[0]?.wa_id || null
});

    } catch (error) {

        console.error("Server error:", error);

        return res.status(500).json({
            error: "Internal server error"
        });

    }
}