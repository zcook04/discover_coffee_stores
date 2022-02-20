import { createApi } from 'unsplash-js'

const unsplashApi = createApi({
    accessKey: process.env.UNSPLASH_ACCESS_KEY,
})

export const getStores = async () => {

    const photos = await unsplashApi.search.getPhotos({
        query: "coffee shop",
        page: 1,
        perPage: 15,

    })

    const photoList = photos.response.results.map(photo => {
        return photo.urls['small']
    })


    const response = await fetch('https://api.foursquare.com/v3/places/search?query=Coffee%20Shop&ll=39.74%2C-75.57', {
        "headers": {
            'Authorization': process.env.FOURSQUARE_API,
            'Accept': 'application/json'
        }
    })

    const data = await response.json();

    const transformedData = data?.results?.map((venue) => {
        return {
            id: venue.fsq_id,
            imgUrl: photoList.pop(),
            ...venue
        }
    }) || [];

    return transformedData
}