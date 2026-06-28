const PLAN = {
  A: {
    heading: "Workout A",
    name: "Lower + core",
    copy: "Legs, hips, and trunk. Move with control; do not chase burn.",
    weeks: [
      [["Bodyweight squat", "10"], ["Pause glute bridge", "12"], ["Reverse lunge", "6/side"], ["Slow dead bug", "8/side"]],
      [["Bodyweight squat", "12"], ["Pause glute bridge", "14"], ["Reverse lunge", "7/side"], ["Slow dead bug", "9/side"]],
      [["Bodyweight squat", "14"], ["Pause glute bridge", "16"], ["Reverse lunge", "8/side"], ["Slow dead bug", "10/side"]],
      [["Bodyweight squat", "15"], ["Pause glute bridge", "18"], ["Reverse lunge", "9/side"], ["Slow dead bug", "11/side"]],
    ],
  },
  B: {
    heading: "Workout B",
    name: "Upper + posture/core",
    copy: "Push, upper back, and brace. Keep shoulders smooth and reps clean.",
    weeks: [
      [["Incline push-up", "8"], ["Pause reverse snow angel", "10"], ["Pause bird dog", "8/side"], ["Full plank", "20–30s"]],
      [["Incline push-up", "9"], ["Pause reverse snow angel", "12"], ["Pause bird dog", "9/side"], ["Full plank", "25–30s"]],
      [["Incline push-up", "10"], ["Pause reverse snow angel", "14"], ["Pause bird dog", "10/side"], ["Full plank", "30–35s"]],
      [["Incline push-up", "11"], ["Pause reverse snow angel", "15"], ["Pause bird dog", "11/side"], ["Full plank", "35–40s"]],
    ],
  },
};

const EXERCISE_LINKS = {
  "Bodyweight squat": "exercises.html#bodyweight-squat",
  "Pause glute bridge": "exercises.html#pause-glute-bridge",
  "Reverse lunge": "exercises.html#reverse-lunge",
  "Slow dead bug": "exercises.html#slow-dead-bug",
  "Incline push-up": "exercises.html#incline-push-up",
  "Pause reverse snow angel": "exercises.html#pause-reverse-snow-angel",
  "Pause bird dog": "exercises.html#pause-bird-dog",
  "Full plank": "exercises.html#full-plank",
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
            <div><dt>Squat</dt><dd>${a[0][1]}</dd></div>
            <div><dt>Bridge</dt><dd>${a[1][1]}</dd></div>
            <div><dt>Lunge</dt><dd>${a[2][1]}</dd></div>
            <div><dt>Slow dead bug</dt><dd>${a[3][1]}</dd></div>
          </dl>
        </div>
        <div class="rep-group rep-group--b">
          <strong>B</strong>
          <dl>
            <div><dt>Push-up</dt><dd>${b[0][1]}</dd></div>
            <div><dt>Pause snow angel</dt><dd>${b[1][1]}</dd></div>
            <div><dt>Pause bird dog</dt><dd>${b[2][1]}</dd></div>
            <div><dt>Full plank</dt><dd>${b[3][1]}</dd></div>
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
