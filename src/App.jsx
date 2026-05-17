import { useState, useEffect, useRef } from 'react';

const T = {
  bg:'var(--bg)',surface:'var(--surface)',card:'var(--card)',cardHigh:'var(--cardHigh)',
  border:'var(--border)',borderHigh:'var(--borderHigh)',
  accent:'#818cf8',accentDark:'#6366f1',accentBg:'rgba(99,102,241,0.12)',
  green:'#4ade80',greenBg:'rgba(74,222,128,0.1)',
  amber:'#fbbf24',amberBg:'rgba(251,191,36,0.1)',
  red:'#f87171',redBg:'rgba(248,113,113,0.1)',
  purple:'#c084fc',purpleBg:'rgba(192,132,252,0.1)',
  text:'var(--text)',textSec:'var(--textSec)',textMuted:'var(--textMuted)',
};
const IMG = 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/';

// ─── SVG ICONS ────────────────────────────────────────────────────────────────
const ICON={
  today:<><rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 4V3.2A1.2 1.2 0 0 1 10.2 2h3.6A1.2 1.2 0 0 1 15 3.2V4"/><polyline points="8.5 12.5 11 15 15.5 10"/></>,
  library:<><path d="M5 5A2 2 0 0 1 7 3H19V18H7A2 2 0 0 0 5 20z"/><path d="M5 20A2 2 0 0 1 7 18H19V21H7A2 2 0 0 1 5 20z"/></>,
  timeline:<><rect x="4" y="5" width="16" height="16" rx="2"/><line x1="4" y1="9.5" x2="20" y2="9.5"/><line x1="9" y1="3" x2="9" y2="6"/><line x1="15" y1="3" x2="15" y2="6"/></>,
  progress:<><line x1="6" y1="20" x2="6" y2="13"/><line x1="12" y1="20" x2="12" y2="5"/><line x1="18" y1="20" x2="18" y2="10"/></>,
  sun:<><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4 12H2M22 12h-2M5 5l1.5 1.5M17.5 17.5L19 19M19 5l-1.5 1.5M6.5 17.5L5 19"/></>,
  moon:<path d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5z"/>,
  flame:<path d="M12 2.7c.3 3.3 3.6 4.7 3.6 8.8a3.6 3.6 0 1 1-7.2 0c0-1.7.7-2.9 1.7-4 .1 1.6.9 2.5 1.7 2.9.4-2.9-.6-5.2-1.8-7.7z" fill="currentColor" stroke="none"/>,
  target:<><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r="1" fill="currentColor" stroke="none"/></>,
  trend:<><polyline points="3 16.5 9.5 10 13.5 14 21 6"/><polyline points="15 6 21 6 21 12"/></>,
  pin:<><path d="M12 21s6.5-5.5 6.5-11A6.5 6.5 0 0 0 5.5 10c0 5.5 6.5 11 6.5 11z"/><circle cx="12" cy="10" r="2.4"/></>,
  list:<><rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9.5 4V3.3A1.3 1.3 0 0 1 10.8 2h2.4A1.3 1.3 0 0 1 14.5 3.3V4"/><line x1="9" y1="11" x2="15" y2="11"/><line x1="9" y1="15" x2="13" y2="15"/></>,
  alert:<><path d="M12 4l9 16H3z"/><line x1="12" y1="10" x2="12" y2="14.5"/><circle cx="12" cy="17.5" r="0.9" fill="currentColor" stroke="none"/></>,
  stop:<><path d="M8.2 3h7.6L21 8.2v7.6L15.8 21H8.2L3 15.8V8.2z"/><line x1="9.2" y1="9.2" x2="14.8" y2="14.8"/><line x1="14.8" y1="9.2" x2="9.2" y2="14.8"/></>,
  checkCircle:<><circle cx="12" cy="12" r="9"/><polyline points="8 12 11 15 16 9"/></>,
  xCircle:<><circle cx="12" cy="12" r="9"/><line x1="9" y1="9" x2="15" y2="15"/><line x1="15" y1="9" x2="9" y2="15"/></>,
  check:<polyline points="5 12.5 10 17.5 19 6.5"/>,
  info:<><circle cx="12" cy="12" r="9"/><line x1="12" y1="11" x2="12" y2="16.5"/><circle cx="12" cy="7.8" r="0.9" fill="currentColor" stroke="none"/></>,
  search:<><circle cx="11" cy="11" r="7"/><line x1="16" y1="16" x2="21" y2="21"/></>,
  chevronDown:<polyline points="6 9.5 12 15.5 18 9.5"/>,
  chevronRight:<polyline points="9.5 6 15.5 12 9.5 18"/>,
  x:<><line x1="6" y1="6" x2="18" y2="18"/><line x1="18" y1="6" x2="6" y2="18"/></>,
  play:<path d="M8 5.5v13l11-6.5z" fill="currentColor" stroke="none"/>,
  pause:<><rect x="7" y="5" width="3.4" height="14" rx="1" fill="currentColor" stroke="none"/><rect x="13.6" y="5" width="3.4" height="14" rx="1" fill="currentColor" stroke="none"/></>,
  rotate:<><path d="M20 11.5A8 8 0 1 0 18.5 17"/><polyline points="20 5.5 20 11.5 14 11.5"/></>,
  walk:<><circle cx="13" cy="4.3" r="2.2"/><path d="M13 8.5l-1.2 5.2 3 3.3 1 4.7"/><path d="M11.8 13.7l-3 1.8-2 4.7"/><path d="M11.6 9.2l3.6 1.6 2.4-1"/></>,
  dumbbell:<><line x1="3.5" y1="12" x2="20.5" y2="12"/><rect x="2" y="8.5" width="3" height="7" rx="1"/><rect x="19" y="8.5" width="3" height="7" rx="1"/><rect x="5.4" y="9.8" width="2.4" height="4.4" rx="0.7"/><rect x="16.2" y="9.8" width="2.4" height="4.4" rx="0.7"/></>,
  sparkle:<path d="M12 3l1.9 6.1L20 11l-6.1 1.9L12 19l-1.9-6.1L4 11l6.1-1.9z" fill="currentColor" stroke="none"/>,
  ball:<><circle cx="12" cy="12" r="8.5"/><path d="M4 9.5c5 2.2 11 2.2 16 0"/><path d="M4 14.5c5-2.2 11-2.2 16 0"/></>,
  wave:<><path d="M3 10c2-2.6 4-2.6 6 0s4 2.6 6 0 4-2.6 6 0"/><path d="M3 16c2-2.6 4-2.6 6 0s4 2.6 6 0 4-2.6 6 0"/></>,
  bolt:<path d="M13 2L4 13.5h5.5L9 22l9-11.5h-5.5L13 2z" fill="currentColor" stroke="none"/>,
  shield:<path d="M12 3l8 3v5.5c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6z"/>,
};
function Ico({name,size=20,color='currentColor',sw=2,style}){
  const inner=ICON[name];
  if(!inner)return null;
  return(
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" style={{display:'block',flexShrink:0,...style}}>
      {inner}
    </svg>
  );
}
const CAT_ICON={release:'ball',reset:'wave',activate:'bolt',stabilize:'shield',train:'dumbbell'};

