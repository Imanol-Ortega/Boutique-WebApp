import { View, ScrollView, Text, Image, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "../../components/customform/FormField";
import CustomButton from "../../components/custombutton/CustomButton";
import { Link, router } from "expo-router";
import axios from "axios";
import { StatusBar } from "expo-status-bar";
import { useUser } from "../context/UserProvider";

const SignIn = () => {
    const { setUser } = useUser();

    const [form, setform] = useState({
        name: "",
        password: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const submit = async () => {
        try {
            if (!form.name || !form.password) {
                Alert.alert("", "Ingrese todos los campos");
            } else {
                setIsSubmitting(false);
                const response = await axios.post(
                    "http://10.0.2.2:3000/users/login",
                    form
                );
                setUser(response.data);
                console.log(response.data);

                router.replace("/productos");
            }
        } catch (error) {
            Alert.alert("OPPS!", error.response.data.message);
        } finally {
            setIsSubmitting(false);
        }
    };
    return (
        <>
            <SafeAreaView className="bg-black h-full">
                <ScrollView>
                    <StatusBar backgroundColor="#161622" style="light" />
                    <View className="w-full justify-center min-h-[85vh] px-4 my-6">
                        <Image
                            source={require("../static/Logo.jpeg")}
                            className="w-[145px] h-[135px]"
                            resizeMode="contain"
                        />
                        <FormField
                            title="Usuario"
                            value={form.name}
                            handleChangeText={(e) => {
                                setform({ ...form, name: e });
                            }}
                            placeholder="Ingrese su usuario"
                            otherStyles="mt-7"
                            keyboardType="nombre"
                        />
                        <FormField
                            title="Contraseña"
                            value={form.password}
                            handleChangeText={(e) => {
                                setform({ ...form, password: e });
                            }}
                            placeholder="Ingrese su contraseña"
                            otherStyles="mt-7"
                        />
                        <CustomButton
                            title="Iniciar Sesion"
                            handlePress={submit}
                            containerStyles="mt-7 min-h-[62px]"
                            isLoading={isSubmitting}
                        />
                        <View className="justify-center pt-5 flex-row gap-2">
                            <Text className="text-lg text-gray-300 font-normal">
                                No tienes una cuenta?
                            </Text>
                            <Link
                                href="/sign-up"
                                className="text-lg font-semibold text-amber-500"
                            >
                                Registrarse
                            </Link>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    );
};

export default SignIn;
