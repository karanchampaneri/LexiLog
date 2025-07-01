import { useState } from "react";
import { YStack, Input, Button } from "tamagui";

export default function AddWordForm({ onAddWord }) {
  const [word, setWord] = useState("");
  const handleSubmit = () => {
    const trimmedWord = word.trim(); //trim whitespace from the input
    if (trimmedWord) {
      onAddWord(trimmedWord); // send word back to parent (HomeScreen)
      setWord(""); // clear input field
    }
  };

  return (
    <YStack>
      <Input
        placeholder="Enter a new word..."
        value={word}
        onChangeText={setWord}
        width="100%"
      />
      <Button onPress={handleSubmit}>Add Word</Button>
    </YStack>
  );
}
