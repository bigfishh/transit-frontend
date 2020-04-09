function fetchStations(resource){
    return fetch(`https://access-transit-api.herokuapp.com/${resource}`)
    .then(r => r.json())
}



let Adapter = {
    fetchStations
}
