function fetchStations(resource){
    return fetch(`http://access-transit-api.herokuapp.com/${resource}`)
    .then(r => r.json())
}

let Adapter = {
    fetchStations
}