// ─── EXERCISE LIBRARY ─────────────────────────────────────────────────────────
const EX = {
  breathing:{
    name:'90/90 Breathing',emoji:'🫁',color:T.purple,colorBg:T.purpleBg,cat:'reset',
    why:'Your lower back is gripping to stabilize your pelvis. This breathing pattern teaches it to let go and reset.',
    target:'Diaphragm + deep abs',
    feel:'Lower ribs soften down, low back relaxes, breathing expands into your sides and back',
    notFeel:'Neck tension, aggressive low back arch, or ribs flaring upward',
    mistakes:['Flaring ribs up','Pushing low back hard into floor','Breathing only into chest'],
    dose:'4–6 slow breaths with 4–6 sec exhale',
    setup:'Lie on back, feet up on chair/couch so hips and knees are at 90°. Let everything go heavy.',
    stopIf:'More than mild dizziness, or sharp back pain',
    hasTimer:true,timerSec:6,timerLabel:'Slow exhale',
  },
  ball_arch:{
    name:'Ball Release – Left Arch',emoji:'🦶',color:T.amber,colorBg:T.amberBg,cat:'release',
    why:'Your left foot is gripping constantly to stabilize your whole body. This releases that grip so everything above it can relax.',
    target:'Plantar fascia + intrinsic foot muscles',
    feel:'"Tender-good" sensation, warmth, less gripping afterward',
    notFeel:'Sharp tearing pain',
    mistakes:['Rolling too fast','Pressing too hard'],
    dose:'45–90 sec, pause 10–20 sec on tender spots',
    setup:'Stand with a lacrosse ball or tennis ball under your left foot. Shift weight gently onto tender spots.',
    stopIf:'Pain spikes after, or bruising',
    hasTimer:true,timerSec:60,timerLabel:'Hold each spot',
  },
  short_foot:{
    name:'Short-Foot (Doming)',emoji:'🦶',color:T.amber,colorBg:T.amberBg,cat:'activate',
    why:'Trains the small muscles inside your foot to support the arch — without your toes gripping.',
    target:'Intrinsic foot muscles',
    feel:'Subtle arch lift, toes staying relaxed and long',
    notFeel:'Toe curling or cramping',
    mistakes:['Clawing toes','Rolling to the outside edge'],
    dose:'5–8 reps × 5–10 sec hold',
    setup:'Seated or standing. "Dome" the arch by drawing the ball of the foot toward your heel — without curling toes.',
    stopIf:'Cramping — do seated version first',
    hasTimer:true,timerSec:5,timerLabel:'Hold',
  },
  short_foot_raise:{
    name:'Short-Foot Heel Raise',emoji:'🦵',color:T.amber,colorBg:T.amberBg,cat:'activate',
    imgs:[IMG+'Standing_Calf_Raises/0.jpg',IMG+'Standing_Calf_Raises/1.jpg'],
    imgNote:'Note: images show standard calf raise — perform with arch actively domed (short-foot position)',
    why:'Builds the calf + arch system working together. Key long-term exercise for your left foot.',
    target:'Posterior tibialis + calf + arch',
    feel:'Arch stays lifted as heel rises, pressure balanced across heel + big toe base + little toe base',
    notFeel:'Rolling inward, toe clawing',
    mistakes:['Losing the arch at the top','Bouncing the heel'],
    dose:'2–3 × 8–12 reps (left leg gets priority)',
    setup:'Stand on both feet (or left only). Keep arch domed as you slowly raise heel.',
    stopIf:'Arch pain significantly worse later that day',
  },
  ball_tfl:{
    name:'Ball Release – Right TFL',emoji:'🫲',color:T.red,colorBg:T.redBg,cat:'release',
    why:'Your right front-hip muscle is substituting for your glute. Releasing its tension helps your glute activate properly.',
    target:'TFL / upper ITB (front-lateral hip)',
    feel:'Localized tenderness, sometimes referral down the outer thigh',
    notFeel:'Numbness or tingling',
    mistakes:['Going too far inward (near femoral nerve)','Too much pressure'],
    dose:'45–60 sec, add small knee bend/straighten movements',
    setup:'Lie face down or on side. Ball at front-outer hip crease, just below the hip bone.',
    stopIf:'Any tingling or burning',
    hasTimer:true,timerSec:45,timerLabel:'Hold',
  },
  ball_ql:{
    name:'Ball Release – Right QL',emoji:'🫃',color:T.red,colorBg:T.redBg,cat:'release',
    why:'Your right lower back has been acting as a permanent stabilizer. This releases the overworked muscle.',
    target:'Quadratus lumborum + thoracolumbar fascia',
    feel:'Deep ache, sometimes referral toward hip or buttock',
    notFeel:'Sharp electric pain below the knee',
    mistakes:['Pressing directly on the spine','Holding your breath'],
    dose:'60–90 sec per hot spot, breathe slowly throughout',
    setup:'Lie on right side. Ball between last rib and hip crest, just outside the spine.',
    stopIf:'Symptoms shoot below knee with numbness/weakness — see a professional',
    hasTimer:true,timerSec:60,timerLabel:'Hold each spot',
  },
  hip_shift:{
    name:'Hip Shift to Center',emoji:'⚖️',color:T.green,colorBg:T.greenBg,cat:'reset',
    why:'You habitually hang on your left foot. This teaches your nervous system to find midline without overcorrecting to the right.',
    target:'Midline weight distribution + pelvic leveling',
    feel:'Left arch slightly unloads, right lower back feels less compressed',
    notFeel:'Locked knees or leaning the trunk sideways',
    mistakes:['Shifting too far right','Hiking one hip up'],
    dose:'3 reps × 15–20 sec with nasal breathing',
    setup:'Stand relaxed. Gently shift weight 5–10% toward right heel + right big toe base. Breathe slowly.',
    stopIf:'Increases back pain',
    hasTimer:true,timerSec:15,timerLabel:'Hold each shift',
  },
  glute_med:{
    name:'Side-Lying Hip Abduction',emoji:'🏋️',color:T.green,colorBg:T.greenBg,cat:'activate',
    imgs:[IMG+'Thigh_Abductor/0.jpg',IMG+'Thigh_Abductor/1.jpg'],
    imgNote:'Note: machine version shown — perform lying on your side using body weight or a band',
    why:'Rebuilds the hip stabilizer your body stopped using, directly reducing the load on your right lower back.',
    target:'Posterior fibres of glute medius',
    feel:'Side/back of the glute burning (not the front hip)',
    notFeel:'Front hip pinching (TFL taking over) or lower back clenching',
    mistakes:['Hip rolling backward','Hiking the pelvis','Lifting too high'],
    dose:'2–3 × 8–12 slow reps, right side priority',
    setup:'Lie on left side. Top leg slightly behind body. Foot slightly turned down. Pelvis stacked.',
    stopIf:'Front hip keeps taking over — reduce range and move leg slightly more backward',
  },
  side_plank:{
    name:'Side Plank',emoji:'💪',color:T.accent,colorBg:T.accentBg,cat:'stabilize',
    imgs:[IMG+'Push_Up_to_Side_Plank/0.jpg',IMG+'Push_Up_to_Side_Plank/1.jpg'],
    imgNote:'Note: images show push-up to side plank variant — start from the side plank hold only',
    why:'Trains obliques + glute to be the stabilizer instead of your right lower back.',
    target:'Lateral trunk system (obliques) + glute',
    feel:'Side abdomen + glute working, steady breathing is possible',
    notFeel:'Sharp lower back cramping',
    mistakes:['Sinking at the shoulder','Rib flaring','Holding breath'],
    dose:'2 × 20–30 sec each side',
    setup:'Forearm on floor, body in a straight line. Right side first.',
    stopIf:'Lower back cramps hard — do bent-knee version instead',
    hasTimer:true,timerSec:20,timerLabel:'Hold each side',
  },
  dead_bug:{
    name:'Dead Bug',emoji:'🪲',color:T.accent,colorBg:T.accentBg,cat:'stabilize',
    imgs:[IMG+'Dead_Bug/0.jpg',IMG+'Dead_Bug/1.jpg'],
    why:'Restores deep abdominal control and rib position, directly reducing the grip pattern in your lower back.',
    target:'Deep abdominals + rib position',
    feel:'Lower ribs down, abs working quietly, low back stays quiet throughout',
    notFeel:'Hip flexors pulling, or back arching off the floor',
    mistakes:['Rushing through reps','Losing rib position as limbs extend'],
    dose:'2 × 6 per side, slow and controlled',
    setup:'Lie on back, arms straight up, hips + knees at 90°. Lower opposite arm and leg while keeping lower back completely still.',
    stopIf:'Back pain increases',
  },
  ball_shoulder:{
    name:'Ball Release – Right Shoulder',emoji:'🫁',color:T.red,colorBg:T.redBg,cat:'release',
    why:'The muscle causing your front shoulder pain actually lives in your back shoulder (infraspinatus). Releasing it is the key to the anterior pain.',
    target:'Infraspinatus / teres minor (posterior shoulder)',
    feel:'Deep posterior tenderness, sometimes a referred sensation to the front of the shoulder — that\'s a good sign',
    notFeel:'Nerve tingling into the hand that persists',
    mistakes:['Pushing into the bony shoulder blade spine','Using excessive force'],
    dose:'60–90 sec on the most tender point, add tiny arm movements',
    setup:'Ball on the meaty part of the right shoulder blade (below and outside the spine). Use a wall or the floor.',
    stopIf:'Symptoms significantly worsen after',
    hasTimer:true,timerSec:60,timerLabel:'Hold each point',
  },
  cross_body:{
    name:'Cross-Body Stretch',emoji:'🤸',color:T.accent,colorBg:T.accentBg,cat:'reset',
    why:'Maintains posterior shoulder mobility without provoking the irritated anterior positions.',
    target:'Posterior capsule / posterior deltoid',
    feel:'Mild posterior shoulder stretch',
    notFeel:'Any pinching at the front of the shoulder',
    mistakes:['Forcing end range','Pulling too aggressively'],
    dose:'2 × 20 sec',
    setup:'Bring right arm across chest at shoulder height. Use left hand to hold gently just above the elbow.',
    stopIf:'Front shoulder pain increases',
    hasTimer:true,timerSec:20,timerLabel:'Hold each side',
  },
  er_isometric:{
    name:'ER Isometric',emoji:'💪',color:T.green,colorBg:T.greenBg,cat:'activate',
    why:'Builds rotator cuff strength in the safest position possible. Directly calms the pain mechanism over time.',
    target:'Infraspinatus + teres minor (right rotator cuff)',
    feel:'Deep posterior shoulder engagement',
    notFeel:'Front shoulder / biceps groove pain',
    mistakes:['Rotating at the wrist only','Shrugging the shoulder'],
    dose:'3 × 20 sec (right side priority)',
    setup:'Elbow tucked against ribs, towel between elbow and body. Press outward against a wall — don\'t move.',
    stopIf:'Front shoulder lights up — reduce effort to 30–40%',
    hasTimer:true,timerSec:20,timerLabel:'Hold each rep',
  },
  wall_slide:{
    name:'Serratus Wall Slide',emoji:'🧱',color:T.accent,colorBg:T.accentBg,cat:'activate',
    why:'Trains the muscle that controls your shoulder blade and takes pressure off the rotator cuff.',
    target:'Serratus anterior (shoulder blade control)',
    feel:'Ribcage stays down, a "wrap" feeling under the armpit and side ribs',
    notFeel:'Upper traps shrugging or neck tension',
    mistakes:['Flaring ribs','Losing forearm contact with wall','Shrugging'],
    dose:'2 × 6–8 slow reps',
    setup:'Facing wall, forearms flat. Slide arms up while keeping ribs down. Optional: lift forearms off at top.',
    stopIf:'Neck traps dominate — reduce height and slow down',
  },
  face_pull:{
    name:'Face Pull',emoji:'🎯',color:T.accent,colorBg:T.accentBg,cat:'train',
    imgs:[IMG+'Face_Pull/0.jpg',IMG+'Face_Pull/1.jpg'],
    why:'Improves posterior shoulder coordination and helps unload the front of the shoulder during pulling.',
    target:'Posterior deltoid + mid/lower trapezius',
    feel:'Upper back and back of shoulders working, no neck strain',
    notFeel:'Front shoulder pinching',
    mistakes:['Leaning back','Yanking the weight','Elbows too low'],
    dose:'2 × 12–15, light weight',
    setup:'Cable at forehead height. Pull toward face with elbows flaring out, external rotation at end range.',
    stopIf:'Shoulder pinches',
  },
  childs_pose:{
    name:"Child's Pose Reach",emoji:'🧘',color:T.purple,colorBg:T.purpleBg,cat:'reset',
    imgs:[IMG+'Childs_Pose/0.jpg',IMG+'Childs_Pose/1.jpg'],
    why:'Gentle spine and hip decompression. Resets thoracic extension and hip flexors.',
    target:'Thoracic spine + hips',
    feel:'Mild elongation through the back and hips',
    notFeel:'Sharp pain anywhere',
    dose:'4 × 5 slow breaths',
    setup:'Kneel and reach arms far forward on the floor. Walk hands further for more thoracic stretch.',
    stopIf:'Any sharp pain',
  },
  chest_row:{
    name:'Chest-Supported Row',emoji:'🏋️',color:T.accent,colorBg:T.accentBg,cat:'train',
    imgs:[IMG+'Dumbbell_Incline_Row/0.jpg',IMG+'Dumbbell_Incline_Row/1.jpg'],
    why:'Strengthens your upper back without loading the lower back. Safe for your current pattern.',
    target:'Mid/lower trapezius + rhomboids',
    feel:'Upper back squeezing, shoulder comfortable throughout',
    notFeel:'Front shoulder grab or neck tension',
    mistakes:['Shrugging at the top','Not pausing at peak'],
    dose:'3 × 10 with 1 sec pause at top',
    setup:'Chest on incline bench. Cue before each rep: "rotate upper arm slightly outward, then pull."',
    stopIf:'Front shoulder pain',
  },
  pulldown:{
    name:'Neutral-Grip Pulldown',emoji:'⬇️',color:T.accent,colorBg:T.accentBg,cat:'train',
    imgs:[IMG+'Wide-Grip_Lat_Pulldown/0.jpg',IMG+'Wide-Grip_Lat_Pulldown/1.jpg'],
    imgNote:'Note: wide-grip shown — use a neutral (palms facing) attachment for this exercise',
    why:'Trains the pull pattern with less rotator cuff demand than overhand grip.',
    target:'Lats + lower trap',
    feel:'Lats and upper back doing the work, ribs staying down',
    notFeel:'Front shoulder pinch or ribs flaring at bottom',
    mistakes:['Pulling elbows too far back','Flaring ribs at bottom'],
    dose:'3 × 8, stop 2 reps early',
    setup:'Quiet ribs, slight external rotation before each rep.',
    stopIf:'Shoulder pain',
  },
  incline_press:{
    name:'DB Incline Press / Push-Up',emoji:'⬆️',color:T.accent,colorBg:T.accentBg,cat:'train',
    imgs:[IMG+'Incline_Dumbbell_Press/0.jpg',IMG+'Incline_Dumbbell_Press/1.jpg'],
    why:'Horizontal pressing at an angle that avoids shoulder impingement.',
    target:'Upper chest + anterior deltoid',
    feel:'Chest working, shoulder comfortable throughout the range',
    notFeel:'Front shoulder pinching at any point',
    mistakes:['Going too wide with grip','Locking out hard'],
    dose:'3 × 8–12',
    stopIf:'Any shoulder pinch — stop and regress to push-up',
  },
  band_er:{
    name:'Band External Rotation',emoji:'🎗️',color:T.green,colorBg:T.greenBg,cat:'activate',
    imgs:[IMG+'External_Rotation/0.jpg',IMG+'External_Rotation/1.jpg'],
    why:'Rotator cuff strengthening in the plane it actually works in.',
    target:'Infraspinatus + teres minor',
    feel:'Deep posterior shoulder engagement, controlled movement',
    notFeel:'Front shoulder activation',
    dose:'2 × 15, slow and controlled',
    setup:'Elbow tucked at side, towel between elbow and body. Rotate outward against band resistance.',
  },
  goblet_squat:{
    name:'Goblet Squat',emoji:'🏋️',color:T.green,colorBg:T.greenBg,cat:'train',
    imgs:[IMG+'Goblet_Squat/0.jpg',IMG+'Goblet_Squat/1.jpg'],
    why:'Teaches the squat pattern with foot tripod awareness throughout.',
    target:'Quads + glutes + foot control',
    feel:'Arch stays lifted, knees tracking over toes, glutes loading at bottom',
    notFeel:'Left arch collapsing or knees caving',
    mistakes:['Left arch collapsing','Knees caving inward'],
    dose:'3 × 8',
    setup:'Hold weight at chest. Feel the tripod (heel, big toe base, little toe base) throughout every rep.',
  },
  split_squat:{
    name:'Split Squat',emoji:'🦵',color:T.green,colorBg:T.greenBg,cat:'train',
    imgs:[IMG+'Split_Squats/0.jpg',IMG+'Split_Squats/1.jpg'],
    why:'Single-leg loading to train each hip independently and expose asymmetries safely.',
    target:'Quad + glute (front leg)',
    feel:'Front leg doing the work, pelvis level and controlled',
    notFeel:'Pelvis dropping to one side',
    mistakes:['Letting pelvis rotate or drop','Front knee caving'],
    dose:'3 × 8/side, short range, pause 1 sec at bottom',
    setup:'Control the pelvis — keeping it level IS the exercise.',
  },
  hip_thrust:{
    name:'Hip Thrust',emoji:'🍑',color:T.green,colorBg:T.greenBg,cat:'train',
    imgs:[IMG+'Barbell_Hip_Thrust/0.jpg',IMG+'Barbell_Hip_Thrust/1.jpg'],
    why:'Glute strengthening at end range, exactly where your glute med/max need to work.',
    target:'Glute max + glute med',
    feel:'Glutes firing hard at the top, lower back quiet',
    notFeel:'Lower back compression or hamstring cramping',
    dose:'3 × 10',
    setup:'Upper back on bench, drive through heels, squeeze glutes at top.',
  },
  sl_rdl:{
    name:'Single-Leg RDL',emoji:'⚖️',color:T.green,colorBg:T.greenBg,cat:'train',
    imgs:[IMG+'Kettlebell_One-Legged_Deadlift/0.jpg',IMG+'Kettlebell_One-Legged_Deadlift/1.jpg'],
    why:'Trains loading each hip independently while controlling pelvic level.',
    target:'Hamstring + glute + pelvic control',
    feel:'Hip of standing leg loading, pelvis level throughout',
    notFeel:'Pelvis rotating or lower back gripping',
    dose:'2 × 6/side, light weight',
    setup:'Hip hinge on one leg. Controlling the pelvis is the entire point of this exercise.',
  },
  cable_row:{
    name:'Seated Cable Row',emoji:'🏋️',color:T.accent,colorBg:T.accentBg,cat:'train',
    imgs:[IMG+'Seated_Cable_Rows/0.jpg',IMG+'Seated_Cable_Rows/1.jpg'],
    why:'Upper back strengthening with scapular control emphasis.',
    target:'Mid trapezius + rhomboids',
    feel:'Upper back pulling, shoulder comfortable',
    notFeel:'Front shoulder pinch or upper trap shrugging',
    dose:'3 × 10 with 1 sec pause',
    setup:'"Humerus slightly externally rotated" before each pull.',
  },
  landmine_press:{
    name:'Landmine Press',emoji:'⬆️',color:T.accent,colorBg:T.accentBg,cat:'train',
    why:'Diagonal pressing force — kinder on the shoulder than overhead and safer than flat.',
    target:'Anterior deltoid + upper chest + serratus',
    feel:'Smooth arc of motion, scapula moves freely, no rib flare',
    notFeel:'Shoulder impingement or rib flaring',
    mistakes:['Flaring ribs as arm extends'],
    dose:'3 × 8',
    setup:'Scap moves freely — don\'t block it.',
  },
  squat:{
    name:'Squat',emoji:'🏋️',color:T.green,colorBg:T.greenBg,cat:'train',
    imgs:[IMG+'Barbell_Squat/0.jpg',IMG+'Barbell_Squat/1.jpg'],
    why:'Progressive squat loading with the corrected foot and pelvic strategy.',
    target:'Quad + glute + foot control',
    feel:'Weight balanced, arch maintained, glutes loading',
    dose:'3 × 6–8, light to moderate',
    setup:'Tripod feet throughout. No back gripping.',
  },
  reverse_lunge:{
    name:'Reverse Lunge',emoji:'🚶',color:T.green,colorBg:T.greenBg,cat:'train',
    imgs:[IMG+'Dumbbell_Rear_Lunge/0.jpg',IMG+'Dumbbell_Rear_Lunge/1.jpg'],
    why:'Less knee stress than forward lunge, maintains hip loading pattern.',
    target:'Quad + glute',
    dose:'2–3 × 8/side',
    setup:'Front foot tripod, pelvis level.',
  },
  rdl:{
    name:'RDL',emoji:'🏋️',color:T.green,colorBg:T.greenBg,cat:'train',
    imgs:[IMG+'Romanian_Deadlift/0.jpg',IMG+'Romanian_Deadlift/1.jpg'],
    why:'Hip hinge loading without lower back gripping.',
    target:'Hamstrings + glutes',
    feel:'Hip hinge loads hamstrings, lower back quiet',
    notFeel:'Lower back gripping or rounding',
    dose:'2 × 8, light to moderate',
    setup:'"Hip hinge" — not "bend at the back."',
  },
  walk:{
    name:'Easy Walk',emoji:'🚶',color:T.green,colorBg:T.greenBg,cat:'reset',
    why:'Active recovery and direct gait reprogramming.',
    target:'Gait pattern + nervous system downregulation',
    feel:'Relaxed midfoot push-off, left arch relaxed, no toe clawing',
    dose:'2 min easy',
    setup:'"Push the ground away from the midfoot."',
  },
  couch_stretch:{
    name:'Couch Stretch',emoji:'🛋️',color:T.purple,colorBg:T.purpleBg,cat:'reset',
    why:'Opens the front of the hip so the pelvis can sit neutral — less arch in the lower back during squats and walking.',
    target:'Hip flexors + quad (rectus femoris)',
    feel:'Long stretch through the front of the hip and thigh',
    notFeel:'Knee pain or lower-back pinching',
    mistakes:['Letting the lower back arch','Forcing depth'],
    dose:'30 sec each side',
    setup:'Rear shin against a wall/couch, front foot planted. Tuck the pelvis slightly and stand tall.',
    hasTimer:true,timerSec:30,timerLabel:'Hold each side',
  },
  glute_bridge:{
    name:'Glute Bridge',emoji:'🍑',color:T.green,colorBg:T.greenBg,cat:'activate',
    why:'Wakes up the glutes so they — not the lower back — drive hip extension in your lifts.',
    target:'Glute max',
    feel:'Glutes squeezing at the top, lower back quiet',
    notFeel:'Lower back doing the work or hamstrings cramping',
    mistakes:['Over-arching at the top','Pushing through the toes'],
    dose:'1 × 12',
    setup:'On your back, knees bent. Drive through the heels, squeeze the glutes, ribs stay down.',
  },
  bird_dog:{
    name:'Bird Dog',emoji:'🐦',color:T.accent,colorBg:T.accentBg,cat:'stabilize',
    why:'Trains the trunk to stay stable while the limbs move — the anti-rotation control the spine needs.',
    target:'Deep core + spinal stabilizers',
    feel:'Steady, level trunk; light core engagement',
    notFeel:'Lower back arching or hips twisting',
    mistakes:['Rotating the hips','Lifting the limbs too high'],
    dose:'1 × 6 each side',
    setup:'On hands and knees. Extend opposite arm and leg slowly while keeping the spine and hips perfectly still.',
  },
  scap_pushup:{
    name:'Scap Push-Up',emoji:'🧱',color:T.accent,colorBg:T.accentBg,cat:'activate',
    why:'Trains shoulder-blade control — the foundation that keeps the shoulder healthy under pressing and pulling.',
    target:'Serratus anterior + scapular control',
    feel:'Shoulder blades gliding apart and together, ribs down',
    notFeel:'Neck or upper-trap shrugging',
    mistakes:['Bending the elbows','Shrugging toward the ears'],
    dose:'1 × 10',
    setup:'Push-up or plank position, arms straight. Let the chest sink slightly, then push the floor away to spread the blades.',
  },
  bench_press:{
    name:'Bench Press / Incline Push-Up',emoji:'🏋️',color:T.accent,colorBg:T.accentBg,cat:'train',
    why:'Horizontal pressing strength. Use the bench only when the shoulder feels calm — otherwise the incline push-up.',
    target:'Chest + anterior deltoid + triceps',
    feel:'Chest working, shoulders set back and down throughout',
    notFeel:'Front-shoulder pinch or a deep painful stretch at the bottom',
    mistakes:['Letting the shoulders roll forward','Chasing a deep painful stretch','Flaring the ribs'],
    dose:'3 × 6–8',
    setup:'Shoulders back and down, ribs down. Use the bench only if the shoulder feels calm; don\'t chase depth.',
    stopIf:'Front-shoulder pain — switch to the incline push-up',
  },
  ring_row:{
    name:'Ring Row',emoji:'💍',color:T.accent,colorBg:T.accentBg,cat:'train',
    why:'Builds pulling strength with the shoulder in a safe, supported position. Your main back exercise.',
    target:'Upper back + lats + rear delts',
    feel:'Upper back pulling, body in one straight line',
    notFeel:'Front-shoulder grab or sagging hips',
    mistakes:['Leading with the elbows before setting the shoulders','Letting the hips sag','Shrugging'],
    dose:'3 × 8–10',
    setup:'Set the shoulders down first, body straight, pull to the lower chest. Lower the feet to make it harder.',
  },
  lateral_raise:{
    name:'Lateral Raise',emoji:'🙆',color:T.accent,colorBg:T.accentBg,cat:'train',
    why:'Builds the side delt for shoulder shape and width — light load, strict form.',
    target:'Lateral deltoid',
    feel:'Side of the shoulder working, smooth and controlled',
    notFeel:'Upper traps shrugging or swinging momentum',
    mistakes:['Going too heavy','Shrugging','Swinging the weight up'],
    dose:'3 × 12',
    setup:'Light dumbbells. Raise to shoulder height with a slight bend in the elbow. No shrug.',
  },
  pushup_elevated:{
    name:'Feet-Elevated Push-Up',emoji:'⬆️',color:T.accent,colorBg:T.accentBg,cat:'train',
    why:'Adds pressing load through bodyweight without a barbell — kinder on the shoulder than heavy bench.',
    target:'Upper chest + anterior deltoid + serratus',
    feel:'Chest and shoulders working, blades moving freely',
    notFeel:'Front-shoulder pinch at the bottom',
    mistakes:['Dropping too deep','Letting the hips sag','Flaring the elbows wide'],
    dose:'3 × 8–12',
    setup:'Feet on a low box/bench. Don\'t go too deep — stop where the shoulder stays comfortable.',
    stopIf:'Shoulder pinch — reduce depth or use a flat-floor push-up',
  },
  pullup:{
    name:'Pull-Up Progression',emoji:'🆙',color:T.accent,colorBg:T.accentBg,cat:'train',
    why:'Rebuilds vertical pulling strength gradually. Use a band so every rep is clean — no swinging, no grinding.',
    target:'Lats + upper back + biceps',
    feel:'Lats and upper back working, shoulders set down first',
    notFeel:'Front-shoulder pain or the shoulder feeling like it is hanging',
    mistakes:['Swinging or kipping','Starting from a dead passive hang','Grinding slow reps'],
    dose:'3 × 4–6',
    setup:'Use a band for assistance if needed. Set the shoulders down before pulling. Stop 2–3 reps short.',
    stopIf:'Shoulder feels off — swap for easy ring rows, 3 × 10',
  },
  barbell_curl:{
    name:'Barbell Curl',emoji:'💪',color:T.green,colorBg:T.greenBg,cat:'train',
    why:'Direct biceps work for arm size and elbow health.',
    target:'Biceps',
    feel:'Biceps working through a full controlled range',
    notFeel:'Lower-back swinging or elbow pain',
    mistakes:['Swinging the torso','Letting the elbows drift forward'],
    dose:'2 × 10–12',
    setup:'Elbows tucked at the sides, control the lowering. No body english.',
  },
  ham_curl:{
    name:'Slider Hamstring Curl',emoji:'🦵',color:T.green,colorBg:T.greenBg,cat:'train',
    why:'Trains the hamstrings without loading the lower back — useful when the back is sensitive.',
    target:'Hamstrings',
    feel:'Hamstrings working, hips staying up, back quiet',
    notFeel:'Lower-back gripping or hamstring cramping',
    mistakes:['Letting the hips drop','Moving too fast'],
    dose:'2 × 8–10',
    setup:'On your back, heels on sliders or a towel. Bridge up, then slide the heels out and back in. A glute-bridge walkout works as a substitute.',
  },
  walking_lunge:{
    name:'Walking Lunge',emoji:'🚶',color:T.green,colorBg:T.greenBg,cat:'train',
    why:'Single-leg loading that builds the legs and exposes side-to-side differences.',
    target:'Quads + glutes',
    feel:'Front leg working, torso tall, pelvis level',
    notFeel:'Knee caving or pelvis dropping to one side',
    mistakes:['Over-striding','Letting the torso fold forward'],
    dose:'3 × 8 each side',
    setup:'Shorter step, stay tall. Control each step — no momentum.',
  },
  mcgill_curlup:{
    name:'McGill Curl-Up',emoji:'🧘',color:T.accent,colorBg:T.accentBg,cat:'stabilize',
    why:'Builds core endurance while keeping the lower back in a safe neutral position.',
    target:'Abdominals (spine-sparing)',
    feel:'Abs working, lower back staying neutral and quiet',
    notFeel:'Lower back flattening hard or the neck straining',
    mistakes:['Flattening the lower back into the floor','Pulling with the neck'],
    dose:'2 × 5 each side, 5–8 sec holds',
    setup:'On your back, one knee bent, hands under the lower back. Lift the head and shoulders just slightly and hold.',
    hasTimer:true,timerSec:7,timerLabel:'Hold each rep',
  },
};

