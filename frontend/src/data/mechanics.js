const questions = [
  {
    id: 1,

    category: "Monetization",

    mechanic: "Battle Pass",

    questionType: "likert",

    scale: [1, 2, 3, 4, 5],

    variants: {
      FPS: "Насколько положительно вы относитесь к Battle Pass в соревновательных FPS-играх?",

      RPG: "Насколько положительно вы относитесь к Battle Pass в сюжетных RPG-играх?"
    }
  },

  {
    id: 2,

    category: "Retention",

    mechanic: "Daily Rewards",

    questionType: "likert",

    scale: [1, 2, 3, 4, 5],

    variants: {
      FPS: "Как вы относитесь к ежедневным наградам в онлайн-шутерах?",

      RPG: "Как вы относитесь к ежедневным наградам в RPG?"
    }
  },

  {
    id: 3,

    category: "Events",

    mechanic: "Seasonal Events",

    questionType: "likert",

    scale: [1, 2, 3, 4, 5],

    variants: {
      FPS: "Насколько сезонные события улучшают опыт в FPS-играх?",

      RPG: "Насколько сезонные события улучшают опыт в RPG?"
    }
  },

  {
    id: 4,

    category: "FOMO",

    mechanic: "Limited-Time Content",

    questionType: "likert",

    scale: [1, 2, 3, 4, 5],

    variants: {
      FPS: "Как вы относитесь к временному контенту в FPS-играх?",

      RPG: "Как вы относитесь к временному контенту в RPG?"
    }
  },

  {
    id: 5,

    category: "Monetization",

    mechanic: "Loot Boxes",

    questionType: "likert",

    scale: [1, 2, 3, 4, 5],

    variants: {
      FPS: "Насколько приемлемы loot boxes в FPS-играх?",

      RPG: "Насколько приемлемы loot boxes в RPG?"
    }
  },

  {
    id: 6,

    category: "Retention",

    mechanic: "Daily Quests",

    questionType: "likert",

    scale: [1, 2, 3, 4, 5],

    variants: {
      FPS: "Как вы относитесь к ежедневным заданиям в FPS-играх?",

      RPG: "Как вы относитесь к ежедневным заданиям в RPG?"
    }
  }
]

export default questions