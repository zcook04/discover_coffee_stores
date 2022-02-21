import { getMinifiedRecords, incrementVoting } from "../../lib/airtable"

const favoriteCoffeeStoreById = async (req, res) => {
    if (req.method !== 'PUT') {
        return res.status(422).json({ msg: "Invalid Request" })
    }

    const { id } = req.body

    if (!id) {
        return res.status(400).json({ msg: "ID is required but not provided" })
    }

    try {
        const updatedRecord = await incrementVoting(id)
        if (updatedRecord) {
            const result = await getMinifiedRecords(updatedRecord)
            return res.status(200).json({ result })
        }
        res.status(200).json({ result, id })
    } catch (err) {
        return res.status(500).json({ err, id })
    }

}

export default favoriteCoffeeStoreById