import { useState, useEffect, useRef } from 'react';

// ─── THEME ────────────────────────────────────────────────────────────────────
const T = {
  bg: '#080810', surface: '#10101e', card: '#16162a', cardHigh: '#1e1e35',
  border: 'rgba(148,163,184,0.1)', borderHigh: 'rgba(148,163,184,0.18)',
  accent: '#818cf8', accentDark: '#6366f1', accentBg: 'rgba(99,102,241,0.12)',
  green: '#4ade80', greenBg: 'rgba(74,222,128,0.1)',
  amber: '#fbbf24', amberBg: 'rgba(251,191,36,0.1)',
  red: '#f87171', redBg: 'rgba(248,113,113,0.1)',
  purple: '#c084fc', purpleBg: 'rgba(192,132,252,0.1)',
  text: '#f1f5f9', textSec: '#94a3b8', textMuted: '#64748b',
};

// ─── EXERCISE LIBRARY ─────────────────────────────────────────────────────────
const EX = {
  breathing: {
    name: '90/90 Breathing', emoji: '🫁', color: T.purple, colorBg: T.purpleBg,
    why: 'Your lower back is gripping to stabilize your pelvis. This breathing pattern teaches it to let go and reset.',
    target: 'Diaphragm + deep abs', feel: 'Lower ribs soften down, low back relaxes, breathing expands into your sides and back',
    notFeel: 'Neck tension, aggressive low back arch, or ribs flaring upward',
    mistakes: ['Flaring ribs up', 'Pushing low back hard into floor', 'Breathing only into chest'],
    dose: '4–6 slow breaths with 4–6 sec exhale',
    setup: 'Lie on back, feet up on chair/couch so hips and knees are at 90°. Let everything go heavy.',
    stopIf: 'More than mild dizziness, or sharp back pain',
    hasTimer: true, timerSec: 6, timerLabel: 'Slow exhale',
  },
  ball_arch: {
    name: 'Ball Release – Left Arch', emoji: '🦶', color: T.amber, colorBg: T.amberBg,
    why: 'Your left foot is gripping constantly to stabilize your whole body. This releases that grip so everything above it can relax.',
    target: 'Plantar fascia + intrinsic foot muscles', feel: '"Tender-good" sensation, warmth, less gripping afterward',
    notFeel: 'Sharp tearing pain', mistakes: ['Rolling too fast', 'Pressing too hard'],
    dose: '45–90 sec, pause 10–20 sec on tender spots',
    setup: 'Stand with a lacrosse ball or tennis ball under your left foot. Shift weight gently.',
    stopIf: 'Pain spikes after, or bruising', hasTimer: true, timerSec: 60, timerLabel: 'Hold each spot',
  },
  short_foot: {
    name: 'Short-Foot (Doming)', emoji: '🦶', color: T.amber, colorBg: T.amberBg,
    why: 'Trains the small muscles inside your foot to support the arch — without your toes gripping.',
    target: 'Intrinsic foot muscles', feel: 'Subtle arch lift, toes staying relaxed and long',
    notFeel: 'Toe curling or cramping', mistakes: ['Clawing toes', 'Rolling to the outside edge'],
    dose: '5–8 reps × 5–10 sec hold',
    setup: 'Seated or standing. "Dome" the arch by drawing the ball of the foot toward your heel — without curling toes.',
    stopIf: 'Cramping — do seated version first', hasTimer: true, timerSec: 5, timerLabel: 'Hold',
  },
  short_foot_raise: {
    name: 'Short-Foot Heel Raise', emoji: '🦵', color: T.amber, colorBg: T.amberBg,
    why: 'Builds the calf + arch system working together. Key long-term exercise for your left foot.',
    target: 'Posterior tibialis + calf + arch',
    feel: 'Arch stays lifted as heel rises, pressure balanced across heel + big toe base + little toe base',
    notFeel: 'Rolling inward, toe clawing', mistakes: ['Losing the arch at the top', 'Bouncing the heel'],
    dose: '2–3 × 8–12 reps (left leg gets priority)',
    setup: 'Stand on both feet (or left only). Keep arch domed as you slowly raise heel.',
    stopIf: 'Arch pain significantly worse later that day',
  },
  ball_tfl: {
    name: 'Ball Release – Right TFL', emoji: '🫲', color: T.red, colorBg: T.redBg,
    why: 'Your right front-hip muscle is substituting for your glute. Releasing its tension helps your glute activate properly.',
    target: 'TFL / upper ITB (front-lateral hip)', feel: 'Localized tenderness, sometimes referral down the outer thigh',
    notFeel: 'Numbness or tingling', mistakes: ['Going too far inward (near femoral nerve)', 'Too much pressure'],
    dose: '45–60 sec, add small knee bend/straighten movements',
    setup: 'Lie face down or on side. Ball at front-outer hip crease, just below the hip bone.',
    stopIf: 'Any tingling or burning', hasTimer: true, timerSec: 45, timerLabel: 'Hold',
  },
  ball_ql: {
    name: 'Ball Release – Right QL', emoji: '🫃', color: T.red, colorBg: T.redBg,
    why: 'Your right lower back has been acting as a permanent stabilizer. This releases the overworked muscle so real stability can develop.',
    target: 'Quadratus lumborum + thoracolumbar fascia',
    feel: 'Deep ache, sometimes referral toward hip or buttock',
    notFeel: 'Sharp electric pain below the knee',
    mistakes: ['Pressing directly on the spine', 'Holding your breath'],
    dose: '60–90 sec per hot spot, breathe slowly throughout',
    setup: 'Lie on right side. Ball between last rib and hip crest, just outside the spine.',
    stopIf: 'Symptoms shoot below knee with numbness/weakness — see a professional',
    hasTimer: true, timerSec: 60, timerLabel: 'Hold each spot',
  },
  hip_shift: {
    name: 'Hip Shift to Center', emoji: '⚖️', color: T.green, colorBg: T.greenBg,
    why: 'You habitually hang on your left foot. This teaches your nervous system to find midline without overcorrecting to the right.',
    target: 'Midline weight distribution + pelvic leveling',
    feel: 'Left arch slightly unloads, right lower back feels less compressed',
    notFeel: 'Locked knees or leaning the trunk sideways',
    mistakes: ['Shifting too far right', 'Hiking one hip up'],
    dose: '3 reps × 15–20 sec with nasal breathing',
    setup: 'Stand relaxed. Gently shift weight 5–10% toward right heel + right big toe base. Breathe slowly.',
    stopIf: 'Increases back pain', hasTimer: true, timerSec: 15, timerLabel: 'Hold each shift',
  },
  glute_med: {
    name: 'Side-Lying Hip Abduction', emoji: '🏋️', color: T.green, colorBg: T.greenBg,
    why: 'Rebuilds the hip stabilizer your body stopped using, directly reducing the load on your right lower back.',
    target: 'Posterior fibres of glute medius',
    feel: 'Side/back of the glute burning (not the front hip)',
    notFeel: 'Front hip pinching (TFL taking over) or lower back clenching',
    mistakes: ['Hip rolling backward', 'Hiking the pelvis', 'Lifting too high'],
    dose: '2–3 × 8–12 slow reps, right side priority',
    setup: 'Lie on left side. Top leg slightly behind body. Foot slightly turned down. Pelvis stacked.',
    stopIf: 'Front hip keeps taking over — reduce range and move leg slightly more backward',
  },
  side_plank: {
    name: 'Side Plank', emoji: '💪', color: T.accent, colorBg: T.accentBg,
    why: 'Trains obliques + glute to be the stabilizer instead of your right lower back.',
    target: 'Lateral trunk system (obliques) + glute',
    feel: 'Side abdomen + glute working, steady breathing is possible',
    notFeel: 'Sharp lower back cramping',
    mistakes: ['Sinking at the shoulder', 'Rib flaring', 'Holding breath'],
    dose: '2 × 20–30 sec each side',
    setup: 'Forearm on floor, body in a straight line. Right side first.',
    stopIf: 'Lower back cramps hard — do bent-knee version instead',
    hasTimer: true, timerSec: 20, timerLabel: 'Hold each side',
  },
  dead_bug: {
    name: 'Dead Bug', emoji: '🪲', color: T.accent, colorBg: T.accentBg,
    why: 'Restores deep abdominal control and rib position, directly reducing the grip pattern in your lower back.',
    target: 'Deep abdominals + rib position',
    feel: 'Lower ribs down, abs working quietly, low back stays quiet throughout',
    notFeel: 'Hip flexors pulling, or back arching off the floor',
    mistakes: ['Rushing through reps', 'Losing rib position as limbs extend'],
    dose: '2 × 6 per side, slow and controlled',
    setup: 'Lie on back, arms straight up, hips + knees at 90°. Lower opposite arm and leg while keeping lower back still.',
    stopIf: 'Back pain increases',
  },
  ball_shoulder: {
    name: 'Ball Release – Right Shoulder', emoji: '🫁', color: T.red, colorBg: T.redBg,
    why: 'The muscle causing your front shoulder pain actually lives in your back shoulder (infraspinatus). Releasing it is the key to the anterior pain.',
    target: 'Infraspinatus / teres minor (posterior shoulder)',
    feel: 'Deep posterior tenderness, sometimes a referred sensation to the front of the shoulder — that\'s a good sign',
    notFeel: 'Nerve tingling into the hand that persists',
    mistakes: ['Pushing into the bony shoulder blade spine', 'Using excessive force'],
    dose: '60–90 sec on the most tender point, add tiny arm movements',
    setup: 'Ball on the meaty part of the right shoulder blade (below and outside the spine). Can use a wall or the floor.',
    stopIf: 'Symptoms significantly worsen after', hasTimer: true, timerSec: 60, timerLabel: 'Hold each point',
  },
  cross_body: {
    name: 'Cross-Body Stretch', emoji: '🤸', color: T.accent, colorBg: T.accentBg,
    why: 'Maintains posterior shoulder mobility without provoking the irritated anterior positions.',
    target: 'Posterior capsule / posterior deltoid',
    feel: 'Mild posterior shoulder stretch',
    notFeel: 'Any pinching at the front of the shoulder',
    mistakes: ['Forcing end range', 'Pulling too aggressively'],
    dose: '2 × 20 sec',
    setup: 'Bring right arm across chest at shoulder height. Use left hand to hold gently just above the elbow.',
    stopIf: 'Front shoulder pain increases', hasTimer: true, timerSec: 20, timerLabel: 'Hold each side',
  },
  er_isometric: {
    name: 'ER Isometric', emoji: '💪', color: T.green, colorBg: T.greenBg,
    why: 'Builds rotator cuff strength in the safest position possible. Directly calms the pain mechanism over time.',
    target: 'Infraspinatus + teres minor (right rotator cuff)',
    feel: 'Deep posterior shoulder engagement',
    notFeel: 'Front shoulder / biceps groove pain',
    mistakes: ['Rotating at the wrist only', 'Shrugging the shoulder'],
    dose: '3 × 20 sec (right side priority)',
    setup: 'Elbow tucked against ribs, towel between elbow and body. Press outward against a wall — don\'t move.',
    stopIf: 'Front shoulder lights up — reduce effort to 30–40%',
    hasTimer: true, timerSec: 20, timerLabel: 'Hold each rep',
  },
  wall_slide: {
    name: 'Serratus Wall Slide', emoji: '🧱', color: T.accent, colorBg: T.accentBg,
    why: 'Trains the muscle that controls your shoulder blade and takes pressure off the rotator cuff.',
    target: 'Serratus anterior (shoulder blade control)',
    feel: 'Ribcage stays down, a "wrap" feeling under the armpit and side ribs',
    notFeel: 'Upper traps shrugging or neck tension',
    mistakes: ['Flaring ribs', 'Losing forearm contact with wall', 'Shrugging'],
    dose: '2 × 6–8 slow reps',
    setup: 'Facing wall, forearms flat. Slide arms up while keeping ribs down. Optional: lift forearms off at top.',
    stopIf: 'Neck traps dominate — reduce height and slow down',
  },
  face_pull: {
    name: 'Face Pull', emoji: '🎯', color: T.accent, colorBg: T.accentBg,
    why: 'Improves posterior shoulder coordination and helps unload the front of the shoulder during pulling.',
    target: 'Posterior deltoid + mid/lower trapezius',
    feel: 'Upper back and back of shoulders working, no neck strain',
    notFeel: 'Front shoulder pinching',
    mistakes: ['Leaning back', 'Yanking the weight', 'Elbows too low'],
    dose: '2 × 12–15, light weight',
    setup: 'Cable at forehead height. Pull toward face with elbows flaring out, external rotation at end range.',
    stopIf: 'Shoulder pinches',
  },
  childs_pose: {
    name: "Child's Pose Reach", emoji: '🧘', color: T.purple, colorBg: T.purpleBg,
    why: 'Gentle spine and hip decompression. Resets thoracic extension and hip flexors.',
    target: 'Thoracic spine + hips',
    feel: 'Mild elongation through the back and hips',
    notFeel: 'Sharp pain anywhere',
    dose: '4 × 5 slow breaths',
    setup: 'Kneel and reach arms far forward on the floor. Walk hands further for more thoracic stretch.',
    stopIf: 'Any sharp pain',
  },
  chest_row: {
    name: 'Chest-Supported Row', emoji: '🏋️', color: T.accent, colorBg: T.accentBg,
    why: 'Strengthens your upper back without loading the lower back. Safe for your current pattern.',
    target: 'Mid/lower trapezius + rhomboids',
    feel: 'Upper back squeezing, shoulder comfortable throughout',
    notFeel: 'Front shoulder grab or neck tension',
    mistakes: ['Shrugging at the top', 'Not pausing at peak'],
    dose: '3 × 10 with 1 sec pause at top',
    setup: 'Chest on incline bench. Cue before each rep: "rotate upper arm slightly outward, then pull."',
    stopIf: 'Front shoulder pain',
  },
  pulldown: {
    name: 'Neutral-Grip Pulldown', emoji: '⬇️', color: T.accent, colorBg: T.accentBg,
    why: 'Trains the pull pattern with less rotator cuff demand than overhand grip.',
    target: 'Lats + lower trap',
    feel: 'Lats and upper back doing the work, ribs staying down',
    notFeel: 'Front shoulder pinch or ribs flaring at bottom',
    mistakes: ['Pulling elbows too far back', 'Flaring ribs at bottom'],
    dose: '3 × 8, stop 2 reps early',
    setup: 'Quiet ribs, slight external rotation before each rep.',
    stopIf: 'Shoulder pain',
  },
  incline_press: {
    name: 'DB Incline Press / Push-Up', emoji: '⬆️', color: T.accent, colorBg: T.accentBg,
    why: 'Horizontal pressing at an angle that avoids shoulder impingement.',
    target: 'Upper chest + anterior deltoid',
    feel: 'Chest working, shoulder comfortable throughout the range',
    notFeel: 'Front shoulder pinching at any point',
    mistakes: ['Going too wide with grip', 'Locking out hard'],
    dose: '3 × 8–12',
    stopIf: 'Any shoulder pinch — stop and regress to push-up',
  },
  band_er: {
    name: 'Band External Rotation', emoji: '🎗️', color: T.green, colorBg: T.greenBg,
    why: 'Rotator cuff strengthening in the plane it actually works in.',
    target: 'Infraspinatus + teres minor',
    feel: 'Deep posterior shoulder engagement, controlled movement',
    notFeel: 'Front shoulder activation',
    dose: '2 × 15, slow and controlled',
    setup: 'Elbow tucked at side, towel between elbow and body. Rotate outward against band resistance.',
  },
  goblet_squat: {
    name: 'Goblet Squat', emoji: '🏋️', color: T.green, colorBg: T.greenBg,
    why: 'Teaches the squat pattern with foot tripod awareness throughout.',
    target: 'Quads + glutes + foot control',
    feel: 'Arch stays lifted, knees tracking over toes, glutes loading at bottom',
    notFeel: 'Left arch collapsing or knees caving',
    mistakes: ['Left arch collapsing', 'Knees caving inward'],
    dose: '3 × 8',
    setup: 'Hold weight at chest. Feel the tripod (heel, big toe base, little toe base) throughout every rep.',
  },
  split_squat: {
    name: 'Split Squat', emoji: '🦵', color: T.green, colorBg: T.greenBg,
    why: 'Single-leg loading to train each hip independently and expose asymmetries safely.',
    target: 'Quad + glute (front leg)',
    feel: 'Front leg doing the work, pelvis level and controlled',
    notFeel: 'Pelvis dropping to one side',
    mistakes: ['Letting pelvis rotate or drop', 'Front knee caving'],
    dose: '3 × 8/side, short range, pause 1 sec at bottom',
    setup: 'Control the pelvis — keeping it level IS the exercise.',
  },
  hip_thrust: {
    name: 'Hip Thrust', emoji: '🍑', color: T.green, colorBg: T.greenBg,
    why: 'Glute strengthening at end range, exactly where your glute med/max need to work.',
    target: 'Glute max + glute med',
    feel: 'Glutes firing hard at the top, lower back quiet',
    notFeel: 'Lower back compression or hamstring cramping',
    dose: '3 × 10',
    setup: 'Upper back on bench, drive through heels, squeeze glutes at top.',
  },
  sl_rdl: {
    name: 'Single-Leg RDL', emoji: '⚖️', color: T.green, colorBg: T.greenBg,
    why: 'Trains loading each hip independently while controlling pelvic level.',
    target: 'Hamstring + glute + pelvic control',
    feel: 'Hip of standing leg loading, pelvis level throughout',
    notFeel: 'Pelvis rotating or lower back gripping',
    dose: '2 × 6/side, light weight',
    setup: 'Hip hinge on one leg. Controlling the pelvis is the entire point of this exercise.',
  },
  cable_row: {
    name: 'Seated Cable Row', emoji: '🏋️', color: T.accent, colorBg: T.accentBg,
    why: 'Upper back strengthening with scapular control emphasis.',
    target: 'Mid trapezius + rhomboids',
    feel: 'Upper back pulling, shoulder comfortable',
    notFeel: 'Front shoulder pinch or upper trap shrugging',
    dose: '3 × 10 with 1 sec pause',
    setup: '"Humerus slightly externally rotated" before each pull.',
  },
  landmine_press: {
    name: 'Landmine Press', emoji: '⬆️', color: T.accent, colorBg: T.accentBg,
    why: 'Diagonal pressing force — kinder on the shoulder than overhead and safer than flat.',
    target: 'Anterior deltoid + upper chest + serratus',
    feel: 'Smooth arc of motion, scapula moves freely, no rib flare',
    notFeel: 'Shoulder impingement or rib flaring',
    mistakes: ['Flaring ribs as arm extends'],
    dose: '3 × 8',
    setup: 'Scap moves freely — don\'t block it.',
  },
  squat: {
    name: 'Squat', emoji: '🏋️', color: T.green, colorBg: T.greenBg,
    why: 'Progressive squat loading with the corrected foot and pelvic strategy.',
    target: 'Quad + glute + foot control',
    feel: 'Weight balanced, arch maintained, glutes loading',
    dose: '3 × 6–8, light to moderate',
    setup: 'Tripod feet throughout. No back gripping.',
  },
  reverse_lunge: {
    name: 'Reverse Lunge', emoji: '🚶', color: T.green, colorBg: T.greenBg,
    why: 'Less knee stress than forward lunge, maintains hip loading pattern.',
    target: 'Quad + glute',
    dose: '2–3 × 8/side',
    setup: 'Front foot tripod, pelvis level.',
  },
  rdl: {
    name: 'RDL', emoji: '🏋️', color: T.green, colorBg: T.greenBg,
    why: 'Hip hinge loading without lower back gripping.',
    target: 'Hamstrings + glutes',
    feel: 'Hip hinge loads hamstrings, lower back quiet',
    notFeel: 'Lower back gripping or rounding',
    dose: '2 × 8, light to moderate',
    setup: '"Hip hinge" — not "bend at the back."',
  },
  walk: {
    name: 'Easy Walk', emoji: '🚶', color: T.green, colorBg: T.greenBg,
    why: 'Active recovery and direct gait reprogramming.',
    target: 'Gait pattern + nervous system downregulation',
    feel: 'Relaxed midfoot push-off, left arch relaxed, no toe clawing',
    dose: '2 min easy',
    setup: '"Push the ground away from the midfoot."',
  },
};