const CATS = {
  release:  { label:'Release',          color:T.red },
  reset:    { label:'Breathe & Reset',   color:T.purple },
  activate: { label:'Activate',          color:T.green },
  stabilize:{ label:'Stabilize',         color:T.accent },
  train:    { label:'Train',             color:T.amber },
};

// ─── PLAN DATA ────────────────────────────────────────────────────────────────
const PRIMER=[
  {id:'couch_stretch',reps:'30 sec/side'},
  {id:'glute_bridge',reps:'1 × 12'},
  {id:'bird_dog',reps:'1 × 6/side'},
  {id:'band_er',reps:'1 × 15/side'},
  {id:'scap_pushup',reps:'1 × 10'},
];

const PUMP=[
  {id:'pushup_elevated',sets:'2',reps:'12',cue:'Easy'},
  {id:'ring_row',sets:'2',reps:'15',cue:'Easy'},
  {id:'lateral_raise',sets:'2',reps:'15',cue:'Light'},
  {id:'face_pull',sets:'2',reps:'15',cue:'Light'},
  {id:'barbell_curl',sets:'2',reps:'12',cue:'Controlled'},
  {id:'couch_stretch',reps:'45 sec/side'},
];

const WEEK_INFO=[
  {theme:'Re-entry',note:'Ease back in. Get every pattern clean before adding load or reps.'},
  {theme:'Add reps',note:'Same exercises and load. Add 1–2 clean reps per set where it feels good.'},
  {theme:'Add load',note:'If week 2 felt good, add a small amount of load. Reps first, then weight.'},
  {theme:'Consolidation',note:'Not a max week. Use week 3 load and make every rep cleaner.'},
];

