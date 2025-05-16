import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, decrementQuantity, incrementQuantity } from '../CartReducer';
import { decrementQty, incrementQty } from '../ProductReducer';


const DressItem = ({ item }) => {
    const cart = useSelector((state) => state.myCart.cart);
    const dispatch = useDispatch();
    const addItemToCart = () => {
        dispatch(addToCart(item));//cart
        dispatch(incrementQty(item));//product
    }
    
    return (
        <View>
            <Pressable style={styles.mainPressable}>
                <View>
                    <Image style={{ width: 70, height: 70 }} source={{ uri: item.image }} />
                </View>
                <View>
                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={styles.price}>${item.price}</Text>
                </View>
                {
                    cart.some((c) => c.id === item.id) ? (
                        <Pressable style={styles.conditionalPressable}>

                            <Pressable onPress={() => {
                                dispatch(decrementQuantity(item));//cart
                                dispatch(decrementQty(item));//product
                            }}
                                style={styles.pressableLogo}>
                                <Text style={styles.minusPlusText}>-</Text>
                            </Pressable>

                            <Pressable >
                                <Text style={styles.minusPlusText}>{item.quantity}</Text>
                            </Pressable>

                            <Pressable onPress={() => {
                                dispatch(incrementQuantity(item));//cart
                                dispatch(incrementQty(item));//product
                            }}
                                style={styles.pressableLogo}>
                                <Text style={styles.minusPlusText}>+</Text>
                            </Pressable>

                        </Pressable>
                    ) : (
                        <Pressable onPress={addItemToCart} style={{ width: 80 }} >
                            <Text style={styles.addText}>Add</Text>
                        </Pressable>
                    )
                }

            </Pressable>
        </View >
    )
}

export default DressItem

const styles = StyleSheet.create({
    mainPressable: {
        backgroundColor: "#F8F8F8",
        borderRadius: 8,
        padding: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        margin: 14,
    },
    name: {
        width: 83,
        fontSize: 17,
        fontWeight: "500",
        marginBottom: 7
    },
    price: {
        width: 60,
        color: "gray",
        fontSize: 15
    },
    addText: {
        borderColor: "gray",
        borderRadius: 4,
        borderWidth: 1,
        marginVertical: 10,
        color: "#088F8F",
        textAlign: "center",
        padding: 5,
        fontSize: 17,
        fontWeight: "bold"
    },
    conditionalPressable: {
        flexDirection: "row",
        paddingHorizontal: 10,
        paddingVertical: 5
    },
    pressableLogo: {
        width: 26,
        height: 26,
        borderRadius: 13,
        backgroundColor: "#E0E0E0",
        justifyContent: "center",
        alignItems: "center"
    },
    minusPlusText: {
        fontSize: 20,
        color: "#088F8F",
        paddingHorizontal: 6,
        fontWeight: "600",
        textAlign: "center"
    }

})