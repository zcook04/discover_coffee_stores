const Airtable = require('airtable');
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_BASE_KEY);

const table = base('coffee-stores')

const createCoffeeStore = (req, res) => {
    if (req.method === "POST") {
        return res.json({ msg: table })
    } else {
        return res.status(400).json({ msg: 'Bad Request', status: 400 })
    }

}

export default createCoffeeStore