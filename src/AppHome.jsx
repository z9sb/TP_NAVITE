import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import MiniDrawer from "./index.jsx";


const Stack = createStackNavigator();

export default function AppHome() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="MiniDrawer" component={MiniDrawer} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
