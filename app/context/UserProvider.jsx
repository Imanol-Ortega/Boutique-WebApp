import { useContext, useEffect, useState } from "react";

import { UserContext } from "./UserContext";

export const useUser = () => {
    const context = useContext(UserContext);
    return context;
};

export const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState([]);
    const [compra, setCompra] = useState([]);

    const buyProducts = (product) => {
        const productRepeat = compra.find(
            (item) => item.productoid === product.productoid
        );
        if (productRepeat) {
            setCompra(
                compra.map((item) =>
                    item.productoid === product.productoid
                        ? {
                              ...product,
                              productocantidad:
                                  productRepeat.productocantidad + 1,
                          }
                        : item
                )
            );
        } else {
            setCompra([...compra, { ...product, productocantidad: 1 }]);
        }
    };

    return (
        <UserContext.Provider
            value={{ user, setUser, compra, setCompra, buyProducts }}
        >
            {children}
        </UserContext.Provider>
    );
};
