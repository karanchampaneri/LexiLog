// Simple counter for generating incremental IDs
let nextId = 0;

export class Word {
  constructor(word, pronunciation, type, definition, example) {
    this.id = nextId++;
    this.word = word;
    this.pronunciation = pronunciation;
    this.type = type; // e.g., noun, verb, adjective
    this.definition = definition;
    this.example = example;
    this.createdAt = new Date();
  }

  // Initialize the counter based on existing words
  static initializeCounter(existingWords) {
    if (existingWords && existingWords.length > 0) {
      const maxId = Math.max(...existingWords.map((word) => word.id || 0));
      nextId = maxId + 1;
    } else {
      nextId = 0;
    }
  }
}
