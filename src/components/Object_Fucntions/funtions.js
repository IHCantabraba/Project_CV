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
  // const mapDiv = document.querySelector('#map')
  // mapDiv.id = 'map'

  const map = L.map('map').setView([43.194104, -4.832371], 13)
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map)
  var circle = L.circle([43.194104, -4.832371], {
    color: 'blue',
    fillColor: 'lightblue',
    fillOpacity: 0.5,
    radius: 1000
  }).addTo(map)

  return map
}
