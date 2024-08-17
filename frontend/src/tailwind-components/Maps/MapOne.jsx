import React from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
const MapOne = ({ geoJsonData }) => {
    return (
        <MapContainer
            center={[0, 0]} // Centre de la carte
            zoom={2} // Zoom initial
            style={{ height: '400px', width: '100%' }} // Style de la carte
        >
            {/* Ajoutez une couche de tuiles pour afficher le fond de la carte */}
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            {/* Ajoutez le GeoJSON à la carte */}
            <GeoJSON data={geoJsonData} />
        </MapContainer>
    );
};

export default MapOne;

