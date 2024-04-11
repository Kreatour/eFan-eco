// Generate a unique identifier for rate limiting based on both eCash address and IP address
exports.handler = async (event, context) => {
    try {
        const { recipientAddress, ip } = JSON.parse(event.body);
        const key = `${recipientAddress}-${ip}`;
        return {
            statusCode: 200,
            body: JSON.stringify({ key }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message }),
        };
    }
};