// ─── PLAN DATA ────────────────────────────────────────────────────────────────
const MORNING = [
  { id: 'breathing', reps: '5 slow breaths' },
  { id: 'short_foot', reps: '6 × 5 sec' },
  { id: 'hip_shift', reps: '3 × 15 sec' },
  { id: 'glute_med', reps: '2 × 8 slow' },
  { id: 'er_isometric', reps: '3 × 20 sec' },
];
const DURING = [
  { id: 'h1', label: 'Check left arch — don\'t collapse, don\'t claw', reps: '20 sec' },
  { id: 'h2', label: 'Re-stack ribs over pelvis', reps: '20 sec' },
  { id: 'h3', label: 'Tiny shift off left foot to center', reps: '20 sec' },
  { id: 'h4', label: '4 slow nasal breaths, relax right lower back', reps: '20 sec' },
  { id: 'h5', label: '10 controlled steps — midfoot push-off', reps: '20 sec' },
  { id: 'h6', label: '2 easy scap wall-slide reps', reps: '20 sec' },
];
const PRE = [
  { id: 'ball_arch', reps: '45 sec' },
  { id: 'short_foot', reps: '5 × 5 sec' },
  { id: 'ball_tfl', reps: '45 sec' },
  { id: 'ball_ql', reps: '45 sec' },
  { id: 'wall_slide', reps: '2 × 6' },
  { id: 'er_isometric', reps: '2 × 20 sec' },
];
const POST = [
  { id: 'walk', reps: '2 min easy' },
  { id: 'breathing', reps: '4 breaths' },
  { id: 'ball_ql', reps: '60 sec light' },
];
const EVENING = [
  { id: 'ball_shoulder', reps: '60–90 sec' },
  { id: 'ball_ql', reps: '60–90 sec' },
  { id: 'ball_arch', reps: '45 sec' },
  { id: 'ball_tfl', reps: '45 sec' },
  { id: 'childs_pose', reps: '4 × 5 breaths' },
  { id: 'cross_body', reps: '2 × 20 sec' },
  { id: 'dead_bug', reps: '2 × 6/side' },
  { id: 'side_plank', reps: '2 × 20–30 sec' },
  { id: 'breathing', reps: '4 breaths' },
];

