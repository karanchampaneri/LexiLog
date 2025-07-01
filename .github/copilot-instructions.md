<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# LexiLog - Expo + Tamagui Project

This is a React Native project built with Expo and Tamagui UI library.

## Tech Stack

- **Expo**: React Native framework for mobile development
- **Tamagui**: Universal UI system with excellent performance
- **React Native Reanimated**: For smooth animations
- **TypeScript**: For type safety (config files)

## Key Files

- `tamagui.config.ts`: Tamagui configuration and theme setup
- `App.js`: Main application component with TamaguiProvider
- `metro.config.js`: Metro bundler configuration for Tamagui
- `babel.config.js`: Babel configuration with React Native Reanimated plugin

## Development Guidelines

1. Use Tamagui components instead of React Native core components when possible
2. Leverage Tamagui's design tokens for consistent spacing, colors, and typography
3. Use YStack and XStack for layout instead of View with flexDirection
4. Take advantage of Tamagui's theme system for dark/light mode support
5. Use Tamagui's animation props for smooth interactions

## Tamagui Best Practices

- Use `$` prefix for design tokens (e.g., `$4` for spacing, `$color` for text color)
- Use theme variants like `theme="active"` or `theme="blue"` for component styling
- Leverage Tamagui's responsive props for different screen sizes
- Use Tamagui's built-in accessibility features
