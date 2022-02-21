import { findRecordByFilter } from '../../lib/airtable'

const getCoffeeStoreById = async (req, res) => {
    const { id } = req.query
    if (!id) {
        return res.status(422).json({ msg: 'ID is requiring but missing from the request.' })
    }

    try {
        const records = await findRecordByFilter(id)
        if (records.length !== 0) {
            return res.status(200).json(records)
        }

    } catch (err) {
        return res.status(500).json({ msg: "Something went wrong", err })
    }
}

export default getCoffeeStoreById