const PLAN = [
  { day:1, title:'Upper A', sub:'Pull + Scap Control', type:'training', color:T.accent,
    goal:'Introduce pulling patterns with proper shoulder mechanics. Every rep is a rep of the new strategy.',
    note: null,
    sections:{ morning:MORNING, during:DURING, pre:PRE,
      training:[
        { id:'chest_row', sets:'3', reps:'10', cue:'Rotate upper arm slightly out, pause 1 sec' },
        { id:'pulldown', sets:'3', reps:'8', cue:'Quiet ribs, stop early' },
        { id:'incline_press', sets:'3', reps:'8–12', cue:'No shoulder pinch' },
        { id:'face_pull', sets:'2', reps:'12', cue:'Light weight' },
        { id:'band_er', sets:'2', reps:'15', cue:'Slow' },
      ], post:[...POST,{id:'ball_shoulder',reps:'60 sec extra — infraspinatus focus'}], evening:EVENING }},
  { day:2, title:'Lower A', sub:'Single-Leg + Foot Control', type:'training', color:T.green,
    goal:'Train each leg independently while keeping your left arch honest the whole time.',
    note:'Add 30 sec extra to left arch ball release in pre-training today.',
    sections:{ morning:MORNING, during:DURING,
      pre:[{id:'ball_arch',reps:'75 sec (extra today)'},...PRE.slice(1)],
      training:[
        { id:'goblet_squat', sets:'3', reps:'8', cue:'Tripod foot, don\'t collapse left arch' },
        { id:'split_squat', sets:'3', reps:'8/side', cue:'Short range, pause 1 sec at bottom' },
        { id:'hip_thrust', sets:'3', reps:'10', cue:'Glutes, not lower back' },
        { id:'sl_rdl', sets:'2', reps:'6/side', cue:'Control the pelvis — that\'s the rep' },
        { id:'short_foot_raise', sets:'2', reps:'10', cue:'Left leg focus' },
      ], post:[...POST.slice(0,2),{id:'ball_ql',reps:'60 sec extra'}], evening:EVENING }},
  { day:3, title:'Recovery', sub:'Gait Re-Pattern', type:'recovery', color:T.purple,
    goal:'Let tissue recover while reinforcing the new movement pattern in everyday walking.',
    note:'No training today. 20–30 min easy walk — focus on midfoot push-off, no toe clawing.',
    sections:{ morning:MORNING,
      during:[...DURING,{id:'h7',label:'20–30 min easy walk — midfoot push-off, no toe clawing',reps:'Today'}],
      evening:EVENING }},
  { day:4, title:'Upper B', sub:'Press + Serratus', type:'training', color:T.accent,
    goal:'Build pressing strength and shoulder blade control. The scapula is the foundation for all shoulder health.',
    note: null,
    sections:{ morning:MORNING, during:DURING, pre:PRE,
      training:[
        { id:'cable_row', sets:'3', reps:'10', cue:'Humerus slightly externally rotated, pause 1 sec' },
        { id:'landmine_press', sets:'3', reps:'8', cue:'Scap moves freely, no rib flare' },
        { id:'pulldown', sets:'2–3', reps:'10', cue:'Stop early' },
        { id:'wall_slide', sets:'2', reps:'6', cue:'Lift-off at top' },
        { id:'face_pull', sets:'2', reps:'12', cue:'Light and clean' },
      ], post:[...POST.slice(0,2),{id:'ball_shoulder',reps:'60 sec — infraspinatus focus'}], evening:EVENING }},
  { day:5, title:'Lower B', sub:'Hip Control + Posterior Chain', type:'training', color:T.green,
    goal:'Build posterior chain strength with correct pelvic control. No back gripping allowed.',
    note: null,
    sections:{ morning:MORNING, during:DURING, pre:PRE,
      training:[
        { id:'squat', sets:'3', reps:'6–8', cue:'Light/moderate, tripod feet' },
        { id:'reverse_lunge', sets:'2–3', reps:'8/side', cue:'Pelvis level' },
        { id:'rdl', sets:'2', reps:'8', cue:'No back gripping' },
        { id:'side_plank', sets:'2', reps:'25 sec/side', cue:'Breathe, obliques + glute' },
        { id:'short_foot_raise', sets:'2', reps:'10', cue:'Left leg focus' },
      ], post:POST, evening:EVENING }},
  { day:6, title:'Easy Cardio', sub:'Mobility + Active Recovery', type:'cardio', color:T.purple,
    goal:'Active recovery through movement. Quality gait the entire walk.',
    note:'20–30 min easy walk. Easy jog only if symptoms stay completely calm.',
    sections:{ morning:MORNING, during:DURING, evening:EVENING }},
  { day:7, title:'Off', sub:'Nervous System + Tissue Quality', type:'off', color:T.textMuted,
    goal:'Full recovery day. Just the daily anchors. Add extra time on your most reactive spots tonight.',
    note:'Evening: add 2 extra minutes total on your hottest spots.',
    sections:{ morning:MORNING, during:DURING, evening:EVENING }},
  { day:8, title:'Upper A+', sub:'Pull + Scap — Progression', type:'training', color:T.accent,
    goal:'Same as Day 1. Add one set to rows OR 2–5% more load — only if the shoulder stayed calm last week.',
    note:'Progression: +1 set to rows OR +2–5% load. Only proceed if shoulder has been calm.',
    sections:{ morning:MORNING, during:DURING, pre:PRE,
      training:[
        { id:'chest_row', sets:'3–4', reps:'10', cue:'Rotate upper arm slightly out, pause 1 sec' },
        { id:'pulldown', sets:'3', reps:'8', cue:'Quiet ribs' },
        { id:'incline_press', sets:'3', reps:'8–12', cue:'No shoulder pinch' },
        { id:'face_pull', sets:'2', reps:'12', cue:'Light' },
        { id:'band_er', sets:'2', reps:'15', cue:'Slow' },
      ], post:[...POST,{id:'ball_shoulder',reps:'60 sec extra'}], evening:EVENING }},
  { day:9, title:'Lower A+', sub:'Single-Leg — Progression', type:'training', color:T.green,
    goal:'Same as Day 2. Add one set to split squats or +2 reps per set. Foot control comes before load.',
    note:'Progression: +1 set to split squats OR +2 reps per set. Foot control first.',
    sections:{ morning:MORNING, during:DURING, pre:PRE,
      training:[
        { id:'goblet_squat', sets:'3', reps:'8', cue:'Tripod foot' },
        { id:'split_squat', sets:'3–4', reps:'8–10/side', cue:'Short range, pause 1 sec' },
        { id:'hip_thrust', sets:'3', reps:'10', cue:'Glutes, not lower back' },
        { id:'sl_rdl', sets:'2', reps:'6/side', cue:'Control the pelvis' },
        { id:'short_foot_raise', sets:'2', reps:'10', cue:'Left leg focus' },
      ], post:POST, evening:EVENING }},
  { day:10, title:'Recovery+', sub:'Gait + Barefoot Practice', type:'recovery', color:T.purple,
    goal:'Same as Day 3, plus 5 minutes of barefoot tripod practice spread throughout the day.',
    note:'Add: 5 min of barefoot short-foot practice across the day.',
    sections:{ morning:MORNING,
      during:[...DURING,{id:'h8',label:'Barefoot tripod practice (spread across the day)',reps:'5 min total'}],
      evening:EVENING }},
  { day:11, title:'Upper B+', sub:'Press + Pull-Up Test', type:'training', color:T.accent,
    goal:'Same as Day 4, with an optional pull-up test if shoulder has improved. Stop at 3–5 reps. No grinding.',
    note:'Optional: 1–2 sets of strict pull-ups, stop at 3–5 reps. Only if pain-free.',
    sections:{ morning:MORNING, during:DURING, pre:PRE,
      training:[
        { id:'cable_row', sets:'3', reps:'10', cue:'Externally rotated, pause 1 sec' },
        { id:'landmine_press', sets:'3', reps:'8', cue:'Scap moves freely' },
        { id:'pulldown', sets:'2–3', reps:'10', cue:'Stop early' },
        { id:'wall_slide', sets:'2', reps:'6', cue:'Lift-off at top' },
        { id:'face_pull', sets:'2', reps:'12', cue:'Light' },
      ], post:POST, evening:EVENING }},
  { day:12, title:'Lower B+', sub:'Hip Control — Progression', type:'training', color:T.green,
    goal:'Same as Day 5. Add an extra set of heel raises if the arch still feels grippy.',
    note:'Add: 1 extra set of short-foot heel raises if arch still feels grippy.',
    sections:{ morning:MORNING, during:DURING, pre:PRE,
      training:[
        { id:'squat', sets:'3', reps:'6–8', cue:'Tripod feet' },
        { id:'reverse_lunge', sets:'2–3', reps:'8/side', cue:'Pelvis level' },
        { id:'rdl', sets:'2', reps:'8', cue:'No back gripping' },
        { id:'side_plank', sets:'2', reps:'25 sec/side' },
        { id:'short_foot_raise', sets:'2–3', reps:'10', cue:'Left leg focus' },
      ], post:POST, evening:EVENING }},
  { day:13, title:'Cardio+', sub:'Gait Intervals', type:'cardio', color:T.purple,
    goal:'Same as Day 6, plus 6 × 20 sec brisk walk intervals with clean midfoot push-off.',
    note:'Add: 6 × 20 sec brisk walk intervals. Midfoot push-off, zero toe clawing.',
    sections:{ morning:MORNING, during:DURING, evening:EVENING }},
  { day:14, title:'Off + Reassess', sub:'Check Your Markers', type:'off', color:T.amber,
    goal:'Check your progress markers. Green across the board means you\'re ready for the return-to-rings progression.',
    note:'Reassess: left arch balance, right QL sensitivity, shoulder ER test, how rows feel.',
    sections:{ morning:MORNING, during:DURING, evening:EVENING }},
];

