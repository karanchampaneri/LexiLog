import { useState, useCallback, useMemo, useRef, useEffect } from "react";
import { YStack, Button, Text, useTheme } from "tamagui";
import BottomSheet, {
  BottomSheetView,
  BottomSheetBackdrop,
  BottomSheetTextInput,
} from "@gorhom/bottom-sheet";

export default function AddWordSheet({ open, onOpenChange, onAddWord }) {
  const [word, setWord] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const bottomSheetRef = useRef(null);
  const theme = useTheme();

  // Use a larger snap point that works well with keyboard
  const snapPoints = useMemo(() => ["50%"], []);

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
        await onAddWord(trimmedWord); // send word back to parent (HomeScreen)
        setWord(""); // clear input field
        onOpenChange(false); // close the sheet
      } catch (error) {
        console.error("Error adding word:", error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleClose = () => {
    setWord(""); // clear input when closing
    setIsSubmitting(false);
    onOpenChange(false);
  };

  const handleSheetChanges = useCallback(
    (index) => {
      if (index === -1) {
        setWord(""); // Clear input when sheet closes
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
        <YStack space="$4" flex={1}>
          <Text fontSize="$6" fontWeight="bold" textAlign="center" mb="$2">
            Add New Word
          </Text>

          <BottomSheetTextInput
            placeholder="Enter a new word..."
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
              fontSize: 16,
              color: theme.color12?.val || "#212529",
              marginBottom: 16,
            }}
            placeholderTextColor={theme.color9?.val || "#6c757d"}
          />

          <YStack space="$3">
            <Button
              theme="active"
              onPress={handleSubmit}
              disabled={!word.trim() || isSubmitting}
            >
              {isSubmitting ? "Adding..." : "Add Word"}
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
