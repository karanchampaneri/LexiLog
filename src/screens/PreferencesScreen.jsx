import React from "react";
import {
  YStack,
  XStack,
  Text,
  Button,
  Separator,
  ScrollView,
  Card,
} from "tamagui";

export default function PreferencesScreen(props) {
  const { onBack } = props;

  return (
    <YStack flex={1} backgroundColor="$background">
      {/* Header */}
      <XStack
        alignItems="center"
        justifyContent="space-between"
        padding="$4"
        paddingTop="$6"
        borderBottomWidth={1}
        borderBottomColor="$borderColor"
      >
        <Button
          size="$3"
          variant="outlined"
          onPress={onBack}
          color="$color"
          borderColor="$borderColor"
        >
          <Text>← Back</Text>
        </Button>
        <Text fontSize="$6" fontWeight="bold" color="$color">
          Preferences
        </Text>
        <YStack width={60} />
      </XStack>

      <ScrollView flex={1}>
        <YStack padding="$4" gap="$6">
          {/* General Settings Section */}
          <YStack gap="$4">
            <Text fontSize="$5" fontWeight="600" color="$color">
              📱 General
            </Text>

            <Card
              backgroundColor="$card"
              padding="$4"
              borderRadius="$4"
              borderWidth={1}
              borderColor="$borderColor"
              opacity={0.6}
            >
              <YStack gap="$3">
                <Text fontSize="$4" fontWeight="500" color="$color">
                  Coming Soon
                </Text>
                <YStack gap="$2">
                  <Text fontSize="$3" color="$gray10">
                    • Push Notifications
                  </Text>
                  <Text fontSize="$3" color="$gray10">
                    • Export & Import Data
                  </Text>
                  <Text fontSize="$3" color="$gray10">
                    • Language Settings
                  </Text>
                  <Text fontSize="$3" color="$gray10">
                    • Font Size Options
                  </Text>
                </YStack>
              </YStack>
            </Card>
          </YStack>

          <Separator />

          {/* About Section */}
          <YStack gap="$4">
            <Text fontSize="$5" fontWeight="600" color="$color">
              ℹ️ About
            </Text>

            <Card
              backgroundColor="$card"
              padding="$4"
              borderRadius="$4"
              borderWidth={1}
              borderColor="$borderColor"
            >
              <YStack gap="$3" alignItems="center">
                <Text fontSize="$6" fontWeight="bold" color="$color">
                  📘 LexiLog
                </Text>
                <Text fontSize="$3" color="$gray10" textAlign="center">
                  Your personal vocabulary builder
                </Text>
                <Text fontSize="$2" color="$gray9" textAlign="center">
                  Version 1.0.0
                </Text>
              </YStack>
            </Card>
          </YStack>

          {/* Bottom Spacing */}
          <YStack height={40} />
        </YStack>
      </ScrollView>
    </YStack>
  );
}
