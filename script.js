const linksObj = document.getElementsByClassName("link");

const links = Object.values(linksObj);
for (const el of links)
  el.innerHTML = `<a style="color:${el?.dataset.color || "black"};" href="${
    el.dataset.href
  }"><span style="text-decoration:underline">${el.dataset.name}</span>
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#000000" viewBox="0 0 256 256"><path d="M224,104a8,8,0,0,1-16,0V59.32l-66.33,66.34a8,8,0,0,1-11.32-11.32L196.68,48H152a8,8,0,0,1,0-16h64a8,8,0,0,1,8,8Zm-40,24a8,8,0,0,0-8,8v72H48V80h72a8,8,0,0,0,0-16H48A16,16,0,0,0,32,80V208a16,16,0,0,0,16,16H176a16,16,0,0,0,16-16V136A8,8,0,0,0,184,128Z"></path></svg>
  </a>`;

let lastMouseX = 0;
let lastMouseY = 0;
let lastMoveTime = Date.now();
let isShaking = false;

document.body.addEventListener("mousemove", (event) => {
  const currentTime = Date.now();
  const timeDiff = currentTime - lastMoveTime;

  // Calculate the distance moved by the cursor
  const distX = Math.abs(event.clientX - lastMouseX);
  const distY = Math.abs(event.clientY - lastMouseY);
  const distance = Math.sqrt(distX ** 2 + distY ** 2);

  // If the cursor moved a significant distance in a short time, consider it a shake
  if (distance > 50 && timeDiff < 100) {
    if (!isShaking) {
      document.body.classList.add("fast-move");
      isShaking = true;
    }
  } 

  // Update the last known position and time
  lastMouseX = event.clientX;
  lastMouseY = event.clientY;
  lastMoveTime = currentTime;
});
