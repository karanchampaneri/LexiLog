const BASE_URL = "https://api.dictionaryapi.dev/api/v2/entries/en";

async function fetchDefinition(word) {
  const url = `${BASE_URL}/${word}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(
        `Error fetching definition for ${word}: ${response.statusText}`
      );
    }

    const data = await response.json();

    // console.log("Fetched data:", data);
    return data[0];
  } catch (error) {
    console.error("Error fetching word:", error);
    throw error;
  }
}

function formatDictionary(entry) {
  const phonetics = entry.phonetics?.filter((p) => p.text || p.audio) || [];
  const definitions = [];

  const audioUrl =
    phonetics.find((p) => p.audio?.includes("-us"))?.audio ||
    phonetics.find(
      (p) => p.audio && !p.audio.includes("-uk") && !p.audio.includes("-au")
    )?.audio ||
    null;

  // Corresponding Phonetic Spelling for North American English
  const phoneticSpelling =
    phonetics.find((p) => p.audio?.includes("-us") && p.text)?.text ||
    phonetics.find((p) => p.text)?.text ||
    null;

  entry.meanings?.forEach((meaning) => {
    const partOfSpeech = meaning.partOfSpeech || "Unknown";
    meaning.definitions?.forEach((def) => {
      definitions.push({
        partOfSpeech,
        definition: def.definition || "No definition available",
        example: def.example || null,
        synonyms: def.synonyms || [],
        antonyms: def.antonyms || [],
      });
    });
  });

  return {
    word: entry.word,
    phonetic: entry.phonetic || phoneticSpelling,
    phoneticSpelling,
    audioUrl,
    origin: entry.origin || null,
    definitions,
  };
}

export async function getFormattedWordData(word) {
  const rawData = await fetchDefinition(word);
  return formatDictionary(rawData);
}

// const word = process.argv[2]; // Replace with the word you want to look up

// if (!word) {
//   console.error("Please provide a word to look up.");
//   process.exit(1);
// }

// fetchDefinition(word)
//   .then((entry) => {
//     const wordData = formatDictionary(entry);
//     console.log(`Word: ${wordData.word}`);
//     console.log(`Phonetic: ${wordData.phonetic || "Unknown"}`);

//     if (wordData.audioUrl) {
//       console.log("Pronunciation audio URL:");
//       console.log(` - ${wordData.audioUrl}`);
//     }

//     if (wordData.origin) {
//       console.log(`Origin: ${wordData.origin}`);
//     }

//     console.log("Definitions:");
//     wordData.definitions.forEach((def, i) => {
//       console.log(` ${i + 1}. (${def.partOfSpeech}) - ${def.definition}`);
//       if (def.example) {
//         console.log(`    Example: "${def.example}"`);
//       }
//     });
//   })
//   .catch((error) => {
//     console.error("Error:", error);
//   });
