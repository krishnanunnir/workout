# AGENTS.md

This repository is for researching and designing a workout routine that fits the user, not for prematurely building trackers, dashboards, or fixed plans.

## Purpose

Help the user find the right training approach through evidence-informed research, experimentation, and fit assessment.

The user profile currently known:

- Weight: **93 kg**
- Height: **182 cm**
- BMI estimate: **28.1 kg/m²**
- Goal is not yet finalized.

Do not assume the final goal is fat loss, bodybuilding, strength, endurance, or general health until clarified or supported by the user's preferences.

## Primary operating mode

This repo is **research-first**.

Before creating any plan, investigate:

1. The user's actual goal.
2. Training history and current fitness level.
3. Equipment access.
4. Weekly schedule and time constraints.
5. Injury history, pain, medical limitations, and recovery capacity.
6. Preferences: gym vs home, solo vs class, cardio tolerance, sports, disliked exercises.
7. Lifestyle constraints: sleep, work stress, travel, food routine.
8. What the user will realistically repeat for months.

The best plan is the one that is safe, effective, and adherable.

## What agents should do

When asked to help, prefer this sequence:

1. **Clarify the decision** — what are we trying to choose? Example: fat-loss plan, beginner strength routine, gym split, running plan, mobility plan.
2. **Research current evidence** — use online sources when making claims about programming, fat loss, hypertrophy, cardio, recovery, or nutrition.
3. **Compare options** — explain tradeoffs between 2–4 reasonable approaches.
4. **Fit to user** — map options against the user's stats, schedule, preferences, recovery, and constraints.
5. **Recommend a small experiment** — usually 2–4 weeks, with clear success/failure criteria.
6. **Avoid overbuilding** — do not create apps, dashboards, or detailed trackers unless explicitly requested.

## Research standards

Use reputable sources, such as:

- Public health agencies: CDC, WHO, NHS, HHS.
- Sports medicine and exercise science organizations: ACSM, NASM, NSCA.
- Peer-reviewed position stands and reviews.
- Nutrition organizations and consensus statements, especially for protein, weight management, and supplements.

When researching online:

- Prefer primary or consensus sources over influencer content.
- Record source URLs and the exact takeaway.
- Separate strong consensus from uncertain or individualized claims.
- Do not overstate single-study findings.
- Call out where evidence depends on training age, health status, or adherence.

## Safety rules

This repo is not medical advice.

Always be conservative when health status is unknown. Recommend professional medical guidance when there is:

- Chest pain, fainting, dizziness, or unusual shortness of breath.
- Acute injury or worsening pain.
- Known cardiovascular, metabolic, orthopedic, or other medical conditions affecting exercise.
- Medication questions.
- Aggressive weight-loss goals.

Avoid recommending:

- Crash diets or extreme calorie deficits.
- Dehydration protocols.
- Unsafe supplement use.
- Maximal lifting for an unassessed beginner.
- High-impact running volume jumps.
- Pain-through-it exercise substitutions.

## Evidence-informed defaults, not prescriptions

These are starting reference points only:

- Adult activity guideline baseline: about **150 min/week moderate aerobic activity** or equivalent, plus **2+ strength days/week**.
- Strength training for beginners/restarters often works well with **2–3 full-body sessions/week**.
- Progression should be gradual; avoid increasing volume, load, or intensity too quickly.
- Protein for exercising individuals is commonly discussed around **1.4–2.0 g/kg/day**, but the right target depends on goal, diet, health, and adherence.
- Weight change, if desired, should generally be gradual and sustainable.

Use these as research anchors, not as automatic prescriptions.

## How to evaluate “right fit”

A good recommendation should score well on:

- **Safety** — appropriate for current body, history, and limitations.
- **Effectiveness** — aligned with the stated goal.
- **Adherence** — realistic schedule, enjoyable enough, low friction.
- **Progression** — has a clear way to get harder without rushing.
- **Recovery** — accounts for sleep, soreness, stress, and rest days.
- **Measurability** — has simple signals to decide whether it is working.

## Output style

When presenting research or recommendations:

- Be concise and practical.
- Show tradeoffs clearly.
- Use metric units.
- Avoid pretending certainty when personal details are missing.
- Prefer tables for comparing options.
- End with a recommended next experiment when appropriate.

## Things not to create by default

Do not create these unless the user explicitly asks:

- Websites or apps.
- Progress dashboards.
- CSV trackers.
- Full meal plans.
- Complex periodized programs.
- Large file structures.

For now, keep the repo minimal. `AGENTS.md` is the source of truth.
