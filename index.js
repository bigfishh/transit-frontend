const checkbox = document.querySelector("#myCheck")
const escalCheckbox = document.querySelector("#escalator")
const allSubUl = document.querySelector(".allSubway")
const statsDiv = document.querySelector(".stats")
const statUl = document.querySelector("#statLi")
const formDiv = document.querySelector("#form")


  let fulton = {lat: 40.74307, lng: -73.984264};

  let map = new google.maps.Map(
    document.getElementById('map'), {zoom: 13, center: fulton}
    );




function fetchStations(){
    return fetch("http://localhost:3000/stations")
    .then(r => r.json())
}

const fetchedStation = fetchStations()


checkbox.addEventListener('click', () => {
    esOrEl("Elevator", checkbox)
})
escalCheckbox.addEventListener('click', () => {
    console.log("hello")
    esOrEl("Escalator", escalCheckbox)
})

























function esOrEl(whichOne,check){
  let pointsArray = []
    if (check.checked){
        let stationArr = []
        fetchedStation
        .then(stationData => {
            // console.log("outside foreach")
            allSubUl.innerText = ""
            stationData.forEach(station => {
                station.features.find((feature) => {
                    if (feature.name === whichOne){ 
                        if(!stationArr.includes(station.stop_name)){
                            const newLi = document.createElement('li')
                            newLi.innerText = `${station.stop_name}`
                            let coordinates = {lat: station.gtfs_latitude , lng: station.gtfs_longitude}
                            let point = new google.maps.Marker({position: coordinates, map: map})

                            pointsArray.push(point)
                            allSubUl.append(newLi)
                            
                            newLi.addEventListener('click', (e) => {
                                displayStats(station)
                                displayForm(station)
                            })
                        }
                        stationArr.push(station.stop_name)
                    }
                })
            });
        })
    } else {
        allSubUl.innerText = ""
        formDiv.innerText = ""
        statUl.innerText = ""
        map = new google.maps.Map(
            document.getElementById('map'), {zoom: 13, center: fulton}
        )
    }
}

function displayForm(station){
    formDiv.innerText = ""
    const newbreak = document.createElement("br")
    const newForm = document.createElement('form')
        const nameLabel = document.createElement('label')
            nameLabel.innerText = "Name"
        const nameInput = document.createElement('input')
        const localLabel = document.createElement('label')
            localLabel.innerText = "Local or Nah?"
        const localInput = document.createElement('input')
        const ratingLabel = document.createElement('label')
            ratingLabel.innerText = "Rating"
        const ratingInput = document.createElement('input')
        const contentLabel = document.createElement('label')
            contentLabel.innerText = "Content"
        const contentInput = document.createElement('input')
        const submitInput = document.createElement('input')
            submitInput.type = "submit"
            submitInput.value = "Submit"

        newForm.append(nameLabel, nameInput, localLabel, localInput, ratingLabel, ratingInput, contentLabel, contentInput, submitInput)  

    formDiv.append(newForm)

    newForm.addEventListener('submit', (e) => {
        e.preventDefault()
        console.log(e.target["name"].value)
    })
}

function displayStats(station){
    let features = featureaccess(station)
    statUl.innerText = ""
    const stationName = document.createElement("li")
    stationName.innerText = station.stop_name
    const routes = document.createElement("li")
    routes.innerText = station.daytime_routes
    const feature = document.createElement("li")
    feature.innerText = features
    statUl.append(stationName,routes,feature)
}

function featureaccess(station){
    let arr = []
    station.features.forEach(element => {
        if(!arr.includes(element.name)){
            arr.push(element.name)
        }
    })
    return arr
}