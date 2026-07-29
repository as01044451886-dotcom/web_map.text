const places = [
  {
    name: "공주대학교",
    category: "교육 · Alma Mater",
    emoji: "🎓",
    address: "충청남도 공주시 공주대학로 56-34",
    lat: 36.4710,
    lng: 127.1408,
    description: "사회 교사의 꿈을 키운 alma mater, 배움의 출발점이 된 캠퍼스"
  }
];

const map = L.map("map").setView([36.4710, 127.1408], 15);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

function createEmojiIcon(emoji) {
  return L.divIcon({
    html: `<span>${emoji}</span>`,
    className: "emoji-marker",
    iconSize: [36, 36],
    iconAnchor: [18, 18],
    popupAnchor: [0, -20]
  });
}

function createPopupContent(place) {
  return `
    <div class="popup-content">
      <div class="popup-emoji">${place.emoji}</div>
      <h3>${place.name}</h3>
      <span class="popup-category">${place.category}</span>
      <p class="popup-address">${place.address}</p>
      <p class="popup-desc">${place.description}</p>
    </div>
  `;
}

places.forEach((place) => {
  const marker = L.marker([place.lat, place.lng], {
    icon: createEmojiIcon(place.emoji)
  }).addTo(map);

  marker.bindPopup(createPopupContent(place));

  const listItem = document.createElement("li");
  listItem.innerHTML = `
    <span class="emoji">${place.emoji}</span>
    <div class="info">
      <div class="name">${place.name}</div>
      <div class="category">${place.category}</div>
    </div>
  `;

  listItem.addEventListener("click", () => {
    map.setView([place.lat, place.lng], 16, { animate: true });
    marker.openPopup();
  });

  document.getElementById("place-list").appendChild(listItem);
});