const QUICK_RESET = [
  { label:'Check left arch', cue:'Don\'t collapse, don\'t claw toes', icon:'🦶', seconds:20 },
  { label:'Ribs over pelvis', cue:'Let the ribs soften downward', icon:'⬇️', seconds:20 },
  { label:'Shift to center', cue:'Tiny weight shift off left foot', icon:'⚖️', seconds:20 },
  { label:'Nasal breathing', cue:'4 slow breaths, relax right lower back', icon:'🫁', seconds:20 },
  { label:'Walk 10 steps', cue:'Midfoot push-off, no toe clawing', icon:'🚶', seconds:20 },
  { label:'2 wall slides', cue:'Ribs down, wrap feeling under armpit', icon:'🧱', seconds:20 },
];

const MARKERS = [
  { label:'Left arch more balanced', detail:'Less "pressure hotspot" standing barefoot' },
  { label:'Right QL less reactive', detail:'Less radiating sensation, less urge to press it' },
  { label:'Shoulder ER smoother', detail:'Less anterior referral with elbow-tucked rotation' },
  { label:'Rows feel upper back', detail:'Not front shoulder grab during pulls' },
];

// ─── TIMER COMPONENT ──────────────────────────────────────────────────────────
function Timer({ seconds, label }) {
  const [left, setLeft] = useState(seconds);
  const [running, setRunning] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    if (running && left > 0) { ref.current = setTimeout(() => setLeft(l => l-1), 1000); }
    else if (left === 0) setRunning(false);
    return () => clearTimeout(ref.current);
  }, [running, left]);
  const pct = ((seconds - left) / seconds) * 100;
  return (
    <div style={{ display:'flex', alignItems:'center', gap:10, marginTop:10, padding:'8px 0' }}>
      <button onClick={() => { if(left===0){setLeft(seconds);setRunning(true);}else setRunning(r=>!r); }}
        style={{ width:44,height:44,borderRadius:'50%',border:'none',
          background:running?T.accentDark:T.accentBg,color:running?'#fff':T.accent,
          fontSize:16,cursor:'pointer',flexShrink:0,display:'flex',alignItems:'center',justifyContent:'center' }}>
        {left===0?'↺':running?'⏸':'▶'}
      </button>
      <div style={{flex:1}}>
        <div style={{display:'flex',justifyContent:'space-between',marginBottom:4}}>
          <span style={{fontSize:11,color:T.textMuted,fontWeight:600,textTransform:'uppercase'}}>{label}</span>
          <span style={{fontSize:13,fontWeight:800,color:left<4&&running?T.amber:T.text,fontVariantNumeric:'tabular-nums'}}>{left}s</span>
        </div>
        <div style={{height:3,background:T.border,borderRadius:2}}>
          <div style={{width:`${pct}%`,height:'100%',background:T.accent,borderRadius:2,transition:'width 0.8s linear'}} />
        </div>
      </div>
    </div>
  );
}

