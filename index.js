

checkbox.addEventListener('click', () => {
    esOrEl(elStation,checkbox,"Elevator")
})
escalCheckbox.addEventListener('click', () => {
    esOrEl(esStation,escalCheckbox,"Escalator")
})



function displayStation(station,type){
    const newLi = elCreator('li')
        newLi.innerText = `${station.stop_name}`

    let latling = new google.maps.LatLng(station.gtfs_latitude , station.gtfs_longitude)
    let marker = new google.maps.Marker({position: latling, map: map})

    google.maps.event.addListener(marker, 'click', (e) => {
        console.log(station.stop_name, e.latLng.lat(), e.latLng.lng())
        // debugger;
    });

    allSubUl.append(newLi)

    newLi.addEventListener('click', (e) => {
        
        displayStats(station,type)
        console.log("click me", station.id)
        formDiv.style = "display:inline-block"
        displayReviewStuff(station)
        formCreator(station)
        clearer(reviewsDiv)
    })
}



function displayStats(station,type){
    clearer(statUl)

    const statName = elCreator('p')
        statName.innerText = "Info:"
    const stationName = elCreator("li")
        stationName.innerText = station.stop_name
    const routes = elCreator("li")
        routes.innerText = station.daytime_routes
    const feature = elCreator("li")
        feature.innerText = type


    const stationsRatingLi = elCreator('li')
        stationsRatingLi.innerText = (calculateRating(station) || 0)
        stationsRatingLi.id = "stationRating"
    statUl.append(statName, stationName,routes,feature, stationsRatingLi)
}


function displayReviewStuff(station){
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





function elCreator(element){
    return document.createElement(element)
}








function formCreator(station){
    const formName = elCreator('p')
        formName.innerText = "New Review:"

    formDiv.innerHTML = ""
    formDiv.append(formName)

    formDiv.innerHTML += `
    <form id="new-review-form">
    <label>Name</label>
    <input type="text" name="Name"><br>
    <label>Local or Nah?</label>
    <input type="checkbox" name="local Or Nah?"><br>
    <label>Rating</label>
    <input type="integer" name="Rating"><br>
    <label>Content</label>
    <input type="text" name="Content"><br>
    <input type="submit" value="Submit">
  </form>`
  const newForm = formDiv.querySelector("#new-review-form")
//   newForm.dataset
const stationRateLi = document.querySelector("#stationRating")

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
        station.reviews.push(newReview)
        stationRateLi.innerText = (calculateRating(station) || 0)
        console.log(stationRateLi)
        statUl.appendChild(stationRateLi)

        // displayStats(station,newReview)
    })

})
}

