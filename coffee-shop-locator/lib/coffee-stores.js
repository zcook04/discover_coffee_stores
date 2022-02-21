import { createApi } from 'unsplash-js'

const unsplashApi = createApi({
    accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY,
})

export const getStores = async (latLong = '40.72446861347544,-73.98449305630399') => {

    const photos = await unsplashApi.search.getPhotos({
        query: "coffee shop",
        page: 1,
        perPage: 30,

    })

    const photoList = photos.response.results.map(photo => {
        return photo.urls['small']
    })


    const response = await fetch(`https://api.foursquare.com/v3/places/search?query=Coffee%20Shop&ll=${latLong}&limit=30`, {
        "headers": {
            'Authorization': process.env.NEXT_PUBLIC_FOURSQUARE_API,
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