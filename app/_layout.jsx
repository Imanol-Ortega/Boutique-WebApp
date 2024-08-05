import React from "react";
import { Stack } from "expo-router";
import { UserContextProvider } from "./context/UserProvider";

const RootLayout = () => {
    return (
        <UserContextProvider>
            <Stack>
                <Stack.Screen name="index" options={{ headerShown: false }} />
                <Stack.Screen name="(auth)" options={{ headerShown: false }} />
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            </Stack>
        </UserContextProvider>
    );
};

export default RootLayout;
