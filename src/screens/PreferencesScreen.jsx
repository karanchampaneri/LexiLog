import React, {
  useCallback,
  useMemo,
  useRef,
  useEffect,
  useState,
} from "react";
import {
  YStack,
  XStack,
  Text,
  Button,
  Separator,
  ScrollView,
  Card,
  Switch,
} from "tamagui";

import BottomSheet, {
  BottomSheetView,
  BottomSheetBackdrop,
} from "@gorhom/bottom-sheet";

export default function PreferencesScreen({ open, onOpenChange }) {
  const bottomSheetRef = useRef(null);
  const [contentHeight, setContentHeight] = useState(200);
  const [isDarkMode, setIsDarkMode] = useState(false); // Dummy state for testing

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
