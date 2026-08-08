// Sample asana data.
//
// AS OF PHASE 3, THE HOMEPAGE NO LONGER READS THIS FILE.
// app/page.js now fetches asanas from PostgreSQL through Prisma.
//
// This file is still used by ONE thing: prisma/seed.js, which loads these
// poses into the database. Keeping it means you can rebuild the database
// from scratch at any time with `npm run db:seed`.
//
// It is a plain JavaScript ARRAY of OBJECTS. The keys below match the columns
// of the Asana table in prisma/schema.prisma.

const asanas = [
  {
    id: 1,
    name: "Tadasana",
    englishName: "Mountain Pose",
    level: "Beginner",
    category: "Standing",
    emoji: "🧍",
    description:
      "The foundation of all standing poses. You stand tall and still, grounding through both feet while lengthening upward through the crown of the head.",
    benefits: ["Improves posture", "Strengthens thighs and ankles", "Builds body awareness"],
  },
  {
    id: 2,
    name: "Vrikshasana",
    englishName: "Tree Pose",
    level: "Beginner",
    category: "Balancing",
    emoji: "🌳",
    description:
      "A one-legged balancing pose. The sole of one foot rests on the opposite inner thigh or calf while the hands meet at the heart or reach overhead.",
    benefits: ["Improves balance", "Strengthens legs", "Calms and focuses the mind"],
  },
  {
    id: 3,
    name: "Bhujangasana",
    englishName: "Cobra Pose",
    level: "Beginner",
    category: "Backbend",
    emoji: "🐍",
    description:
      "A gentle backbend done lying face down. The chest lifts away from the floor while the hips and legs stay grounded.",
    benefits: ["Opens the chest", "Strengthens the spine", "Eases lower back stiffness"],
  },
  {
    id: 4,
    name: "Balasana",
    englishName: "Child's Pose",
    level: "Beginner",
    category: "Resting",
    emoji: "🧘",
    description:
      "A folded resting pose. The hips sink toward the heels and the forehead rests on the mat. Used as a pause between harder poses.",
    benefits: ["Releases the back and hips", "Relieves stress", "Slows the breath"],
  },
  {
    id: 5,
    name: "Adho Mukha Svanasana",
    englishName: "Downward-Facing Dog",
    level: "Intermediate",
    category: "Inversion",
    emoji: "🐕",
    description:
      "An inverted V shape with hands and feet on the mat and hips lifted high. One of the most recognised poses in modern yoga.",
    benefits: ["Stretches hamstrings and calves", "Strengthens arms and shoulders", "Energises the body"],
  },
  {
    id: 6,
    name: "Trikonasana",
    englishName: "Triangle Pose",
    level: "Intermediate",
    category: "Standing",
    emoji: "📐",
    description:
      "A wide-legged standing pose where the torso tilts sideways, one hand reaching down toward the shin and the other lifting toward the sky.",
    benefits: ["Stretches the side body", "Opens the hips", "Improves stability"],
  },
];

export default asanas;