// ─── EXERCISE CARD ────────────────────────────────────────────────────────────
function ExCard({ item, sectionId, completed, onToggle }) {
  const [open, setOpen] = useState(false);
  const ex = EX[item.id];
  const key = item.id + '_' + sectionId + '_' + (item.reps||'');

  if (!ex) {
    // Habit/custom item
    return (
      <div onClick={() => onToggle(key)}
        style={{ display:'flex',alignItems:'center',gap:10,padding:'10px 14px',marginBottom:6,
          borderRadius:12,background:completed?T.greenBg:T.card,cursor:'pointer',
          border:`1px solid ${completed?T.green+'40':T.border}` }}>
        <Checkbox done={completed} color={T.green} />
        <div style={{flex:1}}>
          <div style={{fontSize:13,color:completed?T.textSec:T.text}}>{item.label}</div>
          <div style={{fontSize:11,color:T.textMuted,marginTop:1}}>{item.reps}</div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ borderRadius:14,border:`1px solid ${completed?ex.color+'50':T.border}`,
      background:completed?ex.colorBg:T.card,marginBottom:8,overflow:'hidden',transition:'all 0.2s' }}>
      <div style={{display:'flex',alignItems:'center',padding:'12px 14px',gap:10,cursor:'pointer'}}
        onClick={() => setOpen(o=>!o)}>
        <div onClick={e=>{e.stopPropagation();onToggle(key);}}>
          <Checkbox done={completed} color={ex.color} />
        </div>
        <span style={{fontSize:18,flexShrink:0}}>{ex.emoji}</span>
        <div style={{flex:1,minWidth:0}}>
          <div style={{fontSize:14,fontWeight:600,color:completed?T.textSec:T.text}}>{ex.name}</div>
          <div style={{fontSize:12,color:T.textMuted,marginTop:1}}>
            {[item.sets&&`${item.sets} sets`,item.reps,item.cue].filter(Boolean).join(' · ')}
          </div>
        </div>
        <span style={{color:T.textMuted,fontSize:10,transform:open?'rotate(180deg)':'none',transition:'transform 0.2s'}}>▼</span>
      </div>
      {open && (
        <div style={{padding:'4px 14px 14px',borderTop:`1px solid ${T.border}`}}>
          <Detail label="Why this exercise" color={T.textMuted} text={ex.why} />
          {ex.setup && <Detail label="Setup" color={T.accent} text={ex.setup} />}
          {ex.feel && <Detail label="✓ You should feel" color={T.green} text={ex.feel} />}
          {ex.notFeel && <Detail label="✗ Not feel" color={T.red} text={ex.notFeel} />}
          {ex.mistakes?.length > 0 && (
            <div style={{marginBottom:8,marginTop:8}}>
              <span style={{fontSize:11,color:T.amber,fontWeight:600,textTransform:'uppercase',letterSpacing:'0.05em'}}>⚠ Common mistakes</span>
              <div style={{marginTop:4,fontSize:13,color:T.textSec}}>
                {ex.mistakes.map((m,i)=><div key={i}>• {m}</div>)}
              </div>
            </div>
          )}
          {ex.stopIf && (
            <div style={{background:T.redBg,borderRadius:8,padding:'7px 10px',fontSize:12,color:T.red,marginTop:8}}>
              🛑 Stop if: {ex.stopIf}
            </div>
          )}
          {ex.hasTimer && <Timer seconds={ex.timerSec} label={ex.timerLabel} />}
        </div>
      )}
    </div>
  );
}

function Checkbox({ done, color }) {
  return (
    <div style={{ width:22,height:22,borderRadius:7,border:`2px solid ${done?color:T.borderHigh}`,
      background:done?color:'transparent',flexShrink:0,cursor:'pointer',
      display:'flex',alignItems:'center',justifyContent:'center' }}>
      {done && <span style={{color:'#000',fontSize:11,fontWeight:900}}>✓</span>}
    </div>
  );
}

