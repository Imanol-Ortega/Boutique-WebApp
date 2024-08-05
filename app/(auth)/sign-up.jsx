import { View, ScrollView, Text, Image, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "../../components/customform/FormField";
import CustomButton from "../../components/custombutton/CustomButton";
import { Link, router } from "expo-router";
import axios from "axios";
import { StatusBar } from "expo-status-bar";
import RNPickerSelect from "react-native-picker-select";

const SignUp = () => {
    const [form, setform] = useState({
        name: "",
        password: "",
        rol: 2,
    });
    const [cliente, setCliente] = useState({
        clientenombre: "",
        clientetelefono: "",
        clientedireccion: "",
        clientedocumento: "",
        tipodocumentoid: "",
        usuarioid: "",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const submit = async () => {
        try {
            if (
                !form.name ||
                !form.password ||
                !cliente.clientenombre ||
                !cliente.clientedireccion ||
                !cliente.clientedocumento ||
                !cliente.clientetelefono ||
                !cliente.tipodocumentoid
            ) {
                Alert.alert("Error", "Ingrese todos los campos");
            } else {
                setIsSubmitting(false);
                const response = await axios.post(
                    "http://10.0.2.2:3000/users/register",
                    form
                );

                const rp = await axios.post(
                    "http://10.0.2.2:3000/clientes/guardar",
                    {
                        clientenombre: cliente.clientenombre,
                        clientetelefono: cliente.clientetelefono,
                        clientedireccion: cliente.clientedireccion,
                        clientedocumento: cliente.clientedocumento,
                        tipodocumentoid: cliente.tipodocumentoid,
                        usuarioid: response.data.usuarioid,
                    }
                );
                console.log(rp.data);

                router.replace("/sign-in");
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
                            otherStyles="mt-3 "
                            keyboardType="nombre"
                        />
                        <FormField
                            title="Contraseña"
                            value={form.password}
                            handleChangeText={(e) => {
                                setform({ ...form, password: e });
                            }}
                            placeholder="Ingrese su contraseña"
                            otherStyles="mt-3"
                        />

                        <FormField
                            title="Nombre"
                            value={cliente.clientenombre}
                            handleChangeText={(e) => {
                                setCliente({ ...cliente, clientenombre: e });
                            }}
                            placeholder="Ingrese su nombre"
                            otherStyles="mt-3"
                        />

                        <FormField
                            title="Telefono"
                            value={cliente.clientetelefono}
                            handleChangeText={(e) => {
                                setCliente({ ...cliente, clientetelefono: e });
                            }}
                            placeholder="Ingrese su nro de telefono"
                            otherStyles="mt-3"
                        />

                        <FormField
                            title="Direccion"
                            value={cliente.clientedireccion}
                            handleChangeText={(e) => {
                                setCliente({ ...cliente, clientedireccion: e });
                            }}
                            placeholder="Ingrese su direccion"
                            otherStyles="mt-3"
                        />

                        <FormField
                            title="Nro. Documento"
                            value={cliente.clientedocumento}
                            handleChangeText={(e) => {
                                setCliente({ ...cliente, clientedocumento: e });
                            }}
                            placeholder="Ingrese su Nro. Documento"
                            otherStyles="mt-3"
                        />
                        <RNPickerSelect
                            onValueChange={(value) =>
                                setCliente({
                                    ...cliente,
                                    tipodocumentoid: value,
                                })
                            }
                            items={[
                                { label: "CI", value: "1" },
                                { label: "DNI", value: "2" },
                            ]}
                            style={{
                                inputAndroid: {
                                    // Estilos de NativeWind para Android
                                    w: "full",
                                    h: 50,
                                    rounded: "md",
                                    bg: "white",
                                    border: "1px solid gray",
                                    text: "gray-700",
                                    fontSize: 16,
                                    px: 4,
                                    py: 2,
                                },
                            }}
                        />
                        <CustomButton
                            title="Registrarse"
                            handlePress={submit}
                            containerStyles="mt-7 min-h-[62px]"
                            isLoading={isSubmitting}
                        />
                        <View className="justify-center pt-5 flex-row gap-2">
                            <Text className="text-lg text-gray-300 font-normal">
                                Ya tienes una cuenta?
                            </Text>
                            <Link
                                href="/sign-in"
                                className="text-lg font-semibold text-amber-500"
                            >
                                Iniciar Sesion
                            </Link>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    );
};

export default SignUp;
