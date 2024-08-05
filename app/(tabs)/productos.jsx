import { View, Text, StatusBar, FlatList, Image } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import CustomButton from "../../components/custombutton/CustomButton";
import { router } from "expo-router";
import { useUser } from "../context/UserProvider";

const Productos = () => {
    const { buyProducts } = useUser();

    const [productos, setProductos] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const cargarProductos = async () => {
        try {
            const rp = await axios.get(
                "http://10.0.2.2:3000/productos/obtener"
            );

            setProductos(rp.data);
            setIsLoading(true);
        } catch (error) {
            console.log(error);
        }
    };
    const handdleBuy = (item) => {
        buyProducts(item);
    };

    useEffect(() => {
        cargarProductos();
    }, []);

    return (
        <>
            <StatusBar backgroundColor="#161622" style="light" />
            <View className="flex-1 bg-black justify-center items-center px-4 ">
                <Text className="text-white mt-10 text-lg font-semibold">
                    Productos
                </Text>
                {!isLoading && (
                    <Text className="text-white">Cargando ....</Text>
                )}
                {isLoading && (
                    <FlatList
                        data={productos}
                        renderItem={({ item }) => (
                            <View className="flex flex-col items-center mt-7 border-2 border-gray-400 rounded-md justify-center h-80 mb-5">
                                <Image
                                    source={{ uri: item.productoimagen }}
                                    className="w-40 h-32 rounded-md"
                                    resizeMode="contain"
                                />
                                <View>
                                    <Text className="text-white mt-5 text-lg font-semibold text-left">
                                        {item.productonombre}
                                    </Text>
                                    <Text className="text-white">
                                        {item.productodescripcion}
                                    </Text>
                                    <Text className="text-amber-500 font-bold text-base">
                                        {item.productoprecio}
                                    </Text>
                                    <CustomButton
                                        title="Agregar al Carrito"
                                        handlePress={() => handdleBuy(item)}
                                        containerStyles="bg-amber-500 px-4 py-2 mt-4"
                                    />
                                </View>
                            </View>
                        )}
                        keyExtractor={(item) => item.productoid}
                    />
                )}
            </View>
        </>
    );
};

export default Productos;
