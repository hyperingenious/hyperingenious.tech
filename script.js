const linksObj = document.getElementsByClassName("link");

const links = Object.values(linksObj);
for (const el of links)
  el.innerHTML = `<a style="color:${el?.dataset.color || "black"};" href="${
    el.dataset.href
  }"><span style="text-decoration:underline">${el.dataset.name}</span>
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#000000" viewBox="0 0 256 256"><path d="M224,104a8,8,0,0,1-16,0V59.32l-66.33,66.34a8,8,0,0,1-11.32-11.32L196.68,48H152a8,8,0,0,1,0-16h64a8,8,0,0,1,8,8Zm-40,24a8,8,0,0,0-8,8v72H48V80h72a8,8,0,0,0,0-16H48A16,16,0,0,0,32,80V208a16,16,0,0,0,16,16H176a16,16,0,0,0,16-16V136A8,8,0,0,0,184,128Z"></path></svg>
  </a>`;

let positions = [];
let isShaking = false;
const SHAKE_THRESHOLD = 5; // Number of rapid direction changes needed to trigger the shake
const SHAKE_TIME_WINDOW = 200; // Time window in milliseconds to detect the shake

document.body.addEventListener("mousemove", (event) => {
  const currentTime = Date.now();

  // Record current position and timestamp
  positions.push({ x: event.clientX, y: event.clientY, time: currentTime });

  // Keep only recent positions within the time window
  positions = positions.filter(
    (pos) => currentTime - pos.time < SHAKE_TIME_WINDOW
  );

  // Check if the cursor is shaking
  if (isShakingCursor(positions)) {
    if (!isShaking) {
      document.body.classList.add("fast-move");
      isShaking = true;
    }
  }
});

// Function to detect intentional shaking
function isShakingCursor(positions) {
  if (positions.length < 3) return false;

  let directionChanges = 0;
  for (let i = 2; i < positions.length; i++) {
    const prev1 = positions[i - 1];
    const prev2 = positions[i - 2];

    // Check if there's a change in direction (back-and-forth movement)
    const dirX1 = Math.sign(prev1.x - prev2.x);
    const dirX2 = Math.sign(positions[i].x - prev1.x);
    const dirY1 = Math.sign(prev1.y - prev2.y);
    const dirY2 = Math.sign(positions[i].y - prev1.y);

    // Count a direction change if X or Y direction flipped
    if ((dirX1 !== 0 && dirX1 !== dirX2) || (dirY1 !== 0 && dirY1 !== dirY2)) {
      directionChanges++;
    }
  }

  return directionChanges >= SHAKE_THRESHOLD;
}
