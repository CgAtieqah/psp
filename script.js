let current = 0;

// Elements

const part1 = document.getElementById('part1');

const part2 = document.getElementById('part2');

const audio = document.getElementById('audio');

const listBtn = document.getElementById('listBtn');

const lessonList = document.getElementById('lessonList');

// Read QR ID from URL

const params = new URLSearchParams(window.location.search);

const cardId = params.get('id');

// Find matching card

if (cardId) {
  const foundIndex = lessons.findIndex((item) => item.id === cardId);

  if (foundIndex !== -1) {
    current = foundIndex;
  }
}

// Load lesson

showLesson();

createLessonList();

// Display lesson

function showLesson() {
  const lesson = lessons[current];

  part1.textContent = lesson.part1;

  part2.textContent = lesson.part2;

  part1.classList.remove('highlight');

  part2.classList.remove('highlight');

  audio.src = lesson.audio;
}

function playLesson() {
  const lesson = lessons[current];

  part1.classList.remove('highlight');

  part2.classList.remove('highlight');

  audio.currentTime = 0;

  audio.play().catch((error) => {
    console.log('Audio error:', error);
  });

  setTimeout(() => {
    part1.classList.add('highlight');
  }, lesson.highlight1);

  setTimeout(() => {
    part1.classList.remove('highlight');

    part2.classList.add('highlight');
  }, lesson.highlight2);

  audio.onended = () => {
    part1.classList.remove('highlight');

    part2.classList.remove('highlight');
  };
}

// Buttons

document.getElementById('playBtn').onclick = playLesson;

document.getElementById('nextBtn').onclick = () => {
  current++;

  if (current >= lessons.length) {
    current = 0;
  }

  showLesson();
};

document.getElementById('prevBtn').onclick = () => {
  current--;

  if (current < 0) {
    current = lessons.length - 1;
  }

  showLesson();
};

document.getElementById('printBtn').onclick = () => {
  const lesson = lessons[current];

  window.open(`print.html?id=${lesson.id}`, '_blank');
};

function createLessonList() {
  lessonList.innerHTML = '';

  lessons.forEach((lesson, index) => {
    const item = document.createElement('div');

    item.className = 'lesson-item';

    item.textContent = `${lesson.part1} ${lesson.part2}`;

    item.onclick = () => {
      current = index;

      showLesson();

      lessonList.classList.add('hidden');
    };

    lessonList.appendChild(item);
  });
}

listBtn.onclick = () => {
  lessonList.classList.toggle('hidden');
};
