import { Stack } from 'expo-router';
import { useColorScheme } from '~/lib/useColorScheme';
import { ThemeProvider, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NAV_THEME } from '~/lib/constants';

const LIGHT_THEME = { ...DefaultTheme, colors: NAV_THEME.light };
const DARK_THEME = { ...DarkTheme, colors: NAV_THEME.dark };

export default function RootLayout() {
  const { isDarkColorScheme } = useColorScheme();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
        <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
            <Stack>
                <Stack.Screen name="(drawer)" options={{ headerShown: false }} />

                <Stack.Screen name="products/[id]" />
            </Stack>
        </ThemeProvider>
    </GestureHandlerRootView>
  );
}