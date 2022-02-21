import { getMinifiedRecords, table } from '../../lib/airtable';

const createCoffeeStore = async (req, res) => {
    if (req.method === "POST") {
        try {
            const { id, name, address, voting, imgUrl } = req.body
            if (!name || !id)
                return res.status(422).json({ msg: "ID or Name is required but missing." })

            const findCoffeeStoreRecords = await table.select({
                filterByFormula: `id=${id}`
            }).firstPage()

            if (findCoffeeStoreRecords.length !== 0) {
                const records = getMinifiedRecords(findCoffeeStoreRecords)
                return res.json(records)

            } else {
                const createRecords = await table.create([
                    {
                        fields: {
                            id,
                            name,
                            address,
                            voting,
                            imgUrl,
                        }
                    }
                ])

                const records = getMinifiedRecords(createRecords)
                return res.status(200).json({ records })
            }
        } catch (err) {
            console.error("Error Creating or Finding Store", err)
            res.status(500).json({ msg: "Error Creating or Finding Store", err })
        }

    } else {
        return res.status(400).json({ msg: 'Bad Request', status: 400 })
    }

}

export default createCoffeeStore