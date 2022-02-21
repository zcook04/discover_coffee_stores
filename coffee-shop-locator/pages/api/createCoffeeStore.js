import { getMinifiedRecords, findRecordByFilter, table } from '../../lib/airtable';

const createCoffeeStore = async (req, res) => {
    if (req.method === "POST") {
        try {
            const { id, name, address, voting, imgUrl } = req.body
            if (!name || !id)
                return res.status(422).json({ msg: "ID or Name is required but missing." })

            const records = await findRecordByFilter(id)
            if (records.length !== 0) {
                return res.status(200).json(records)
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