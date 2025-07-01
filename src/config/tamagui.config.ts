import { config as baseConfig } from "@tamagui/config/v3";
import { createTamagui, createFont } from "tamagui";
import { createAnimations } from "@tamagui/animations-react-native";

// Define custom fonts
const appFont = createFont({
  family: "'Inter', 'SF Pro Display', system-ui, sans-serif",
  size: {
    ...baseConfig.fonts.body.size,
    //adjust heading sizes as needed to match design
    8: 28, // use for main headings.
  },
  lineHeight: {
    ...baseConfig.fonts.body.lineHeight,
    // slightly tighter line heights for headings
    8: 32, // use for main headings.
  },
  weight: {
    4: "400", // Regular
    5: "500", // Medium
    6: "600", // Semibold
    7: "700", // Bold
  },
  letterSpacing: {
    4: 0,
    5: -0.25,
    6: -0.5,
    7: -0.5,
    8: -0.75, // Tighter spacing for headings
  },
});

// Define a serif font for pronunciation text
const pronunciationFont = createFont({
  family: "'Georgia', serif",
  size: {
    ...baseConfig.fonts.body.size,
    4: 16, // For pronunciation text
  },
  weight: {
    4: "400",
  },
  letterSpacing: {
    4: 0.2, // Slightly wider for better readability
  },
});

const customThemes = {
  light: {
    background: "#efebe0",
    color: "#0d0d0c",
    primary: "#94c1c1",
    card: "#FFFFFF",
    border: "#f29386",
  },
};

// Extend the default config with custom themes

const tamaguiConfig = createTamagui({
  ...baseConfig,
  fonts: {
    ...baseConfig.fonts,
    body: appFont,
    heading: appFont,
    pronunciation: pronunciationFont, // Add the pronunciation font
  },
  themes: {
    ...baseConfig.themes,
    ...customThemes,
  },
  animations: createAnimations({
    fast: {
      damping: 20,
      mass: 1.2,
      stiffness: 250,
    },
    medium: {
      damping: 10,
      mass: 0.9,
      stiffness: 100,
    },
    slow: {
      damping: 20,
      stiffness: 60,
    },
    quickly: {
      damping: 10,
      mass: 1,
      stiffness: 250,
    },
  }),
});

export type AppConfig = typeof tamaguiConfig;

export default tamaguiConfig;
