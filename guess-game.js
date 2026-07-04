// ========================================
// Guess Game - Who Am I?
// ========================================
// 📝 This game practices Spanish vocabulary
// through context clues about professions

const guessClues = [
    {
        id: 1,
        emoji: "🏥",
        clueEs: "Trabaja en un hospital. Ayuda a los enfermos y los cuida.",
        clueEn: "Works in a hospital. Helps and takes care of sick people.",
        answer: "Enfermera",
        answerEn: "Nurse",
        options: ["Médico", "Enfermera", "Policía", "Cocinero"]
    },
    {
        id: 2,
        emoji: "🔥",
        clueEs: "Tiene un camión rojo. Apaga incendios y rescata gatos.",
        clueEn: "Has a red truck. Puts out fires and rescues cats.",
        answer: "Bombero",
        answerEn: "Firefighter",
        options: ["Bombero", "Policía", "Piloto", "Ingeniero"]
    },
    {
        id: 3,
        emoji: "🏫",
        clueEs: "Trabaja en una escuela. Enseña español y matemáticas.",
        clueEn: "Works at a school. Teaches Spanish and math.",
        answer: "Profesor",
        answerEn: "Teacher",
        options: ["Profesor", "Artista", "Músico", "Abogado"]
    },
    {
        id: 4,
        emoji: "✈️",
        clueEs: "Vuela aviones grandes. Viaja por todo el mundo.",
        clueEn: "Flies big planes. Travels around the world.",
        answer: "Piloto",
        answerEn: "Pilot",
        options: ["Bombero", "Piloto", "Ingeniero", "Cocinero"]
    },
    {
        id: 5,
        emoji: "🍳",
        clueEs: "Trabaja en un restaurante. Prepara deliciosa comida.",
        clueEn: "Works in a restaurant. Prepares delicious food.",
        answer: "Cocinero",
        answerEn: "Chef",
        options: ["Cocinero", "Médico", "Policía", "Artista"]
    },
    {
        id: 6,
        emoji: "⚖️",
        clueEs: "Defiende a la gente en el tribunal. Conoce las leyes.",
        clueEn: "Defends people in court. Knows the laws.",
        answer: "Abogado",
        answerEn: "Lawyer",
        options: ["Profesor", "Ingeniero", "Abogado", "Músico"]
    },
    {
        id: 7,
        emoji: "🎨",
        clueEs: "Pinta cuadros bonitos. Trabaja en un estudio.",
        clueEn: "Paints beautiful pictures. Works in a studio.",
        answer: "Artista",
        answerEn: "Artist",
        options: ["Músico", "Artista", "Enfermera", "Bombero"]
    },
    {
        id: 8,
        emoji: "🎵",
        clueEs: "Toca la guitarra y canta canciones. Actúa en conciertos.",
        clueEn: "Plays guitar and sings songs. Performs at concerts.",
        answer: "Músico",
        answerEn: "Musician",
        options: ["Artista", "Cocinero", "Músico", "Piloto"]
    },
    {
        id: 9,
        emoji: "👮",
        clueEs: "Cuida la ciudad. Para a los coches malos.",
        clueEn: "Protects the city. Stops bad cars.",
        answer: "Policía",
        answerEn: "Police Officer",
        options: ["Bombero", "Policía", "Abogado", "Enfermera"]
    },
    {
        id: 10,
        emoji: "🐾",
        clueEs: "Cuida a los perros y gatos. Trabaja en una clínica para animales.",
        clueEn: "Takes care of dogs and cats. Works in a clinic for animals.",
        answer: "Veterinario",
        answerEn: "Veterinarian",
        options: ["Médico", "Veterinario", "Policía", "Artista"]
    }
];

// Shuffle array helper
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { guessClues, shuffleArray };
}
