const durationInput = document.querySelector("#duration");
const startButton = document.querySelector("#start");
const restartButton = document.querySelector("#reset");
const circle = document.querySelector("circle");
const sound = new Audio("sounds/timer-over.wav");

const perimeter = circle.getAttribute("r") * 2 * Math.PI;
circle.setAttribute("stroke-dasharray", perimeter);

let duration;

const timer = new Timer(durationInput, startButton, restartButton, {
  onStart(totalDuration) {
    duration = totalDuration;
    durationInput.style.animation = `colorChange ${duration}s linear`;
  },
  onTick(timeRemaining) {
    circle.setAttribute(
      "stroke-dashoffset",
      (perimeter * timeRemaining) / duration - perimeter
    );
  },
  onRestart() {
    circle.setAttribute("stroke-dasharray", perimeter);
    circle.setAttribute("stroke-dashoffset", 0);
    circle.classList.remove("completed");
    durationInput.style.animation = `none`;
  },
  onComplete() {
    circle.setAttribute("stroke-dasharray", perimeter);
    circle.setAttribute("stroke-dashoffset", 0);

    circle.classList.add("completed");
    sound.play();
  },
  onPause() {
    durationInput.style.webkitAnimationPlayState = "paused";
  },
  onResume() {
    durationInput.style.webkitAnimationPlayState = "running";
  },
});
