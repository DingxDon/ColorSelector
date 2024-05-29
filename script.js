const mainColor = document.getElementById('main-color');
const caption = document.getElementById('caption');
const thumbnails = document.getElementById('thumbnails');
const allBtn = document.getElementById('all-btn');
const redBtn = document.getElementById('red-btn');
const greenBtn = document.getElementById('green-btn');
const blueBtn = document.getElementById('blue-btn');
const colorSelect = document.getElementById('color-select');
const buttons = document.querySelectorAll('#controls button');

const redColors = ['#FF0000', '#FF6666', '#FF9999', '#FFCCCC', '#FFE6E6'];
const greenColors = ['#00FF00', '#66FF66', '#99FF99', '#CCFFCC', '#E6FFE6'];
const blueColors = ['#0000FF', '#6666FF', '#9999FF', '#CCCCFF', '#E6E6FF'];
const colors = [...redColors, ...greenColors, ...blueColors];
let currentColor = colors[0];
let currentIndex = 0;

function createThumbnail(color, index) {
  const thumbnail = document.createElement('div');
  thumbnail.classList.add('thumbnail');
  thumbnail.style.backgroundColor = color;
  thumbnail.addEventListener('click', () => setMainColor(color, index));
  return thumbnail;
}

function renderThumbnails() {
  thumbnails.innerHTML = '';
  if (currentColor === 'all') {
    colors.forEach((color, index) => {
      const thumbnail = createThumbnail(color, index);
      thumbnails.appendChild(thumbnail);
    });
  } else {
    const colorArray = getColorArray(currentColor);
    colorArray.forEach((color, index) => {
      const thumbnail = createThumbnail(color, index);
      thumbnails.appendChild(thumbnail);
    });
  }
}

function getColorArray(color) {
  switch (color) {
    case '#FF0000':
      return redColors;
    case '#00FF00':
      return greenColors;
    case '#0000FF':
      return blueColors;
    default:
      return [];
  }
}

function setMainColor(color, index) {
  mainColor.style.backgroundColor = color;
  currentColor = color;
  currentIndex = index;
  const colorArray = getColorArray(color);
  const totalColors = colorArray.length;
  caption.textContent = `${index + 1}/${totalColors} - ${color.toUpperCase()}`;
}

function setActiveButton(button) {
  buttons.forEach(btn => btn.classList.remove('active'));
  button.classList.add('active');
}

allBtn.addEventListener('click', () => {
  currentColor = 'all';
  renderThumbnails();
  setMainColor(colors[0], 0);
  setActiveButton(allBtn);
});

redBtn.addEventListener('click', () => {
  currentColor = '#FF0000';
  renderThumbnails();
  setMainColor(currentColor, redColors.indexOf(currentColor));
  setActiveButton(redBtn);
});

greenBtn.addEventListener('click', () => {
  currentColor = '#00FF00';
  renderThumbnails();
  setMainColor(currentColor, greenColors.indexOf(currentColor));
  setActiveButton(greenBtn);
});

blueBtn.addEventListener('click', () => {
  currentColor = '#0000FF';
  renderThumbnails();
  setMainColor(currentColor, blueColors.indexOf(currentColor));
  setActiveButton(blueBtn);
});

colorSelect.addEventListener('change', () => {
  currentColor = colorSelect.value;
  renderThumbnails();
  const colorArray = getColorArray(currentColor);
  setMainColor(currentColor === 'all' ? colors[0] : currentColor, currentColor === 'all' ? 0 : colorArray.indexOf(currentColor));
  setActiveButton(currentColor === 'all' ? allBtn : document.querySelector(`#controls button[data-color="${currentColor}"]`));
});

renderThumbnails();
setMainColor(colors[0], 0);
setActiveButton(allBtn);