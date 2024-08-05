import { View, Text, FlatList, Image, StatusBar } from "react-native";
import React, { useEffect, useState } from "react";
import { useUser } from "../context/UserProvider";
import axios from "axios";
import CustomButton from "../../components/custombutton/CustomButton";
import { SelectList } from "react-native-dropdown-select-list";

const Carrito = () => {
    const { compra, user, setCompra } = useUser();
    const [tallas, setTallas] = useState([]);
    const [colores, setColores] = useState([]);
    const [selectedTalla, setSelectedTalla] = useState("");
    const [selectedColor, setSelectedColor] = useState("");
    const [detalle, setDetalle] = useState([]);

    const obtenerProducto = async (id) => {
        // funcion para traer las tallas y colores de cada producto
        try {
            const rp = await axios.get(
                `http://10.0.2.2:3000/productos/obtener/${id}`
            );

            let newArrayTalla = rp.data.tallas.map((item) => {
                return { key: item.tallaid, value: item.tallanombre };
            });
            let newArrayColor = rp.data.colores.map((item) => {
                return { key: item.colorid, value: item.colornombre };
            });
            setTallas(newArrayTalla);
            setColores(newArrayColor);
        } catch (error) {
            console.log(error);
        }
    };

    const getColorID = (productoid) => {
        let color = 0;
        for (const a of selectedColor) {
            if (a.productoid === productoid) {
                color = a.colorid;
                break;
            }
        }
        return color;
    };
    const getTallaID = (productoid) => {
        let talla = 0;

        for (const a of selectedTalla) {
            if (a.productoid === productoid) {
                talla = a.tallaid;
                break;
            }
        }
        console.log(talla);
        return talla;
    };

    const finalizarCompra = async () => {
        try {
            let total = 0;
            const tt = compra.map((item) => {
                total +=
                    parseInt(item.productoprecio) *
                    parseInt(item.productocantidad);
                return total;
            });
            const newDetalle = compra.map((item) => ({
                productoid: item.productoid,
                subtotal: item.productoprecio,
                cantidad: item.productocantidad,
                colorid: getColorID(item.productoid),
                tallaid: getTallaID(item.productoid),
            }));

            const rp = await axios.post(
                "http://10.0.2.2:3000/pedidos/guardar",

                {
                    pedidototal: total,
                    clienteid: user.cliente,
                    detalle: newDetalle,
                }
            );
            setCompra([]);
        } catch (error) {
            console.log(error.response.data.message);
        }
    };

    useEffect(() => {
        compra.map((item) => {
            obtenerProducto(item.productoid);
        });
    }, [compra]);

    return (
        <>
            <StatusBar backgroundColor="#161622" style="light" />
            <View className="flex-1 bg-black justify-center items-center px-4 ">
                <Text className="text-white mt-10 text-lg font-semibold">
                    Carrito
                </Text>
                {compra.length === 0 && (
                    <Text className="text-white mt-10 text-lg font-semibold">
                        No hay nada por Aqui!!
                    </Text>
                )}
                <FlatList
                    data={compra}
                    renderItem={({ item }) => (
                        <View className="flex flex-col w-80 items-center mt-10 border-2 border-gray-400 rounded-md justify-center h-180 mb-5">
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
                                    Precio:{" "}
                                    {parseInt(item.productoprecio) *
                                        parseInt(item.productocantidad)}
                                </Text>
                                <Text className="text-amber-500 font-bold text-base">
                                    Cantidad: {item.productocantidad}
                                </Text>
                            </View>
                            <View className="flex-1 justify-start w-60">
                                <Text className="text-white">Talla: </Text>
                                <SelectList
                                    className="w-full"
                                    setSelected={(val) => {
                                        const tallaid = tallas.filter(
                                            (tl) => tl.value === val
                                        );
                                        setSelectedTalla([
                                            ...selectedTalla,
                                            {
                                                productoid: item.productoid,
                                                tallaid: tallaid[0].key,
                                            },
                                        ]);
                                    }}
                                    data={tallas}
                                    search={false}
                                    dropdownTextStyles={{ color: "white" }}
                                    inputStyles={{ color: "white" }}
                                    save="value"
                                />
                            </View>
                            <View className="flex-1 justify-start w-60">
                                <Text className="text-white">Color: </Text>
                                <SelectList
                                    setSelected={(val) => {
                                        const colorid = colores.filter(
                                            (tl) => tl.value === val
                                        );
                                        setSelectedColor([
                                            ...selectedColor,
                                            {
                                                productoid: item.productoid,
                                                colorid: colorid[0].key,
                                            },
                                        ]);
                                    }}
                                    data={colores}
                                    inputStyles={{ color: "white" }}
                                    dropdownTextStyles={{ color: "white" }}
                                    search={false}
                                    save="value"
                                />
                            </View>
                            <View>
                                <CustomButton
                                    title="Cancelar"
                                    handlePress={() =>
                                        setCompra(
                                            compra.filter(
                                                (p) =>
                                                    p.productoid !==
                                                    item.productoid
                                            )
                                        )
                                    }
                                    containerStyles="bg-amber-500 px-4 py-2 mt-2 mb-2 "
                                />
                            </View>
                        </View>
                    )}
                    keyExtractor={(item) => item.productoid}
                />
                {compra.length !== 0 && (
                    <CustomButton
                        title="Finalizar Compra"
                        handlePress={() => finalizarCompra()}
                        containerStyles="bg-amber-500 px-4 py-2 mt-2 mb-2 "
                    />
                )}
            </View>
        </>
    );
};

export default Carrito;
