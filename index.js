

checkbox.addEventListener('click', () => {
    esOrEl("Elevator", checkbox)
})
escalCheckbox.addEventListener('click', () => {
    console.log("hello")
    esOrEl("Escalator", escalCheckbox)
})



function esOrEl(whichOne,check){
    if (check.checked){
        let stationArr = []
        fetchedStation
        .then(stationData => {
            stationData.forEach(station => {
                station.features.find((feature) => {
                    if (feature.name === whichOne){ 
                        if(!stationArr.includes(station.stop_name)){
                            displayStation(station)
                        }
                        stationArr.push(station.stop_name)
                    }
                })
            });
        })
    } else {
        clearer(allSubUl)
        clearer(formDiv)
        clearer(statUl)
        map = new google.maps.Map(
            document.getElementById('map'), {zoom: 13, center: {lat: 40.74307, lng: -73.984264}})
    }
}


function displayStation(station){
    const newLi = elCreator('li')
        newLi.innerText = `${station.stop_name}`
    let coordinates = {lat: station.gtfs_latitude , lng: station.gtfs_longitude}
    let point = new google.maps.Marker({position: coordinates, map: map})

    allSubUl.append(newLi)

    newLi.addEventListener('click', (e) => {
        displayStats(station)
        displayReviews(station)
        formDiv.style = "display:inline-block"
        displayForm(station)
    })
}



function displayStats(station){
    let features = featureaccess(station)
    clearer(statUl)

    const stationName = elCreator("li")
        stationName.innerText = station.stop_name
    const routes = elCreator("li")
        routes.innerText = station.daytime_routes
    const feature = elCreator("li")
        feature.innerText = features

    const stationsRatingLi = elCreator('li')
        stationsRatingLi.innerText = (calculateRating(station) || 0)
        
    statUl.append(stationName,routes,feature, stationsRatingLi)
}
                                                        function calculateRating(station, review){
                                                            let sumOfRating = 0;
                                                            
                                                                station.reviews.forEach((review) => {
                                                                    sumOfRating += review.rating

                                                                })

                                                            return Math.floor(sumOfRating/station.reviews.length)
                                                        }

function displayForm(station){


    newForm.addEventListener('submit', (e) => {
        e.preventDefault()
        const nameValue  = e.target["Name"].value
        const booleanValue  = e.target["local Or Nah?"].checked
        console.log(booleanValue)
        const RatingValue  = e.target["Rating"].value
        const ContentValue  = e.target["Content"].value
        fetch("http://localhost:3000/reviews",{
            method: "POST",
            headers:{
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                name: nameValue,
                station_id: station.id,
                localOrNah:booleanValue,
                rating:RatingValue,
                content:ContentValue,
            })
        })
        .then(r => r.json())
        .then(newReview => {
            slapItOnTheDom(newReview)
            displayStats(station)
        })

    })
}
function displayReviews(station){
    fetchedReview
    .then(reviewsData => {
        clearer(reviewsDiv)
        reviewsData.forEach((review) => {
            if (station.id === review["station_id"]){
                slapItOnTheDom(review)
            }
        })
    })
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




function slapItOnTheDom(review){
    
    console.log(review)
    const nameLi = elCreator('li')
        nameLi.innerText = review.name
        console.log(nameLi)
    const ratingLi = elCreator('li')
        ratingLi.innerText = review.rating
        console.log(ratingLi)
    const contentLi = elCreator('li')
        contentLi.innerText = review.content
        console.log(contentLi)

    reviewsDiv.append(nameLi, ratingLi, contentLi)
}



function clearer(div){
    div.innerText = ""
}

function elCreator(element){
    return document.createElement(element)
}