function Detail({ label, color, text }) {
  return (
    <div style={{marginBottom:8,marginTop:8}}>
      <span style={{fontSize:11,color,fontWeight:600,textTransform:'uppercase',letterSpacing:'0.05em'}}>{label}</span>
      <div style={{marginTop:3,fontSize:13,color:T.textSec,lineHeight:1.5}}>{text}</div>
    </div>
  );
}

// ─── SECTION BLOCK ────────────────────────────────────────────────────────────
function Section({ id, items, completed, onToggle, label, icon, time, note, defaultOpen }) {
  const [open, setOpen] = useState(!!defaultOpen);
  const done = items.filter(e => completed.has((e.id||e.label)+'_'+id+'_'+(e.reps||''))).length;
  const allDone = items.length > 0 && done === items.length;
  return (
    <div style={{marginBottom:10}}>
      <div onClick={()=>setOpen(o=>!o)} style={{ display:'flex',alignItems:'center',
        padding:'12px 16px',cursor:'pointer',borderRadius:13,
        background:allDone?T.greenBg:T.surface,border:`1px solid ${allDone?T.green+'40':T.border}`,gap:10 }}>
        <span style={{fontSize:20}}>{icon}</span>
        <div style={{flex:1}}>
          <div style={{fontSize:14,fontWeight:600,color:T.text}}>{label}</div>
          <div style={{fontSize:12,color:T.textMuted}}>{time} · {done}/{items.length} done</div>
        </div>
        {allDone && <span style={{color:T.green}}>✓</span>}
        <span style={{color:T.textMuted,fontSize:10,transform:open?'rotate(180deg)':'none',transition:'transform 0.2s'}}>▼</span>
      </div>
      {open && (
        <div style={{paddingTop:8,paddingLeft:4}}>
          {note && <div style={{background:T.accentBg,borderLeft:`3px solid ${T.accent}`,borderRadius:'0 8px 8px 0',padding:'8px 12px',marginBottom:10,fontSize:13,color:T.textSec}}>{note}</div>}
          {items.map((item,i)=>(
            <ExCard key={i} item={item} sectionId={id} completed={completed.has((item.id||item.label)+'_'+id+'_'+(item.reps||''))} onToggle={onToggle} />
          ))}
        </div>
      )}
    </div>
  );
}

