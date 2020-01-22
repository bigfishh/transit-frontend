const checkbox = document.querySelector("#myCheck")
const escalCheckbox = document.querySelector("#escalator")
const allSubUl = document.querySelector(".allSubway")
const statsDiv = document.querySelector(".stats")
const statUl = document.querySelector("#statLi")
const newForm = document.querySelector("#new-review-form")
const formDiv = document.querySelector('#form')
const reviewsDiv = document.querySelector("#reviews")

let map = new google.maps.Map(document.getElementById('map'), {zoom: 13, center: {lat: 40.74307, lng: -73.984264}});

const fetchedStation = Adapter.fetchStations("stations")
const fetchedReview = Adapter.fetchStations("reviews")