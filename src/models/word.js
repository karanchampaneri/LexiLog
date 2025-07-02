export class Word {
  constructor(word, pronunciation, type, definition, example) {
    this.word = word;
    this.pronunciation = pronunciation;
    this.type = type; // e.g., noun, verb, adjective
    this.definition = definition;
    this.example = example;
    this.createdAt = new Date();
  }
}