// ─── COMPLETION RING ──────────────────────────────────────────────────────────
function Ring({ pct, size=52 }) {
  const r = (size-5)/2, circ = 2*Math.PI*r, dash = (pct/100)*circ;
  return (
    <svg width={size} height={size} style={{transform:'rotate(-90deg)',flexShrink:0}}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={T.border} strokeWidth={3.5} />
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={pct===100?T.green:T.accent} strokeWidth={3.5}
        strokeDasharray={`${dash} ${circ}`} strokeLinecap="round" style={{transition:'stroke-dasharray 0.5s'}} />
    </svg>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [tab, setTab] = useState('today');
  const [viewDay, setViewDay] = useState(1);
  const [resetActive, setResetActive] = useState(false);
  const [resetStep, setResetStep] = useState(0);
  const [resetLeft, setResetLeft] = useState(20);
  const resetRef = useRef(null);

  const [progress, setProgress] = useState(() => {
    try {
      const s = localStorage.getItem('kcr_progress');
      if (s) {
        const p = JSON.parse(s);
        Object.keys(p).forEach(k => { p[k].completed = new Set(p[k].completed||[]); });
        return p;
      }
    } catch {}
    return {};
  });

  useEffect(() => {
    const s = {};
    Object.keys(progress).forEach(k => { s[k] = {...progress[k], completed:[...(progress[k].completed||new Set())]}; });
    localStorage.setItem('kcr_progress', JSON.stringify(s));
  }, [progress]);

  useEffect(() => {
    document.body.style.cssText = `background:${T.bg};margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,sans-serif;color:${T.text};-webkit-font-smoothing:antialiased;`;
    const st = document.createElement('style');
    st.textContent = `*,*::before,*::after{box-sizing:border-box}::-webkit-scrollbar{display:none}input[type=range]{-webkit-appearance:none;height:4px;border-radius:2px;background:rgba(255,255,255,0.1);outline:none;width:100%}input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;width:20px;height:20px;border-radius:50%;background:currentColor;cursor:pointer}textarea{resize:none;outline:none}button{font-family:inherit}`;
    document.head.appendChild(st);
    return () => st.remove();
  }, []);

  // Quick reset timer
  useEffect(() => {
    if (!resetActive) return;
    if (resetLeft > 0) { resetRef.current = setTimeout(() => setResetLeft(l=>l-1), 1000); }
    else {
      if (resetStep < QUICK_RESET.length-1) { setResetStep(s=>s+1); setResetLeft(20); }
      else { setResetActive(false); setResetStep(0); setResetLeft(20); }
    }
    return () => clearTimeout(resetRef.current);
  }, [resetActive, resetLeft, resetStep]);

  const plan = PLAN[viewDay-1];
  const dp = progress[viewDay] || { completed: new Set(), pain: 0, notes: '', done: false };

  const totalItems = Object.values(plan.sections).flat().length;
  const doneCount = dp.completed.size;
  const pct = totalItems > 0 ? Math.round((doneCount/totalItems)*100) : 0;

  const toggleItem = key => setProgress(prev => {
    const d = prev[viewDay] || { completed:new Set(), pain:0, notes:'', done:false };
    const c = new Set(d.completed);
    c.has(key) ? c.delete(key) : c.add(key);
    return {...prev, [viewDay]: {...d, completed:c}};
  });

  const streak = (() => {
    let s = 0;
    const today = Object.values(progress).filter(d=>d.done).length;
    for (let d = today; d >= 1; d--) { if (progress[d]?.done) s++; else break; }
    return s;
  })();

  // ── Quick Reset fullscreen ────────────────────────────────────────────────
  if (resetActive) {
    const step = QUICK_RESET[resetStep];
    const p = ((20-resetLeft)/20)*100;
    const r = 54, circ = 2*Math.PI*r, dash = (p/100)*circ;
    return (
      <div style={{minHeight:'100vh',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:24,background:T.bg}}>
        <div style={{textAlign:'center',width:'100%',maxWidth:360}}>
          <div style={{fontSize:12,color:T.textMuted,fontWeight:600,letterSpacing:'0.08em',textTransform:'uppercase',marginBottom:12}}>
            Quick Reset · {resetStep+1} / {QUICK_RESET.length}
          </div>
          <div style={{fontSize:72,marginBottom:12}}>{step.icon}</div>
          <div style={{fontSize:26,fontWeight:800,marginBottom:8}}>{step.label}</div>
          <div style={{fontSize:15,color:T.textSec,marginBottom:40,lineHeight:1.5}}>{step.cue}</div>
          <div style={{position:'relative',display:'inline-flex',alignItems:'center',justifyContent:'center',marginBottom:32}}>
            <svg width={124} height={124} style={{transform:'rotate(-90deg)'}}>
              <circle cx={62} cy={62} r={r} fill="none" stroke={T.border} strokeWidth={4}/>
              <circle cx={62} cy={62} r={r} fill="none" stroke={T.accent} strokeWidth={4}
                strokeDasharray={`${dash} ${circ}`} strokeLinecap="round" style={{transition:'stroke-dasharray 0.8s linear'}}/>
            </svg>
            <div style={{position:'absolute',fontSize:38,fontWeight:900,fontVariantNumeric:'tabular-nums'}}>{resetLeft}</div>
          </div>
          <div style={{display:'flex',gap:12}}>
            <button onClick={()=>{setResetActive(false);setResetStep(0);setResetLeft(20);}}
              style={{flex:1,padding:14,borderRadius:14,border:`1px solid ${T.border}`,background:'transparent',color:T.textSec,fontSize:15,cursor:'pointer'}}>
              Stop
            </button>
            <button onClick={()=>{if(resetStep<QUICK_RESET.length-1){setResetStep(s=>s+1);setResetLeft(20);}else{setResetActive(false);setResetStep(0);setResetLeft(20);}}}
              style={{flex:2,padding:14,borderRadius:14,border:'none',background:T.accentDark,color:'#fff',fontSize:15,fontWeight:700,cursor:'pointer'}}>
              Next →
            </button>
          </div>
        </div>
      </div>
    );
  }

  const sectionMeta = {
    morning: { label:'Morning Reset', icon:'🌅', time:'8–12 min', defaultOpen: true },
    during:  { label:'Habit Corrections', icon:'⚡', time:'2 min × 4–6×/day', note:'Do this every 30–45 min throughout the day' },
    pre:     { label:'Pre-Training Prep', icon:'🎯', time:'6–8 min' },
    training:{ label:'Training', icon:'💪', time:'40–50 min', note:'Stop 2–3 reps short of fatigue on every set' },
    post:    { label:'Post-Training Downshift', icon:'🌊', time:'5 min' },
    evening: { label:'Evening Reset', icon:'🌙', time:'12–18 min' },
  };

  const typeColor = { training:T.accent, recovery:T.purple, cardio:T.purple, off:T.textSec }[plan.type];
  const typeLabel = { training:'Training', recovery:'Recovery', cardio:'Active Recovery', off:'Rest Day' }[plan.type];

  return (
    <div style={{maxWidth:480,margin:'0 auto',minHeight:'100vh',paddingBottom:80}}>

      {/* Header */}
      <div style={{padding:'16px 20px 8px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <div>
          <div style={{fontSize:11,color:T.textMuted,fontWeight:600,textTransform:'uppercase',letterSpacing:'0.08em'}}>Kinetic Chain Rebuild</div>
          <div style={{fontSize:21,fontWeight:800,marginTop:2}}>14-Day Protocol</div>
        </div>
        {streak > 0 && (
          <div style={{background:T.amberBg,border:`1px solid ${T.amber}40`,borderRadius:12,padding:'6px 12px',display:'flex',alignItems:'center',gap:5}}>
            <span style={{fontSize:18}}>🔥</span>
            <span style={{fontSize:15,fontWeight:800,color:T.amber}}>{streak}</span>
          </div>
        )}
      </div>

      {/* TODAY TAB */}
      {tab==='today' && (
        <div style={{padding:'0 16px'}}>
          {/* Day pill nav */}
          <div style={{display:'flex',gap:6,overflowX:'auto',paddingBottom:10,paddingTop:4,scrollbarWidth:'none'}}>
            {PLAN.map((p,i) => {
              const d = i+1, done = progress[d]?.done, isView = d===viewDay;
              return (
                <button key={d} onClick={()=>setViewDay(d)}
                  style={{flexShrink:0,width:40,height:40,borderRadius:12,border:`2px solid ${isView?p.color:'transparent'}`,
                    background:done?T.greenBg:isView?p.color+'20':T.card,
                    color:isView?T.text:T.textSec,fontSize:13,fontWeight:isView?800:500,cursor:'pointer',position:'relative'}}>
                  {done?'✓':d}
                </button>
              );
            })}
          </div>

          {/* Day card */}
          <div style={{background:T.card,border:`1px solid ${T.border}`,borderRadius:18,padding:18,marginBottom:12}}>
            <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',gap:12}}>
              <div style={{flex:1}}>
                <div style={{fontSize:11,color:typeColor,fontWeight:700,textTransform:'uppercase',letterSpacing:'0.06em',marginBottom:4}}>
                  Day {viewDay} · {typeLabel}
                </div>
                <div style={{fontSize:22,fontWeight:800,lineHeight:1.15}}>{plan.title}</div>
                <div style={{fontSize:14,color:T.textSec,marginTop:2}}>{plan.sub}</div>
              </div>
              <div style={{textAlign:'center',flexShrink:0}}>
                <Ring pct={pct} />
                <div style={{fontSize:11,color:pct===100?T.green:T.textMuted,fontWeight:700,marginTop:2}}>{pct}%</div>
              </div>
            </div>
            <div style={{marginTop:12,padding:'10px 12px',background:T.accentBg,borderRadius:10,fontSize:13,color:T.textSec,lineHeight:1.5}}>
              🎯 {plan.goal}
            </div>
            {plan.note && (
              <div style={{marginTop:8,padding:'8px 12px',background:T.amberBg,borderRadius:10,fontSize:13,color:T.amber,lineHeight:1.4}}>
                📌 {plan.note}
              </div>
            )}
            <div style={{marginTop:14}}>
              <div style={{display:'flex',justifyContent:'space-between',fontSize:12,color:T.textMuted,marginBottom:5}}>
                <span>Day progress</span>
                <span style={{fontWeight:700,color:pct===100?T.green:T.text}}>{doneCount}/{totalItems} items</span>
              </div>
              <div style={{height:4,background:T.border,borderRadius:2}}>
                <div style={{width:`${pct}%`,height:'100%',background:pct===100?T.green:T.accent,borderRadius:2,transition:'width 0.4s'}} />
              </div>
            </div>
          </div>

          {/* Sections */}
          {Object.entries(plan.sections).map(([sid, items]) => {
            const m = sectionMeta[sid]; if (!m) return null;
            return (
              <Section key={sid} id={sid} items={items} completed={dp.completed}
                onToggle={toggleItem} label={m.label} icon={m.icon} time={m.time}
                note={m.note} defaultOpen={m.defaultOpen} />
            );
          })}

          {/* Pain + notes + complete */}
          <div style={{background:T.card,border:`1px solid ${T.border}`,borderRadius:16,padding:16,marginTop:4,marginBottom:16}}>
            <div style={{marginBottom:16}}>
              <div style={{display:'flex',justifyContent:'space-between',marginBottom:8}}>
                <span style={{fontSize:13,fontWeight:600}}>Pain / Discomfort Today</span>
                <span style={{fontSize:18,fontWeight:800,color:dp.pain<=3?T.green:dp.pain<=6?T.amber:T.red}}>{dp.pain||0}/10</span>
              </div>
              <input type="range" min={0} max={10} value={dp.pain||0}
                onChange={e=>setProgress(prev=>({...prev,[viewDay]:{...(prev[viewDay]||{completed:new Set(),pain:0,notes:'',done:false}),pain:Number(e.target.value)}}))}
                style={{accentColor:dp.pain<=3?T.green:dp.pain<=6?T.amber:T.red}} />
              <div style={{display:'flex',justifyContent:'space-between',marginTop:4,fontSize:11,color:T.textMuted}}>
                <span>No pain</span><span>Severe</span>
              </div>
            </div>
            <div style={{marginBottom:14}}>
              <div style={{fontSize:13,fontWeight:600,marginBottom:6}}>Notes</div>
              <textarea value={dp.notes||''} rows={3} placeholder="How did it feel today? Any observations..."
                onChange={e=>setProgress(prev=>({...prev,[viewDay]:{...(prev[viewDay]||{completed:new Set(),pain:0,notes:'',done:false}),notes:e.target.value}}))}
                style={{width:'100%',background:T.cardHigh,border:`1px solid ${T.border}`,borderRadius:10,padding:'10px 12px',color:T.text,fontSize:13,lineHeight:1.5}} />
            </div>
            <button
              onClick={()=>setProgress(prev=>({...prev,[viewDay]:{...(prev[viewDay]||{completed:new Set(),pain:0,notes:'',done:false}),done:!prev[viewDay]?.done}}))}
              style={{width:'100%',padding:14,borderRadius:12,border:dp.done?`1px solid ${T.green}40`:'none',
                background:dp.done?T.greenBg:T.accentDark,color:dp.done?T.green:'#fff',fontSize:14,fontWeight:700,cursor:'pointer'}}>
              {dp.done?'✓ Day Complete — tap to undo':'Mark Day Complete'}
            </button>
          </div>
        </div>
      )}

      {/* TIMELINE TAB */}
      {tab==='timeline' && (
        <div style={{padding:'0 16px'}}>
          <div style={{fontSize:17,fontWeight:800,marginBottom:14}}>14-Day Timeline</div>
          {[[1,2,3,4,5,6,7],[8,9,10,11,12,13,14]].map((week,wi)=>(
            <div key={wi} style={{marginBottom:20}}>
              <div style={{fontSize:11,color:T.textMuted,fontWeight:600,textTransform:'uppercase',letterSpacing:'0.06em',marginBottom:10}}>Week {wi+1}</div>
              {week.map(d => {
                const p = PLAN[d-1], dp2 = progress[d], done = dp2?.done;
                const typeIcon = {training:'💪',recovery:'🔄',cardio:'🚶',off:'😴'}[p.type];
                return (
                  <div key={d} onClick={()=>{setViewDay(d);setTab('today');}}
                    style={{display:'flex',alignItems:'center',gap:12,padding:'12px 14px',
                      background:d===viewDay?T.accentBg:T.card,
                      border:`1px solid ${d===viewDay?T.accent+'40':done?T.green+'30':T.border}`,
                      borderRadius:14,marginBottom:8,cursor:'pointer'}}>
                    <div style={{width:36,height:36,borderRadius:10,flexShrink:0,
                      background:done?T.greenBg:T.surface,
                      border:`1px solid ${done?T.green+'40':T.border}`,
                      display:'flex',alignItems:'center',justifyContent:'center',
                      fontSize:done?15:13,fontWeight:800,color:done?T.green:T.textSec}}>
                      {done?'✓':d}
                    </div>
                    <div style={{flex:1}}>
                      <div style={{fontSize:14,fontWeight:600}}>Day {d} — {p.title}</div>
                      <div style={{fontSize:12,color:T.textSec,marginTop:1}}>{typeIcon} {p.sub}</div>
                    </div>
                    <span style={{color:T.textMuted,fontSize:14}}>›</span>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      )}

      {/* PROGRESS TAB */}
      {tab==='progress' && (
        <div style={{padding:'0 16px'}}>
          <div style={{fontSize:17,fontWeight:800,marginBottom:14}}>Your Progress</div>

          {/* Stats */}
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:10,marginBottom:16}}>
            {[
              { val: Object.values(progress).filter(d=>d.done).length, label:'Days Done', color:T.green },
              { val: `${streak}🔥`, label:'Streak', color:T.amber },
              { val: (() => { const days=Object.values(progress).filter(d=>d.pain>0); return days.length?`${Math.round(days.reduce((s,d)=>s+d.pain,0)/days.length*10)/10}/10`:'—'; })(), label:'Avg Pain', color:T.textSec },
            ].map(s=>(
              <div key={s.label} style={{background:T.card,border:`1px solid ${T.border}`,borderRadius:14,padding:'14px 10px',textAlign:'center'}}>
                <div style={{fontSize:22,fontWeight:900,color:s.color}}>{s.val}</div>
                <div style={{fontSize:11,color:T.textMuted,marginTop:3}}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Pain chart */}
          <div style={{background:T.card,border:`1px solid ${T.border}`,borderRadius:16,padding:16,marginBottom:14}}>
            <div style={{fontSize:13,fontWeight:700,marginBottom:12}}>Pain Over Time</div>
            <div style={{display:'flex',alignItems:'flex-end',gap:3,height:56}}>
              {PLAN.map((_,i) => {
                const d=i+1, pain=progress[d]?.pain||0, done=progress[d]?.done;
                const h = Math.max(4,(pain/10)*56);
                const c = pain<=3?T.green:pain<=6?T.amber:T.red;
                return (
                  <div key={d} style={{flex:1,display:'flex',flexDirection:'column',alignItems:'center',gap:3}}>
                    <div style={{width:'100%',height:h,background:done?c:T.border,borderRadius:3,transition:'height 0.4s'}} />
                    <div style={{fontSize:9,color:T.textMuted}}>{d}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Day 14 Markers */}
          <div style={{background:T.card,border:`1px solid ${T.border}`,borderRadius:16,padding:16,marginBottom:14}}>
            <div style={{fontSize:13,fontWeight:700,marginBottom:3}}>Day 14 Reassessment</div>
            <div style={{fontSize:12,color:T.textSec,marginBottom:12}}>Check these on Days 1, 7, and 14</div>
            {MARKERS.map((m,i) => (
              <div key={i} style={{display:'flex',gap:10,alignItems:'flex-start',padding:'10px 0',borderBottom:i<MARKERS.length-1?`1px solid ${T.border}`:'none'}}>
                <div style={{width:22,height:22,borderRadius:7,border:`2px solid ${T.borderHigh}`,flexShrink:0,background:T.cardHigh,marginTop:1}} />
                <div>
                  <div style={{fontSize:13,fontWeight:600}}>{m.label}</div>
                  <div style={{fontSize:12,color:T.textSec,marginTop:2}}>{m.detail}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Stop signals */}
          <div style={{background:T.redBg,border:`1px solid ${T.red}30`,borderRadius:14,padding:14,marginBottom:14}}>
            <div style={{fontSize:13,fontWeight:700,color:T.red,marginBottom:8}}>🛑 Stop Immediately If</div>
            {['Pain 4+/10, sharp, pinchy, or electric','Symptoms shoot below knee with numbness or weakness','Worsening night pain, loss of strength, or sharp catching at the shoulder'].map((w,i)=>(
              <div key={i} style={{fontSize:12,color:T.textSec,marginBottom:4}}>• {w}</div>
            ))}
          </div>

          {/* Avoids */}
          <div style={{background:T.amberBg,border:`1px solid ${T.amber}30`,borderRadius:14,padding:14,marginBottom:24}}>
            <div style={{fontSize:13,fontWeight:700,color:T.amber,marginBottom:8}}>⚠️ Avoid for 14 Days</div>
            {['Rings: skin-the-cat, deep German hang, aggressive extension, high-fatigue pull-ups','Shoulder: heavy to-failure pulling, aggressive behind-the-back stretching','Lower back: heavy deadlifts, grinder squats, aggressive long-hold hip flexor stretching'].map((w,i)=>(
              <div key={i} style={{fontSize:12,color:T.textSec,marginBottom:4}}>• {w}</div>
            ))}
          </div>
        </div>
      )}

      {/* Quick Reset FAB */}
      <button onClick={()=>{setResetActive(true);setResetStep(0);setResetLeft(20);}}
        title="2-min Quick Reset"
        style={{position:'fixed',bottom:88,right:20,width:52,height:52,borderRadius:'50%',
          background:T.accentDark,border:'none',color:'#fff',fontSize:22,cursor:'pointer',
          boxShadow:`0 4px 24px ${T.accentDark}70`,display:'flex',alignItems:'center',justifyContent:'center',zIndex:100}}>
        ⚡
      </button>

      {/* Bottom nav */}
      <div style={{position:'fixed',bottom:0,left:'50%',transform:'translateX(-50%)',width:'100%',maxWidth:480,
        background:T.surface,borderTop:`1px solid ${T.border}`,display:'flex',padding:'8px 0',zIndex:99}}>
        {[{id:'today',label:'Today',icon:'📋'},{id:'timeline',label:'Timeline',icon:'📅'},{id:'progress',label:'Progress',icon:'📊'}].map(t=>(
          <button key={t.id} onClick={()=>setTab(t.id)}
            style={{flex:1,background:'none',border:'none',cursor:'pointer',padding:'5px 0',display:'flex',flexDirection:'column',alignItems:'center',gap:3}}>
            <span style={{fontSize:20}}>{t.icon}</span>
            <span style={{fontSize:11,color:tab===t.id?T.accent:T.textMuted,fontWeight:tab===t.id?700:400}}>{t.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
