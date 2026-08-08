// Asana reference data.
//
// THE HOMEPAGE DOES NOT READ THIS FILE. app/page.js fetches from PostgreSQL.
// This file is the input to prisma/seed.js, which loads these poses into the
// database. Keeping it means the database can be rebuilt from scratch at any
// time with `npm run db:seed`.
//
// The keys below match the columns of the Asana model in prisma/schema.prisma.
//
// CONTENT RULES — please keep these when adding poses:
//   - Concise, practical, factual.
//   - Benefits describe what a pose does for the body, not what it cures.
//     "Strengthens the legs" is fine. "Cures back pain" is not.
//   - Contraindications say "avoid" or "seek guidance", never "treats".
//   - Nothing here is medical advice.

const asanas = [
  {
    id: 1,
    slug: "tadasana",
    name: "Tadasana",
    englishName: "Mountain Pose",
    level: "Beginner",
    category: "Standing",
    description:
      "The foundation of all standing poses. You stand tall and still, grounding through both feet while lengthening upward through the crown of the head.",
    benefits: [
      "Improves posture",
      "Strengthens thighs and ankles",
      "Builds body awareness",
      "Establishes alignment used in every other standing pose",
    ],
    steps: [
      "Stand with your feet hip-width apart, or with the big toes touching if that feels steady.",
      "Spread your weight evenly between the heels and the balls of both feet.",
      "Engage your thigh muscles gently without locking the knees.",
      "Lengthen your tailbone down and draw the lower ribs in slightly.",
      "Roll the shoulders back and down, arms relaxed alongside the body.",
      "Lift through the crown of the head and soften the face and jaw.",
    ],
    breathing:
      "Breathe evenly through the nose throughout. Let each inhale lengthen the spine slightly and each exhale settle the shoulders and feet.",
    duration: "30–60 seconds, or 5–8 slow breaths",
    bodyAreas: ["Feet and ankles", "Thighs", "Core", "Spine", "Shoulders"],
    commonMistakes: [
      "Locking the knees back hard instead of keeping them soft",
      "Letting the ribs flare forward, which arches the lower back",
      "Tensing the shoulders up towards the ears",
    ],
    beginnerTips: [
      "Stand with your back near a wall to feel where your spine sits.",
      "Take the feet hip-width apart rather than together for a wider base.",
      "Close the eyes only once you feel steady with them open.",
    ],
    precautions: [
      "Come out of the pose if you feel light-headed.",
      "Keep the knees soft rather than pressed backwards.",
    ],
    contraindications: [
      "Practise near a wall or chair if you have low blood pressure or dizziness.",
      "Seek guidance from a teacher if you have a balance disorder.",
    ],
  },
  {
    id: 2,
    slug: "vrikshasana",
    name: "Vrikshasana",
    englishName: "Tree Pose",
    level: "Beginner",
    category: "Balancing",
    description:
      "A one-legged balancing pose. The sole of one foot rests on the opposite inner thigh or calf while the hands meet at the heart or reach overhead.",
    benefits: [
      "Improves balance",
      "Strengthens legs",
      "Calms and focuses the mind",
      "Builds ankle and foot stability",
    ],
    steps: [
      "Begin standing tall with the weight even in both feet.",
      "Shift your weight onto the left foot and find a steady gaze point ahead.",
      "Bend the right knee and place the sole of the right foot on the inner left calf or inner thigh.",
      "Avoid resting the foot directly against the side of the knee.",
      "Press the foot and the standing leg into each other to create stability.",
      "Bring the palms together at the chest, or reach the arms overhead.",
      "Hold, then lower with control and repeat on the other side.",
    ],
    breathing:
      "Breathe slowly and evenly through the nose. Balance is easier when the breath stays smooth, so if it becomes short, lower the foot and rebuild the pose.",
    duration: "20–45 seconds on each side",
    bodyAreas: ["Ankles", "Calves", "Thighs", "Hips", "Core"],
    commonMistakes: [
      "Pressing the lifted foot into the side of the standing knee",
      "Letting the standing hip push out to the side",
      "Holding the breath while concentrating",
    ],
    beginnerTips: [
      "Start with the toes of the lifted foot still touching the floor.",
      "Rest a hand on a wall or chair back until balance improves.",
      "Fix your eyes on a still point at eye level — a moving gaze makes balance harder.",
    ],
    precautions: [
      "Practise on a firm, level surface rather than a soft mat edge.",
      "Step out of the pose rather than falling out of it.",
    ],
    contraindications: [
      "Avoid or use wall support if you have a knee or ankle injury.",
      "Practise with support if you experience dizziness or vertigo.",
    ],
  },
  {
    id: 3,
    slug: "bhujangasana",
    name: "Bhujangasana",
    englishName: "Cobra Pose",
    level: "Beginner",
    category: "Backbend",
    description:
      "A gentle backbend done lying face down. The chest lifts away from the floor while the hips and legs stay grounded.",
    benefits: [
      "Opens the chest and front of the shoulders",
      "Strengthens the muscles along the spine",
      "Eases stiffness in the mid and lower back",
      "Encourages fuller, easier breathing",
    ],
    steps: [
      "Lie face down with the legs straight and the tops of the feet on the floor.",
      "Place the hands under the shoulders with the elbows tucked close to the ribs.",
      "Press the pubic bone, thighs and feet lightly into the floor.",
      "Inhale and peel the chest away from the floor, leading with the breastbone.",
      "Keep a slight bend in the elbows and the shoulders drawing away from the ears.",
      "Look forward rather than throwing the head back.",
      "Exhale and lower slowly, one vertebra at a time.",
    ],
    breathing:
      "Inhale as you lift the chest, breathe steadily while you hold, and exhale as you lower. Never hold the breath at the top of the lift.",
    duration: "15–30 seconds, repeated 2–3 times",
    bodyAreas: ["Lower back", "Mid back", "Chest", "Shoulders", "Abdomen"],
    commonMistakes: [
      "Pushing up with the arms until the elbows lock, which compresses the lower back",
      "Letting the shoulders creep up towards the ears",
      "Tipping the head far back and pinching the neck",
    ],
    beginnerTips: [
      "Lift only a few inches at first — height is not the goal.",
      "Keep more weight in the legs and less in the hands.",
      "Widen the legs slightly if the lower back feels compressed.",
    ],
    precautions: [
      "Come down if you feel any pinching in the lower back.",
      "Keep the back of the neck long rather than crunched.",
    ],
    contraindications: [
      "Avoid during pregnancy.",
      "Avoid with recent abdominal, back or wrist surgery.",
      "Practise only with professional guidance if you have a diagnosed disc condition.",
    ],
  },
  {
    id: 4,
    slug: "balasana",
    name: "Balasana",
    englishName: "Child's Pose",
    level: "Beginner",
    category: "Resting",
    description:
      "A folded resting pose. The hips sink toward the heels and the forehead rests on the mat. Used as a pause between harder poses.",
    benefits: [
      "Releases the back and hips",
      "Relieves stress and mental fatigue",
      "Slows and deepens the breath",
      "Provides a safe resting point in any sequence",
    ],
    steps: [
      "Kneel on the mat with the big toes touching and the knees together or wide apart.",
      "Sit your hips back towards the heels.",
      "Walk the hands forward and lower the torso between or over the thighs.",
      "Rest the forehead on the mat, a block or stacked hands.",
      "Let the arms extend forward, or lay them back alongside the body.",
      "Soften the jaw, shoulders and belly, and stay as long as is comfortable.",
    ],
    breathing:
      "Breathe slowly into the back of the ribcage. Feel the back body widen with each inhale and settle with each exhale.",
    duration: "1–3 minutes, or any time a rest is needed",
    bodyAreas: ["Lower back", "Hips", "Thighs", "Ankles", "Shoulders"],
    commonMistakes: [
      "Forcing the hips down to the heels when the thighs are tight",
      "Straining the neck by not supporting the forehead",
      "Holding tension in the shoulders instead of letting them drop",
    ],
    beginnerTips: [
      "Place a folded blanket between the calves and thighs if the knees feel tight.",
      "Take the knees as wide as the mat to give the belly more room.",
      "Rest the forehead on a block or on your stacked fists if it does not reach the floor.",
    ],
    precautions: [
      "Use padding under the knees on a hard floor.",
      "Come out slowly to avoid light-headedness.",
    ],
    contraindications: [
      "Take the knees wide or skip the pose during pregnancy.",
      "Avoid with a recent knee or ankle injury.",
      "Seek guidance if you have had recent abdominal surgery.",
    ],
  },
  {
    id: 5,
    slug: "adho-mukha-svanasana",
    name: "Adho Mukha Svanasana",
    englishName: "Downward-Facing Dog",
    level: "Intermediate",
    category: "Inversion",
    description:
      "An inverted V shape with hands and feet on the mat and hips lifted high. One of the most recognised poses in modern yoga.",
    benefits: [
      "Stretches hamstrings and calves",
      "Strengthens arms and shoulders",
      "Lengthens the spine",
      "Energises the whole body",
    ],
    steps: [
      "Start on hands and knees, wrists under shoulders and knees under hips.",
      "Spread the fingers wide and press evenly through the whole hand.",
      "Tuck the toes under and lift the knees away from the floor.",
      "Send the hips up and back, straightening the legs only as far as is comfortable.",
      "Let the head hang between the upper arms with the neck relaxed.",
      "Press the floor away and draw the shoulder blades down the back.",
    ],
    breathing:
      "Breathe steadily through the nose. Use the exhale to send the hips higher and the inhale to lengthen through the spine.",
    duration: "30–60 seconds, or 5–8 breaths",
    bodyAreas: [
      "Hamstrings",
      "Calves",
      "Shoulders",
      "Wrists",
      "Spine",
    ],
    commonMistakes: [
      "Rounding the upper back in an effort to straighten the legs",
      "Putting all the weight into the wrists instead of the whole hand",
      "Letting the head hang with tension in the neck and jaw",
    ],
    beginnerTips: [
      "Keep the knees generously bent — a long spine matters more than straight legs.",
      "Lift the heels off the floor rather than forcing them down.",
      "Walk the feet slightly wider apart for more room in the hips.",
    ],
    precautions: [
      "Come down if the wrists begin to ache.",
      "Avoid staying long if you feel pressure building in the head.",
    ],
    contraindications: [
      "Avoid with carpal tunnel syndrome or a recent wrist injury.",
      "Avoid with uncontrolled high blood pressure or glaucoma.",
      "Seek guidance in late pregnancy or after shoulder surgery.",
    ],
  },
  {
    id: 6,
    slug: "trikonasana",
    name: "Trikonasana",
    englishName: "Triangle Pose",
    level: "Intermediate",
    category: "Standing",
    description:
      "A wide-legged standing pose where the torso tilts sideways, one hand reaching down toward the shin and the other lifting toward the sky.",
    benefits: [
      "Stretches the side body and hamstrings",
      "Opens the hips and chest",
      "Improves stability and coordination",
      "Strengthens the legs",
    ],
    steps: [
      "Step the feet about a leg's length apart.",
      "Turn the right foot out 90 degrees and angle the left foot slightly inward.",
      "Extend the arms out to the sides at shoulder height.",
      "Reach actively over the right leg, then tilt from the hip rather than the waist.",
      "Lower the right hand to the shin, a block or the floor.",
      "Extend the left arm straight up and turn the chest open towards the ceiling.",
      "Press down through both feet, then rise on an inhale and change sides.",
    ],
    breathing:
      "Inhale to lengthen and reach, exhale as you tilt into the pose. Keep breathing into the upper side of the ribcage while you hold.",
    duration: "30–45 seconds on each side",
    bodyAreas: ["Hamstrings", "Hips", "Side body", "Shoulders", "Neck"],
    commonMistakes: [
      "Collapsing weight into the lower hand",
      "Rounding the spine forward instead of tilting sideways",
      "Locking the front knee firmly back",
    ],
    beginnerTips: [
      "Rest the lower hand on a block or the shin instead of the floor.",
      "Practise with the back heel against a wall for a clearer sense of alignment.",
      "Look straight ahead instead of up if the neck feels strained.",
    ],
    precautions: [
      "Keep a micro-bend in the front knee.",
      "Do not force the lower hand to the floor.",
    ],
    contraindications: [
      "Avoid with a recent neck, shoulder or hip injury.",
      "Look forward rather than upward if you have neck problems.",
      "Practise with support if you have low blood pressure.",
    ],
  },
  {
    id: 7,
    slug: "utkatasana",
    name: "Utkatasana",
    englishName: "Chair Pose",
    level: "Beginner",
    category: "Standing",
    description:
      "A standing pose that mimics sitting back into an invisible chair, with the arms reaching overhead and the weight settled into the heels.",
    benefits: [
      "Strengthens thighs, hips and calves",
      "Builds endurance in the legs",
      "Strengthens the muscles supporting the spine",
      "Improves ankle stability",
    ],
    steps: [
      "Stand with the feet hip-width apart and the arms by your sides.",
      "Bend the knees and sit the hips back as though lowering onto a chair.",
      "Shift the weight into the heels until you can wiggle the toes.",
      "Draw the lower ribs in so the lower back does not arch sharply.",
      "Reach the arms forward and up, keeping the shoulders relaxed.",
      "Hold, then press down through the feet and straighten the legs to come out.",
    ],
    breathing:
      "Inhale as the arms rise, then breathe steadily while holding. The legs will want you to hold your breath — keep it moving instead.",
    duration: "20–40 seconds, repeated 2–3 times",
    bodyAreas: ["Quadriceps", "Glutes", "Calves", "Ankles", "Upper back"],
    commonMistakes: [
      "Letting the knees travel far past the toes",
      "Arching the lower back sharply as the arms lift",
      "Lifting the heels off the floor",
    ],
    beginnerTips: [
      "Sit back only a few inches at first and build depth over time.",
      "Keep the hands at the chest instead of overhead if the shoulders tire.",
      "Practise with your back against a wall to feel the sitting-back action.",
    ],
    precautions: [
      "Ease out of the pose if the knees ache.",
      "Keep the weight in the heels rather than the front of the foot.",
    ],
    contraindications: [
      "Avoid with a recent knee, hip or ankle injury.",
      "Keep the arms low if you have a shoulder injury.",
      "Practise with care if you have low blood pressure.",
    ],
  },
  {
    id: 8,
    slug: "uttanasana",
    name: "Uttanasana",
    englishName: "Standing Forward Fold",
    level: "Beginner",
    category: "Forward Bend",
    description:
      "A standing forward bend where the torso folds over the legs and the head hangs freely towards the floor.",
    benefits: [
      "Stretches the hamstrings and calves",
      "Releases tension in the neck and shoulders",
      "Lengthens the spine",
      "Has a settling, quieting effect",
    ],
    steps: [
      "Stand with the feet hip-width apart and the knees slightly bent.",
      "Inhale and lengthen the spine upwards.",
      "Exhale and fold forward from the hip joints, not the waist.",
      "Let the hands rest on the floor, on blocks, or hold opposite elbows.",
      "Let the head and neck hang heavy and completely relaxed.",
      "To come up, bend the knees generously and roll up slowly.",
    ],
    breathing:
      "Exhale as you fold. While holding, breathe into the back of the ribs and let each exhale release the neck a little further.",
    duration: "30–60 seconds, or 5–8 breaths",
    bodyAreas: ["Hamstrings", "Calves", "Lower back", "Neck", "Spine"],
    commonMistakes: [
      "Straightening the legs forcefully and rounding the lower back",
      "Locking the knees",
      "Coming up quickly with a straight back and a rounded spine",
    ],
    beginnerTips: [
      "Keep the knees clearly bent — depth in the fold is not the point.",
      "Rest the hands on blocks or a chair seat to reduce strain.",
      "Take the feet hip-width or wider for more space.",
    ],
    precautions: [
      "Rise slowly to avoid light-headedness.",
      "Stop folding at the point where the lower back starts to round sharply.",
    ],
    contraindications: [
      "Avoid or bend the knees deeply with a lower back or hamstring injury.",
      "Practise with care if you have low blood pressure or get dizzy easily.",
      "Avoid a full fold with glaucoma or recent eye surgery.",
    ],
  },
  {
    id: 9,
    slug: "virabhadrasana-i",
    name: "Virabhadrasana I",
    englishName: "Warrior I",
    level: "Intermediate",
    category: "Standing",
    description:
      "A strong standing lunge with the back foot turned in, the hips facing forward and the arms reaching overhead.",
    benefits: [
      "Strengthens the legs, hips and ankles",
      "Opens the chest and the front of the hips",
      "Builds stamina and focus",
      "Strengthens the shoulders",
    ],
    steps: [
      "From standing, step the left foot back about a leg's length.",
      "Turn the left foot out to roughly 45 degrees and press the whole sole down.",
      "Bend the right knee towards a right angle, keeping it above the ankle.",
      "Draw the left hip forward and the right hip back so the pelvis faces the front.",
      "Inhale and reach both arms overhead, palms facing each other.",
      "Lift through the chest without jamming the lower back.",
      "Hold, then straighten the front leg and change sides.",
    ],
    breathing:
      "Inhale as the arms lift, then keep the breath long and even. Let each exhale settle the back foot more firmly into the floor.",
    duration: "30–45 seconds on each side",
    bodyAreas: ["Quadriceps", "Glutes", "Hip flexors", "Chest", "Shoulders"],
    commonMistakes: [
      "Letting the front knee drift inward past the big toe",
      "Arching the lower back sharply as the arms reach up",
      "Lifting the outer edge of the back foot off the floor",
    ],
    beginnerTips: [
      "Take the feet slightly wider apart, as if standing on train tracks rather than a tightrope.",
      "Keep the hands on the hips if the shoulders or lower back complain.",
      "Shorten the stance until the back heel can stay down.",
    ],
    precautions: [
      "Track the front knee towards the middle toes.",
      "Keep the ribs drawing in to protect the lower back.",
    ],
    contraindications: [
      "Avoid with a recent knee, hip or shoulder injury.",
      "Keep the arms low if you have high blood pressure.",
      "Practise with a shorter stance if you have balance difficulties.",
    ],
  },
  {
    id: 10,
    slug: "virabhadrasana-ii",
    name: "Virabhadrasana II",
    englishName: "Warrior II",
    level: "Beginner",
    category: "Standing",
    description:
      "A wide-legged standing pose with the front knee bent, the hips open to the side and the arms extended in opposite directions.",
    benefits: [
      "Strengthens the legs and ankles",
      "Opens the hips and inner thighs",
      "Builds stamina and concentration",
      "Strengthens the shoulders and upper back",
    ],
    steps: [
      "Step the feet wide apart, about a leg's length.",
      "Turn the right foot out 90 degrees and angle the left foot slightly in.",
      "Line the right heel up roughly with the arch of the left foot.",
      "Bend the right knee towards a right angle, keeping it over the ankle.",
      "Extend the arms out at shoulder height, palms facing down.",
      "Turn the head to look over the right fingertips, keeping the torso upright.",
      "Hold, then straighten the front leg and repeat on the other side.",
    ],
    breathing:
      "Breathe evenly and without strain. Use each exhale to sink a little lower and each inhale to lengthen the spine upwards.",
    duration: "30–45 seconds on each side",
    bodyAreas: ["Quadriceps", "Inner thighs", "Glutes", "Shoulders", "Ankles"],
    commonMistakes: [
      "Letting the front knee collapse inward",
      "Leaning the torso forward over the front leg",
      "Hitching the shoulders up towards the ears",
    ],
    beginnerTips: [
      "Bend the front knee less deeply to begin with.",
      "Shorten the stance if the hips feel unstable.",
      "Rest the hands on the hips if the shoulders tire before the legs do.",
    ],
    precautions: [
      "Keep the front knee pointing in the same direction as the middle toes.",
      "Stay upright rather than leaning over the front thigh.",
    ],
    contraindications: [
      "Avoid with a recent knee or hip injury.",
      "Lower the arms if you have a shoulder injury or high blood pressure.",
      "Shorten the stance if you have balance difficulties.",
    ],
  },
  {
    id: 11,
    slug: "virabhadrasana-iii",
    name: "Virabhadrasana III",
    englishName: "Warrior III",
    level: "Intermediate",
    category: "Balancing",
    description:
      "A standing balance where the body forms a horizontal line over one straight leg, with the other leg extending back behind you.",
    benefits: [
      "Strengthens the standing leg, ankle and glutes",
      "Strengthens the muscles along the back",
      "Improves balance and coordination",
      "Builds core stability",
    ],
    steps: [
      "Stand tall and shift the weight onto the right foot.",
      "Place the hands on the hips and find a steady gaze point on the floor ahead.",
      "Hinge forward from the hip as the left leg lifts behind you.",
      "Stop when the torso and lifted leg are roughly parallel to the floor.",
      "Keep the hips level — resist letting the lifted hip open upward.",
      "Extend the arms back alongside the body, or forward past the ears.",
      "Lower with control and repeat on the other side.",
    ],
    breathing:
      "Breathe steadily through the nose. If the breath becomes short or ragged, lower the leg — that is the signal you have gone past your steady range.",
    duration: "15–30 seconds on each side",
    bodyAreas: ["Glutes", "Hamstrings", "Core", "Upper back", "Ankles"],
    commonMistakes: [
      "Letting the hip of the lifted leg rotate open towards the ceiling",
      "Locking the standing knee",
      "Lifting the head and looking forward, which unbalances the neck",
    ],
    beginnerTips: [
      "Rest the hands on a wall or a chair back at hip height for support.",
      "Keep the toes of the lifted leg lightly touching the floor at first.",
      "Keep the standing knee softly bent.",
    ],
    precautions: [
      "Keep the gaze down to protect the neck.",
      "Come out of the pose slowly rather than dropping out of it.",
    ],
    contraindications: [
      "Avoid with a recent ankle, knee or lower back injury.",
      "Use wall support if you have balance difficulties or low blood pressure.",
      "Practise with guidance during pregnancy.",
    ],
  },
  {
    id: 12,
    slug: "parsvakonasana",
    name: "Parsvakonasana",
    englishName: "Extended Side Angle Pose",
    level: "Intermediate",
    category: "Standing",
    description:
      "A wide-legged pose where the torso extends over a bent front leg, creating one long line from the back heel to the top hand.",
    benefits: [
      "Stretches the side body and inner thighs",
      "Strengthens the legs and ankles",
      "Opens the hips and chest",
      "Improves stamina",
    ],
    steps: [
      "Set up as for Warrior II, with the right knee bent over the right ankle.",
      "Lower the right forearm onto the right thigh, or take the right hand to a block outside the foot.",
      "Press the right knee gently back into the arm to keep it tracking correctly.",
      "Extend the left arm over the ear, palm facing down.",
      "Reach from the back heel all the way through the top fingertips.",
      "Turn the chest open towards the ceiling and hold.",
      "Press into the feet to rise, then change sides.",
    ],
    breathing:
      "Exhale as you extend over the front leg. Breathe into the lifted side of the ribcage, which is being lengthened by the shape.",
    duration: "30–45 seconds on each side",
    bodyAreas: ["Inner thighs", "Quadriceps", "Side body", "Shoulders", "Hips"],
    commonMistakes: [
      "Dumping body weight onto the front thigh or the lower hand",
      "Rounding the chest towards the floor instead of turning it open",
      "Letting the front knee roll inward",
    ],
    beginnerTips: [
      "Keep the forearm on the thigh rather than reaching a hand to the floor.",
      "Use a block under the lower hand to keep the chest open.",
      "Look straight ahead instead of up if the neck feels strained.",
    ],
    precautions: [
      "Keep some lift in the torso rather than collapsing sideways.",
      "Track the front knee towards the middle toes.",
    ],
    contraindications: [
      "Avoid with a recent knee, hip or shoulder injury.",
      "Keep the top arm down if you have high blood pressure.",
      "Look forward rather than up with a neck injury.",
    ],
  },
  {
    id: 13,
    slug: "ardha-chandrasana",
    name: "Ardha Chandrasana",
    englishName: "Half Moon Pose",
    level: "Intermediate",
    category: "Balancing",
    description:
      "A standing balance on one leg with the other leg lifted parallel to the floor, the torso turned open and one hand reaching down to the floor or a block.",
    benefits: [
      "Improves balance and coordination",
      "Strengthens the standing leg, ankle and glutes",
      "Opens the hips and chest",
      "Builds core stability",
    ],
    steps: [
      "From Triangle Pose on the right side, bend the right knee and place the right hand on a block about a foot in front of the little toe.",
      "Shift your weight forward onto the right foot.",
      "Straighten the right leg as the left leg lifts to hip height.",
      "Flex the lifted foot and reach out through the heel.",
      "Stack the left hip above the right and turn the chest open.",
      "Extend the left arm towards the ceiling, gaze forward or up.",
      "Bend the standing knee to lower down with control, then change sides.",
    ],
    breathing:
      "Breathe steadily. Keep the breath even rather than held — a held breath makes any balance harder to sustain.",
    duration: "20–30 seconds on each side",
    bodyAreas: ["Ankles", "Glutes", "Hamstrings", "Core", "Hips"],
    commonMistakes: [
      "Placing the lower hand too close to the standing foot",
      "Leaning weight into the lower hand instead of the standing leg",
      "Letting the lifted leg drop below hip height",
    ],
    beginnerTips: [
      "Always use a block under the lower hand — it is standard, not a compromise.",
      "Practise with the back against a wall to learn the open shape.",
      "Look at the floor rather than up until the balance feels steady.",
    ],
    precautions: [
      "Keep a micro-bend in the standing knee.",
      "Come down slowly and with control.",
    ],
    contraindications: [
      "Avoid with a recent ankle, knee or hip injury.",
      "Practise at a wall if you have low blood pressure or dizziness.",
      "Look forward rather than up with a neck injury.",
    ],
  },
  {
    id: 14,
    slug: "setu-bandhasana",
    name: "Setu Bandhasana",
    englishName: "Bridge Pose",
    level: "Beginner",
    category: "Backbend",
    description:
      "A supported backbend done lying on the back, lifting the hips while the feet, arms and shoulders stay grounded.",
    benefits: [
      "Strengthens the glutes, hamstrings and back",
      "Opens the chest and front of the hips",
      "Gently mobilises the spine",
      "Can be practised as an active or a restorative pose",
    ],
    steps: [
      "Lie on your back with the knees bent and the feet flat, hip-width apart.",
      "Bring the heels close enough that your fingertips can just brush them.",
      "Press the feet and arms down and lift the hips towards the ceiling.",
      "Roll the shoulders underneath you and clasp the hands if comfortable.",
      "Keep the knees pointing straight forward, not splaying out.",
      "Hold, then lower the spine down slowly from the top.",
    ],
    breathing:
      "Inhale as the hips lift, breathe evenly while you hold, and exhale as you lower. Let the chest, not the belly, expand.",
    duration: "30–60 seconds, repeated 2–3 times",
    bodyAreas: ["Glutes", "Hamstrings", "Lower back", "Chest", "Shoulders"],
    commonMistakes: [
      "Letting the knees splay outward",
      "Pushing the hips so high that the lower back compresses",
      "Turning the head from side to side while the neck bears weight",
    ],
    beginnerTips: [
      "Place a block under the sacrum for a supported, restful version.",
      "Hold a block between the thighs to keep the knees parallel.",
      "Lift only as high as feels easy in the lower back.",
    ],
    precautions: [
      "Keep the head still once the hips are lifted.",
      "Lower slowly rather than dropping the hips.",
    ],
    contraindications: [
      "Avoid with a neck injury.",
      "Seek guidance with a recent back or knee injury.",
      "Use the supported version rather than the active lift during pregnancy.",
    ],
  },
  {
    id: 15,
    slug: "dhanurasana",
    name: "Dhanurasana",
    englishName: "Bow Pose",
    level: "Intermediate",
    category: "Backbend",
    description:
      "A face-down backbend in which the hands hold the ankles and the legs press back, drawing the body into a bow shape.",
    benefits: [
      "Opens the chest, shoulders and front of the hips",
      "Strengthens the back muscles",
      "Improves spinal mobility",
      "Encourages fuller breathing",
    ],
    steps: [
      "Lie face down with the arms alongside the body.",
      "Bend both knees and bring the heels towards the buttocks.",
      "Reach back and take hold of the outside of each ankle.",
      "Keep the knees roughly hip-width apart rather than splaying wide.",
      "Inhale and press the shins back into the hands to lift the chest and thighs.",
      "Look forward with the neck long, and breathe.",
      "Release slowly on an exhale and rest with one cheek down.",
    ],
    breathing:
      "Inhale to lift. The pose presses against the belly, so breathing will feel shorter than usual — keep it slow rather than forcing depth.",
    duration: "15–20 seconds, repeated 2–3 times with rests",
    bodyAreas: ["Back", "Chest", "Shoulders", "Hip flexors", "Quadriceps"],
    commonMistakes: [
      "Pulling with the arms instead of pressing the shins backward",
      "Letting the knees splay far wider than the hips",
      "Throwing the head back",
    ],
    beginnerTips: [
      "Work one side at a time — hold one ankle while the other leg rests.",
      "Use a strap around the ankles if the hands cannot reach.",
      "Lift the chest a little and leave the thighs down at first.",
    ],
    precautions: [
      "Rest in Child's Pose or lying flat afterwards.",
      "Stop if you feel pinching in the lower back.",
    ],
    contraindications: [
      "Avoid during pregnancy.",
      "Avoid with high or low blood pressure, hernia, or recent abdominal surgery.",
      "Avoid with a neck, shoulder or lower back injury.",
    ],
  },
  {
    id: 16,
    slug: "ustrasana",
    name: "Ustrasana",
    englishName: "Camel Pose",
    level: "Intermediate",
    category: "Backbend",
    description:
      "A kneeling backbend in which the chest lifts and opens while the hands reach back towards the heels.",
    benefits: [
      "Opens the chest, shoulders and front of the hips",
      "Strengthens the back muscles",
      "Improves spinal mobility",
      "Counters the rounded posture of long periods sitting",
    ],
    steps: [
      "Kneel with the knees hip-width apart and the shins pressing down.",
      "Place the hands on the back of the pelvis with the fingers pointing down.",
      "Lift the chest upward before beginning to lean back.",
      "Keep the hips stacked over the knees rather than pushing them back.",
      "If it feels available, reach one hand at a time back to the heels.",
      "Keep the neck long — let the head follow the chest rather than dropping back.",
      "Come up leading with the chest, and rest in Child's Pose.",
    ],
    breathing:
      "Inhale to lift the chest, exhale as you settle into the shape. Keep breathing into the upper chest, which is the area being opened.",
    duration: "15–30 seconds, repeated 2–3 times",
    bodyAreas: ["Chest", "Shoulders", "Hip flexors", "Upper back", "Quadriceps"],
    commonMistakes: [
      "Letting the hips drift backwards behind the knees",
      "Dropping the head straight back and compressing the neck",
      "Reaching for the heels before the chest has lifted",
    ],
    beginnerTips: [
      "Keep the hands on the lower back for the whole pose — this is a complete version.",
      "Tuck the toes under to raise the heels and shorten the reach.",
      "Place blocks beside the ankles to rest the hands on.",
    ],
    precautions: [
      "Come up slowly — rising quickly can cause light-headedness.",
      "Rest afterwards in a neutral position such as Child's Pose.",
    ],
    contraindications: [
      "Avoid with a neck or lower back injury.",
      "Avoid with high or low blood pressure, or migraine.",
      "Seek guidance during pregnancy or after recent abdominal surgery.",
    ],
  },
  {
    id: 17,
    slug: "marjaryasana",
    name: "Marjaryasana",
    englishName: "Cat Pose",
    level: "Beginner",
    category: "Warm-up",
    description:
      "A kneeling pose on hands and knees in which the spine rounds upward and the head and tailbone drop. Almost always paired with Cow Pose.",
    benefits: [
      "Mobilises the spine gently",
      "Releases tension in the upper back and neck",
      "Warms the body at the start of practice",
      "Builds awareness of spinal movement",
    ],
    steps: [
      "Come onto hands and knees, wrists under shoulders and knees under hips.",
      "Spread the fingers wide and press evenly into both palms.",
      "Start with a level, neutral spine.",
      "Exhale and press the floor away, rounding the upper back towards the ceiling.",
      "Let the head release downward and draw the tailbone under.",
      "Inhale back to neutral, or continue straight into Cow Pose.",
    ],
    breathing:
      "Round the spine on the exhale. The movement follows the breath rather than the other way round, so let the exhale set the pace.",
    duration: "5–10 rounds, moving slowly with the breath",
    bodyAreas: ["Spine", "Upper back", "Neck", "Shoulders", "Abdomen"],
    commonMistakes: [
      "Moving quickly and losing the link with the breath",
      "Bending the elbows instead of moving the spine",
      "Letting the knees drift out of line under the hips",
    ],
    beginnerTips: [
      "Place a folded blanket under the knees for padding.",
      "Come onto the forearms or fists if the wrists are sensitive.",
      "Move slowly — this is a mobility pose, not an exercise for repetitions.",
    ],
    precautions: [
      "Keep the movement within a comfortable range.",
      "Support the knees on a hard floor.",
    ],
    contraindications: [
      "Avoid with a recent wrist or knee injury, or use forearms and padding.",
      "Move gently with a neck injury and keep the head in line with the spine.",
      "Seek guidance with a diagnosed disc condition.",
    ],
  },
  {
    id: 18,
    slug: "bitilasana",
    name: "Bitilasana",
    englishName: "Cow Pose",
    level: "Beginner",
    category: "Warm-up",
    description:
      "The counterpart to Cat Pose. On hands and knees, the belly lowers, the chest opens and the gaze lifts slightly.",
    benefits: [
      "Mobilises the spine gently",
      "Opens the chest and front of the torso",
      "Warms the body at the start of practice",
      "Encourages deeper breathing",
    ],
    steps: [
      "Come onto hands and knees, wrists under shoulders and knees under hips.",
      "Begin with a level, neutral spine.",
      "Inhale and let the belly lower towards the floor.",
      "Lift the chest and the sitting bones at the same time.",
      "Draw the shoulders away from the ears and broaden the collarbones.",
      "Lift the gaze only slightly, keeping the back of the neck long.",
      "Exhale back to neutral, or move into Cat Pose.",
    ],
    breathing:
      "Lower the belly and lift the chest on the inhale. Pair it with Cat Pose on the exhale for a continuous, breath-led flow.",
    duration: "5–10 rounds, alternating with Cat Pose",
    bodyAreas: ["Spine", "Chest", "Abdomen", "Neck", "Shoulders"],
    commonMistakes: [
      "Cranking the head far back to look at the ceiling",
      "Letting the whole lower back sag rather than moving the whole spine",
      "Rushing through the movement",
    ],
    beginnerTips: [
      "Keep the gaze just past your fingertips rather than looking up.",
      "Pad the knees with a folded blanket.",
      "Use fists or forearms if the wrists complain.",
    ],
    precautions: [
      "Keep the neck movement small and comfortable.",
      "Stay within a pain-free range of movement.",
    ],
    contraindications: [
      "Avoid with a recent wrist, knee or neck injury, or modify with padding.",
      "Keep the head level if you have neck problems.",
      "Seek guidance with a diagnosed disc condition.",
    ],
  },
  {
    id: 19,
    slug: "baddha-konasana",
    name: "Baddha Konasana",
    englishName: "Bound Angle Pose",
    level: "Beginner",
    category: "Hip Opener",
    description:
      "A seated pose with the soles of the feet together and the knees falling out to the sides, forming a diamond shape with the legs.",
    benefits: [
      "Opens the hips and inner thighs",
      "Improves flexibility in the groin",
      "Encourages an upright seated posture",
      "Can be practised actively or restfully",
    ],
    steps: [
      "Sit on the floor with the legs extended forward.",
      "Bend both knees and bring the soles of the feet together.",
      "Let the knees drop out towards the floor.",
      "Hold the feet or ankles, and sit up tall through the spine.",
      "Draw the shoulders back and lengthen from the base of the spine to the crown.",
      "Stay upright, or fold gently forward from the hips if that is comfortable.",
    ],
    breathing:
      "Breathe slowly and evenly. Let each exhale release the hips a little more, without pushing the knees down.",
    duration: "1–2 minutes",
    bodyAreas: ["Hips", "Inner thighs", "Groin", "Lower back", "Knees"],
    commonMistakes: [
      "Pressing the knees down forcefully with the hands",
      "Rounding the lower back and collapsing backwards",
      "Pulling the heels in too close for the hips available today",
    ],
    beginnerTips: [
      "Sit on the edge of a folded blanket or cushion to help the spine stay upright.",
      "Place blocks or cushions under each knee for support.",
      "Move the feet further away from the body to reduce intensity.",
    ],
    precautions: [
      "Let the knees settle at their own height rather than forcing them.",
      "Come out gently, using the hands to lift the knees together.",
    ],
    contraindications: [
      "Avoid with a groin or knee injury, or support the knees fully.",
      "Sit upright rather than folding forward during later pregnancy.",
      "Seek guidance after hip surgery.",
    ],
  },
  {
    id: 20,
    slug: "upavistha-konasana",
    name: "Upavistha Konasana",
    englishName: "Wide-Angle Seated Forward Bend",
    level: "Intermediate",
    category: "Forward Bend",
    description:
      "A seated forward bend with the legs spread wide apart, folding forward from the hips between the legs.",
    benefits: [
      "Stretches the inner thighs and hamstrings",
      "Opens the hips",
      "Lengthens the spine",
      "Has a calming, inward-turning quality",
    ],
    steps: [
      "Sit tall with the legs extended wide apart, to a comfortable angle.",
      "Flex both feet so the toes and kneecaps point towards the ceiling.",
      "Press the backs of the thighs down and sit up on the sitting bones.",
      "Inhale and lengthen the spine upwards.",
      "Exhale and walk the hands forward, hinging at the hips.",
      "Stop where the back begins to round, and breathe there.",
      "Walk the hands back in to come up.",
    ],
    breathing:
      "Inhale to lengthen, exhale to fold a little further. Never fold on an inhale — the spine has less room then.",
    duration: "1–2 minutes",
    bodyAreas: ["Inner thighs", "Hamstrings", "Hips", "Lower back", "Spine"],
    commonMistakes: [
      "Taking the legs so wide that the knees roll inward",
      "Rounding the spine to get the chest closer to the floor",
      "Bouncing to gain depth",
    ],
    beginnerTips: [
      "Sit on a folded blanket to tilt the pelvis forward.",
      "Bend the knees generously and place cushions underneath them.",
      "Stay sitting upright — the forward fold is optional.",
    ],
    precautions: [
      "Keep the kneecaps facing up to protect the knee joints.",
      "Fold from the hips, not from the middle of the back.",
    ],
    contraindications: [
      "Avoid with a groin, hamstring or lower back injury.",
      "Seek guidance with sciatica or a diagnosed disc condition.",
      "Keep the fold shallow and the legs supported during pregnancy.",
    ],
  },
  {
    id: 21,
    slug: "janu-sirsasana",
    name: "Janu Sirsasana",
    englishName: "Head-to-Knee Pose",
    level: "Beginner",
    category: "Forward Bend",
    description:
      "A seated forward bend over one straight leg, with the other foot drawn in to the inner thigh.",
    benefits: [
      "Stretches the hamstring of the extended leg",
      "Opens the hip of the bent leg",
      "Lengthens the side of the spine",
      "Has a quieting, settling effect",
    ],
    steps: [
      "Sit tall with both legs extended forward.",
      "Bend the right knee and place the sole of the right foot against the inner left thigh.",
      "Let the right knee rest out to the side.",
      "Turn the torso to face over the straight left leg.",
      "Inhale and lengthen the spine, then exhale and fold forward from the hips.",
      "Hold the shin, ankle or foot — wherever you reach without rounding sharply.",
      "Come up on an inhale and change sides.",
    ],
    breathing:
      "Inhale to lengthen the spine, exhale to fold. Keep the breath smooth; if it becomes strained you have folded too far.",
    duration: "45–60 seconds on each side",
    bodyAreas: ["Hamstrings", "Hips", "Lower back", "Spine", "Groin"],
    commonMistakes: [
      "Pulling the head down towards the knee and rounding the upper back",
      "Letting the torso twist away from the straight leg",
      "Locking the straight knee",
    ],
    beginnerTips: [
      "Sit on a folded blanket to make the forward tilt easier.",
      "Loop a strap around the foot instead of reaching for it.",
      "Keep a soft bend in the extended knee.",
    ],
    precautions: [
      "Fold from the hips rather than pulling with the arms.",
      "Support the bent knee with a cushion if it feels strained.",
    ],
    contraindications: [
      "Avoid with a knee or hamstring injury.",
      "Seek guidance with sciatica or a lower back condition.",
      "Keep the fold shallow during pregnancy.",
    ],
  },
  {
    id: 22,
    slug: "paschimottanasana",
    name: "Paschimottanasana",
    englishName: "Seated Forward Bend",
    level: "Beginner",
    category: "Forward Bend",
    description:
      "A seated forward bend over both straight legs, lengthening the entire back of the body from the heels to the crown of the head.",
    benefits: [
      "Stretches the hamstrings and calves",
      "Lengthens the whole back of the body",
      "Encourages a slower, quieter state of mind",
      "Improves flexibility in the hips",
    ],
    steps: [
      "Sit tall with both legs extended forward and the feet flexed.",
      "Press the backs of the thighs down and rock onto the front of the sitting bones.",
      "Inhale and reach both arms overhead to lengthen the spine.",
      "Exhale and hinge forward from the hips, leading with the chest.",
      "Hold the shins, ankles or feet, wherever you reach comfortably.",
      "Let the head be the last thing to lower, and keep the neck relaxed.",
      "Walk the hands back and rise on an inhale.",
    ],
    breathing:
      "Inhale to lengthen, exhale to fold deeper. Expect the breath to feel shorter in the fold — keep it slow and even rather than forcing it.",
    duration: "1–2 minutes",
    bodyAreas: ["Hamstrings", "Calves", "Lower back", "Spine", "Hips"],
    commonMistakes: [
      "Rounding the spine hard to bring the head towards the knees",
      "Pulling forcefully on the feet with the arms",
      "Locking the knees straight",
    ],
    beginnerTips: [
      "Sit on the edge of a folded blanket — this alone makes a large difference.",
      "Keep the knees clearly bent; the hamstrings still lengthen.",
      "Use a strap around the feet rather than straining to reach.",
    ],
    precautions: [
      "Lead with the chest, not the forehead.",
      "Stop where the lower back begins to round sharply.",
    ],
    contraindications: [
      "Avoid with a lower back injury or diagnosed disc condition.",
      "Seek guidance with sciatica.",
      "Take the legs wide or skip the pose during pregnancy.",
    ],
  },
  {
    id: 23,
    slug: "navasana",
    name: "Navasana",
    englishName: "Boat Pose",
    level: "Intermediate",
    category: "Core",
    description:
      "A seated balance on the sitting bones with the legs lifted and the torso leaning back, forming a V shape.",
    benefits: [
      "Strengthens the abdominal muscles and hip flexors",
      "Strengthens the muscles along the spine",
      "Improves balance and coordination",
      "Builds endurance",
    ],
    steps: [
      "Sit with the knees bent and the feet flat on the floor.",
      "Hold the backs of the thighs and lean back until you balance just behind the sitting bones.",
      "Lift the feet until the shins are parallel to the floor.",
      "Lengthen the spine — keep the chest lifted rather than letting the back round.",
      "If steady, straighten the legs towards a V shape.",
      "Extend the arms forward alongside the legs, palms facing in.",
      "Lower with control and rest before repeating.",
    ],
    breathing:
      "Breathe steadily throughout. Holding the breath is very common here — if you notice it, bend the knees until the breath returns.",
    duration: "15–30 seconds, repeated 3–5 times",
    bodyAreas: ["Abdominals", "Hip flexors", "Lower back", "Quadriceps", "Spine"],
    commonMistakes: [
      "Rounding the lower back and collapsing behind the sitting bones",
      "Holding the breath to maintain the shape",
      "Straightening the legs before the spine can stay long",
    ],
    beginnerTips: [
      "Keep the knees bent with the shins parallel to the floor — this is a full version.",
      "Keep the fingertips lightly on the floor behind you for support.",
      "Keep the toes on the ground and simply lean back with a long spine.",
    ],
    precautions: [
      "Stop if the lower back begins to ache.",
      "Build up gradually with short holds rather than one long one.",
    ],
    contraindications: [
      "Avoid during pregnancy.",
      "Avoid with a lower back or neck injury.",
      "Seek guidance after recent abdominal surgery or with a hernia.",
    ],
  },
  {
    id: 24,
    slug: "malasana",
    name: "Malasana",
    englishName: "Garland Pose",
    level: "Beginner",
    category: "Hip Opener",
    description:
      "A deep squat with the feet flat, the hips low and the elbows pressing gently against the inner knees.",
    benefits: [
      "Opens the hips, groin and ankles",
      "Stretches the lower back",
      "Improves ankle mobility",
      "Strengthens the muscles used for squatting",
    ],
    steps: [
      "Stand with the feet slightly wider than hip-width, toes turned out a little.",
      "Bend the knees and lower the hips down towards the floor.",
      "Bring the palms together at the chest.",
      "Press the elbows lightly against the inner knees to encourage them open.",
      "Lengthen the spine upwards and lift the chest.",
      "Work towards bringing the heels down, using support if they lift.",
      "Sit down or come up slowly to release.",
    ],
    breathing:
      "Breathe slowly and deeply. The shape naturally lends itself to long, low breathing into the belly and lower back.",
    duration: "30–60 seconds",
    bodyAreas: ["Hips", "Groin", "Ankles", "Lower back", "Knees"],
    commonMistakes: [
      "Forcing the heels down before the ankles allow it",
      "Rounding the upper back and collapsing the chest",
      "Pushing the knees open aggressively with the elbows",
    ],
    beginnerTips: [
      "Place a folded blanket under the heels if they lift off the floor.",
      "Sit on a block to take weight out of the hips entirely.",
      "Widen the feet and turn the toes out further.",
    ],
    precautions: [
      "Come out slowly, as the legs may feel unsteady at first.",
      "Keep the knees tracking in line with the toes.",
    ],
    contraindications: [
      "Avoid with a knee, ankle or lower back injury.",
      "Use a block or wall for support during pregnancy.",
      "Seek guidance after knee or hip surgery.",
    ],
  },
  {
    id: 25,
    slug: "garudasana",
    name: "Garudasana",
    englishName: "Eagle Pose",
    level: "Intermediate",
    category: "Balancing",
    description:
      "A standing balance in which the arms wrap around each other and one leg crosses over the other, drawing the whole body towards the midline.",
    benefits: [
      "Improves balance and concentration",
      "Stretches the upper back and shoulders",
      "Strengthens the standing leg and ankle",
      "Opens the space between the shoulder blades",
    ],
    steps: [
      "Stand tall and bend both knees slightly.",
      "Shift the weight onto the left foot and find a steady gaze point.",
      "Cross the right thigh over the left, hooking the right foot behind the calf if possible.",
      "Extend the arms forward, then cross the left arm over the right.",
      "Bend the elbows and bring the palms or the backs of the hands together.",
      "Lift the elbows to shoulder height and draw the hands away from the face.",
      "Unwind slowly and repeat with the opposite arm and leg on top.",
    ],
    breathing:
      "Breathe into the upper back, which is being broadened by the arm wrap. Keep the breath even to help maintain the balance.",
    duration: "20–30 seconds on each side",
    bodyAreas: ["Ankles", "Calves", "Thighs", "Upper back", "Shoulders"],
    commonMistakes: [
      "Standing with a locked knee on the supporting leg",
      "Hunching the shoulders up towards the ears",
      "Leaning the torso forward as the legs wrap",
    ],
    beginnerTips: [
      "Rest the toes of the crossed leg on the floor as a kickstand.",
      "Hold opposite shoulders in a self-hug instead of the full arm wrap.",
      "Stand near a wall for support while learning.",
    ],
    precautions: [
      "Unwind slowly rather than dropping out of the pose.",
      "Keep the supporting knee softly bent throughout.",
    ],
    contraindications: [
      "Avoid with a recent knee, ankle or shoulder injury.",
      "Use wall support if you have balance difficulties.",
      "Take the simpler arm variation with elbow or wrist problems.",
    ],
  },
  {
    id: 26,
    slug: "savasana",
    name: "Savasana",
    englishName: "Corpse Pose",
    level: "Beginner",
    category: "Resting",
    description:
      "The final relaxation pose. You lie flat on your back, completely still, allowing the body to settle after practice.",
    benefits: [
      "Allows the body to rest and integrate the practice",
      "Encourages the breath and heart rate to settle",
      "Reduces physical tension",
      "Supports a calmer state of mind",
    ],
    steps: [
      "Lie down on your back and extend the legs long.",
      "Let the feet fall open naturally to the sides.",
      "Rest the arms a little away from the body, palms facing up.",
      "Tuck the shoulder blades gently underneath you so the chest is open.",
      "Close the eyes and let the whole weight of the body be held by the floor.",
      "Stay still, releasing the jaw, the face and the hands.",
      "To come out, deepen the breath, move the fingers and toes, and roll to one side.",
    ],
    breathing:
      "Let the breath find its own rhythm rather than controlling it. Over a few minutes it usually slows and softens by itself.",
    duration: "5–10 minutes at the end of practice",
    bodyAreas: ["Whole body", "Lower back", "Shoulders", "Neck", "Face"],
    commonMistakes: [
      "Skipping it or cutting it short at the end of a session",
      "Continuing to fidget and adjust rather than settling",
      "Getting up quickly at the end",
    ],
    beginnerTips: [
      "Place a bolster or rolled blanket under the knees to ease the lower back.",
      "Cover yourself with a blanket — the body cools quickly when still.",
      "Use an eye pillow or dim the lights to help the eyes relax.",
    ],
    precautions: [
      "Come up slowly, rolling to one side first.",
      "Keep warm; body temperature drops during long stillness.",
    ],
    contraindications: [
      "Lie on your left side with support rather than flat in later pregnancy.",
      "Use a bolster under the head and chest if lying flat causes breathlessness.",
      "Support the knees if lying flat is uncomfortable for the lower back.",
    ],
  },
];

export default asanas;
