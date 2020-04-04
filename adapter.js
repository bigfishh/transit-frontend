function fetchStations(resource){
    return fetch(`http://transit-access-api.herokuapp/${resource}`)
    .then(r => r.json())
}

let Adapter = {
    fetchStations
}
