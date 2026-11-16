import React from 'react'
import ReactDOM from 'react-dom/client'
import 'leaflet/dist/leaflet.css'
import 'leaflet.markercluster/dist/MarkerCluster.css'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'
import './styles.css'
import './test-map.css'
import TestMap from './TestMap.jsx'

ReactDOM.createRoot(document.getElementById('test-root')).render(
  <React.StrictMode><TestMap /></React.StrictMode>,
)