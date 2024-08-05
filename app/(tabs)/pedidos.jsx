import { View, Text, StatusBar, FlatList } from "react-native";
import React, { useEffect, useState } from "react";

import axios from "axios";
import { useUser } from "../context/UserProvider";
import CustomButton from "../../components/custombutton/CustomButton";

const Pedidos = () => {
    const { user, compra } = useUser();
    const cliente = user.cliente;
    const [pedidos, setPedidos] = useState([]);
    const cargarPedidos = async () => {
        try {
            const rp = await axios.get(
                `http://10.0.2.2:3000/pedidos/clientes/${cliente}`
            );
            console.log(rp.data);
            setPedidos(rp.data);
        } catch (error) {
            console.log(error);
        }
    };
    const convertirFecha = (fecha) => {
        const date = new Date(fecha);
        const formatteDate = date.toLocaleDateString();
        return formatteDate;
    };
    const cancelarPedido = async (id) => {
        try {
            const rp = await axios.put(
                `http://10.0.2.2:3000/pedidos/actualizar/estado/${id}`,
                { pedidoestado: "C" }
            );
            setPedidos(pedidos.filter((pedido) => pedido.pedidoid !== id));
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        cargarPedidos();
    }, [compra]);
    return (
        <>
            <StatusBar backgroundColor="#161622" style="light" />
            <View className="flex-1 bg-black justify-center items-center px-4 ">
                <Text className="text-white mt-10 text-lg font-semibold">
                    Pedidos
                </Text>
                {pedidos.length === 0 && (
                    <Text className="text-white mt-10 text-lg font-semibold">
                        No hay nada por Aqui!!
                    </Text>
                )}
                <FlatList
                    data={pedidos}
                    renderItem={({ item }) => (
                        <View className="flex flex-row w-80 items-center mt-10 border-2 border-gray-400 rounded-md justify-center h-180 mb-5">
                            <View>
                                <Text className="text-white mt-5 text-lg font-semibold text-left">
                                    ID: {item.pedidoid}
                                </Text>
                                <Text className="text-white font-bold text-base">
                                    Fecha:{" "}
                                    {convertirFecha(item.pedidofchpedido)}
                                </Text>
                                <Text className="text-white font-bold text-base">
                                    Total: {item.pedidototal}
                                </Text>
                                <Text className="text-white font-bold text-base">
                                    Estado:{" "}
                                    {item.pedidoestado === "P"
                                        ? "Pedido"
                                        : item.pedidoestado === "C"
                                          ? "Cancelado"
                                          : "Entregado"}
                                </Text>
                                <View>
                                    <CustomButton
                                        title="Cancelar"
                                        handlePress={() =>
                                            cancelarPedido(item.pedidoid)
                                        }
                                        containerStyles="bg-amber-500 px-4 py-2 mt-2 mb-2 "
                                    />
                                </View>
                            </View>
                        </View>
                    )}
                    keyExtractor={(item) => item.pedidoid}
                />
            </View>
        </>
    );
};

export default Pedidos;
