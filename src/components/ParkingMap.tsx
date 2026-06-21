import { useEffect } from "react"
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
})

const freeIcon = new L.DivIcon({
  className: "",
  html: `<div style="background:#22c55e;border:2px solid #16a34a;border-radius:50%;width:18px;height:18px;box-shadow:0 0 8px #22c55e88"></div>`,
  iconSize: [18, 18],
  iconAnchor: [9, 9],
})

const busyIcon = new L.DivIcon({
  className: "",
  html: `<div style="background:#ef4444;border:2px solid #b91c1c;border-radius:50%;width:18px;height:18px;box-shadow:0 0 8px #ef444488"></div>`,
  iconSize: [18, 18],
  iconAnchor: [9, 9],
})

const partialIcon = new L.DivIcon({
  className: "",
  html: `<div style="background:#f59e0b;border:2px solid #b45309;border-radius:50%;width:18px;height:18px;box-shadow:0 0 8px #f59e0b88"></div>`,
  iconSize: [18, 18],
  iconAnchor: [9, 9],
})

const parkings = [
  { id: 1, lat: 55.7558, lng: 37.6176, name: "Тверская, д. 12", free: 8, total: 20, status: "free" },
  { id: 2, lat: 55.7512, lng: 37.6234, name: "Моховая, д. 5", free: 0, total: 15, status: "busy" },
  { id: 3, lat: 55.7589, lng: 37.6098, name: "Охотный Ряд, д. 3", free: 3, total: 12, status: "partial" },
  { id: 4, lat: 55.7534, lng: 37.6312, name: "Кузнецкий Мост, д. 7", free: 12, total: 18, status: "free" },
  { id: 5, lat: 55.7478, lng: 37.6145, name: "Арбат, д. 22", free: 0, total: 10, status: "busy" },
  { id: 6, lat: 55.7601, lng: 37.6287, name: "Неглинная, д. 14", free: 5, total: 14, status: "partial" },
  { id: 7, lat: 55.7545, lng: 37.6055, name: "Знаменка, д. 9", free: 9, total: 9, status: "free" },
  { id: 8, lat: 55.7490, lng: 37.6378, name: "Варварка, д. 4", free: 2, total: 16, status: "partial" },
]

function MapStyle() {
  const map = useMap()
  useEffect(() => {
    map.getContainer().style.background = "#0a0a0a"
  }, [map])
  return null
}

export default function ParkingMap() {
  return (
    <div className="w-full rounded-xl overflow-hidden border border-gray-800/50" style={{ height: 480 }}>
      <MapContainer
        center={[55.755, 37.617]}
        zoom={14}
        style={{ height: "100%", width: "100%", background: "#0a0a0a" }}
        scrollWheelZoom={false}
      >
        <MapStyle />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        {parkings.map((p) => (
          <Marker
            key={p.id}
            position={[p.lat, p.lng]}
            icon={p.status === "free" ? freeIcon : p.status === "busy" ? busyIcon : partialIcon}
          >
            <Popup>
              <div style={{ fontFamily: "monospace", minWidth: 160 }}>
                <div style={{ fontWeight: 600, marginBottom: 4 }}>{p.name}</div>
                <div style={{ color: p.status === "free" ? "#22c55e" : p.status === "busy" ? "#ef4444" : "#f59e0b" }}>
                  {p.status === "free" ? "Есть места" : p.status === "busy" ? "Мест нет" : "Мало мест"}
                </div>
                <div style={{ color: "#888", fontSize: 12, marginTop: 2 }}>
                  Свободно: {p.free} / {p.total}
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}