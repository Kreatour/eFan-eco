document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("payoutForm");

    form.addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent form submission

        // Get the eCash address from the form input
        const recipientAddress = document.getElementById("recipientAddress").value;

        // Get the captcha response
        const captchaResponse = grecaptcha.getResponse();

        // Ensure captcha is verified
        if (!captchaResponse) {
            alert("Please complete the captcha.");
            return;
        }

        // Create a payload object with the recipient address and captcha response
        const payload = {
            recipientAddress: recipientAddress,
            captchaResponse: captchaResponse
        };

        // Make a POST request to your backend endpoint
        fetch("/payout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(data => {
            // Handle the response from the server
            if (data.success) {
                alert("Transaction successful! Transaction Hash: " + data.transactionHash);
            } else {
                alert("Transaction failed: " + data.error);
            }
        })
        .catch(error => {
            console.error("Error:", error);
            alert("An error occurred. Please try again later.");
        });
    });
});