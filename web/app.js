const PLAN = {
  A: {
    heading: "Workout A",
    name: "Lower + core",
    copy: "Legs, hips, and trunk. Harder variations, still controlled.",
    weeks: [
      [["Pause bodyweight squat", "10"], ["Single-leg glute bridge", "8/side"], ["Reverse lunge", "6/side"], ["Long-lever dead bug", "8/side"]],
      [["Pause bodyweight squat", "12"], ["Single-leg glute bridge", "9/side"], ["Reverse lunge", "7/side"], ["Long-lever dead bug", "9/side"]],
      [["Pause bodyweight squat", "14"], ["Single-leg glute bridge", "10/side"], ["Reverse lunge", "8/side"], ["Long-lever dead bug", "10/side"]],
      [["Pause bodyweight squat", "15"], ["Single-leg glute bridge", "11/side"], ["Reverse lunge", "9/side"], ["Long-lever dead bug", "11/side"]],
    ],
  },
  B: {
    heading: "Workout B",
    name: "Upper + posture/core",
    copy: "Push, upper back, and brace. Harder core/posture work without adding equipment.",
    weeks: [
      [["Incline push-up", "8"], ["Prone W raise", "10"], ["Bird-dog crunch", "8/side"], ["Plank shoulder taps", "8/side"]],
      [["Incline push-up", "9"], ["Prone W raise", "12"], ["Bird-dog crunch", "9/side"], ["Plank shoulder taps", "9/side"]],
      [["Incline push-up", "10"], ["Prone W raise", "14"], ["Bird-dog crunch", "10/side"], ["Plank shoulder taps", "10/side"]],
      [["Incline push-up", "11"], ["Prone W raise", "15"], ["Bird-dog crunch", "11/side"], ["Plank shoulder taps", "11/side"]],
    ],
  },
};

const EXERCISE_LINKS = {
  "Pause bodyweight squat": "exercises.html#pause-bodyweight-squat",
  "Single-leg glute bridge": "exercises.html#single-leg-glute-bridge",
  "Reverse lunge": "exercises.html#reverse-lunge",
  "Long-lever dead bug": "exercises.html#long-lever-dead-bug",
  "Incline push-up": "exercises.html#incline-push-up",
  "Prone W raise": "exercises.html#prone-w-raise",
  "Bird-dog crunch": "exercises.html#bird-dog-crunch",
  "Plank shoulder taps": "exercises.html#plank-shoulder-taps",
};

const STORAGE_KEY = "dailyAB.startDate";
const startDateInput = document.querySelector("#startDate");
const todayStartButton = document.querySelector("#todayStartButton");
const printButton = document.querySelector("#printButton");

function todayISO() {
  const date = new Date();
  date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
  return date.toISOString().slice(0, 10);
}

function getStartDate() {
  return localStorage.getItem(STORAGE_KEY) || todayISO();
}

function setStartDate(value) {
  localStorage.setItem(STORAGE_KEY, value || todayISO());
}

function daysSince(dateString) {
  const start = new Date(`${dateString}T00:00:00`);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return Math.max(0, Math.floor((today - start) / 86400000));
}

function weekFromDay(dayIndex) {
  return Math.min(4, Math.floor(dayIndex / 7) + 1);
}

function workoutKeyFromDay(dayIndex) {
  return dayIndex % 2 === 0 ? "A" : "B";
}

function renderExerciseList(rows) {
  return rows
    .map(([name, reps]) => {
      const href = EXERCISE_LINKS[name] || "exercises.html";
      return `<li><a class="exercise-link" href="${href}">${name}</a><b>${reps}</b></li>`;
    })
    .join("");
}

function renderToday() {
  const startDate = getStartDate();
  startDateInput.value = startDate;

  const dayIndex = daysSince(startDate);
  const dayNumber = dayIndex + 1;
  const weekNumber = weekFromDay(dayIndex);
  const key = workoutKeyFromDay(dayIndex);
  const workout = PLAN[key];
  const rows = workout.weeks[weekNumber - 1];

  document.querySelector("#todayHeading").textContent = workout.heading;
  document.querySelector("#dayLabel").textContent = `Day ${dayNumber}`;
  document.querySelector("#weekLabel").textContent = `Week ${weekNumber}`;
  document.querySelector("#todayCopy").textContent = workout.copy;
  document.querySelector("#todayExercises").innerHTML = renderExerciseList(rows);

  renderProgression(weekNumber);
}

function renderProgression(currentWeek) {
  const grid = document.querySelector("#progressionGrid");
  grid.innerHTML = "";

  for (let index = 0; index < 4; index += 1) {
    const week = index + 1;
    const a = PLAN.A.weeks[index];
    const b = PLAN.B.weeks[index];
    const card = document.createElement("article");
    card.className = `progression-week${week === currentWeek ? " is-current" : ""}`;
    card.innerHTML = `
      <div class="progression-week__header">
        <span>${week === currentWeek ? "Current" : "Progression"}</span>
        <h3>Week ${week}</h3>
      </div>
      <div class="rep-matrix" aria-label="Week ${week} rep targets">
        <div class="rep-group rep-group--a">
          <strong>A</strong>
          <dl>
            <div><dt>Pause squat</dt><dd>${a[0][1]}</dd></div>
            <div><dt>Single-leg bridge</dt><dd>${a[1][1]}</dd></div>
            <div><dt>Reverse lunge</dt><dd>${a[2][1]}</dd></div>
            <div><dt>Long dead bug</dt><dd>${a[3][1]}</dd></div>
          </dl>
        </div>
        <div class="rep-group rep-group--b">
          <strong>B</strong>
          <dl>
            <div><dt>Incline push-up</dt><dd>${b[0][1]}</dd></div>
            <div><dt>Prone W raise</dt><dd>${b[1][1]}</dd></div>
            <div><dt>Bird-dog crunch</dt><dd>${b[2][1]}</dd></div>
            <div><dt>Shoulder taps</dt><dd>${b[3][1]}</dd></div>
          </dl>
        </div>
      </div>
    `;
    grid.append(card);
  }
}

startDateInput.addEventListener("change", () => {
  setStartDate(startDateInput.value);
  renderToday();
});

todayStartButton.addEventListener("click", () => {
  setStartDate(todayISO());
  renderToday();
});

printButton.addEventListener("click", () => window.print());

renderToday();
