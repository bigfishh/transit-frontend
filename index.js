checkbox.addEventListener('click', () => {
    esOrEl(elStation, checkbox, "Elevator")
})
escalCheckbox.addEventListener('click', () => {
    esOrEl(esStation, escalCheckbox, "Escalator")
})

const modalUl = document.querySelector("#modal-Ul")


let mapCenter = {lat: 40.74307, lng: -73.984264}
let zoomNum = 13
let map = new google.maps.Map(document.getElementById('map'), {zoom: zoomNum, center: mapCenter});

function displayStation(station, type){
    let latling = new google.maps.LatLng(station.gtfs_latitude , station.gtfs_longitude)
    let marker = new google.maps.Marker({position: latling, map: map})

    google.maps.event.addListener(marker, 'click', (e) => {
        mapCenter = {lat: station.gtfs_latitude, lng: station.gtfs_longitude}
        zoomNum = 15
        map = new google.maps.Map(document.getElementById('map'), {zoom: zoomNum, center: mapCenter})
        marker = new google.maps.Marker({position: latling, map: map})
        google.maps.event.addDomListener(marker, 'mouseover', (e) => {
            // console.log(station.stop_name)
        });
        
        type === "Elevator" ? esOrEl(elStation, checkbox, "Elevator") : esOrEl(esStation, escalCheckbox, "Escalator")

        modal.className = "modal fade show"
        modal.style = "display:block"


        title.innerText = station.stop_name
        
        clearer(modalUl)
    
        const routes = elCreator("li")
            routes.innerText = station.daytime_routes
        const feature = elCreator("li")
            feature.innerText = type
            // console.log(type)

            modalUl.append(routes, feature)
    });

    trigger.addEventListener("click",() => {
        body.className = ""
        modal.className = "modal fade"
        modal.style = "display:none"
    })
    
    viewMorButtonFunction(type)
}

function viewMorButtonFunction(type) {
    viewMoreButton.addEventListener("click",() => {
        let modalStation = document.querySelector(".modal-title")
        stan = modalStation.innerText
        if(type === "Elevator"){
            station = elevStation.find(stop => stop.stop_name === stan)
        } else {
            station = escalStation.find(stop => stop.stop_name === stan)
        }
        mapDiv.style = "width: 65%; overflow: hidden;"
        modal.className = "modal fade"
        modal.style = "display:none;"
        displayStats(station,type)
        
        formDiv.style = "display:inline-block"
        statNReview.style = "display:inline-block"
        displayReviewStuff(station)
        formCreator(station)
        clearer(reviewsDiv) 
    })
}

function displayStats(station, type){
    clearer(statUl)
    
    const stationName = elCreator("h5")
        stationName.className = "stationNameClass"
        stationName.innerText = `${station.stop_name} Station 🚈`
    const routes = elCreator("p")
        routes.className = "routesClass"
        routes.innerText = `❃  Routes: ${station.daytime_routes}`
    const feature = elCreator("p")
        feature.className = "featureClass"
        feature.innerText = `❃  Feature: ${type}`
    const stationsRatingLi = elCreator('p')
        stationsRatingLi.innerText = `❃  Average Rating: ${(calculateRating(station) || 0)}`
        stationsRatingLi.id = "stationRating"
    statUl.append(stationName,routes,feature, stationsRatingLi)
}

function displayReviewStuff(station){
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
}

function slapItOnTheDom(review){
        const ratingStarP = elCreator('p')
        ratingStarP.className = "ratingStarsP"
            if (review.rating === 1){
                ratingStarP.innerText = `- ${review.name} ⭐️/5`
            } else if (review.rating === 2){
                ratingStarP.innerText = `- ${review.name} ⭐️⭐️/5`
            } else if (review.rating === 3){
                ratingStarP.innerText = `- ${review.name} ⭐️⭐️⭐️/5`
            } else if (review.rating === 4){
                ratingStarP.innerText = `- ${review.name} ⭐️⭐️⭐️⭐️/5`
            } else {
                ratingStarP.innerText = `- ${review.name} ⭐️⭐️⭐️⭐️⭐️/5`
            }
        const contentLi = elCreator('p')
            contentLi.className = "contentHeader"
            contentLi.innerText = `"${review.content}"`
        const reviewHr = elCreator('hr')
        reviewsDiv.append(contentLi, ratingStarP, reviewHr)
}

function elCreator(element){
    return document.createElement(element)
}


function formCreator(station){
    const formName = elCreator('h5')
        formName.className = "formNameClass"
        formName.innerText = "☞Leave a Review"

    formDiv.innerHTML = ""
    formDiv.append(formName)

    

    formDiv.innerHTML += `
    <form id="new-review-form">
        <label class="nameLabel">Name</label>
        <input class="form-control" type="text" name="Name">
        <label class="rateLabel">Rate from 1-5</label>
        <select class="form-control" name="Rating">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
        </select>
        <label class="contentLabel">Share What You Have To Say...</label>
        <input type="textarea" class="form-control" name="Content"><br>
        <input type="submit" class="formSubmit btn btn-sm btn-warning" value="Submit">
    </form>`
    const newForm = formDiv.querySelector("#new-review-form")

    newForm.addEventListener('submit', (e) => {
        e.preventDefault()
        const nameValue  = e.target["Name"].value
        // const booleanValue  = e.target["local Or Nah?"].checked
        // console.log(booleanValue)
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
                localOrNah: "true",
                rating: RatingValue,
                content: ContentValue,
            })
        })
        .then(r => r.json())
        .then(newReview => {
            console.log("1")
            console.log("displayReviewStuff")
            slapItOnTheDom(newReview)
            station.reviews.push(newReview)
            const stationsRatingLi = document.querySelector("#stationRating")
            stationsRatingLi.innerText = `Rating: ${(calculateRating(station) || 0)}`
            console.log(stationsRatingLi)
            statUl.appendChild(stationsRatingLi)
        })

    })
}

function trueShow(station){
    window.scroll(0,1000)
    const ShowDiv = document.querySelector(".test")
    const header= elCreator("h2")
    header.innerText = station.stop_name
    ShowDiv.append(header)
}
