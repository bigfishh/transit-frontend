const checkbox = document.querySelector("#myCheck")
const escalCheckbox = document.querySelector("#escalator")
const allSubUl = document.querySelector(".allSubway")
const statsDiv = document.querySelector(".stats")
const statUl = document.querySelector("#statLi")
const formDiv = document.querySelector('#form')
const reviewsDiv = document.querySelector("#reviews")
const mapDiv = document.querySelector('.vertical-center')
let title = document.querySelector("#exampleModalLongTitle")
let modal = document.querySelector("#exampleModalCenter")
let body = document.getElementsByTagName("BODY")[0]
let trigger = document.querySelector("#closeTrigger")
const reviewCol = document.querySelector('.review-col')

const fetchedReview = Adapter.fetchStations("reviews")

const elStation = Adapter.fetchStations("features/escalators")
const esStation = Adapter.fetchStations("features/elevators")

const clearer = (div) => {
    div.innerText = ""
}

const esOrEl = (arr,check,type) => {
    if (check.checked){
        arr.then(r => {
            r.forEach((station) => {
                displayStation(station, type)
            })
        })
        
    } else {
        clearer(allSubUl)
        clearer(formDiv)
        clearer(statUl)
        clearer(reviewsDiv)
        
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