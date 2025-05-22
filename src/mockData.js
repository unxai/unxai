// src/mockData.js

// == Dream Data ==

// Dream Structure:
// {
//   id: string | number, (unique)
//   title: string,
//   date: string, (e.g., 'YYYY-MM-DD')
//   content: string,
//   tags: string[],
//   emotions?: string[] | { [emotion: string]: number }, (e.g., ['happy', 'anxious'] or { joy: 0.8, sadness: 0.1 })
//   clarity?: number (0-100, where 100 is max clarity)
// }

let nextDreamId = 21; // For generating new dream IDs

export const mockDreams = [
  {
    id: 1,
    title: "Flying Over Mountains",
    date: "2023-01-15",
    content: "I was soaring over majestic snow-capped mountains. The air was crisp and I felt incredibly free.",
    tags: ["flying", "mountains", "freedom", "adventure"],
    emotions: ["joy", "excitement", "awe"],
    clarity: 90,
  },
  {
    id: 2,
    title: "The Lost Library",
    date: "2023-01-20",
    content: "I found a hidden library filled with ancient books. Each book I opened revealed a different world.",
    tags: ["library", "books", "mystery", "discovery"],
    emotions: { curiosity: 0.9, wonder: 0.8, slight_unease: 0.2 },
    clarity: 75,
  },
  {
    id: 3,
    title: "Talking Animals",
    date: "2023-02-05",
    content: "All the animals in my backyard started talking to me. We had a long conversation about the meaning of life.",
    tags: ["animals", "talking", "surreal", "philosophy"],
    emotions: ["amusement", "surprise", "comfort"],
    clarity: 80,
  },
  {
    id: 4,
    title: "Underwater City",
    date: "2023-02-10",
    content: "I discovered a vibrant city bustling with life, all underwater. I could breathe and swim freely.",
    tags: ["underwater", "city", "fantasy", "exploration"],
    emotions: ["wonder", "peace", "fascination"],
    clarity: 95,
  },
  {
    id: 5,
    title: "Chased by Shadows",
    date: "2023-03-01",
    content: "Dark shadowy figures were chasing me through a never-ending maze. I woke up with my heart pounding.",
    tags: ["chase", "shadows", "nightmare", "fear"],
    emotions: ["fear", "anxiety", "helplessness"],
    clarity: 60,
  },
  {
    id: 6,
    title: "Reunion with Old Friend",
    date: "2023-03-12",
    content: "I met an old childhood friend I hadn't seen in years. We talked for hours and reminisced.",
    tags: ["reunion", "friendship", "nostalgia", "happiness"],
    emotions: ["happiness", "nostalgia", "comfort"],
    clarity: 85,
  },
  {
    id: 7,
    title: "Winning the Lottery",
    date: "2023-04-02",
    content: "I checked my lottery ticket and realized I had won the jackpot. I started planning all the things I would do.",
    tags: ["lottery", "money", "excitement", "fantasy"],
    emotions: ["excitement", "joy", "disbelief"],
    clarity: 70,
  },
  {
    id: 8,
    title: "The Infinite Staircase",
    date: "2023-04-18",
    content: "I was climbing a staircase that seemed to stretch endlessly into the sky. Each step revealed a new landscape.",
    tags: ["stairs", "infinity", "surreal", "journey"],
    emotions: { awe: 0.7, fatigue: 0.3, curiosity: 0.5 },
    clarity: 78,
  },
  {
    id: 9,
    title: "Forgotten Birthday",
    date: "2023-05-05",
    content: "It was my birthday, but everyone seemed to have forgotten. I felt a mix of sadness and confusion.",
    tags: ["birthday", "forgotten", "sadness", "social"],
    emotions: ["sadness", "loneliness", "confusion"],
    clarity: 65,
  },
  {
    id: 10,
    title: "Becoming a Giant",
    date: "2023-05-21",
    content: "I suddenly grew to the size of a giant, towering over buildings. It was both exhilarating and terrifying.",
    tags: ["giant", "transformation", "power", "fear"],
    emotions: ["exhilaration", "fear", "power"],
    clarity: 88,
  },
  {
    id: 11,
    title: "A World Made of Candy",
    date: "2023-06-10",
    content: "Everything around me was made of candy – candy trees, candy rivers, candy houses. It was a delicious adventure.",
    tags: ["candy", "fantasy", "food", "joy"],
    emotions: ["joy", "delight", "childlike_wonder"],
    clarity: 92,
  },
  {
    id: 12,
    title: "Losing My Voice",
    date: "2023-06-25",
    content: "I tried to speak, but no sound came out. I had important things to say but couldn't communicate.",
    tags: ["voice", "silence", "frustration", "communication"],
    emotions: ["frustration", "anxiety", "helplessness"],
    clarity: 55,
  },
  {
    id: 13,
    title: "Time Travel to the Past",
    date: "2023-07-07",
    content: "I traveled back in time and witnessed historical events firsthand. It was an incredible learning experience.",
    tags: ["time_travel", "history", "adventure", "learning"],
    emotions: ["fascination", "excitement", "awe"],
    clarity: 80,
  },
  {
    id: 14,
    title: "The Exam I Didn't Study For",
    date: "2023-07-22",
    content: "I was suddenly in an exam room, facing a test I knew nothing about. Panic set in.",
    tags: ["exam", "stress", "anxiety", "failure"],
    emotions: ["anxiety", "panic", "stress"],
    clarity: 50,
  },
  {
    id: 15,
    title: "Floating in Space",
    date: "2023-08-05",
    content: "I was effortlessly floating among the stars and planets, observing the beauty of the cosmos.",
    tags: ["space", "stars", "peace", "wonder"],
    emotions: ["peace", "wonder", "serenity"],
    clarity: 98,
  },
  {
    id: 16,
    title: "Discovering a Secret Talent",
    date: "2023-08-19",
    content: "I found out I had an amazing talent I never knew about, like playing a musical instrument perfectly.",
    tags: ["talent", "discovery", "joy", "music"],
    emotions: ["joy", "surprise", "confidence"],
    clarity: 82,
  },
  {
    id: 17,
    title: "Lost in a Familiar Place",
    date: "2023-09-03",
    content: "I was in my own neighborhood, but everything was different and I couldn't find my way home.",
    tags: ["lost", "confusion", "anxiety", "familiar"],
    emotions: ["confusion", "anxiety", "disorientation"],
    clarity: 60,
  },
  {
    id: 18,
    title: "A Peaceful Garden",
    date: "2023-09-20",
    content: "I spent time in a beautiful, serene garden, full of colorful flowers and calming sounds.",
    tags: ["garden", "peace", "nature", "serenity"],
    emotions: ["peace", "calmness", "contentment"],
    clarity: 90,
  },
  {
    id: 19,
    title: "Meeting a Celebrity",
    date: "2023-10-10",
    content: "I had a casual conversation with my favorite celebrity. They were surprisingly down-to-earth.",
    tags: ["celebrity", "meeting", "excitement", "surprise"],
    emotions: ["excitement", "starstruck", "joy"],
    clarity: 75,
  },
  {
    id: 20,
    title: "The Recurring Door",
    date: "2023-10-25",
    content: "There was a mysterious door that kept appearing in different places. I was hesitant but curious to open it.",
    tags: ["door", "mystery", "recurring", "curiosity"],
    emotions: { curiosity: 0.8, apprehension: 0.4 },
    clarity: 70,
  },
];

