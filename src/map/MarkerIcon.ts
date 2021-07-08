import L from 'leaflet';

const IconGuess = new L.Icon({
    iconUrl: 'assets/icons/icon_marker_guess.svg',
    iconSize: [64, 64],
    iconAnchor: [32, 64],
    popupAnchor: [0, -60],
});

export { IconGuess };