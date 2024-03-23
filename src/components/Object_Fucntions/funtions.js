/* funtion to create a Ul with li > a elements for element in Array */
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import icon from 'leaflet/dist/images/marker-icon-green.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'
import 'leaflet-fullscreen/dist/Leaflet.fullscreen.js'
import 'leaflet-fullscreen/dist/leaflet.fullscreen.css'
// import 'leaflet-geometryUtil/src/leaflet.geometryutil.js'
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
  const map = L.map('map', {
    fullscreenControl: true,
    fullscreenControlOptions: {
      position: 'bottonleft'
    }
  }).setView([40.558047, -4.620497], 6)
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
    }, 5000)
  }

  let marker, circle, greenIcon, polyline
  let HistoricalLocatios = []
  function getPosition(position) {
    /* obtener long lat y accur. */
    var lat = position.coords.latitude
    var long = position.coords.longitude
    var accuracy = position.coords.accuracy
    /* añadir posicion incial a lista de posiciones */
    if (HistoricalLocatios.length >= 0) {
      let FirstPosition = [lat, long]
      HistoricalLocatios.push(FirstPosition)
    }
    StaticPosition()
    DynamicPosition()
    /* eliminar posiciones anteriores */
    function StaticPosition() {
      /* hacer que se pueda elegir con un botton */
      const btnTracking = document.querySelector('.Tracking-btn')

      if (btnTracking.classList.contains('hide')) {
        /* TODO ¿ how to read al markers? */
        map.eachLayer((layer) => {
          btnTracking.innerHTML = 'Show Tracking!'
          /* eliminar cilculo accuracy */
          if (layer.options.title === 'circle') {
            map.removeLayer(layer)
          }
          /* eliminar el marcador previo obtener su posicion y almacenarla */
          if (layer.options.title === 'marker') {
            /* obtener coordenadas previas del marcador */
            const previousLatLong = layer.getLatLng()
            /* obtener posicion */
            lat = previousLatLong['lat']
            long = previousLatLong['lng']
            /* almacenar posicion */
            const latlot = [lat, long]
            HistoricalLocatios.push(latlot)
            map.removeLayer(layer)
            /* añadir a la lista de posiciones */
          } /* si es una línea eliminarla */
          if (layer.options.title === 'line') {
            map.removeLayer(layer)
          }
        })
        greenIcon = L.icon({
          iconUrl: icon,
          shadowUrl: iconShadow,
          iconAnchor: [14, 40],
          popupAnchor: [0, 0],
          tooltipAnchor: [0, 0]
        })
        // defaultmarker = L.marker([lat, long]).addTo(map)
        marker = L.marker([lat, long], {
          title: 'marker',
          alt: 'marker',
          icon: greenIcon
        }).addTo(map) //{ icon: greenIcon }
        circle = L.circle([lat, long], {
          title: 'circle',
          alt: 'circle',
          raduis: accuracy
        }).addTo(map)

        polyline = L.polyline(HistoricalLocatios, {
          title: 'line',
          alt: 'line',
          raduis: accuracy
        }).addTo(map)

        var featureGroup = L.featureGroup([marker, circle, polyline]).addTo(map)
        map.fitBounds(featureGroup.getBounds())
      }
    } /*Si queremos mostrar el track */
    function DynamicPosition() {
      const btnTracking = document.querySelector('.Tracking-btn')

      if (!btnTracking.classList.contains('hide')) {
        // HistoricalLocatios.unshift([40.558047, -4.620497])
        /* cambiar texto del boton */
        btnTracking.innerHTML = 'Tracking You!'
        /* para cada capa existente en el mapa */
        map.eachLayer((layer) => {
          /* eliminar cilculo accuracy */
          if (layer.options.title === 'circle') {
            map.removeLayer(layer)
          }
          if (layer.options.title === 'marker') {
            /* obtener coordenadas previas del marcador */
            const previousLatLong = layer.getLatLng()
            /* obtener posicion */
            lat = previousLatLong['lat']
            long = previousLatLong['lng']
            /* almacenar posicion */
            const latlot = [lat, long]
            HistoricalLocatios.push(latlot)
            map.removeLayer(layer)
            /* añadir a la lista de posiciones */
          } /* si es una línea eliminarla */
          if (layer.options.title === 'line') {
            map.removeLayer(layer)
          }
        })
        greenIcon = L.icon({
          iconUrl: icon,
          shadowUrl: iconShadow,
          iconAnchor: [14, 40],
          popupAnchor: [0, 0],
          tooltipAnchor: [0, 0]
        })
        // defaultmarker = L.marker([lat, long]).addTo(map)
        marker = L.marker([lat, long], {
          title: 'marker',
          alt: 'marker',
          icon: greenIcon
        }).addTo(map)

        polyline = L.polyline(HistoricalLocatios, {
          title: 'line',
          alt: 'line',
          raduis: accuracy
        }).addTo(map)
        /* crear un grupo y añadir las capas */
        // var featureGroup =
        L.featureGroup([marker, polyline]).addTo(map)
        // map.fitBounds(featureGroup.getBounds())
        map.eachLayer((layer) => {
          if (layer.options.title === 'line') {
            const vertices = layer.getLatLngs()
            console.log(vertices)
            L.tooltip([lat, long], {
              content: `last vertex:...${vertices[vertices.length - 1]}`
            }).addTo(map)
          }
        })
      }
    }
  }

  return map
}