// == Category Data ==

// Category Structure:
// {
//   id: string | number, (unique)
//   name: string,
//   description: string,
//   image: string, (placeholder URL)
//   dreamCount: number
// }

export const mockCategories = [
  {
    id: "cat1",
    name: "Adventure & Exploration",
    description: "Dreams about journeys, discoveries, and new experiences.",
    image: "https://picsum.photos/600/400?random=1",
    dreamCount: 7, // Example count
  },
  {
    id: "cat2",
    name: "Nightmares & Fears",
    description: "Dreams that evoke feelings of fear, anxiety, or distress.",
    image: "https://picsum.photos/600/400?random=2",
    dreamCount: 3, // Example count
  },
  {
    id: "cat3",
    name: "Surreal & Fantasy",
    description: "Dreams with bizarre, magical, or illogical elements.",
    image: "https://picsum.photos/600/400?random=3",
    dreamCount: 6, // Example count
  },
  {
    id: "cat4",
    name: "Daily Life & Social",
    description: "Dreams reflecting everyday situations, relationships, and social interactions.",
    image: "https://picsum.photos/600/400?random=4",
    dreamCount: 4, // Example count
  },
];

// == Helper Functions ==

/**
 * Generates a unique ID for a new dream.
 * For simplicity, using an incrementing number.
 * In a real app, consider UUIDs.
 * @returns {number} A unique ID.
 */
