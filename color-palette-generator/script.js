const generateBtn = document.getElementById('generate-btn');
const colorBox = document.getElementsByClassName('color-box');
console.log(colorBox)
const colorHex = document.querySelectorAll('#color-hex');
const copyColor = document.getElementsByClassName('color-info');
const getIcon = document.querySelectorAll('.color-info i');
// displaying random color at first load
showColors();

// when button is clicked show random palette
generateBtn.addEventListener('click', () => {


// adding animation when button clicked
  document.getElementById('btn-icon').classList.add('animate-icon');
  // delaying the color generatior for 1 sec
  setTimeout(showColors, 1000);

// removing all the previous copied icon list
  getIcon.forEach(item => {
    item.classList.remove('fa-check', 'fa-solid')
  })

  // showColors();
})

function getRandomColor() {
  let color = '#';
  const hexChars = '0123456789abcdef';
  for (let i = 0; i < 6; i++) {
    color += hexChars[Math.floor(Math.random() * 16)];
  }
  return color;
}

function showColors() {
  document.getElementById('btn-icon').classList.remove('animate-icon');
  for (i = 0; i < colorBox.length; i++) {
    const getColor = getRandomColor();
    colorBox[i].style.backgroundColor = getColor;
    colorHex[i].innerText = getColor;
  }
}
let click = false;

Array.from(copyColor).forEach((btn, i) => {

  btn.addEventListener('click', (e) => {
    click = true;
    const copyColor = colorHex[i].innerHTML;
    navigator.clipboard.writeText(copyColor);
    getIcon[i].classList.add('fa-solid', 'fa-check')
    getIcon[i].style.alignItems = 'center'
  })

});

