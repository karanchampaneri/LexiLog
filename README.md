# LexiLog - Expo + Tamagui App

A React Native application built with Expo and Tamagui UI library for beautiful, performant mobile interfaces.

## 🚀 Features

- **Expo Framework**: Fast development with hot reloading
- **Tamagui UI**: Universal UI system with excellent performance and theming
- **Cross-platform**: Runs on iOS, Android, and Web
- **Modern Stack**: React Native with the latest best practices

## 📦 Tech Stack

- [Expo](https://expo.dev/) - React Native development framework
- [Tamagui](https://tamagui.dev/) - Universal UI system
- [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/) - Smooth animations
- [React Native Safe Area Context](https://github.com/th3rdwave/react-native-safe-area-context) - Safe area handling

## 🛠️ Installation

The project is already set up with all dependencies installed. If you need to reinstall:

```bash
npm install
```

## 🏃‍♂️ Running the App

Start the development server:

```bash
npm start
```

Then choose your platform:

- **iOS**: Press `i` or run `npm run ios`
- **Android**: Press `a` or run `npm run android`
- **Web**: Press `w` or run `npm run web`

## 📁 Project Structure

```
├── App.js                 # Main application component
├── tamagui.config.ts      # Tamagui configuration
├── metro.config.js        # Metro bundler configuration
├── babel.config.js        # Babel configuration
├── assets/               # Static assets (images, fonts, etc.)
└── .github/              # GitHub configuration
    └── copilot-instructions.md
```

## 🎨 Tamagui Usage

Tamagui is now configured and ready to use. Here are some examples:

### Layout Components

```jsx
import { YStack, XStack } from 'tamagui'

// Vertical stack
<YStack space="$4">
  <Text>Item 1</Text>
  <Text>Item 2</Text>
</YStack>

// Horizontal stack
<XStack space="$2" justifyContent="center">
  <Button>Left</Button>
  <Button>Right</Button>
</XStack>
```

### Design Tokens

```jsx
// Use $ prefix for design tokens
<Text
  color="$color" // Theme-aware text color
  fontSize="$6" // Font size token
  margin="$4" // Spacing token
  backgroundColor="$background" // Theme-aware background
>
  Hello Tamagui!
</Text>
```

### Theming

```jsx
// Use theme variants
<Button theme="active">Active Button</Button>
<Button theme="blue">Blue Button</Button>
```

## 🌈 Customization

### Modifying Themes

Edit `tamagui.config.ts` to customize colors, fonts, and spacing:

```typescript
import { config } from "@tamagui/config/v3";
import { createTamagui } from "tamagui";

// Customize the config here
const tamaguiConfig = createTamagui({
  ...config,
  // Add your customizations
});
```

### Adding New Components

Create reusable components using Tamagui's styled system:

```jsx
import { styled, YStack } from "tamagui";

const Card = styled(YStack, {
  backgroundColor: "$background",
  borderRadius: "$4",
  padding: "$4",
  shadowColor: "$shadowColor",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 4,
});
```

## 📱 Platform Support

- ✅ iOS
- ✅ Android
- ✅ Web

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Troubleshooting

### Common Issues

1. **Metro bundler issues**: Clear cache with `npx expo start --clear`
2. **Node modules issues**: Delete `node_modules` and run `npm install`
3. **Tamagui not working**: Ensure `metro.config.js` and `babel.config.js` are properly configured

### Getting Help

- [Expo Documentation](https://docs.expo.dev/)
- [Tamagui Documentation](https://tamagui.dev/docs)
- [React Native Documentation](https://reactnative.dev/docs/getting-started)

---

Happy coding! 🎉