const generateDreamId = () => {
  return nextDreamId++;
};

// == Exported Functions ==

/**
 * Returns a copy of all mock dreams.
 * @returns {object[]} A new array containing all dreams.
 */
export const getAllDreams = () => {
  return [...mockDreams]; // Return a copy to prevent direct modification
};

/**
 * Finds a dream by its ID.
 * @param {string | number} id The ID of the dream to find.
 * @returns {object | undefined} The dream object if found, otherwise undefined.
 */
export const getDreamById = (id) => {
  // Ensure ID types are consistent for comparison (e.g., if IDs are numbers in array)
  const numericId = typeof id === 'string' ? parseInt(id, 10) : id;
  return mockDreams.find(dream => dream.id === numericId);
};

/**
 * Adds a new dream to the mockDreams array.
 * @param {object} dreamData The dream object to add. Must include title, date, content, tags.
 * @returns {object} The newly added dream object with its generated ID.
 */
export const addDream = (dreamData) => {
  if (!dreamData || !dreamData.title || !dreamData.date || !dreamData.content || !dreamData.tags) {
    throw new Error("New dream data must include title, date, content, and tags.");
  }
  const newDream = {
    id: generateDreamId(),
    ...dreamData,
    // Ensure optional fields have defaults if not provided
    emotions: dreamData.emotions || [],
    clarity: dreamData.clarity !== undefined ? dreamData.clarity : 70, // Default clarity
  };
  mockDreams.push(newDream);
  return newDream;
};

/**
 * Updates an existing dream in mockDreams.
 * @param {string | number} id The ID of the dream to update.
 * @param {object} updatedDreamData An object containing the fields to update.
 * @returns {object | null} The updated dream object, or null if not found.
 */
export const updateDream = (id, updatedDreamData) => {
  const numericId = typeof id === 'string' ? parseInt(id, 10) : id;
  const dreamIndex = mockDreams.findIndex(dream => dream.id === numericId);
  if (dreamIndex === -1) {
    return null; // Or throw an error: throw new Error(`Dream with ID ${id} not found.`);
  }
  mockDreams[dreamIndex] = { ...mockDreams[dreamIndex], ...updatedDreamData };
  return mockDreams[dreamIndex];
};

/**
 * Deletes a dream from mockDreams by its ID.
 * @param {string | number} id The ID of the dream to delete.
 * @returns {boolean} True if deletion was successful, false otherwise.
 */
export const deleteDream = (id) => {
  const numericId = typeof id === 'string' ? parseInt(id, 10) : id;
  const initialLength = mockDreams.length;
  const indexToDelete = mockDreams.findIndex(dream => dream.id === numericId);
  if (indexToDelete === -1) {
    return false; // Dream not found
  }
  mockDreams.splice(indexToDelete, 1);
  return mockDreams.length < initialLength;
};

/**
 * Returns a copy of all mock categories.
 * @returns {object[]} A new array containing all categories.
 */
export const getCategories = () => {
  return [...mockCategories]; // Return a copy
};

/**
 * Finds a category by its ID.
 * @param {string | number} id The ID of the category to find.
 * @returns {object | undefined} The category object if found, otherwise undefined.
 */
export const getCategoryById = (id) => {
  return mockCategories.find(category => category.id === id);
};

// Example of how to potentially manage nextDreamId if dreams could be loaded from storage later
// This is more advanced than needed for pure mock data but good for thought:
// export const initializeNextId = () => {
//   if (mockDreams.length > 0) {
//     nextDreamId = Math.max(...mockDreams.map(d => typeof d.id === 'number' ? d.id : 0)) + 1;
//   } else {
//     nextDreamId = 1;
//   }
// };
// initializeNextId(); // Call it if you were loading dreams and wanted to ensure ID uniqueness dynamically
