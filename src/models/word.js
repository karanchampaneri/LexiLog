export class Word {
  constructor(word, pronunciation, audioUrl, type, definition, example) {
    this.word = word;
    this.pronunciation = pronunciation;
    this.audioUrl = audioUrl || ""; // Placeholder for audio URL if needed
    this.type = type; // e.g., noun, verb, adjective
    this.definition = definition;
    this.example = example;
    this.createdAt = new Date();
  }
}
