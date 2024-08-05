import React from "react";
import { Tabs } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const TabsLayout = () => {
    return (
        <>
            <Tabs
                screenOptions={{
                    tabBarShowLabel: false,
                    tabBarActiveTintColor: "#ffa001",
                    tabBarInactiveTintColor: "#cdcde0",
                    tabBarStyle: {
                        backgroundColor: "#161622",
                        borderTopWidth: 1,
                        borderTopColor: "#232533",
                    },
                }}
            >
                <Tabs.Screen
                    name="productos"
                    options={{
                        title: "Inicio",
                        headerShown: false,
                        tabBarIcon: ({ color }) => (
                            <FontAwesome size={28} name="home" color={color} />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="pedidos"
                    options={{
                        title: "Pedidos",
                        headerShown: false,
                        tabBarIcon: ({ color }) => (
                            <FontAwesome size={28} name="truck" color={color} />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="carrito"
                    options={{
                        title: "Carrito",
                        headerShown: false,
                        tabBarIcon: ({ color }) => (
                            <FontAwesome
                                size={28}
                                name="dollar"
                                color={color}
                            />
                        ),
                    }}
                />
            </Tabs>
        </>
    );
};

export default TabsLayout;
