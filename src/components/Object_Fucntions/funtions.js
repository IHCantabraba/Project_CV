/* funtion to create a Ul with li > a elements for element in Array */
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import icon from 'leaflet/dist/images/marker-icon.png'
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
  /* crear un mapa y centrarlo ne Madrid */
  const map = L.map('map', {
    fullscreenControl: true,
    fullscreenControlOptions: {
      position: 'bottonright'
    }
  }).setView([40.558047, -4.620497], 6)

  /* añadir el mapa base */
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map)

  /* obtener ubicación cada 5 segundos */
  if (!navigator.geolocation) {
    conlog.log(`Your browser doesn't support golocation feature`)
  } else {
    /* run the geolocationn function every 5 seconds*/
    setInterval(() => {
      navigator.geolocation.getCurrentPosition(getPosition)
    }, 3000)
  }

  /* Inicializar objjetos de mapa */
  let marker, circle, greenIcon, polyline

  /* Inicializar lista d ehistórico de posiciones */
  let HistoricalLocatios = []

  /* Obtener posicion */
  function getPosition(position) {
    /* obtener long lat y accur. */
    var lat = position.coords.latitude
    var long = position.coords.longitude
    var accuracy = position.coords.accuracy
    /* añadir posicion incial a lista de posiciones */

    let FirstPosition = [lat, long]
    HistoricalLocatios.push(FirstPosition)

    /* ejectuar static position si la clase hide existe en el botón */
    const btnTracking = document.querySelector('.Tracking-btn')
    if (btnTracking.classList.contains('hide')) {
      StaticPosition()
    } else {
      DynamicPosition()
    }

    /* eliminar posiciones anteriores */
    function StaticPosition() {
      /* hacer que se pueda elegir con un botton */
      /* TODO ¿ how to read al markers? */
      map.eachLayer((layer) => {
        btnTracking.innerHTML = 'Show Tracking!'
        /* eliminar cilculo accuracy */
        if (layer.options.title === 'circle') {
          map.removeLayer(layer)
        }
        /* eliminar el marcador previo obtener su posicion y almacenarla */
        if (layer.options.title === 'marker') {
          /* eliminar capa */
          map.removeLayer(layer)
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
      /* create map elements */
      marker = L.marker([lat, long], {
        title: 'marker',
        alt: 'marker',
        icon: greenIcon
      }).addTo(map)
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

      /* create layer group for map elements*/
      var featureGroup = L.featureGroup([marker, circle, polyline]).addTo(map)
      /* zoom to layer group bounds */
      map.fitBounds(featureGroup.getBounds())
      console.log(`historical postions are: ${HistoricalLocatios.length}`)
    } /*Si queremos mostrar el track */
    function DynamicPosition() {
      /* cambiar texto del boton */
      btnTracking.innerHTML = 'Tracking You!'
      /* para cada capa existente en el mapa */
      map.eachLayer((layer) => {
        /* eliminar cilculo accuracy */
        if (layer.options.title === 'circle') {
          map.removeLayer(layer)
        }
        if (layer.options.title === 'marker') {
          /* eliminar capa */
          map.removeLayer(layer)
        }
        /* si es una línea eliminarla */
        if (layer.options.title === 'line') {
          map.removeLayer(layer)
        }
      })
      /* create icon */
      greenIcon = L.icon({
        iconUrl: icon,
        shadowUrl: iconShadow,
        iconAnchor: [14, 40],
        popupAnchor: [0, 0],
        tooltipAnchor: [0, 0]
      })
      /* add marker */
      marker = L.marker([lat, long], {
        title: 'marker',
        alt: 'marker',
        icon: greenIcon
      }).addTo(map)
      /* add polyline */
      polyline = L.polyline(HistoricalLocatios, {
        title: 'line',
        alt: 'line',
        raduis: accuracy
      }).addTo(map)
      /* crear un grupo y añadir las capas */
      L.featureGroup([marker, polyline]).addTo(map)

      /* fit map to layer group bounds */
      // map.fitBounds(featureGroup.getBounds())

      /* añadir tooltipo a la ultima posicvión con las coords */
      map.eachLayer((layer) => {
        if (layer.options.title === 'line') {
          const vertices = layer.getLatLngs()
          console.log(vertices)
          L.tooltip([lat, long], {
            content: `last vertex:...${vertices[vertices.length - 1]}`
          }).addTo(map)
        }
      })
      console.log(`historical postions length is: ${HistoricalLocatios}`)
    }
  }

  return map
}