const WK=[
  {
    upperA:[
      {id:'bench_press',sets:'3',reps:'6–8',cue:'Shoulders back/down, ribs down, no deep stretch'},
      {id:'ring_row',sets:'3',reps:'8–10',cue:'Shoulders down first, straight body, pull to lower chest'},
      {id:'landmine_press',sets:'3',reps:'8/side',cue:'Ribs down, press forward/up, don\'t lean back'},
      {id:'lateral_raise',sets:'3',reps:'12',cue:'Light, no shrugging'},
      {id:'face_pull',sets:'2',reps:'15',cue:'Rotate hands back, pause 1 sec'},
      {id:'band_er',sets:'2',reps:'15',cue:'Light and clean'},
    ],
    lowerA:[
      {id:'goblet_squat',sets:'3',reps:'8',cue:'Stop before the pelvis tucks, slow down'},
      {id:'split_squat',sets:'3',reps:'8/side',cue:'Front leg does most of the work'},
      {id:'rdl',sets:'3',reps:'8',cue:'Light — stop when the hamstrings stretch, no back rounding'},
      {id:'ham_curl',sets:'2',reps:'8–10',cue:'Hips up, back quiet'},
      {id:'side_plank',sets:'2',reps:'30 sec/side',cue:'Steady breathing'},
    ],
    upperB:[
      {id:'pushup_elevated',sets:'3',reps:'8–12',cue:'Don\'t go too deep'},
      {id:'pullup',sets:'3',reps:'4–6',cue:'Band if needed, shoulders down first, no swing'},
      {id:'ring_row',sets:'2',reps:'12',cue:'Easier angle, smooth reps'},
      {id:'landmine_press',sets:'2',reps:'10/side',cue:'Light to moderate'},
      {id:'barbell_curl',sets:'2',reps:'10–12',cue:'Controlled'},
      {id:'face_pull',sets:'2',reps:'15',cue:'Pause 1 sec'},
    ],
    lowerB:[
      {id:'rdl',sets:'3',reps:'6–8',cue:'Slightly heavier than Lower A, but clean'},
      {id:'walking_lunge',sets:'3',reps:'8/side',cue:'Shorter step, stay tall'},
      {id:'hip_thrust',sets:'3',reps:'10–12',cue:'Pause 2 sec at the top'},
      {id:'goblet_squat',sets:'2',reps:'12',cue:'Controlled pump set'},
      {id:'mcgill_curlup',sets:'2',reps:'5/side',cue:'Hold each rep 5–8 sec'},
      {id:'bird_dog',sets:'2',reps:'8/side',cue:'Slow, no hip twist'},
    ],
    walk:'20–25 min',
  },
  {
    upperA:[
      {id:'bench_press',sets:'3',reps:'8',cue:'Same load as week 1, cleaner reps'},
      {id:'ring_row',sets:'3',reps:'10–12',cue:'Add reps where clean'},
      {id:'landmine_press',sets:'3',reps:'9/side',cue:'+1 rep per side'},
      {id:'lateral_raise',sets:'3',reps:'12–15',cue:'Light, strict'},
      {id:'face_pull',sets:'2',reps:'15',cue:'Pause 1 sec'},
      {id:'band_er',sets:'2',reps:'15',cue:'Light and clean'},
    ],
    lowerA:[
      {id:'goblet_squat',sets:'3',reps:'10',cue:'Add reps, not weight'},
      {id:'split_squat',sets:'3',reps:'9–10/side',cue:'Front leg works'},
      {id:'rdl',sets:'3',reps:'8–10',cue:'Light, no back rounding'},
      {id:'ham_curl',sets:'2',reps:'10',cue:'Hips up'},
      {id:'side_plank',sets:'2',reps:'30 sec/side',cue:'Steady breathing'},
    ],
    upperB:[
      {id:'pushup_elevated',sets:'3',reps:'10–12',cue:'Don\'t go too deep'},
      {id:'pullup',sets:'3',reps:'5–6',cue:'Band if needed, no swing'},
      {id:'ring_row',sets:'2–3',reps:'12',cue:'Smooth reps'},
      {id:'landmine_press',sets:'2',reps:'11/side',cue:'+1 rep per side'},
      {id:'barbell_curl',sets:'2',reps:'12',cue:'Controlled'},
      {id:'face_pull',sets:'2',reps:'15',cue:'Pause 1 sec'},
    ],
    lowerB:[
      {id:'rdl',sets:'3',reps:'8–10',cue:'Clean reps, light load'},
      {id:'walking_lunge',sets:'3',reps:'9/side',cue:'Shorter step, tall'},
      {id:'hip_thrust',sets:'3',reps:'12',cue:'Pause 2 sec at the top'},
      {id:'goblet_squat',sets:'2',reps:'12',cue:'Controlled pump set'},
      {id:'mcgill_curlup',sets:'2',reps:'5/side',cue:'Hold 5–8 sec'},
      {id:'bird_dog',sets:'2',reps:'8/side',cue:'Slow, no hip twist'},
    ],
    walk:'25–30 min',
  },
  {
    upperA:[
      {id:'bench_press',sets:'3',reps:'6–8',cue:'Slightly heavier'},
      {id:'ring_row',sets:'3',reps:'8–12',cue:'Slightly harder angle'},
      {id:'landmine_press',sets:'3',reps:'8/side',cue:'Slightly heavier'},
      {id:'lateral_raise',sets:'3',reps:'12–15',cue:'Light, strict'},
      {id:'face_pull',sets:'2',reps:'15',cue:'Pause 1 sec'},
      {id:'band_er',sets:'2',reps:'15',cue:'Light and clean'},
    ],
    lowerA:[
      {id:'goblet_squat',sets:'3',reps:'8–10',cue:'Slightly heavier'},
      {id:'split_squat',sets:'3',reps:'8–10/side',cue:'Add light load'},
      {id:'rdl',sets:'3',reps:'8',cue:'Slightly heavier'},
      {id:'ham_curl',sets:'3',reps:'8–10',cue:'Hips up, back quiet'},
      {id:'side_plank',sets:'3',reps:'30 sec/side',cue:'Steady breathing'},
    ],
    upperB:[
      {id:'pushup_elevated',sets:'3',reps:'8–10',cue:'Or a light bench'},
      {id:'pullup',sets:'3',reps:'5–6',cue:'Band if needed, no swing'},
      {id:'ring_row',sets:'2–3',reps:'12',cue:'Smooth reps'},
      {id:'landmine_press',sets:'3',reps:'8–10/side',cue:'Slightly heavier'},
      {id:'barbell_curl',sets:'3',reps:'10–12',cue:'Controlled'},
      {id:'face_pull',sets:'2',reps:'15',cue:'Pause 1 sec'},
    ],
    lowerB:[
      {id:'rdl',sets:'3',reps:'6–8',cue:'Slightly heavier'},
      {id:'walking_lunge',sets:'3',reps:'8–10/side',cue:'Shorter step, tall'},
      {id:'hip_thrust',sets:'3',reps:'12',cue:'Pause 2 sec at the top'},
      {id:'goblet_squat',sets:'2',reps:'12',cue:'Controlled pump set'},
      {id:'mcgill_curlup',sets:'2',reps:'5/side',cue:'Hold 5–8 sec'},
      {id:'bird_dog',sets:'2',reps:'8/side',cue:'Slow, no hip twist'},
    ],
    walk:'30 min',
  },
  {
    upperA:[
      {id:'bench_press',sets:'3',reps:'8',cue:'Week 3 load, cleaner reps'},
      {id:'ring_row',sets:'3',reps:'10–12',cue:'Clean and controlled'},
      {id:'landmine_press',sets:'3',reps:'8–10/side',cue:'Week 3 load'},
      {id:'lateral_raise',sets:'3',reps:'15',cue:'Light, strict'},
      {id:'face_pull',sets:'2',reps:'15',cue:'Pause 1 sec'},
      {id:'band_er',sets:'2',reps:'15',cue:'Light and clean'},
    ],
    lowerA:[
      {id:'goblet_squat',sets:'3',reps:'10',cue:'Week 3 load, clean'},
      {id:'split_squat',sets:'3',reps:'10/side',cue:'Front leg works'},
      {id:'rdl',sets:'3',reps:'8',cue:'Week 3 load, clean'},
      {id:'ham_curl',sets:'3',reps:'10',cue:'Hips up'},
      {id:'side_plank',sets:'3',reps:'35 sec/side',cue:'Steady breathing'},
    ],
    upperB:[
      {id:'pushup_elevated',sets:'3',reps:'8–12',cue:'Or a bench variation'},
      {id:'pullup',sets:'3',reps:'5–8',cue:'Only if pain-free'},
      {id:'ring_row',sets:'3',reps:'10–12',cue:'Clean reps'},
      {id:'landmine_press',sets:'3',reps:'8',cue:'Week 3 load'},
      {id:'barbell_curl',sets:'3',reps:'10–12',cue:'Controlled'},
      {id:'face_pull',sets:'2',reps:'15',cue:'Pause 1 sec'},
    ],
    lowerB:[
      {id:'rdl',sets:'3',reps:'8',cue:'Week 3 load, clean'},
      {id:'walking_lunge',sets:'3',reps:'10/side',cue:'Shorter step, tall'},
      {id:'hip_thrust',sets:'3',reps:'12',cue:'Pause 2 sec at the top'},
      {id:'goblet_squat',sets:'2',reps:'12',cue:'Controlled pump set'},
      {id:'mcgill_curlup',sets:'2',reps:'5/side',cue:'Hold 5–8 sec'},
      {id:'bird_dog',sets:'2',reps:'8/side',cue:'Slow, no hip twist'},
    ],
    walk:'30–40 min',
  },
];

