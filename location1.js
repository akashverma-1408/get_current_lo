const button=document.getElementById('get-location-button')

async function getdata(lat,long){
    const promise =await fetch(
        `http://api.weatherapi.com/v1/current.json?key=3fa533c5422f4130be1164031243010&q=${lat},${long}&aqi=no`)
        return await promise.json()
}


async function gotLocation(position){
    const result= await getdata(
        position.coords.latitude
        ,position.coords.longitude
    )
    console.log(result)

}

function failedToget(){
    console.log('there was some issue')
}

button.addEventListener('click',async ()=>{
    navigator.geolocation.getCurrentPosition(gotLocation,failedToget)
})

