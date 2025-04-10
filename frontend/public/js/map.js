// Inicializa o mapa já mostrando algo
var map = L.map("map").setView([0, 0], 2)

// Camada base - OpenStreetMap
var openStreetLayer = L.tileLayer(
  "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  {
    attribution: "&copy; OpenStreetMap contributors",
  }
).addTo(map)

// Camada satélite - MapTiler (carregamento manual)
const maptilerApiKey = "GEflBa6Sez5JCAJ6HOuV"
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

// Controles de camada (não troca sozinho)
var baseMaps = {
  "Rua (OpenStreetMap)": openStreetLayer,
  "Satélite (MapTiler)": satelliteLayer,
}
L.control.layers(baseMaps).addTo(map)

// Geolocalização (assíncrona, não trava o mapa)
if (navigator.geolocation) {
  setTimeout(() => {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        var userLat = position.coords.latitude
        var userLng = position.coords.longitude

        map.setView([userLat, userLng], 13)

        L.marker([userLat, userLng])
          .addTo(map)
          .bindPopup("Sua localização atual 📍")
          .openPopup()
      },
      function () {
        document.getElementById("manual-location").style.display = "block"
      }
    )
  }, 1000) // espera 1 segundo antes de tentar localizar
} else {
  document.getElementById("manual-location").style.display = "block"
}

// Função para buscar local manualmente (rápido!)
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

// Adiciona marcador ao clicar no mapa
map.on("click", function (e) {
  var marker = L.marker(e.latlng).addTo(map)
  marker.bindPopup("Marcador em: " + e.latlng.toString()).openPopup()
})
