const getCoffeeStoreById = (req, res) => {
    const { id } = req.query
    if (!id) {
        return res.status(422).json({ msg: 'ID is requiring but missing from the request.' })
    }

    try {
        res.status(200).json({ msg: `Id found ${id}` })
    } catch (err) {
        return res.status(500).json({ msg: "Something went wrong", err })
    }
}

export default getCoffeeStoreById