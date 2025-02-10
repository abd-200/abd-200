// تهيئة الخريطة الأساسية
const map = L.map('map').setView([32.3272, 35.7575], 12);

// إضافة طبقة الخريطة الأساسية
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// فئات المواقع وألوانها
const categories = {
    touristic_place: { name: 'معالم سياحية', color: '#ff7800', icon: '🏰' },
    village: { name: 'قرى', color: '#4CAF50', icon: '🏡' },
    service: { name: 'خدمات', color: '#2196F3', icon: '🏪' },
    // ... إضافة بقية الفئات بنفس النمط
};

// مصفوفة البيانات
const markersData = [ /* ... نفس بيانات المواقع السابقة ... */ ];

// إنشاء طبقات وعناقيد
const markerClusters = L.markerClusterGroup({
    spiderfyOnMaxZoom: false,
    showCoverageOnHover: false,
    zoomToBoundsOnClick: true
});

// وظيفة إنشاء العلامات
function createMarkers() {
    markersData.forEach(marker => {
        const customIcon = L.divIcon({
            className: 'custom-marker',
            html: `<div style="background:${categories[marker.category].color}">
                     ${categories[marker.category].icon}
                   </div>`,
            iconSize: [32, 32]
        });

        const newMarker = L.marker(marker.position, { 
            icon: customIcon,
            title: marker.title
        }).bindPopup(`
            <h3>${marker.title}</h3>
            <p>الفئة: ${categories[marker.category].name}</p>
            <button onclick="showDirections(${marker.position})">إظهار الاتجاهات</button>
        `);

        markerClusters.addLayer(newMarker);
    });
}

// وظيفة عرض الاتجاهات
function showDirections(coords) {
    if (!navigator.geolocation) {
        alert('المتصفح لا يدعم تحديد الموقع');
        return;
    }

    navigator.geolocation.getCurrentPosition(position => {
        const userCoords = [position.coords.latitude, position.coords.longitude];
        L.Routing.control({
            waypoints: [
                L.latLng(userCoords[0], userCoords[1]),
                L.latLng(coords[0], coords[1])
            ],
            routeWhileDragging: true,
            language: 'ar'
        }).addTo(map);
    });
}

// تهيئة البحث
const searchControl = new L.Control.Search({
    position: 'topright',
    layer: markerClusters,
    propertyName: 'title',
    marker: false,
    moveToLocation: function(latlng, title, map) {
        map.setView(latlng, 15);
    }
});

// إضافة العناصر للخريطة
function initMap() {
    createMarkers();
    map.addLayer(markerClusters);
    searchControl.addTo(map);
    
    // إضافة عناصر التحكم
    L.control.layers(null, getLayerControls(), { 
        position: 'bottomright',
        collapsed: false 
    }).addTo(map);
}

// الحصول على عناصر التحكم في الطبقات
function getLayerControls() {
    const layers = {};
    Object.keys(categories).forEach(category => {
        layers[categories[category].name] = L.layerGroup(
            markerClusters.getLayers().filter(layer => {
                return layer.options.title === category;
            })
        );
    });
    return layers;
}

// بدء التطبيق
document.addEventListener('DOMContentLoaded', initMap);