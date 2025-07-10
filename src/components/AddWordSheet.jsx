import { useState, useCallback, useMemo, useRef, useEffect } from "react";
import { YStack, Button, Text, useTheme } from "tamagui";
import BottomSheet, {
  BottomSheetView,
  BottomSheetBackdrop,
  BottomSheetTextInput,
} from "@gorhom/bottom-sheet";

import { getFormattedWordData } from "../utils/dictionaryApi";

async function handleAddWord(userInput) {
  try {
    const wordData = await getFormattedWordData(userInput);

    const newWord = {
      word: wordData.word,
      pronunciation: wordData.phonetic || wordData.phoneticSpelling || "",
      type: wordData.definitions?.[0]?.partOfSpeech || "",
      definition: wordData.definitions?.[0]?.definition || "",
      example: wordData.definitions?.[0]?.example || "",
    };
    return newWord;
  } catch (error) {
    console.error("Error fetching word data:", error);
    throw error;
  }
}

export default function AddWordSheet({ open, onOpenChange, onAddWord }) {
  const [word, setWord] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const bottomSheetRef = useRef(null);
  const theme = useTheme();

  // Back to smaller snap point since we only need one input
  const snapPoints = useMemo(() => ["45%"], []);

  // Handle open/close via ref
  useEffect(() => {
    if (open) {
      bottomSheetRef.current?.expand();
    } else {
      bottomSheetRef.current?.close();
    }
  }, [open]);

  // Backdrop component
  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.6}
        onPress={() => onOpenChange(false)}
      />
    ),
    [onOpenChange]
  );

  const handleSubmit = async () => {
    const trimmedWord = word.trim();
    if (trimmedWord && !isSubmitting) {
      setIsSubmitting(true);
      try {
        // Create word object with just the word, other fields will be auto-filled by API
        // const wordData = {
        //   word: trimmedWord,
        //   pronunciation: "", // Will be filled by dictionary API
        //   type: "", // Will be filled by dictionary API
        //   definition: "", // Will be filled by dictionary API
        //   example: "", // Will be filled by dictionary API
        // };

        await onAddWord(trimmedWord);

        // Clear form field
        setWord("");

        onOpenChange(false); // close the sheet
      } catch (error) {
        console.error("Error adding word:", error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleClose = () => {
    // Clear form field when closing
    setWord("");
    setIsSubmitting(false);
    onOpenChange(false);
  };

  const handleSheetChanges = useCallback(
    (index) => {
      if (index === -1) {
        // Clear form field when sheet closes
        setWord("");
        setIsSubmitting(false);
        onOpenChange(false);
      }
    },
    [onOpenChange]
  );

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      backdropComponent={renderBackdrop}
      enablePanDownToClose
      keyboardBehavior="interactive"
      keyboardBlurBehavior="restore"
      android_keyboardInputMode="adjustResize"
      style={{ zIndex: 1000 }}
    >
      <BottomSheetView style={{ flex: 1, padding: 24 }}>
        <YStack gap="$4" flex={1}>
          <Text fontSize="$6" fontWeight="bold" textAlign="center" mb="$2">
            Add New Word
          </Text>

          <Text
            fontSize="$4"
            color="$color"
            opacity={0.7}
            textAlign="center"
            mb="$3"
          >
            Enter a word and we'll look up the definition for you
          </Text>

          {/* Word Input - Only field needed */}
          <BottomSheetTextInput
            placeholder="Enter a word..."
            value={word}
            onChangeText={setWord}
            onSubmitEditing={handleSubmit}
            returnKeyType="done"
            autoCapitalize="none"
            autoCorrect={false}
            style={{
              backgroundColor: theme.color2?.val || "#f8f9fa",
              borderWidth: 1,
              borderColor: theme.color6?.val || "#e9ecef",
              borderRadius: 12,
              paddingHorizontal: 16,
              paddingVertical: 14,
              fontSize: 18,
              color: theme.color12?.val || "#212529",
              marginBottom: 16,
              textAlign: "center",
              fontWeight: "500",
            }}
            placeholderTextColor={theme.color9?.val || "#6c757d"}
          />

          <YStack gap="$3">
            <Button
              theme="active"
              onPress={handleSubmit}
              disabled={!word.trim() || isSubmitting}
              size="$4"
            >
              {isSubmitting ? "Adding word..." : "Add Word"}
            </Button>

            <Button
              variant="outlined"
              onPress={handleClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
          </YStack>
        </YStack>
      </BottomSheetView>
    </BottomSheet>
  );
}
