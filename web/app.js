const PLAN = {
  A: {
    heading: "Workout A",
    name: "Lower + core",
    copy: "Legs, hips, and trunk. Move with control; do not chase burn.",
    weeks: [
      [["Chair squat", "10"], ["Glute bridge", "12"], ["Reverse lunge / split squat", "6/side"], ["Dead bug", "8/side"]],
      [["Chair squat", "12"], ["Glute bridge", "14"], ["Reverse lunge / split squat", "7/side"], ["Dead bug", "9/side"]],
      [["Chair squat", "14"], ["Glute bridge", "16"], ["Reverse lunge / split squat", "8/side"], ["Dead bug", "10/side"]],
      [["Chair squat", "15"], ["Glute bridge", "18"], ["Reverse lunge / split squat", "9/side"], ["Dead bug", "11/side"]],
    ],
  },
  B: {
    heading: "Workout B",
    name: "Upper + posture/core",
    copy: "Push, upper back, and brace. Keep shoulders smooth and reps clean.",
    weeks: [
      [["Incline push-up", "8"], ["Reverse snow angel", "10"], ["Bird dog", "8/side"], ["Plank", "20–30s"]],
      [["Incline push-up", "9"], ["Reverse snow angel", "12"], ["Bird dog", "9/side"], ["Plank", "25–30s"]],
      [["Incline push-up", "10"], ["Reverse snow angel", "14"], ["Bird dog", "10/side"], ["Plank", "30–35s"]],
      [["Incline push-up", "11"], ["Reverse snow angel", "15"], ["Bird dog", "11/side"], ["Plank", "35–40s"]],
    ],
  },
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
    .map(([name, reps]) => `<li><span>${name}</span><b>${reps}</b></li>`)
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
            <div><dt>Dead bug</dt><dd>${a[3][1]}</dd></div>
          </dl>
        </div>
        <div class="rep-group rep-group--b">
          <strong>B</strong>
          <dl>
            <div><dt>Push-up</dt><dd>${b[0][1]}</dd></div>
            <div><dt>Snow angel</dt><dd>${b[1][1]}</dd></div>
            <div><dt>Bird dog</dt><dd>${b[2][1]}</dd></div>
            <div><dt>Plank</dt><dd>${b[3][1]}</dd></div>
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