const PLAN=(()=>{
  const out=[];
  WK.forEach((wk,wi)=>{
    const week=wi+1;
    const days=[
      {dow:'Mon',title:'Upper A',sub:'Press + Pull',type:'training',color:T.accent,
       goal:'Horizontal pressing and pulling with the shoulder set and calm.',
       sections:{primer:PRIMER,training:wk.upperA}},
      {dow:'Tue',title:'Lower A',sub:'Squat + Hinge',type:'training',color:T.green,
       goal:'Squat and hinge patterns — control before depth, depth before load.',
       sections:{primer:PRIMER,training:wk.lowerA}},
      {dow:'Wed',title:'Walk + Reset',sub:'Active Recovery',type:'walk',color:T.purple,
       goal:'Easy aerobic work plus the primer to keep tissue moving between sessions.',
       note:'Add a 60-sec ball release on a tight glute or hip if you need it.',
       sections:{primer:PRIMER,walk:[{id:'walk',reps:wk.walk}]}},
      {dow:'Thu',title:'Upper B',sub:'Vertical Pull + Press',type:'training',color:T.accent,
       goal:'Vertical pulling and pressing volume. Swap pull-ups for ring rows if the shoulder is off.',
       sections:{primer:PRIMER,training:wk.upperB}},
      {dow:'Fri',title:'Lower B',sub:'Posterior Chain',type:'training',color:T.green,
       goal:'Posterior-chain strength with a level, controlled pelvis. No back gripping.',
       sections:{primer:PRIMER,training:wk.lowerB}},
      {dow:'Sat',title:'Optional Pump',sub:'Pump + Mobility',type:'pump',color:T.amber,
       goal:'Optional easy volume — only if the shoulder and back feel good.',
       note:'Skip it entirely if recovery is poor. Everything stays light.',
       sections:{primer:PRIMER,pump:PUMP}},
      {dow:'Sun',title:'Rest',sub:'Full Recovery',type:'rest',color:T.textMuted,
       goal:'Full rest. Let the work consolidate.',
       note:'Optional 15–20 min easy walk. Run the primer only if you feel stiff.',
       sections:{primer:PRIMER}},
    ];
    days.forEach((d,di)=>out.push({...d,day:wi*7+di+1,week}));
  });
  return out;
})();

const RULES=[
  {label:'Pain',color:T.red,items:[
    '0–2 / 10 — continue as normal',
    '3 / 10 — okay only if it settles quickly',
    '4+ / 10 — stop or regress the exercise',
    'Worse the next morning — cut the next session by 30%',
  ]},
  {label:'Effort',color:T.amber,items:[
    'Keep 2–3 reps in reserve on every set',
    'No training to failure',
    'No max pull-ups, dips, heavy deadlifts or heavy squats yet',
    'No skin-the-cat, front lever or planche intensity yet',
  ]},
  {label:'Progression',color:T.green,items:[
    'Add reps first',
    'Then add load',
    'Then make the rings harder',
    'Only progress if the shoulder and back are the same or better the next day',
  ]},
];

const SUBS=[
  {when:'If the shoulder aches',color:T.amber,swaps:[
    'Bench → incline push-up',
    'Pull-ups → ring rows',
    'Deep ring rows → more upright ring rows',
    'Landmine press → lighter landmine press, or skip',
  ]},
  {when:'If the back or hip flares',color:T.red,swaps:[
    'RDL → hip-hinge drill + glute bridge',
    'Walking lunges → split squats',
    'Goblet squat → box squat to a controlled depth',
    'Long walk → shorter walk',
  ]},
];

const NUTRITION=[
  'Protein: 110–130 g per day',
  'Surplus: +250–300 calories per day',
  'Weight gain target: 0.25–0.5 kg per week',
  'If bodyweight is not increasing after 2 weeks, add food',
];

const GOAL=[
  'Shoulder handles pressing and rows without ache',
  'Back handles walking 30–40 min',
  'RDL feels clean',
  'Chest and shoulders get real hypertrophy volume',
  'No flare cycle',
];

// ─── EXERCISE IMAGE ───────────────────────────────────────────────────────────
function ExImg({ urls, note }) {
  const [idx, setIdx] = useState(0);
  const [hidden, setHidden] = useState(false);
  if (!urls?.length || hidden) return null;
  return (
    <div style={{marginBottom:14}}>
      <div style={{borderRadius:12,overflow:'hidden',background:T.surface,position:'relative'}}>
        <img src={urls[idx]} alt="" onError={()=>setHidden(true)}
          style={{width:'100%',display:'block',objectFit:'cover',maxHeight:240}} />
        {urls.length>1 && (
          <div style={{position:'absolute',bottom:8,left:0,right:0,display:'flex',justifyContent:'center',gap:6}}>
            {urls.map((_,i)=>(
              <div key={i} onClick={()=>setIdx(i)} style={{width:6,height:6,borderRadius:'50%',
                background:i===idx?'#fff':'rgba(255,255,255,0.35)',cursor:'pointer'}} />
            ))}
          </div>
        )}
      </div>
      {urls.length>1 && (
        <div style={{display:'flex',justifyContent:'space-between',marginTop:6,gap:6}}>
          {urls.map((u,i)=>(
            <div key={i} onClick={()=>setIdx(i)} style={{flex:1,borderRadius:8,overflow:'hidden',
              border:`2px solid ${i===idx?T.accent:'transparent'}`,cursor:'pointer',opacity:i===idx?1:0.5}}>
              <img src={u} alt="" onError={()=>setHidden(true)} style={{width:'100%',display:'block',objectFit:'cover',height:54}} />
            </div>
          ))}
        </div>
      )}
      {note && <div style={{marginTop:6,fontSize:11,color:T.textMuted,fontStyle:'italic',lineHeight:1.4}}>{note}</div>}
    </div>
  );
}

