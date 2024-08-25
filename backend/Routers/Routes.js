import express from 'express'
const router = express.Router();

router.post('/data', async (req, res) => {
    try {
        const { array } = req.body; // Extract the array from the request body
        if (!Array.isArray(array)) {
            return res.status(400).json({ error: 'Invalid input: Expected an array.' });
        }

        let numbers = [];
        let alphabets = [];
        let lowercaseAlphabets = [];

        // Process the array to categorize the elements
        array.forEach(item => {
            if (!isNaN(item)) {
                numbers.push(item);
            } else if (typeof item === 'string') {
                alphabets.push(item);
                if (item.length === 1 && item >= 'a' && item <= 'z') {
                    lowercaseAlphabets.push(item);
                }
            }
        });

        // Determine the highest lowercase alphabet
        const highestLowercaseAlphabet = lowercaseAlphabets.length > 0 ?
            [lowercaseAlphabets.reduce((max, current) => (current > max ? current : max))] :
            [];

        // Create the response object
        const response = {
            is_success: true,
            user_id: "sravani_Gandla",
            email: "sravanigandla141@gmail.com",
            roll_number: "21BCE9554",
            numbers: numbers,
            alphabets: alphabets,
            highest_lowercase_alphabet: highestLowercaseAlphabet
        };

        // Send the response back to the client
        return res.status(200).json(response);
    } catch (error) {
        // Handle any errors
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;
