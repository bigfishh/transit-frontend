function fetchStations(resource){
    return fetch(`access-transit-api.herokuapp.com/${resource}`)
    .then(r => r.json())
}

let Adapter = {
    fetchStations
}
