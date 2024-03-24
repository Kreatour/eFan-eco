const express = require('express');
const app = express();
const recaptcha = require('express-recaptcha');

recaptcha.init('6LeaP6EpAAAAACVV_3BplAEPsN4Rc6xHm8J-TaL-'); // Replace YOUR_SECRET_KEY with your reCAPTCHA secret key

app.post('/payout', recaptcha.middleware.verify, async (req, res) => {
    if (!req.recaptcha.error) {
        // CAPTCHA verification successful, process payout
        // Add your payout logic here
        document.getElementById("payoutForm").addEventListener("submit", function (event) {
            event.preventDefault(); // Prevent form submission

            // Get form data
            const recipientAddress = document.getElementById("recipientAddress").value;
            const amount = 20;

            // Create payload object
            const payload = {
                recipientAddress: recipientAddress,
                amount: amount
            };

            // Make POST request to backend API
            fetch('/api/payout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            })
                .then(response => response.json())
                .then(data => {
                    // Handle response
                    if (data.success) {
                        alert("Transaction successful! Transaction Hash: " + data.transactionHash);
                    } else {
                        alert("Transaction failed: " + data.error);
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        });

        res.json({ success: true });
    } else {
        // CAPTCHA verification failed
        res.status(400).json({ success: false, message: 'CAPTCHA verification failed' });
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

