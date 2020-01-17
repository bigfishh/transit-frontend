const stationUl = document.querySelector(".allSubway")
fetch("http://localhost:3000/stations")
.then(r => r.json())
.then(stationData => {
    // console.log(stationData)
    stationData.forEach(station => {
        const newLi = document.createElement("li")
        newLi.innerText = `${station.stop_name}, ${station.line}`
        stationUl.append(newLi)
    })

})