import {Loader} from '@googlemaps/js-api-loader'

export const useGoogle = () => {
    const loader = new Loader({
        apiKey:'AIzaSyDOD3zKKeyFhO_UJV38OlMKdXbl-_ICRLQ',
        version:'weekly',
        libraries:['places','drawing','geometry']
    })

    return (loader)
}