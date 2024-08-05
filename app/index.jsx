import { StatusBar } from "expo-status-bar";
import { Text, View, ScrollView, Image } from "react-native";
import { router } from "expo-router";
import {
    SafeAreaProvider,
    useSafeAreaInsets,
} from "react-native-safe-area-context";
import CustomButton from "../components/custombutton/CustomButton";
import { useUser } from "./context/UserProvider";

export default function App() {
    const insets = useSafeAreaInsets();

    const { user, setUser } = useUser();

    return (
        <SafeAreaProvider className="bg-black h-full">
            <View
                style={{
                    paddingTop: insets.top,
                    paddingBottom: insets.bottom,
                }}
            >
                <StatusBar backgroundColor="#161622" style="light" />
                <ScrollView contentContainerStyle={{ height: "100%" }}>
                    <View className="w-full h-full justify-center items-center px-4">
                        <Image
                            source={require("./static/Logo.jpeg")}
                            className="w-[200px] h-[180px]"
                            resizeMode="contain"
                        />

                        <View className="relative mt-5">
                            <Text className="text-3xl text-white font-bold text-center">
                                Boutique S.A
                            </Text>
                        </View>
                        {user.length === 0 && (
                            <CustomButton
                                title="Iniciar Sesión"
                                handlePress={() => router.push("/sign-in")}
                                containerStyles="w-full mt-7 min-h-[62px]"
                            />
                        )}
                        {user.length !== 0 && (
                            <>
                                <CustomButton
                                    title="Comprar"
                                    handlePress={() =>
                                        router.push("/productos")
                                    }
                                    containerStyles="w-full mt-7 min-h-[62px]"
                                />
                                <CustomButton
                                    title="Cerrar Sesion"
                                    handlePress={() => {
                                        setUser([]);
                                        router.push("/sign-in");
                                    }}
                                    containerStyles="w-full mt-7 min-h-[62px]"
                                />
                            </>
                        )}
                    </View>
                </ScrollView>
            </View>
        </SafeAreaProvider>
    );
}
