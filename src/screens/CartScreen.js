import { StyleSheet, Text, View, SafeAreaView, StatusBar, ScrollView, Pressable, Alert } from 'react-native';
import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import { addToCart, cleanCart, decrementQuantity, incrementQuantity } from '../CartReducer';
import { decrementQty, incrementQty } from '../ProductReducer';


import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const CartScreen = () => {
    const cart = useSelector((state) => state.myCart.cart);
    console.warn("cart", cart);
    const route = useRoute();
    const total = cart.map((item) => item.quantity * item.price).reduce((cur, prev) => cur + prev, 0);
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const addItemToCart = (item) => {
        dispatch(addToCart(item));//cart
        dispatch(incrementQty(item));//product
    }


    const placeOrder = async () => {
        const currentUser = auth().currentUser;

        if (!currentUser) {
            Alert.alert("Error", "User not logged in");
            return;
        }

        const userId = currentUser.uid;

        try {
            await firestore()
                .collection('users')
                .doc(userId)
                .set(
                    {
                        orders: { ...cart },
                        pickUpDetails: route.params,
                    },
                    { merge: true }
                );

            dispatch(cleanCart());
            navigation.navigate("Order");
           // Alert.alert("Order Placed!");
        } catch (error) {
            console.error("Error placing order:", error);
            Alert.alert("Error", "Failed to place order");
        }
    };


    const date = new Date(route.params.pickUpDate);
    const formattedDate = `${date.toLocaleDateString('en-US', { weekday: 'long' })} ${date.toLocaleDateString('en-US', { month: 'short' })} ${date.getDate()} ${date.getFullYear()}`;

    return (
        <>
            <StatusBar backgroundColor="#fff" barStyle="dark-content" />
            <ScrollView style={styles.container}>
                {
                    total === 0 ? (
                        <View style={styles.cartView}>
                            <Text style={styles.cartEmptyText}>Your cart is empty</Text>
                        </View>
                    ) : (
                        <>
                            <View style={styles.cartViewData}>
                                <Icon onPress={() => navigation.goBack()} name="arrow-back" size={24} color="black" />
                                <Text>Your Bucket</Text>
                            </View>

                            <Pressable style={styles.maincartPressable}>
                                {
                                    cart.map((item, index) => (
                                        <View style={styles.cartViewWithData} key={index}>
                                            <Text style={styles.cartViewWithDataText}>{item.name}</Text>

                                            <Pressable style={styles.cartPressable}>
                                                <Pressable
                                                    onPress={() => {
                                                        dispatch(decrementQuantity(item));//cart
                                                        dispatch(decrementQty(item));//product
                                                    }}
                                                    style={styles.minusbuttonPressable}>
                                                    <Text style={styles.buttonText}>
                                                        -
                                                    </Text>
                                                </Pressable>

                                                <Pressable>
                                                    <Text style={styles.cartQuantityText}>{item.quantity}</Text>
                                                </Pressable>
                                                <Pressable
                                                    onPress={() => {
                                                        dispatch(incrementQuantity(item));//cart
                                                        dispatch(incrementQty(item));//product
                                                    }}
                                                    style={styles.plusbuttonPressable}>
                                                    <Text style={styles.buttonText}>
                                                        +
                                                    </Text>
                                                </Pressable>
                                            </Pressable>


                                            <Text style={styles.cartPressableText}>${item.price * item.quantity}</Text>
                                        </View>
                                    ))
                                }
                            </Pressable>

                            <View style={styles.billingDetailView}>
                                <Text style={styles.billingText}>Billing Details</Text>
                                <View style={styles.billingViewChild}>
                                    <View style={styles.billingViewChildOf}>
                                        <Text style={styles.billingItemText}>Item Total</Text>
                                        <Text style={styles.billingTotalText}>₹{total}</Text>
                                    </View>

                                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginVertical: 8 }}>
                                        <Text style={{ fontSize: 18, fontWeight: "400", color: "gray" }}>Delivery Free | 1.2KM</Text>
                                        <Text style={{ fontSize: 18, fontWeight: "400", color: "#088F8F" }}>Free</Text>
                                    </View>

                                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                                        <Text style={{ fontSize: 18, fontWeight: "500", color: "gray" }}>Free Delivery on Your order</Text>
                                    </View>

                                    <View style={{ borderColor: "gray", height: 1, borderWidth: 0.5, marginTop: 10 }} />

                                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                                        <Text style={{ fontSize: 18, fontWeight: "500", color: "gray" }}>Selected Date</Text>
                                        <Text style={{ fontSize: 18, fontWeight: "400", color: "#088F8F" }}>
                                            {/*  {new Date(route.params.pickUpDate).toLocaleDateString()} */}
                                        </Text>
                                        <Text>{formattedDate}</Text>
                                    </View>

                                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                                        <Text style={{ fontSize: 18, fontWeight: "500", color: "gray" }}>No Of Days</Text>
                                        <Text style={{ fontSize: 18, fontWeight: "400", color: "#088F8F" }}>
                                            {route.params.no_Of_days}
                                        </Text>
                                    </View>

                                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginVertical: 10 }}>
                                        <Text style={{ fontSize: 18, fontWeight: "500", color: "gray" }}>selected Pick UP Time</Text>
                                        <Text style={{ fontSize: 18, fontWeight: "400", color: "#088F8F" }}>
                                            {route.params.selectedTime}
                                        </Text>
                                    </View>

                                    <View style={{ borderColor: "gray", height: 1, borderWidth: 0.5, marginTop: 10 }} />

                                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginVertical: 8 }}>
                                        <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                                            To Pay
                                        </Text>
                                        <Text style={{ fontSize: 18, fontWeight: "bold" }}> {total + 95}</Text>
                                    </View>

                                </View>
                            </View>
                        </>
                    )
                }
            </ScrollView>

            {
                total === 0 ? null : (
                    <Pressable style={{
                        backgroundColor: "#088F8F", marginTop: "auto", padding: 10,
                        marginBottom: 40, margin: 15, borderRadius: 7, flexDirection: "row", alignItems: "center",
                        justifyContent: "space-between"
                    }}>
                        <View>
                            <Text style={{ fontSize: 17, fontWeight: "600", color: "white" }}>{cart.length} items | ${total}</Text>

                            <Text style={{ fontSize: 15, fontWeight: "400", color: "white", marginVertical: 6 }}>extra charges mmight apply</Text>
                        </View>

                        <Pressable onPress={placeOrder} >
                            <Text style={{ fontSize: 17, fontWeight: "600", color: "white" }}>Place Order</Text>
                        </Pressable>
                    </Pressable>
                )
            }

        </>
    );
};

