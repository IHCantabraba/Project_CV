/* funtion to create a Ul with li > a elements for element in Array */
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

export function CreateUl(DataArray) {
  const ul = document.createElement('ul')
  for (let Data of DataArray) {
    const li = document.createElement('li')
    const a = document.createElement('a')
    a.href = `#${Data}`
    a.innerHTML = Data
    li.appendChild(a)
    ul.appendChild(li)
  }
  return ul
}
export function CreateMap() {
  const map = L.map('map').setView([40.558047, -4.620497], 6)
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map)

  if (!navigator.geolocation) {
    conlog.log(`Your browser doesn't support golocation feature`)
  } else {
    /* run the geolocationn function every 5 seconds*/
    setInterval(() => {
      navigator.geolocation.getCurrentPosition(getPosition)
    }, 2000)
  }
  let marker, circle, greenIcon, defaultmarker
  function getPosition(position) {
    console.log(position)
    var lat = position.coords.latitude
    var long = position.coords.longitude
    var accuracy = position.coords.accuracy
    if (marker) {
      console.log('removing previous marker')
      map.removeLayer(marker)
    }
    if (circle) {
      console.log('removing previous accurary area')
      map.removeLayer(circle)
    }
    if (greenIcon) {
      console.log('removing previous Icon')
      map.removeLayer(greenIcon)
    }

    greenIcon = L.icon({
      iconUrl:
        'https://res.cloudinary.com/df7b0dj9r/image/upload/c_scale,w_25/v1711182522/marker-icon-2x-green_ojk6wv.png',
      shadowUrl:
        'https://res.cloudinary.com/df7b0dj9r/image/upload/v1711182587/marker-shadow_hxk6vx.png',
      iconAnchor: [14, 40],
      popupAnchor: [0, 0],
      tooltipAnchor: [0, 0]
    })
    defaultmarker = L.marker([lat, long]).addTo(map)
    marker = L.marker([lat, long], { icon: greenIcon }).addTo(map)
    circle = L.circle([lat, long], { raduis: accuracy }).addTo(map)
    var featureGroup = L.featureGroup([marker, circle]).addTo(map)
    map.fitBounds(featureGroup.getBounds())
    // var popup = L.popup().setLatLng([lat, long]).setContent(' Loc.').openOn(map)
    console.log(
      `Latitudeis : ${lat}, Longitude is: ${long} and accuracy is: ${accuracy}`
    )
  }

  return map
}
