import { getStores } from '../../lib/coffee-stores'

const getCoffeeStoresByLocation = async (req, res) => {
    try {
        const { latLong, limit } = req.query
        const response = await getStores(latLong, limit)
        res.status(200).json(response)
    } catch (err) {
        console.log(err)
        res.status(500).json({ err: err })
    }

}

export default getCoffeeStoresByLocation