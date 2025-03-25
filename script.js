const quote_wrapper = document.querySelector('.wrapper');

setInterval(() => {
  quote_wrapper.style.display = 'none'
}, 2500);

const clickSound = new Audio("baahinchod.mp3");

document.querySelector('.bahinchod').addEventListener('click', () => clickSound.play())
