const checkbox = document.querySelector("#myCheck")
const escalCheckbox = document.querySelector("#escalator")
const statsDiv = document.querySelector(".stats")
const statUl = document.querySelector("#statLi")
const formDiv = document.querySelector('#form')
const reviewsDiv = document.querySelector("#reviews")
const mapDiv = document.querySelector('#map')
let title = document.querySelector("#exampleModalLongTitle")
let modal = document.querySelector("#exampleModalCenter")
let body = document.getElementsByTagName("BODY")[0]
let trigger = document.querySelector("#closeTrigger")
let viewMoreButton = document.querySelector(".viewMoreButton")
const reviewCol = document.querySelector('.review-col')
const infoCard = document.querySelector('.w-100')
const statH5 = document.querySelector('.statH5')
const  statNReview = document.querySelector('.everythingButTheMap')  
const fetchedReview = Adapter.fetchStations("reviews")

const elStation = Adapter.fetchStations("features/escalators")
const esStation = Adapter.fetchStations("features/elevators")

const elevStation = []
 elStation.then(r => elevStation.push(...r) )
 const escalStation = []
 esStation.then(r => escalStation.push(...r) )


const clearer = (div) => {
    div.innerText = ""
}

const esOrEl = (arr, check, type) => {
    map = new google.maps.Map(
        document.getElementById('map'), {zoom: 13, center: {lat: 40.74307, lng: -73.984264}})
    if (check.checked){
        // console.log(check)
        arr.then(r => {
            r.forEach((station) => {
                displayStation(station, type)
            })
        })
    } else {
        clearer(formDiv)
        clearer(statUl)
        clearer(reviewsDiv)
        mapDiv.style = "width: 96%; overflow: hidden;"
        map = new google.maps.Map(
            document.getElementById('map'), {zoom: 13, center: {lat: 40.74307, lng: -73.984264}})
    }
}

const calculateRating = (station) => {
    let sumOfRating = 0;
    
    station.reviews.forEach((review) => {
        sumOfRating += review.rating

    })

return Math.floor(sumOfRating/station.reviews.length)
}