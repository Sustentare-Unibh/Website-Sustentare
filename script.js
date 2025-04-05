// Inicializa o mapa
var map = L.map("map").setView([0, 0], 2)

// Camada base - OpenStreetMap
var openStreetLayer = L.tileLayer(
  "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  {
    attribution: "&copy; OpenStreetMap contributors",
  }
).addTo(map)

// Camada satélite - MapTiler
const maptilerApiKey = "GEflBa6Sez5JCAJ6HOuV";
var satelliteLayer = L.tileLayer(
  `https://api.maptiler.com/maps/hybrid/{z}/{x}/{y}.jpg?key=${maptilerApiKey}`,
  {
    attribution: "&copy; MapTiler &copy; OpenStreetMap contributors",
    tileSize: 512,
    zoomOffset: -1,
    minZoom: 0,
    maxZoom: 20,
  }
)

// Controles de camada
var baseMaps = {
  Street: openStreetLayer,
  Satélite: satelliteLayer,
}

L.control.layers(baseMaps).addTo(map)

// Função para pré-carregar tiles na área do usuário
function preloadTiles(lat, lng, zoom) {
  const tileSize = 256
  const point = map.project([lat, lng], zoom)

  const tileX = Math.floor(point.x / tileSize)
  const tileY = Math.floor(point.y / tileSize)

  const tileLayer = map._layers[Object.keys(map._layers).find(key => map._layers[key] instanceof L.TileLayer)]

  for (let dx = -1; dx <= 1; dx++) {
    for (let dy = -1; dy <= 1; dy++) {
      const x = tileX + dx
      const y = tileY + dy

      tileLayer.createTile({ x, y, z: zoom }, document.createElement('div'))
    }
  }
}

// Adiciona marcador ao clicar no mapa
map.on("click", function (e) {
  var marker = L.marker(e.latlng).addTo(map)
  marker.bindPopup("Marcador em: " + e.latlng.toString()).openPopup()
})

// Função para buscar local manualmente
function searchLocation() {
  var location = document.getElementById("locationInput").value
  if (!location) {
    alert("Por favor, digite um local.")
    return
  }

  fetch(
    "https://nominatim.openstreetmap.org/search?format=json&q=" +
      encodeURIComponent(location)
  )
    .then((response) => response.json())
    .then((data) => {
      if (data && data.length > 0) {
        var lat = data[0].lat
        var lon = data[0].lon
        map.setView([lat, lon], 13)
        preloadTiles(lat, lon, 13) // <- aqui pré-carregamos os tiles
        L.marker([lat, lon])
          .addTo(map)
          .bindPopup("Local encontrado: " + location)
          .openPopup()
      } else {
        alert("Local não encontrado.")
      }
    })
    .catch(() => {
      alert("Erro ao buscar localização.")
    })
}

// Tenta obter a localização do usuário
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    function (position) {
      var userLat = position.coords.latitude
      var userLng = position.coords.longitude

      map.setView([userLat, userLng], 13)
      preloadTiles(userLat, userLng, 13) // <- aqui pré-carregamos os tiles
      L.marker([userLat, userLng])
        .addTo(map)
        .bindPopup("Sua localização atual 📍")
        .openPopup()
    },
    function () {
      document.getElementById("manual-location").style.display = "block"
      map.setView([0, 0], 2)
    }
  )
} else {
  document.getElementById("manual-location").style.display = "block"
  map.setView([0, 0], 2)
}