export default CartScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        marginTop: 50,
    },
    cartView: {
        justifyContent: "center",
        alignItems: "center"
    },
    cartEmptyText: {
        marginTop: 50
    },
    cartViewData: {
        padding: 10,
        flexDirection: "row",
        alignItems: "center",

    },

    maincartPressable: {
        backgroundColor: "white",
        borderRadius: 12,
        marginLeft: 10,
        marginRight: 10,
        padding: 14,
    },
    cartPressable: {
        flexDirection: "row",
        paddingHorizontal: 10,
        paddingVertical: 5,
        alignItems: "center",
        borderColor: "#BEBEBE",
        borderWidth: 1,
        borderRadius: 10

    },
    cartViewWithData: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginVertical: 12,
        backgroundColor: "white",
        borderRadius: 12,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderColor: "#BEBEBE",
        borderWidth: 0.9,
    },
    cartViewWithDataText: {
        width: 100,
        fontSize: 16,
        fontWeight: "500"
    },
    cartPressableText: {
        fontSize: 20,
        color: "#088F8F",
        paddingHorizontal: 6,
        fontWeight: "600",
    },
    cartQuantityText: {
        fontSize: 19,
        color: "#088F8F",
        paddingHorizontal: 8,
        fontWeight: "600",
    },
    minusbuttonPressable: {
        flexDirection: "row",
        paddingHorizontal: 10,
        paddingVertical: 5,
        alignItems: "center",
        borderColor: "#BEBEBE",
        borderWidth: 0,
        borderRadius: 10,
    },
    plusbuttonPressable: {
        flexDirection: "row",
        paddingHorizontal: 10,
        paddingVertical: 5,
        alignItems: "center",
        borderColor: "#BEBEBE",
        borderWidth: 0,
        borderRadius: 10,
    },
    buttonText: {
        fontSize: 20,
        color: "#088F8F",
        paddingHorizontal: 6,
        fontWeight: "600"
    },


    billingDetailView: {
        marginHorizontal: 10,
        //  padding:10,
    },
    billingText: {
        fontSize: 16,
        fontWeight: "bold",
        marginTop: 30
    },
    billingViewChild: {
        backgroundColor: "white",
        borderRadius: 7,
        padding: 10,
        marginTop: 15,
    },
    billingViewChildOf: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    billingItemText: {
        fontSize: 18,
        fontWeight: "400",
        color: "gray"
    },
    billingTotalText: {
        fontSize: 18,
        fontWeight: "400"
    },


});
