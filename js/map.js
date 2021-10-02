let map;
const src = '../data/doc.geojson';

function getWebsiteUrl(url) {
  if (!url || !url.length || !url.includes('.')) return '';
  if (url.match(/n\/a/gi)) return '';
  if (url.match(/\s/g)) {
    const parsedUrl = url.split(' ')[0].trim()
    if (parsedUrl.match(/http/gi)) return parsedUrl;
    return `https://${parsedUrl}`;
  };
  if (url.match(/http/gi)) return url;
  return `https://${url}`;
}

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: new google.maps.LatLng(21.133041300608269, -157.212433874675298),
    zoom: 7,
    mapTypeId: 'terrain'
  });
  const infoWindow = new google.maps.InfoWindow({
    maxWidth: 350,
  });

  map.data.loadGeoJson(src, 'Name');
  map.data.addListener('click', (e) => {
    const content = `
      <h3>${e.feature.getProperty('Name')}</h3>
      <p>${e.feature.getProperty('Brief_Desc')}</p>
      <a href=${getWebsiteUrl(e.feature.getProperty('Website'))} target="blank" rel="noopener noreferrer">
      ${getWebsiteUrl(e.feature.getProperty('Website'))}</a>
    `
    infoWindow.setContent(content)
    infoWindow.setPosition(e.latLng)
    infoWindow.open(map)
  });
}