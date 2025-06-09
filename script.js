// Countdown Logic
function countdown() {
  const now = new Date();
  const currentYear = now.getFullYear();

  // Set birthday to Nov 15 at 00:00:00
  let birthday = new Date(currentYear, 5, 9, 0, 0, 0); // Month is 0-indexed (10 = November)

  // If today is past birthday, use next year's
  if (now > birthday && now.toDateString() !== birthday.toDateString()) {
    birthday = new Date(currentYear + 1, 5, 9, 0, 0, 0);
  }

  const diff = birthday - now;

  if (
    now.getDate() === birthday.getDate() &&
    now.getMonth() === birthday.getMonth()
  ) {
    // It's her birthday!
    document.getElementById("countdown").classList.add("hidden");
    document.getElementById("birthday-msg").classList.remove("hidden");
    clearInterval(timer);
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  document.getElementById("days").textContent = String(days).padStart(2, '0');
  document.getElementById("hours").textContent = String(hours).padStart(2, '0');
  document.getElementById("minutes").textContent = String(minutes).padStart(2, '0');
  document.getElementById("seconds").textContent = String(seconds).padStart(2, '0');
}

const timer = setInterval(countdown, 1000);
countdown();


// Floating Heart Canvas
const canvas = document.getElementById("hearts-canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let hearts = [];

function Heart() {
  this.x = Math.random() * canvas.width;
  this.y = canvas.height + Math.random() * 100;
  this.size = Math.random() * 15 + 10;
  this.speed = Math.random() * 1 + 0.5;
  this.alpha = Math.random() * 0.5 + 0.3;
}

Heart.prototype.draw = function () {
  ctx.globalAlpha = this.alpha;
  ctx.font = this.size + "px serif";
  ctx.fillText("💖", this.x, this.y);
  ctx.globalAlpha = 1;
};

Heart.prototype.update = function () {
  this.y -= this.speed;
  if (this.y < -20) {
    this.y = canvas.height + Math.random() * 100;
    this.x = Math.random() * canvas.width;
  }
};

function handleHearts() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (hearts.length < 100) {
    hearts.push(new Heart());
  }
  hearts.forEach((h) => {
    h.update();
    h.draw();
  });
  requestAnimationFrame(handleHearts);
}

handleHearts();
