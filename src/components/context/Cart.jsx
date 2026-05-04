import { createContext, useEffect, useState } from "react";
import { apiURL, userToken } from "../common/http";

export const CartContext = createContext();

export const CartProvider = ({children}) => {
    const [cartData, setCartData] = useState(JSON.parse(localStorage.getItem('cart')) || [])
    const [shippingCost, setShippingCost] = useState(0);

    const addtoCart = (product, size=null) => {
        let updateCart = [ ...cartData ];

        //If cart is empty
        if(cartData.length == 0) {
            updateCart.push({
                id: `${product.id}-${Math.floor(Math.random() * 10000000)}`,
                product_id: product.id,
                size: size,
                title: product.title,
                price: product.price,
                quantity: 1,
                image_url: product.image_url
            })
        } else {

            //If size is not empty
            if (size != null) {
                const isProductExist = updateCart.find(item => 
                    item.product_id == product.id && item.size == size
                )

                //If product and size combination exist then increase quantity
                if (isProductExist) {
                    updateCart = updateCart.map(item =>
                        (item.product_id == product.id && item.size == size)
                        ? { ...item, quantity: item.quantity + 1}
                        : item
                    )
                } else {
                    //if product and size combination not exist then add new item
                    updateCart.push({
                        id: `${product.id}-${Math.floor(Math.random() * 10000000)}`,
                        product_id: product.id,
                        size: size,
                        title: product.title,
                        price: product.price,
                        quantity: 1,
                        image_url: product.image_url
                    })
                }
            } else {
                //when size is null
                const isProductExist = updateCart.find(item => 
                    item.product_id == product.id
                )

                if (isProductExist) {
                    //when product found in cart then increase quantity
                    updateCart = updateCart.map(item =>
                        (item.product_id == product.id)
                        ? { ...item, quantity: item.quantity + 1}
                        : item
                    )
                } else {
                    //if product not exist then add new item
                    updateCart.push({
                        id: `${product.id}-${Math.floor(Math.random() * 10000000)}`,
                        product_id: product.id,
                        size: size,
                        title: product.title,
                        price: product.price,
                        quantity: 1,
                        image_url: product.image_url
                    })
                }
            }
        }

        setCartData(updateCart)
        localStorage.setItem('cart',JSON.stringify(updateCart))
    }


    const shipping = () => {
        shippingCost
        let shippingAmount = 0;
        if (cartData.length > 0) {
            shippingAmount = parseFloat(shippingCost); 
            
        }

        return shippingAmount;
    }

        const subTotal = () => {
            let subTotal = 0;
            cartData.map(item => {
                subTotal += item.quantity * item.price;
            })

            return subTotal;
        }

        const grandTotal = () => {
            return subTotal() + shipping();
        }

        const updateCartItem = (itemId, newQty) => {
            let updateCart = [...cartData];
            updateCart = updateCart.map(item => 
            (item.id == itemId) ? { ...item, quantity: newQty}
                                : item
            )
            setCartData(updateCart)
            localStorage.setItem('cart',JSON.stringify(updateCart))
        }

        const deleteCartItem = (itemId) => {
            const newCartData = cartData.filter(item => item.id != itemId)
            setCartData(newCartData)
            localStorage.setItem('cart',JSON.stringify(newCartData))
        }

        const getQuantity = () => {
            let quantity = 0;
            cartData.map(item => {
                quantity += parseInt(item.quantity)
            });
            return quantity;
        }

        useEffect(() => {
            fetch(`${apiURL}/get-shipping-user`,{
                method: 'GET',
                headers: {
                    'Content-type' : 'application/json',
                    'Accept' : 'application/json',
                    'Authorization' : `Bearer ${userToken()}`
                }
            })
            .then(res => res.json())
            .then(result => {
                if (result.status == 200) {
                    setShippingCost(result.data.shipping_charge);
                } else {
                    setShippingCost(0)
                    console.log("Hệ thống gặp lỗi!");
                }                  
            })
        });

    return (
        <CartContext.Provider value={{addtoCart, cartData, grandTotal, subTotal, shipping, updateCartItem, deleteCartItem, getQuantity}}>
            {children}
        </CartContext.Provider>
    )
}