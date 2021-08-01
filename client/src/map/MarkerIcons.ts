import L from 'leaflet';

/**
 * Returns a Leaflet Marker icon using the "icon_marker_guess.svg"
 */
const IconGuess = new L.Icon({
    iconUrl: 'assets/icons/icon_marker_guess.svg',
    iconSize: [64, 64],
    iconAnchor: [32, 64],
    popupAnchor: [0, -60],
});


/**
 * Returns a Leaflet Marker icon using the "icon_marker_center.svg"
 */
const IconPinpoint = new L.Icon({
    iconUrl: 'assets/icons/icon_marker_center.svg',
    iconSize: [64, 64],
    iconAnchor: [32, 64],
    popupAnchor: [0, -60],
});


export { IconGuess, IconPinpoint};