const express = require('express');
const bodyParser = require('body-parser');
const rateLimit = require("express-rate-limit");
const RedisStore = require("rate-limit-redis");
const BitGo = require('bitgo-utxo-lib');
const recaptcha = require('express-recaptcha');

let sender ={
    addr: 'ecash:qprrfsf04w3xxrj9jeq5l3c63tfxscyzlyzu7tqmql',
    privateKey: 'save bag accuse spare material mountain brave wife brief verb damage culture'
}

// Create an Express application
const app = express();

// BitGo configuration
const bitgo = new BitGo({
    accessToken: 'v2x0ffefdc0117fb5fb4d043f73c5791078aef53a159a70dbde39786488a7324eb7', //BitGo access token
    env: 'prod' // or 'prod' for production
});

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Configure reCAPTCHA
recaptcha.init('6LeaP6EpAAAAAKl7QCXA_xIreIUuTpnlDSkpi7bm', '6LeaP6EpAAAAACVV_3BplAEPsN4Rc6xHm8J-TaL-');

// Rate limiting configuration
const limiter = rateLimit({
    store: new RedisStore({
        expiry: 86400, // 24 hours in seconds
        host: "localhost",
        port: 6379,
        prefix: "ecash-limit-"
    }),
    windowMs: 24 * 60 * 60 * 1000, // 24 hours
    max: 1, // Maximum one request per windowMs
    keyGenerator: function (req) {
        // Generate a unique identifier for rate limiting based on both eCash address and IP address
        return req.body.recipientAddress + '-' + req.ip;
    },
    message: "You have exceeded the rate limit for eCash payouts."
});

// Applying rate limiting middleware to the eCash payout endpoint
app.post('/payout', limiter, recaptcha.middleware.verify, async (req, res) => {
    try {
        // Check if reCAPTCHA verification passed
        if (!req.recaptcha.error) {
            // Extract recipient address and amount from request body
            const { recipientAddress, amount } = req.body;

            // Generate eCash transaction
            const transaction = await generateTransaction(recipientAddress, amount);

            // Broadcast transaction to eCash network
            const result = await bitgo.sendTransaction(transaction);

            // Send response with transaction hash
            res.json({ success: true, transactionHash: result.transactionHash });
        } else {
            // reCAPTCHA verification failed
            res.status(400).json({ success: false, message: 'reCAPTCHA verification failed' });
        }
    } catch (error) {
        // Handle errors
        res.status(500).json({ success: false, error: error.message });
    }
});

// Function to generate eCash transaction
async function generateTransaction(recipientAddress, amount) {
    // function to generate eCash transaction using BitGo UTXO library
    // This function should construct and sign the transaction
    // Example:
    // const tx = new BitGo.TransactionBuilder(network);
    // tx.addOutput(recipientAddress, amount);
    // tx.sign(privateKey);
    // return tx.build();
    // Function to generate eCash transaction
    try {
        // Create a new transaction builder
        const txBuilder = new BitGo.TransactionBuilder(BCHA);

        // Add output for recipient address and amount
        txBuilder.addOutput(recipientAddress, amount);

        // Sign the transaction
        const signedTx = await txBuilder.sign(sender.privateKey);

        // Return the signed transaction
        return signedTx;
    } catch (error) {
        // If an error occurs during transaction generation, throw an error with a descriptive message
        throw new Error('Failed to generate transaction: ' + error.message);
    }
}

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
