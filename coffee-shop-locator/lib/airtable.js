const Airtable = require('airtable');
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_BASE_KEY);

export const table = base('coffee-stores')

export const getMinifiedRecord = (record) => {
    return {
        recordId: record.id,
        ...record.fields,
    }
}

export const getMinifiedRecords = (records) => {
    return records.map(record => getMinifiedRecord(record))
}

export const findRecordByFilter = async (id) => {
    const findCoffeeStoreRecords = await table.select({
        filterByFormula: `id="${id}"`
    }).firstPage()

    return getMinifiedRecords(findCoffeeStoreRecords)
}

export const incrementVoting = async (id) => {
    const record = await findRecordByFilter(id)

    const currentVotes = parseInt(record[0].voting)
    const updatedVotes = parseInt(currentVotes + 1)

    return await table.update(
        [
            {
                id: record[0].recordId,
                fields: {
                    voting: updatedVotes
                }
            },
        ]
    )
}