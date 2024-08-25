const express = require('express');
const app = express();

app.use(express.json());

// POST endpoint
app.post('/bfhl', (req, res) => {
    try {
        const { data } = req.body;

        // Validate input
        if (!Array.isArray(data)) {
            return res.status(400).json({ is_success: false, message: 'Invalid input format' });
        }

        // Separate numbers and alphabets
        const numbers = data.filter(item => !isNaN(item));
        const alphabets = data.filter(item => /^[a-zA-Z]$/.test(item));

        // Find the highest lowercase alphabet
        const lowercaseAlphabets = alphabets.filter(char => char === char.toLowerCase());
        const highestLowercaseAlphabet = lowercaseAlphabets.length ? [lowercaseAlphabets.sort().pop()] : [];

        // Construct the response
        const response = {
            is_success: true,
            user_id: 'john_doe_17091999',  // Replace with your logic
            email: 'john@xyz.com',
            roll_number: 'ABCD123',
            numbers: numbers,
            alphabets: alphabets,
            highest_lowercase_alphabet: highestLowercaseAlphabet
        };
        res.status(200).json(response);

    } catch (error) {
        res.status(500).json({ is_success: false, message: error.message });
    }
});

// GET endpoint
app.get('/bfhl', (req, res) => {
    res.status(200).json({ operation_code: 1 });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port 3000`);
});

