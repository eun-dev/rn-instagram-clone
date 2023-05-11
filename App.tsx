import React, { useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import { ThemeProvider } from "styled-components/native";
import { Text, View, useColorScheme } from "react-native";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";

import RootNavigator from "./src/navigation/RootNavigator";
import { darkTheme, lightTheme } from "./styled";

SplashScreen.preventAutoHideAsync();

const App = () => {
  const isDark = useColorScheme() === "dark";

  const [ready, setReady] = useState<boolean>(false);

  const prepare = async () => {
    try {
      await Font.loadAsync(Ionicons.font);

      await new Promise((resolve) => setTimeout(resolve, 2000));
    } catch (e) {
      console.warn(e);
    } finally {
      await SplashScreen.hideAsync();
      setReady(true);
    }
  };

  useEffect(() => {
    if (!ready) {
      prepare();
    }
  }, [ready]);

  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;
