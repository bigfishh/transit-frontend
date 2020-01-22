

checkbox.addEventListener('click', () => {
    esOrEl(elStation,checkbox,"Elevator")
})
escalCheckbox.addEventListener('click', () => {
    esOrEl(esStation,escalCheckbox,"Escalator")
})



function displayStation(station,type){
    const newLi = elCreator('li')
        newLi.innerText = `${station.stop_name}`
    let coordinates = {lat: station.gtfs_latitude , lng: station.gtfs_longitude}
    let point = new google.maps.Marker({position: coordinates, map: map})

    allSubUl.append(newLi)

    newLi.addEventListener('click', (e) => {
        
        displayStats(station,type)
        console.log("click me", station.id)
        formDiv.style = "display:inline-block"
        displayReviewStuff(station)
        clearer(reviewsDiv)
    })
}



function displayStats(station,type){
    clearer(statUl)

    const stationName = elCreator("li")
        stationName.innerText = station.stop_name
    const routes = elCreator("li")
        routes.innerText = station.daytime_routes
    const feature = elCreator("li")
        feature.innerText = type

    const stationsRatingLi = elCreator('li')
        stationsRatingLi.innerText = (calculateRating(station) || 0)
        
    statUl.append(stationName,routes,feature, stationsRatingLi)
}


function displayReviewStuff(station){
    console.log(fetchedReview)
    fetchedReview
    .then(reviewsData => {
        clearer(reviewsDiv)
        reviewsData.forEach((review) => {
            if (station.id === review["station_id"]){
                console.log(review)
                slapItOnTheDom(review)
            }
        })
    })

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
            console.log("1")
            console.log("displayReviewStuff")
            slapItOnTheDom(newReview)
            // displayStats(station,newReview)
        })

    })
}



function slapItOnTheDom(review){
    
    // console.log(review)
    const nameLi = elCreator('li')
        nameLi.innerText = review.name
        // console.log(nameLi)
    const ratingLi = elCreator('li')
        ratingLi.innerText = review.rating
        // console.log(ratingLi)
    const contentLi = elCreator('li')
        contentLi.innerText = review.content
        // console.log(contentLi)
      
    reviewsDiv.append(nameLi,ratingLi,contentLi)
}



function clearer(div){
    div.innerText = ""
}

function elCreator(element){
    return document.createElement(element)
}