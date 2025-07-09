import React, {
  useCallback,
  useMemo,
  useRef,
  useEffect,
  useState,
} from "react";
import { YStack, XStack, Text, Button, Card, Switch } from "tamagui";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase"; // Adjust the import path as needed
import { useWords } from "../context/WordContext";

import BottomSheet, {
  BottomSheetView,
  BottomSheetBackdrop,
} from "@gorhom/bottom-sheet";
import { X } from "@tamagui/lucide-icons";

export default function PreferencesScreen({ open, onOpenChange }) {
  const bottomSheetRef = useRef(null);
  const [contentHeight, setContentHeight] = useState(200);
  const [isDarkMode, setIsDarkMode] = useState(false); // Dummy state for testing
  const [isDeleting, setIsDeleting] = useState(false);
  const { words, deleteAllWords } = useWords(); // Add deleteAllWords method

  // Dynamic snap points based on content
  const snapPoints = useMemo(() => {
    const minHeight = 200; // Minimum height
    const maxHeight = 600; // Maximum height
    const calculatedHeight = Math.min(
      Math.max(contentHeight + 100, minHeight),
      maxHeight
    ); // +100 for header
    return [calculatedHeight];
  }, [contentHeight]);

  // Handle content layout to measure height
  const handleContentLayout = useCallback((event) => {
    const { height } = event.nativeEvent.layout;
    setContentHeight(height);
  }, []);

  // Handle delete all words
  const handleDeleteAllWords = useCallback(async () => {
    if (words.length === 0) return;

    setIsDeleting(true);
    try {
      await deleteAllWords();
      console.log("All words deleted successfully");
    } catch (error) {
      console.error("Error deleting all words:", error);
    } finally {
      setIsDeleting(false);
    }
  }, [deleteAllWords, words.length]);

  const handleLogout = useCallback(async () => {
    try {
      await signOut(auth);
      console.log("User signed out successfully");
    } catch (error) {
      console.error("Sign out error:", error);
    }
  }, []);

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

  const handleSheetChanges = useCallback(
    (index) => {
      if (index === -1) {
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
      style={{ zIndex: 1000 }}
    >
      <BottomSheetView style={{ flex: 1 }}>
        <YStack flex={1}>
          {/* Header */}
          <XStack
            alignItems="center"
            justifyContent="space-between"
            padding="$4"
            paddingTop="$2"
            borderBottomWidth={1}
            borderBottomColor="$borderColor"
          >
            <Text fontSize="$6" fontWeight="bold" color="$color">
              Preferences
            </Text>
            <YStack width={60} />
          </XStack>

          {/* Content Area */}
          <YStack padding="$4" gap="$4" onLayout={handleContentLayout}>
            {/* Dark Mode Toggle */}
            <Card
              backgroundColor="$card"
              padding="$4"
              borderRadius="$4"
              borderWidth={1}
              borderColor="$border"
            >
              <XStack alignItems="center" justifyContent="space-between">
                <YStack flex={1} gap="$1">
                  <Text fontSize="$4" fontWeight="500" color="$color">
                    Dark Mode
                  </Text>
                  <Text fontSize="$3" color="$color" opacity={0.6}>
                    Switch between light and dark themes
                  </Text>
                </YStack>

                <Switch
                  size="$3"
                  checked={isDarkMode}
                  onCheckedChange={setIsDarkMode}
                  animation={"quickly"}
                >
                  <Switch.Thumb />
                </Switch>
              </XStack>
            </Card>

            <Card
              backgroundColor="$card"
              padding="$4"
              borderRadius="$4"
              borderWidth={1}
              borderColor="$border"
            >
              <XStack alignItems="center" justifyContent="space-between">
                <YStack flex={1} gap="$1">
                  <Text fontSize="$4" fontWeight="500" color="$color">
                    Account
                  </Text>
                  <Text fontSize="$3" color="$color" opacity={0.6}>
                    Manage your profile and sign-in
                  </Text>
                </YStack>

                {/* Optional: Replace with an icon if you prefer */}
                <Text fontSize="$6" opacity={0.3}>
                  ›
                </Text>
              </XStack>
            </Card>

            {/* Debug Section */}
            <Card
              backgroundColor="$card"
              padding="$4"
              borderRadius="$4"
              borderWidth={1}
              borderColor="$border"
            >
              <YStack gap="$3">
                <XStack alignItems="center" justifyContent="space-between">
                  <YStack flex={1} gap="$1">
                    <Text fontSize="$4" fontWeight="500" color="$color">
                      Debug Tools
                    </Text>
                    <Text fontSize="$3" color="$color" opacity={0.6}>
                      {words.length} words stored
                    </Text>
                  </YStack>
                </XStack>

                <Button
                  theme="red"
                  onPress={handleDeleteAllWords}
                  disabled={words.length === 0 || isDeleting}
                  size="$3"
                >
                  <Text>
                    {isDeleting
                      ? "Deleting..."
                      : words.length === 0
                      ? "No words to delete"
                      : `Delete All ${words.length} Words`}
                  </Text>
                </Button>
              </YStack>
            </Card>

            <Card
              backgroundColor="$card"
              padding="$4"
              borderRadius="$4"
              borderWidth={1}
              borderColor="$border"
              onPress={handleLogout}
            >
              <XStack alignItems="center" justifyContent="space-between">
                <YStack flex={1} gap="$1">
                  <Text fontSize="$4" fontWeight="500" color="$color">
                    Log Out
                  </Text>
                  <Text fontSize="$3" color="$color" opacity={0.6}>
                    Sign out of your account
                  </Text>
                </YStack>
                <Text fontSize="$6" opacity={0.3}>
                  ⎋
                </Text>
              </XStack>
            </Card>

            {/* Placeholder text */}
            <Text fontSize="$3" color="$color" opacity={0.4} textAlign="center">
              More settings will appear here...
            </Text>
          </YStack>
        </YStack>
      </BottomSheetView>
    </BottomSheet>
  );
}
