// server/routes/sendOtp.js
const express = require('express');
const router = express.Router();
const twilio = require('twilio');

// Replace with your Twilio credentials
const accountSid = process.env.TWILIO_ACCOUNT_SID ;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

const client = twilio(accountSid, authToken);

// Function to generate a 6-digit OTP
function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

router.post('/', async (req, res) => {
    const { mobile } = req.body;

    if (!mobile || mobile.length !== 10) {
        return res.status(400).json({ success: false, message: 'Invalid mobile number' });
    }

    const otp = generateOTP();

    try {
        const message = await client.messages.create({
            body: `Your OTP is: ${otp}`,
            from: twilioPhoneNumber,
            to: `+91${mobile}`
        });

        // In production, DO NOT send the OTP back in the response
        res.status(200).json({ success: true, message: 'OTP sent successfully', otp }); // You can remove `otp` in real use
    } catch (error) {
        console.error('Twilio Error:', error);
        res.status(500).json({ success: false, message: 'Failed to send OTP', error: error.message });
    }
});

module.exports = router;
