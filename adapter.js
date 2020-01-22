function fetchStations(resource){
    return fetch(`http://localhost:3000/${resource}`)
    .then(r => r.json())
}

let Adapter = {
    fetchStations
}