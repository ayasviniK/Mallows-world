export const INITIAL_PET_STATE = {
  name: 'Mallow',
  hunger: 38,
  happiness: 82,
  affection: 28,
  energy: 72,
  fullness: 25,
  coins: 30,
  level: 1,
  bond: 8,
  soundEnabled: true,
};

export const DIALOGUES = {
  normal: [
    "The cushion is warm. The world is acceptable.",
    "Snack first. Big thoughts later.",
    "I am simply a tiny potato having a very good day.",
    "Did you hear that? It sounded like a treat wrapper.",
    "My ears are listening to the gentle room sounds.",
    "Every day is a nice day to sit on the pink rug."
  ],
  happy: [
    "✦ Purr... that was an elite head pat!",
    "Look at me! Maximum fluffiness unlocked!",
    "My ears did a happy wiggle. You saw that, right?",
    "10/10 pats. The squishiness is pleased.",
    "You have exceptional taste in small companions."
  ],
  teased: [
    "EXCUSE ME?! I have a personal bubble policy!",
    "My paws are small, but my outrage is immense.",
    "I am contacting my legal representative.",
    "Poking is strictly outside our agreement!",
    "I am pouting. Look at my dramatic face."
  ],
  sleepy: [
    "Zzz... the moon is quiet and my eyelids are heavy.",
    "Recharging tiny batteries... please tiptoe.",
    "Cozy loaf mode activated. 99% marshmallow.",
    "Soft dreams about strawberry clouds..."
  ],
  hungry: [
    "My tummy made a very dramatic squeak.",
    "Warm bowl detection radar is scanning...",
    "A tiny creature cannot survive on cuddles alone!"
  ]
};

export const MOOD_CONFIG = {
  normal: {
    label: "Cozy & Content",
    note: "Resting comfortably in the nook",
    badgeColor: "var(--mint-300)",
    icon: "☻"
  },
  delighted: {
    label: "Delighted & Blushing",
    note: "Tiny ears wiggling with joy!",
    badgeColor: "var(--strawberry-300)",
    icon: "♥"
  },
  pouting: {
    label: "Slightly Dramatic",
    note: "Demanding respectful spacing",
    badgeColor: "var(--butter-400)",
    icon: "!"
  },
  sleeping: {
    label: "Sweet Dreams",
    note: "Taking a restorative nap",
    badgeColor: "var(--lavender-300)",
    icon: "☾"
  }
};
