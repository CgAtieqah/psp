const params = new URLSearchParams(window.location.search);

const id = params.get('id');

const lesson = lessons.find((item) => item.id === id);

document.getElementById('part1').textContent = lesson.part1;

document.getElementById('part2').textContent = lesson.part2;

// Current page URL

const qrUrl =
  window.location.origin +
  window.location.pathname.replace('print.html', 'index.html') +
  '?id=' +
  lesson.id;

// Generate QR

document.getElementById('qrcode').innerHTML =
  `<img src="https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(qrUrl)}">`;
