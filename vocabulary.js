// ========================================
// Vocabulary - Las Profesiones
// ========================================
// 📝 How to edit content:
// 1. Add a new profession to the vocabulary array
// 2. Use an emoji for visual representation
// 3. Add example sentences in Spanish and English

const vocabulary = [
    {
        id: 1,
        spanish: "Médico",
        english: "Doctor",
        emoji: "👨‍⚕️",
        example: "El médico cura a los pacientes.",
        exampleEn: "The doctor cures the patients.",
        workplace: "Hospital",
        workplaceEs: "Hospital"
    },
    {
        id: 2,
        spanish: "Bombero",
        english: "Firefighter",
        emoji: "🧑‍🚒",
        example: "El bombero apaga el incendio.",
        exampleEn: "The firefighter puts out the fire.",
        workplace: "Fire Station",
        workplaceEs: "Cuartel de bomberos"
    },
    {
        id: 3,
        spanish: "Profesor",
        english: "Teacher",
        emoji: "👨‍🏫",
        example: "El profesor enseña español.",
        exampleEn: "The teacher teaches Spanish.",
        workplace: "School",
        workplaceEs: "Escuela"
    },
    {
        id: 4,
        spanish: "Enfermera",
        english: "Nurse",
        emoji: "👩‍⚕️",
        example: "La enfermera ayuda a los enfermos.",
        exampleEn: "The nurse helps the sick people.",
        workplace: "Hospital",
        workplaceEs: "Hospital"
    },
    {
        id: 5,
        spanish: "Policía",
        english: "Police Officer",
        emoji: "👮",
        example: "El policía cuida la ciudad.",
        exampleEn: "The police officer protects the city.",
        workplace: "Police Station",
        workplaceEs: "Comisaría"
    },
    {
        id: 6,
        spanish: "Cocinero",
        english: "Chef",
        emoji: "👨‍🍳",
        example: "El cocinero prepara la comida.",
        exampleEn: "The chef prepares the food.",
        workplace: "Restaurant",
        workplaceEs: "Restaurante"
    },
    {
        id: 7,
        spanish: "Piloto",
        english: "Pilot",
        emoji: "👨‍✈️",
        example: "El piloto vuela el avión.",
        exampleEn: "The pilot flies the plane.",
        workplace: "Airport",
        workplaceEs: "Aeropuerto"
    },
    {
        id: 8,
        spanish: "Abogado",
        english: "Lawyer",
        emoji: "⚖️",
        example: "El abogado defiende al cliente.",
        exampleEn: "The lawyer defends the client.",
        workplace: "Court",
        workplaceEs: "Tribunal"
    },
    {
        id: 9,
        spanish: "Ingeniero",
        english: "Engineer",
        emoji: "👨‍💻",
        example: "El ingeniero diseña puentes.",
        exampleEn: "The engineer designs bridges.",
        workplace: "Office",
        workplaceEs: "Oficina"
    },
    {
        id: 10,
        spanish: "Artista",
        english: "Artist",
        emoji: "🎨",
        example: "La artista pinta cuadros.",
        exampleEn: "The artist paints pictures.",
        workplace: "Studio",
        workplaceEs: "Estudio"
    },
    {
        id: 11,
        spanish: "Músico",
        english: "Musician",
        emoji: "🎵",
        example: "El músico toca la guitarra.",
        exampleEn: "The musician plays the guitar.",
        workplace: "Concert Hall",
        workplaceEs: "Sala de conciertos"
    },
    {
        id: 12,
        spanish: "Veterinario",
        english: "Veterinarian",
        emoji: "🐾",
        example: "El veterinario cuida a los animales.",
        exampleEn: "The veterinarian takes care of the animals.",
        workplace: "Vet Clinic",
        workplaceEs: "Clínica veterinaria"
    }
];

// Quiz questions - NO DUPLICATES
const quizQuestions = [
    // Spanish → English (5 questions)
    {
        type: "translation",
        question: 'What is "Médico" in English?',
        correctAnswer: "Doctor",
        options: ["Teacher", "Doctor", "Firefighter", "Chef"]
    },
    {
        type: "translation",
        question: 'What is "Bombero" in English?',
        correctAnswer: "Firefighter",
        options: ["Police Officer", "Firefighter", "Pilot", "Lawyer"]
    },
    {
        type: "translation",
        question: 'What is "Enfermera" in English?',
        correctAnswer: "Nurse",
        options: ["Doctor", "Teacher", "Nurse", "Artist"]
    },
    {
        type: "translation",
        question: 'What is "Cocinero" in English?',
        correctAnswer: "Chef",
        options: ["Pilot", "Chef", "Engineer", "Musician"]
    },
    {
        type: "translation",
        question: 'What is "Ingeniero" in English?',
        correctAnswer: "Engineer",
        options: ["Lawyer", "Engineer", "Artist", "Doctor"]
    },
    // English → Spanish (5 questions)
    {
        type: "reverse",
        question: 'How do you say "Teacher" in Spanish?',
        correctAnswer: "Profesor",
        options: ["Policía", "Profesor", "Médico", "Artista"]
    },
    {
        type: "reverse",
        question: 'How do you say "Pilot" in Spanish?',
        correctAnswer: "Piloto",
        options: ["Piloto", "Abogado", "Bombero", "Cocinero"]
    },
    {
        type: "reverse",
        question: 'How do you say "Lawyer" in Spanish?',
        correctAnswer: "Abogado",
        options: ["Ingeniero", "Músico", "Abogado", "Enfermera"]
    },
    {
        type: "reverse",
        question: 'How do you say "Musician" in Spanish?',
        correctAnswer: "Músico",
        options: ["Artista", "Músico", "Policía", "Piloto"]
    },
    {
        type: "reverse",
        question: 'How do you say "Artist" in Spanish?',
        correctAnswer: "Artista",
        options: ["Artista", "Cocinero", "Profesor", "Bombero"]
    }
];

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { vocabulary, quizQuestions };
}