// ─── EXERCISE DETAIL MODAL ────────────────────────────────────────────────────
function ExModal({ exId, onClose }) {
  const ex = EX[exId];
  if (!ex) return null;
  const cat = CATS[ex.cat];
  return (
    <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.85)',zIndex:200,overflowY:'auto'}}
      onClick={e=>{if(e.target===e.currentTarget)onClose();}}>
      <div style={{maxWidth:480,margin:'0 auto',minHeight:'100%',display:'flex',flexDirection:'column',justifyContent:'flex-end'}}>
        <div style={{background:T.card,borderRadius:'20px 20px 0 0',padding:'0 0 40px',marginTop:60}}>
          {/* Handle */}
          <div style={{display:'flex',justifyContent:'center',paddingTop:10,paddingBottom:4}}>
            <div style={{width:40,height:4,borderRadius:2,background:T.border}} />
          </div>
          {/* Header */}
          <div style={{padding:'12px 20px 16px',display:'flex',alignItems:'center',gap:12}}>
            <div style={{width:48,height:48,borderRadius:14,background:ex.colorBg,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
              <Ico name={CAT_ICON[ex.cat]} size={26} color={ex.color}/>
            </div>
            <div style={{flex:1}}>
              <div style={{fontSize:18,fontWeight:800}}>{ex.name}</div>
              {cat && <div style={{fontSize:12,color:cat.color,fontWeight:600,marginTop:2,display:'flex',alignItems:'center',gap:4}}><Ico name={CAT_ICON[ex.cat]} size={13} color={cat.color}/>{cat.label}</div>}
            </div>
            <button onClick={onClose} style={{width:32,height:32,borderRadius:'50%',border:`1px solid ${T.border}`,background:T.surface,cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center'}}><Ico name="x" size={15} color={T.textSec}/></button>
          </div>
          <div style={{padding:'0 20px'}}>
            {/* Images */}
            <ExImg urls={ex.imgs} note={ex.imgNote} />
            {/* Target */}
            {ex.target && (
              <div style={{background:T.accentBg,borderRadius:10,padding:'8px 12px',marginBottom:12,fontSize:13,color:T.textSec,display:'flex',gap:8,alignItems:'center'}}>
                <Ico name="target" size={15} color={T.accent}/><span><strong style={{color:T.text}}>Target:</strong> {ex.target}</span>
              </div>
            )}
            {/* Dose */}
            {ex.dose && (
              <div style={{background:T.amberBg,borderRadius:10,padding:'8px 12px',marginBottom:12,fontSize:13,color:T.amber,fontWeight:600,display:'flex',gap:8,alignItems:'center'}}>
                <Ico name="list" size={15} color={T.amber}/><span>{ex.dose}</span>
              </div>
            )}
            <MDetail label="Why this exercise" color={T.textMuted} text={ex.why} />
            {ex.setup && <MDetail label="Setup" color={T.accent} text={ex.setup} />}
            {ex.feel && <MDetail label="You should feel" icon="checkCircle" color={T.green} text={ex.feel} />}
            {ex.notFeel && <MDetail label="Not feel" icon="xCircle" color={T.red} text={ex.notFeel} />}
            {ex.mistakes?.length>0 && (
              <div style={{marginBottom:14}}>
                <span style={{fontSize:11,color:T.amber,fontWeight:600,textTransform:'uppercase',letterSpacing:'0.05em',display:'flex',alignItems:'center',gap:5}}><Ico name="alert" size={13} color={T.amber}/>Common mistakes</span>
                <div style={{marginTop:6,fontSize:14,color:T.textSec,lineHeight:1.6}}>
                  {ex.mistakes.map((m,i)=><div key={i} style={{marginBottom:3}}>• {m}</div>)}
                </div>
              </div>
            )}
            {ex.stopIf && (
              <div style={{background:T.redBg,borderRadius:10,padding:'10px 14px',fontSize:13,color:T.red,marginBottom:14,display:'flex',gap:8,alignItems:'flex-start'}}>
                <Ico name="stop" size={15} color={T.red} style={{marginTop:1}}/><span><strong>Stop if:</strong> {ex.stopIf}</span>
              </div>
            )}
            {ex.hasTimer && <Timer seconds={ex.timerSec} label={ex.timerLabel} />}
          </div>
        </div>
      </div>
    </div>
  );
}
function MDetail({label,color,text,icon}){
  return(
    <div style={{marginBottom:14}}>
      <div style={{fontSize:11,color,fontWeight:600,textTransform:'uppercase',letterSpacing:'0.05em',marginBottom:4,display:'flex',alignItems:'center',gap:5}}>{icon&&<Ico name={icon} size={13} color={color}/>}{label}</div>
      <div style={{fontSize:14,color:T.textSec,lineHeight:1.6}}>{text}</div>
    </div>
  );
}

// ─── LIBRARY VIEW ─────────────────────────────────────────────────────────────
function LibRow({id,ex,onOpen}){
  const[failed,setFailed]=useState(false);
  return(
    <div onClick={()=>onOpen(id)}
      style={{display:'flex',alignItems:'center',gap:12,padding:'12px 14px',
        background:T.card,border:`1px solid ${T.border}`,borderRadius:14,
        marginBottom:8,cursor:'pointer'}}>
      {ex.imgs&&!failed?(
        <div style={{width:52,height:52,borderRadius:10,overflow:'hidden',flexShrink:0,background:T.surface}}>
          <img src={ex.imgs[0]} alt="" onError={()=>setFailed(true)} style={{width:'100%',height:'100%',objectFit:'cover'}}/>
        </div>
      ):(
        <div style={{width:52,height:52,borderRadius:10,background:ex.colorBg,flexShrink:0,display:'flex',alignItems:'center',justifyContent:'center'}}>
          <Ico name={CAT_ICON[ex.cat]} size={26} color={ex.color}/>
        </div>
      )}
      <div style={{flex:1,minWidth:0}}>
        <div style={{fontSize:14,fontWeight:600,color:T.text}}>{ex.name}</div>
        {ex.target&&<div style={{fontSize:12,color:T.textMuted,marginTop:2,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{ex.target}</div>}
      </div>
      <Ico name="chevronRight" size={16} color={T.textMuted}/>
    </div>
  );
}
function Library() {
  const [search, setSearch] = useState('');
  const [modal, setModal] = useState(null);
  const all = Object.entries(EX);
  const filtered = search
    ? all.filter(([,ex])=>ex.name.toLowerCase().includes(search.toLowerCase())||ex.target?.toLowerCase().includes(search.toLowerCase())||ex.cat.includes(search.toLowerCase()))
    : all;
  const grouped = Object.keys(CATS).map(cat=>({
    cat, meta:CATS[cat],
    items: filtered.filter(([,ex])=>ex.cat===cat),
  })).filter(g=>g.items.length>0);

  return (
    <div style={{padding:'0 16px'}}>
      <div style={{fontSize:17,fontWeight:800,marginBottom:12}}>Exercise Library</div>
      {/* Search */}
      <div style={{position:'relative',marginBottom:16}}>
        <span style={{position:'absolute',left:12,top:'50%',transform:'translateY(-50%)',display:'flex'}}><Ico name="search" size={16} color={T.textMuted}/></span>
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search exercises..."
          style={{width:'100%',background:T.card,border:`1px solid ${T.border}`,borderRadius:12,
            padding:'11px 12px 11px 38px',color:T.text,fontSize:14,outline:'none'}} />
        {search && <button onClick={()=>setSearch('')} style={{position:'absolute',right:8,top:'50%',transform:'translateY(-50%)',background:'none',border:'none',cursor:'pointer',display:'flex',padding:4}}><Ico name="x" size={14} color={T.textMuted}/></button>}
      </div>
      {grouped.map(({cat,meta,items})=>(
        <div key={cat} style={{marginBottom:20}}>
          <div style={{fontSize:13,fontWeight:700,color:meta.color,marginBottom:10,letterSpacing:'0.02em',display:'flex',alignItems:'center',gap:6}}><Ico name={CAT_ICON[cat]} size={15} color={meta.color}/>{meta.label}</div>
          {items.map(([id,ex])=><LibRow key={id} id={id} ex={ex} onOpen={setModal}/>)}
        </div>
      ))}
      {modal && <ExModal exId={modal} onClose={()=>setModal(null)} />}
    </div>
  );
}

// ─── TIMER ────────────────────────────────────────────────────────────────────
function Timer({seconds,label}){
  const[left,setLeft]=useState(seconds);const[running,setRunning]=useState(false);const ref=useRef(null);
  useEffect(()=>{if(running&&left>0){ref.current=setTimeout(()=>setLeft(l=>l-1),1000);}else if(left===0)setRunning(false);return()=>clearTimeout(ref.current);},[running,left]);
  const pct=((seconds-left)/seconds)*100;
  return(
    <div style={{display:'flex',alignItems:'center',gap:10,marginTop:10,padding:'8px 0'}}>
      <button onClick={()=>{if(left===0){setLeft(seconds);setRunning(true);}else setRunning(r=>!r);}}
        style={{width:44,height:44,borderRadius:'50%',border:'none',background:running?T.accentDark:T.accentBg,cursor:'pointer',flexShrink:0,display:'flex',alignItems:'center',justifyContent:'center'}}>
        <Ico name={left===0?'rotate':running?'pause':'play'} size={17} color={running?'#fff':T.accent}/>
      </button>
      <div style={{flex:1}}>
        <div style={{display:'flex',justifyContent:'space-between',marginBottom:4}}>
          <span style={{fontSize:11,color:T.textMuted,fontWeight:600,textTransform:'uppercase'}}>{label}</span>
          <span style={{fontSize:13,fontWeight:800,color:left<4&&running?T.amber:T.text,fontVariantNumeric:'tabular-nums'}}>{left}s</span>
        </div>
        <div style={{height:3,background:T.border,borderRadius:2}}>
          <div style={{width:`${pct}%`,height:'100%',background:T.accent,borderRadius:2,transition:'width 0.8s linear'}}/>
        </div>
      </div>
    </div>
  );
}

// ─── EXERCISE CARD (in-section) ───────────────────────────────────────────────
function ExCard({item,sectionId,completed,onToggle,onOpenModal}){
  const[open,setOpen]=useState(false);
  const ex=EX[item.id];
  const key=(item.id||item.label)+'_'+sectionId+'_'+(item.reps||'');
  if(!ex){
    return(
      <div onClick={()=>onToggle(key)} style={{display:'flex',alignItems:'center',gap:10,padding:'10px 14px',marginBottom:6,borderRadius:12,background:completed?T.greenBg:T.card,cursor:'pointer',border:`1px solid ${completed?T.green+'40':T.border}`}}>
        <Chk done={completed} color={T.green}/>
        <div style={{flex:1}}><div style={{fontSize:13,color:completed?T.textSec:T.text}}>{item.label}</div><div style={{fontSize:11,color:T.textMuted,marginTop:1}}>{item.reps}</div></div>
      </div>
    );
  }
  return(
    <div style={{borderRadius:14,border:`1px solid ${completed?ex.color+'50':T.border}`,background:completed?ex.colorBg:T.card,marginBottom:8,overflow:'hidden'}}>
      <div style={{display:'flex',alignItems:'center',padding:'12px 14px',gap:10}}>
        <div onClick={e=>{e.stopPropagation();onToggle(key);}}><Chk done={completed} color={ex.color}/></div>
        <Ico name={CAT_ICON[ex.cat]} size={20} color={ex.color}/>
        <div style={{flex:1,minWidth:0}} onClick={()=>setOpen(o=>!o)}>
          <div style={{fontSize:14,fontWeight:600,color:completed?T.textSec:T.text}}>{ex.name}</div>
          <div style={{fontSize:12,color:T.textMuted,marginTop:1}}>{[item.sets&&`${item.sets} sets`,item.reps,item.cue].filter(Boolean).join(' · ')}</div>
        </div>
        <button onClick={()=>onOpenModal(item.id)}
          style={{width:28,height:28,borderRadius:8,border:`1px solid ${T.border}`,background:T.surface,cursor:'pointer',flexShrink:0,display:'flex',alignItems:'center',justifyContent:'center'}} title="Full details">
          <Ico name="info" size={15} color={T.textSec}/>
        </button>
        <span onClick={()=>setOpen(o=>!o)} style={{display:'flex',transform:open?'rotate(180deg)':'none',transition:'transform 0.2s',cursor:'pointer'}}><Ico name="chevronDown" size={14} color={T.textMuted}/></span>
      </div>
      {open&&(
        <div style={{padding:'4px 14px 14px',borderTop:`1px solid ${T.border}`}}>
          <ExImg urls={ex.imgs} note={ex.imgNote}/>
          <InDetail label="Why" color={T.textMuted} text={ex.why}/>
          {ex.setup&&<InDetail label="Setup" color={T.accent} text={ex.setup}/>}
          {ex.feel&&<InDetail label="Feel" icon="checkCircle" color={T.green} text={ex.feel}/>}
          {ex.notFeel&&<InDetail label="Not feel" icon="xCircle" color={T.red} text={ex.notFeel}/>}
          {ex.mistakes?.length>0&&<div style={{marginBottom:8}}><span style={{fontSize:11,color:T.amber,fontWeight:600,textTransform:'uppercase',display:'flex',alignItems:'center',gap:4}}><Ico name="alert" size={12} color={T.amber}/>Mistakes</span><div style={{marginTop:3,fontSize:13,color:T.textSec}}>{ex.mistakes.map((m,i)=><div key={i}>• {m}</div>)}</div></div>}
          {ex.stopIf&&<div style={{background:T.redBg,borderRadius:8,padding:'7px 10px',fontSize:12,color:T.red,marginTop:8,display:'flex',gap:6,alignItems:'flex-start'}}><Ico name="stop" size={13} color={T.red} style={{marginTop:1}}/><span>Stop if: {ex.stopIf}</span></div>}
          {ex.hasTimer&&<Timer seconds={ex.timerSec} label={ex.timerLabel}/>}
        </div>
      )}
    </div>
  );
}
function Chk({done,color}){return(<div style={{width:22,height:22,borderRadius:7,border:`2px solid ${done?color:T.borderHigh}`,background:done?color:'transparent',flexShrink:0,cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center'}}>{done&&<Ico name="check" size={13} color="#000" sw={3.5}/>}</div>);}
function InDetail({label,color,text,icon}){return(<div style={{marginBottom:7,marginTop:7}}><span style={{fontSize:11,color,fontWeight:600,textTransform:'uppercase',letterSpacing:'0.04em',display:'inline-flex',alignItems:'center',gap:4}}>{icon&&<Ico name={icon} size={12} color={color}/>}{label}</span><div style={{marginTop:2,fontSize:13,color:T.textSec,lineHeight:1.5}}>{text}</div></div>);}

// ─── SECTION ──────────────────────────────────────────────────────────────────
function Section({id,items,completed,onToggle,onOpenModal,label,icon,time,note,defaultOpen}){
  const[open,setOpen]=useState(!!defaultOpen);
  const done=items.filter(e=>completed.has((e.id||e.label)+'_'+id+'_'+(e.reps||''))).length;
  const allDone=items.length>0&&done===items.length;
  return(
    <div style={{marginBottom:10}}>
      <div onClick={()=>setOpen(o=>!o)} style={{display:'flex',alignItems:'center',padding:'12px 16px',cursor:'pointer',borderRadius:13,background:allDone?T.greenBg:T.surface,border:`1px solid ${allDone?T.green+'40':T.border}`,gap:10}}>
        <Ico name={icon} size={20} color={allDone?T.green:T.textSec}/>
        <div style={{flex:1}}><div style={{fontSize:14,fontWeight:600,color:T.text}}>{label}</div><div style={{fontSize:12,color:T.textMuted}}>{time} · {done}/{items.length} done</div></div>
        {allDone&&<Ico name="check" size={16} color={T.green} sw={3}/>}
        <span style={{display:'flex',transform:open?'rotate(180deg)':'none',transition:'transform 0.2s'}}><Ico name="chevronDown" size={14} color={T.textMuted}/></span>
      </div>
      {open&&(
        <div style={{paddingTop:8,paddingLeft:4}}>
          {note&&<div style={{background:T.accentBg,borderLeft:`3px solid ${T.accent}`,borderRadius:'0 8px 8px 0',padding:'8px 12px',marginBottom:10,fontSize:13,color:T.textSec}}>{note}</div>}
          {items.map((item,i)=><ExCard key={i} item={item} sectionId={id} completed={completed.has((item.id||item.label)+'_'+id+'_'+(item.reps||''))} onToggle={onToggle} onOpenModal={onOpenModal}/>)}
        </div>
      )}
    </div>
  );
}

function Ring({pct,size=52}){
  const r=(size-5)/2,circ=2*Math.PI*r,dash=(pct/100)*circ;
  return(<svg width={size} height={size} style={{transform:'rotate(-90deg)',flexShrink:0}}><circle cx={size/2} cy={size/2} r={r} fill="none" stroke={T.border} strokeWidth={3.5}/><circle cx={size/2} cy={size/2} r={r} fill="none" stroke={pct===100?T.green:T.accent} strokeWidth={3.5} strokeDasharray={`${dash} ${circ}`} strokeLinecap="round" style={{transition:'stroke-dasharray 0.5s'}}/></svg>);
}

// ─── DAILY LOG SLIDER ─────────────────────────────────────────────────────────
function LogSlider({label,value,onChange,color}){
  return(
    <div style={{marginBottom:14}}>
      <div style={{display:'flex',justifyContent:'space-between',marginBottom:6}}>
        <span style={{fontSize:13,fontWeight:600}}>{label}</span>
        <span style={{fontSize:16,fontWeight:800,color}}>{value}/10</span>
      </div>
      <input type="range" min={0} max={10} value={value} onChange={e=>onChange(Number(e.target.value))} style={{accentColor:color,color}}/>
    </div>
  );
}

// ─── PROGRESS CHARTS ──────────────────────────────────────────────────────────
function PainTrack({progress,field,label}){
  return(
    <div style={{background:T.card,border:`1px solid ${T.border}`,borderRadius:16,padding:16,marginBottom:14}}>
      <div style={{fontSize:13,fontWeight:700,marginBottom:12}}>{label}</div>
      <div style={{display:'flex',alignItems:'flex-end',gap:2,height:52}}>
        {PLAN.map((_,i)=>{
          const d=i+1,v=progress[d]?.[field]||0,done=progress[d]?.done;
          const h=Math.max(3,(v/10)*52);
          const c=v<=2?T.green:v===3?T.amber:T.red;
          return <div key={d} style={{flex:1,height:h,background:done&&v>0?c:T.border,borderRadius:2,transition:'height 0.4s'}}/>;
        })}
      </div>
      <div style={{display:'flex',justifyContent:'space-between',marginTop:5,fontSize:9,color:T.textMuted}}>
        <span>W1</span><span>W2</span><span>W3</span><span>W4</span>
      </div>
    </div>
  );
}
function WeightTrack({progress}){
  const ws=PLAN.map((_,i)=>{const w=parseFloat(progress[i+1]?.bodyweight);return isNaN(w)?null:w;});
  const valid=ws.filter(w=>w!=null);
  const min=valid.length?Math.min(...valid):0,max=valid.length?Math.max(...valid):0,span=max-min||1;
  return(
    <div style={{background:T.card,border:`1px solid ${T.border}`,borderRadius:16,padding:16,marginBottom:14}}>
      <div style={{fontSize:13,fontWeight:700,marginBottom:12}}>Bodyweight</div>
      {valid.length<2?(
        <div style={{fontSize:13,color:T.textMuted,lineHeight:1.5}}>Log your bodyweight on at least two days to see the trend.</div>
      ):(
        <>
          <div style={{display:'flex',alignItems:'flex-end',gap:2,height:52}}>
            {ws.map((w,i)=>(
              <div key={i} style={{flex:1,height:w!=null?Math.max(4,((w-min)/span)*44+4):3,background:w!=null?T.accent:T.border,borderRadius:2,transition:'height 0.4s'}}/>
            ))}
          </div>
          <div style={{display:'flex',justifyContent:'space-between',marginTop:6,fontSize:11,color:T.textMuted}}>
            <span>{min} kg</span><span>{max} kg</span>
          </div>
        </>
      )}
    </div>
  );
}
function RefCard({title,titleColor,items}){
  return(
    <div style={{background:T.card,border:`1px solid ${T.border}`,borderRadius:16,padding:16,marginBottom:14}}>
      <div style={{fontSize:13,fontWeight:700,marginBottom:10,color:titleColor||T.text}}>{title}</div>
      {items.map((it,i)=><div key={i} style={{fontSize:13,color:T.textSec,marginBottom:5,lineHeight:1.5}}>• {it}</div>)}
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
const blankDay=()=>({completed:new Set(),shoulderPain:0,backPain:0,energy:5,bodyweight:'',worse:false,notes:'',done:false});

export default function App(){
  const[tab,setTab]=useState('today');
  const[viewDay,setViewDay]=useState(1);
  const[modal,setModal]=useState(null);
  const[theme,setTheme]=useState(()=>{try{return localStorage.getItem('kcr_theme')||'dark';}catch{return'dark';}});
  const[progress,setProgress]=useState(()=>{
    try{const s=localStorage.getItem('kcr_4wk');if(s){const p=JSON.parse(s);Object.keys(p).forEach(k=>{p[k].completed=new Set(p[k].completed||[]);});return p;}}catch{}return{};
  });
  useEffect(()=>{const s={};Object.keys(progress).forEach(k=>{s[k]={...progress[k],completed:[...(progress[k].completed||new Set())]};});localStorage.setItem('kcr_4wk',JSON.stringify(s));},[progress]);
  useEffect(()=>{
    document.body.style.cssText=`background:${T.bg};margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,sans-serif;color:${T.text};-webkit-font-smoothing:antialiased;transition:background 0.2s;`;
    const st=document.createElement('style');
    st.textContent=`body.theme-dark{--bg:#080810;--surface:#10101e;--card:#16162a;--cardHigh:#1e1e35;--border:rgba(148,163,184,0.1);--borderHigh:rgba(148,163,184,0.18);--text:#f1f5f9;--textSec:#94a3b8;--textMuted:#64748b}body.theme-light{--bg:#eef0f5;--surface:#ffffff;--card:#ffffff;--cardHigh:#eceff4;--border:rgba(100,116,139,0.2);--borderHigh:rgba(100,116,139,0.32);--text:#1a2030;--textSec:#566072;--textMuted:#94a0b2}*,*::before,*::after{box-sizing:border-box}::-webkit-scrollbar{display:none}input[type=range]{-webkit-appearance:none;height:4px;border-radius:2px;background:rgba(128,140,160,0.25);outline:none;width:100%}input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;width:20px;height:20px;border-radius:50%;background:currentColor;cursor:pointer}textarea{resize:none;outline:none}button{font-family:inherit}`;
    document.head.appendChild(st);return()=>st.remove();
  },[]);
  useEffect(()=>{
    document.body.classList.remove('theme-dark','theme-light');
    document.body.classList.add('theme-'+theme);
    try{localStorage.setItem('kcr_theme',theme);}catch{}
  },[theme]);

  const plan=PLAN[viewDay-1];
  const weekInfo=WEEK_INFO[plan.week-1];
  const dp=progress[viewDay]||blankDay();
  const totalItems=Object.values(plan.sections).flat().length;
  const pct=totalItems>0?Math.round((dp.completed.size/totalItems)*100):0;
  const toggleItem=key=>setProgress(prev=>{const d=prev[viewDay]||blankDay();const c=new Set(d.completed);c.has(key)?c.delete(key):c.add(key);return{...prev,[viewDay]:{...d,completed:c}};});
  const setField=(field,val)=>setProgress(prev=>({...prev,[viewDay]:{...(prev[viewDay]||blankDay()),[field]:val}}));
  const doneCount=Object.values(progress).filter(d=>d.done).length;
  const streak=(()=>{let s=0;for(let d=1;d<=PLAN.length;d++){if(progress[d]?.done)s++;else break;}return s;})();
  const latestWeight=(()=>{for(let d=PLAN.length;d>=1;d--){const w=progress[d]?.bodyweight;if(w)return w;}return null;})();

  const sectionMeta={
    primer:{label:'Daily Primer',icon:'flame',time:'6 min · before every session'},
    training:{label:'Training',icon:'dumbbell',time:'40–50 min',note:'Keep 2–3 reps in reserve — no training to failure.',defaultOpen:true},
    walk:{label:'Walk + Reset',icon:'walk',time:'easy pace',defaultOpen:true},
    pump:{label:'Optional Pump / Mobility',icon:'sparkle',time:'keep it easy',note:'Only if the shoulder and back feel good.',defaultOpen:true},
  };
  const painC=v=>v<=2?T.green:v===3?T.amber:T.red;
  const energyC=v=>v>=7?T.green:v>=4?T.amber:T.red;
  const typeColor={training:T.accent,walk:T.purple,pump:T.amber,rest:T.textMuted}[plan.type];
  const typeLabel={training:'Training',walk:'Active Recovery',pump:'Optional',rest:'Rest Day'}[plan.type];

  return(
    <div style={{maxWidth:480,margin:'0 auto',minHeight:'100vh',paddingBottom:80}}>
      <div style={{padding:'16px 20px 8px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <div>
          <div style={{fontSize:11,color:T.textMuted,fontWeight:600,textTransform:'uppercase',letterSpacing:'0.08em'}}>Return to Training</div>
          <div style={{fontSize:21,fontWeight:800,marginTop:2}}>4-Week Program</div>
        </div>
        <div style={{display:'flex',alignItems:'center',gap:8}}>
          <button onClick={()=>setTheme(t=>t==='dark'?'light':'dark')} aria-label="Toggle theme"
            style={{position:'relative',width:52,height:28,borderRadius:14,border:`1px solid ${T.border}`,background:T.cardHigh,cursor:'pointer',padding:0,flexShrink:0}}>
            <span style={{position:'absolute',left:theme==='dark'?3:25,top:2,width:22,height:22,borderRadius:'50%',background:T.accent,display:'flex',alignItems:'center',justifyContent:'center',transition:'left 0.2s'}}>
              <Ico name={theme==='dark'?'moon':'sun'} size={13} color="#fff"/>
            </span>
          </button>
          {streak>0&&<div style={{background:T.amberBg,border:`1px solid ${T.amber}40`,borderRadius:12,padding:'6px 12px',display:'flex',alignItems:'center',gap:5}}><Ico name="flame" size={16} color={T.amber}/><span style={{fontSize:15,fontWeight:800,color:T.amber}}>{streak}</span></div>}
        </div>
      </div>

      {tab==='today'&&(
        <div style={{padding:'0 16px'}}>
          <div style={{display:'flex',gap:6,overflowX:'auto',paddingBottom:10,paddingTop:4,scrollbarWidth:'none'}}>
            {PLAN.map((p,i)=>{const d=i+1,done=progress[d]?.done,isView=d===viewDay;return(<button key={d} onClick={()=>setViewDay(d)} style={{flexShrink:0,width:40,height:40,borderRadius:12,border:`2px solid ${isView?p.color:'transparent'}`,background:done?T.greenBg:isView?p.color+'20':T.card,color:isView?T.text:T.textSec,fontSize:13,fontWeight:isView?800:500,cursor:'pointer'}}>{done?'✓':d}</button>);})}
          </div>
          <div style={{background:T.card,border:`1px solid ${T.border}`,borderRadius:18,padding:18,marginBottom:12}}>
            <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',gap:12}}>
              <div style={{flex:1}}>
                <div style={{fontSize:11,color:typeColor,fontWeight:700,textTransform:'uppercase',letterSpacing:'0.06em',marginBottom:4}}>Week {plan.week} · {plan.dow} · {typeLabel}</div>
                <div style={{fontSize:22,fontWeight:800,lineHeight:1.15}}>{plan.title}</div>
                <div style={{fontSize:14,color:T.textSec,marginTop:2}}>{plan.sub}</div>
              </div>
              <div style={{textAlign:'center',flexShrink:0}}><Ring pct={pct}/><div style={{fontSize:11,color:pct===100?T.green:T.textMuted,fontWeight:700,marginTop:2}}>{pct}%</div></div>
            </div>
            <div style={{marginTop:12,padding:'10px 12px',background:T.accentBg,borderRadius:10,fontSize:13,color:T.textSec,lineHeight:1.5,display:'flex',gap:8,alignItems:'flex-start'}}><Ico name="target" size={15} color={T.accent} style={{marginTop:1}}/><span>{plan.goal}</span></div>
            <div style={{marginTop:8,padding:'10px 12px',background:T.purpleBg,borderRadius:10,fontSize:13,color:T.purple,lineHeight:1.5,display:'flex',gap:8,alignItems:'flex-start'}}><Ico name="trend" size={15} color={T.purple} style={{marginTop:1}}/><span><strong>Week {plan.week} — {weekInfo.theme}.</strong> {weekInfo.note}</span></div>
            {plan.note&&<div style={{marginTop:8,padding:'8px 12px',background:T.amberBg,borderRadius:10,fontSize:13,color:T.amber,lineHeight:1.4,display:'flex',gap:8,alignItems:'flex-start'}}><Ico name="pin" size={15} color={T.amber} style={{marginTop:1}}/><span>{plan.note}</span></div>}
            <div style={{marginTop:14}}>
              <div style={{display:'flex',justifyContent:'space-between',fontSize:12,color:T.textMuted,marginBottom:5}}><span>Day progress</span><span style={{fontWeight:700,color:pct===100?T.green:T.text}}>{dp.completed.size}/{totalItems} items</span></div>
              <div style={{height:4,background:T.border,borderRadius:2}}><div style={{width:`${pct}%`,height:'100%',background:pct===100?T.green:T.accent,borderRadius:2,transition:'width 0.4s'}}/></div>
            </div>
          </div>
          {Object.entries(plan.sections).map(([sid,items])=>{const m=sectionMeta[sid];if(!m)return null;return(<Section key={sid} id={sid} items={items} completed={dp.completed} onToggle={toggleItem} onOpenModal={setModal} label={m.label} icon={m.icon} time={m.time} note={m.note} defaultOpen={m.defaultOpen}/>);})}
          <div style={{background:T.card,border:`1px solid ${T.border}`,borderRadius:16,padding:16,marginTop:4,marginBottom:16}}>
            <div style={{fontSize:13,fontWeight:700,marginBottom:14}}>Daily Log</div>
            <LogSlider label="Shoulder Pain" value={dp.shoulderPain} color={painC(dp.shoulderPain)} onChange={v=>setField('shoulderPain',v)}/>
            <LogSlider label="Back / Hip Pain" value={dp.backPain} color={painC(dp.backPain)} onChange={v=>setField('backPain',v)}/>
            <LogSlider label="Energy" value={dp.energy} color={energyC(dp.energy)} onChange={v=>setField('energy',v)}/>
            <div style={{marginBottom:14}}>
              <div style={{fontSize:13,fontWeight:600,marginBottom:6}}>Bodyweight</div>
              <div style={{display:'flex',alignItems:'center',gap:8}}>
                <input type="number" inputMode="decimal" value={dp.bodyweight} placeholder="—" onChange={e=>setField('bodyweight',e.target.value)} style={{flex:1,background:T.cardHigh,border:`1px solid ${T.border}`,borderRadius:10,padding:'10px 12px',color:T.text,fontSize:14,outline:'none'}}/>
                <span style={{fontSize:13,color:T.textMuted}}>kg</span>
              </div>
            </div>
            <div style={{marginBottom:14}}>
              <div style={{fontSize:13,fontWeight:600,marginBottom:6}}>Symptoms worse this morning?</div>
              <div style={{display:'flex',gap:8}}>
                {[['No',false],['Yes',true]].map(([lbl,val])=>{const sel=dp.worse===val;const ac=val?T.red:T.green;return(
                  <button key={lbl} onClick={()=>setField('worse',val)} style={{flex:1,padding:'10px',borderRadius:10,border:`1px solid ${sel?ac:T.border}`,background:sel?(val?T.redBg:T.greenBg):'transparent',color:sel?ac:T.textSec,fontSize:13,fontWeight:700,cursor:'pointer'}}>{lbl}</button>
                );})}
              </div>
            </div>
            <div style={{marginBottom:14}}>
              <div style={{fontSize:13,fontWeight:600,marginBottom:6}}>Notes</div>
              <textarea value={dp.notes||''} rows={3} placeholder="How did it feel today? Any observations..." onChange={e=>setField('notes',e.target.value)} style={{width:'100%',background:T.cardHigh,border:`1px solid ${T.border}`,borderRadius:10,padding:'10px 12px',color:T.text,fontSize:13,lineHeight:1.5}}/>
            </div>
            <button onClick={()=>setField('done',!dp.done)} style={{width:'100%',padding:14,borderRadius:12,border:dp.done?`1px solid ${T.green}40`:'none',background:dp.done?T.greenBg:T.accentDark,color:dp.done?T.green:'#fff',fontSize:14,fontWeight:700,cursor:'pointer'}}>
              {dp.done?'✓ Day Complete — tap to undo':'Mark Day Complete'}
            </button>
          </div>
        </div>
      )}

      {tab==='library'&&<Library/>}

      {tab==='timeline'&&(
        <div style={{padding:'0 16px'}}>
          <div style={{fontSize:17,fontWeight:800,marginBottom:14}}>4-Week Plan</div>
          {WEEK_INFO.map((wi,w)=>(
            <div key={w} style={{marginBottom:20}}>
              <div style={{fontSize:11,color:T.textMuted,fontWeight:600,textTransform:'uppercase',letterSpacing:'0.06em',marginBottom:10}}>Week {w+1} — {wi.theme}</div>
              {PLAN.slice(w*7,w*7+7).map(p=>{const done=progress[p.day]?.done;const ti={training:'dumbbell',walk:'walk',pump:'sparkle',rest:'moon'}[p.type];return(
                <div key={p.day} onClick={()=>{setViewDay(p.day);setTab('today');}} style={{display:'flex',alignItems:'center',gap:12,padding:'12px 14px',background:p.day===viewDay?T.accentBg:T.card,border:`1px solid ${p.day===viewDay?T.accent+'40':done?T.green+'30':T.border}`,borderRadius:14,marginBottom:8,cursor:'pointer'}}>
                  <div style={{width:36,height:36,borderRadius:10,flexShrink:0,background:done?T.greenBg:T.surface,border:`1px solid ${done?T.green+'40':T.border}`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:done?15:13,fontWeight:800,color:done?T.green:T.textSec}}>{done?'✓':p.day}</div>
                  <div style={{flex:1}}><div style={{fontSize:14,fontWeight:600}}>{p.dow} — {p.title}</div><div style={{fontSize:12,color:T.textSec,marginTop:1,display:'flex',alignItems:'center',gap:5}}><Ico name={ti} size={13} color={T.textSec}/>{p.sub}</div></div>
                  <span style={{color:T.textMuted,fontSize:14}}>›</span>
                </div>
              );})}
            </div>
          ))}
        </div>
      )}

      {tab==='progress'&&(
        <div style={{padding:'0 16px'}}>
          <div style={{fontSize:17,fontWeight:800,marginBottom:14}}>Your Progress</div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:10,marginBottom:16}}>
            {[{val:`${doneCount}/${PLAN.length}`,label:'Days Done',color:T.green},{val:<span style={{display:'inline-flex',alignItems:'center',gap:4}}>{streak}<Ico name="flame" size={17} color={T.amber}/></span>,label:'Streak',color:T.amber},{val:latestWeight?`${latestWeight}kg`:'—',label:'Bodyweight',color:T.accent}].map(s=>(
              <div key={s.label} style={{background:T.card,border:`1px solid ${T.border}`,borderRadius:14,padding:'14px 8px',textAlign:'center'}}><div style={{fontSize:20,fontWeight:900,color:s.color,display:'flex',justifyContent:'center'}}>{s.val}</div><div style={{fontSize:11,color:T.textMuted,marginTop:3}}>{s.label}</div></div>
            ))}
          </div>
          <PainTrack progress={progress} field="shoulderPain" label="Shoulder Pain"/>
          <PainTrack progress={progress} field="backPain" label="Back / Hip Pain"/>
          <WeightTrack progress={progress}/>
          {RULES.map(r=><RefCard key={r.label} title={`Rules — ${r.label}`} titleColor={r.color} items={r.items}/>)}
          {SUBS.map(s=><RefCard key={s.when} title={s.when} titleColor={s.color} items={s.swaps}/>)}
          <RefCard title="Bulking & Nutrition" titleColor={T.accent} items={NUTRITION}/>
          <div style={{background:T.greenBg,border:`1px solid ${T.green}30`,borderRadius:16,padding:16,marginBottom:24}}>
            <div style={{fontSize:13,fontWeight:700,color:T.green,marginBottom:10,display:'flex',alignItems:'center',gap:6}}><Ico name="target" size={15} color={T.green}/>The 4-Week Goal</div>
            {GOAL.map((g,i)=><div key={i} style={{fontSize:13,color:T.textSec,marginBottom:5,lineHeight:1.5}}>• {g}</div>)}
          </div>
        </div>
      )}

      {modal&&<ExModal exId={modal} onClose={()=>setModal(null)}/>}

      <div style={{position:'fixed',bottom:0,left:'50%',transform:'translateX(-50%)',width:'100%',maxWidth:480,background:T.surface,borderTop:`1px solid ${T.border}`,display:'flex',padding:'8px 0',zIndex:99}}>
        {[{id:'today',label:'Today',icon:'today'},{id:'library',label:'Library',icon:'library'},{id:'timeline',label:'Timeline',icon:'timeline'},{id:'progress',label:'Progress',icon:'progress'}].map(t=>(
          <button key={t.id} onClick={()=>setTab(t.id)} style={{flex:1,background:'none',border:'none',cursor:'pointer',padding:'5px 0',display:'flex',flexDirection:'column',alignItems:'center',gap:4}}>
            <Ico name={t.icon} size={21} color={tab===t.id?T.accent:T.textMuted}/>
            <span style={{fontSize:11,color:tab===t.id?T.accent:T.textMuted,fontWeight:tab===t.id?700:400}}>{t.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
