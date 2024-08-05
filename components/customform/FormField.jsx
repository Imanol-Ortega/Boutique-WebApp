import { View, Text, TextInput, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";

const FormField = ({
    title,
    value,
    handleChangeText,
    otherStyles,
    keyboardType,
    placeholder,
}) => {
    const [showPassword, setshowPassword] = useState(false);

    return (
        <View className={`space-y-2 ${otherStyles}`}>
            <Text className="text-base text-gray-300 font-medium">{title}</Text>
            <View className="w-full h-16 px-4 bg-black-100 border-2 border-gray-600 rounded-2xl focus:border-amber-500 items-center flex-row">
                <TextInput
                    className="flex-1 text-slate-300 font-semibold text-base"
                    value={value}
                    placeholder={placeholder}
                    placeholderTextColor="#7b7b8b"
                    onChangeText={handleChangeText}
                    secureTextEntry={title === "Contraseña" && !showPassword}
                />
                {title === "Contraseña" && (
                    <TouchableOpacity
                        onPress={() => {
                            setshowPassword(!showPassword);
                        }}
                    >
                        <Image
                            source={
                                !showPassword
                                    ? require("../../app/static/eye.png")
                                    : require("../../app/static/hide.png")
                            }
                            resizeMode="contain"
                            className="w-6 h-6 bg-slate-300 rounded-full"
                        />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

export default FormField;
