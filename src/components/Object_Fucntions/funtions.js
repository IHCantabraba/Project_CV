/* funtion to create a Ul with li > a elements for element in Array */
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import icon from 'leaflet/dist/images/marker-icon.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'
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
    /* eliminar posiciones anteriores */
    /* hacer que se pueda elegir con un botton */
    const btnTracking = document.querySelector('.Tracking-btn')
    if (btnTracking.classList.contains('hide')) {
      console.log('removing prior objects')
      /* TODO ¿ how to read al markers? */
      map.eachLayer((layer) => {
        if (layer) {
          map.removeLayer(layer)
        }
      })
    }

    greenIcon = L.icon({
      iconUrl: icon,
      shadowUrl: iconShadow,
      iconAnchor: [14, 40],
      popupAnchor: [0, 0],
      tooltipAnchor: [0, 0]
    })
    // defaultmarker = L.marker([lat, long]).addTo(map)
    marker = L.marker([lat, long], { title: 'marker', icon: greenIcon }).addTo(
      map
    ) //{ icon: greenIcon }
    circle = L.circle([lat, long], { title: 'circle', raduis: accuracy }).addTo(
      map
    )
    var featureGroup = L.featureGroup([marker, circle]).addTo(map)
    map.fitBounds(featureGroup.getBounds())
    // var popup = L.popup().setLatLng([lat, long]).setContent(' Loc.').openOn(map)
  }

  return map
}
