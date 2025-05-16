import {Alert, StyleSheet, SafeAreaView, Text, TextInput, ScrollView, View, Pressable } from 'react-native'
import React, { useState } from 'react'
import HorizontalDatepicker from '@awrminkhodaei/react-native-horizontal-datepicker';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';

const PickUpScreen = () => {
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedTime, setSelectedTime] = useState([]);
    const [delivery, setDelivery] = useState([]);
    const cart = useSelector((state) => state.myCart.cart);
    console.warn("cart", cart);
    const total = cart.map((item) => item.quantity * item.price).reduce((cur, prev) => cur + prev, 0);
    const navigation = useNavigation();

    const deliveryTimes = [
        { id: "0", name: "Same Day" },
        { id: "1", name: "Next Day" },
        { id: "2", name: "2-3 Days" },
        { id: "3", name: "3-4 Days" },
        { id: "4", name: "5-7 Days" },
        { id: "5", name: "7-10 Days" },
        { id: "6", name: "Tomorrow" },
        { id: "7", name: "3-5 Days" },
        { id: "8", name: "4-5 Days" },
        { id: "9", name: "4-7 Days" },
    ];

    const timeArray = [
        { id: "0", time: "08:00 AM" },
        { id: "1", time: "09:00 AM" },
        { id: "2", time: "10:00 AM" },
        { id: "3", time: "11:00 AM" },
        { id: "4", time: "12:00 PM" },
        { id: "5", time: "01:00 PM" },
        { id: "6", time: "02:00 PM" },
        { id: "7", time: "03:00 PM" },
        { id: "8", time: "04:00 PM" },
        { id: "9", time: "05:00 PM" },
        { id: "10", time: "06:00 PM" },
        { id: "11", time: "07:00 PM" },
        { id: "12", time: "08:00 PM" }
    ];

    const proceedToCart = () =>{
        if(!selectedDate || !selectedTime || !delivery){
            Alert.alert(
                'Empty or invalid',
                'Please select all the fields',
                [
                    {
                        text: 'Cancel',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel'
                    },
                    {
                        text: 'Delete',
                        onPress: () => console.log('Delete Pressed'),
                        style: 'destructive'
                    }
                ],
                { cancelable: false }
            );
        }

        if(selectedDate && selectedTime && delivery){
            navigation.replace("Cart",{
                pickUpDate:selectedDate,
                selectedTime:selectedTime,
                no_Of_days:delivery,
            })
         }
    }

    return (
        <>
            <SafeAreaView>
                <Text style={styles.addressText}>enter Addres</Text>
                <TextInput style={styles.input} />

                <Text style={styles.pickupText}>Pick Up Date</Text>
                <HorizontalDatepicker
                    mode="gregorian"
                    startDate={new Date('2025-01-20')}
                    endDate={new Date('2026-01-1')}
                    initialSelectedDate={new Date('2020-08-22')}
                    onSelectedDateChange={(date) => setSelectedDate(date)}
                    selectedItemWidth={170}
                    unselectedItemWidth={38}
                    itemHeight={38}
                    itemRadius={10}
                    selectedItemTextStyle={styles.selectedItemTextStyle}
                    unselectedItemTextStyle={styles.selectedItemTextStyle}
                    selectedItemBackgroundColor="#222831"
                    unselectedItemBackgroundColor="#ececec"
                    flatListContainerStyle={styles.flatListContainerStyle}
                />

                <Text style={styles.pickupText}>Select Time</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ paddingVertical: 10 }}>
                    {timeArray.map((item, index) => (
                        <Pressable
                            onPress={() => setSelectedTime(item.time)}
                            key={index}
                            style={selectedTime.includes(item.time) ? {
                                margin: 10,
                                borderRadius: 7,
                                padding: 15,
                                borderColor: "red",
                                borderWidth: 1,
                            } : {
                                margin: 10,
                                borderRadius: 7,
                                padding: 15,
                                borderColor: "gray",
                                borderWidth: 1,
                            }}

                        >
                            <Text style={{ fontSize: 16 }}>{item.time}</Text>
                        </Pressable>
                    ))}
                </ScrollView>

                <Text style={styles.pickupText}> Delivery Date</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ paddingVertical: 10 }}>
                    {
                        deliveryTimes.map((item, index) => (
                            <Pressable onPress={() => setDelivery(item.name)} key={index}
                                style={delivery.includes(item.name) ? {
                                    margin: 10,
                                    borderRadius: 7,
                                    padding: 15,
                                    borderColor: "red",
                                    borderWidth: 1,
                                } : {
                                    margin: 10,
                                    borderRadius: 7,
                                    padding: 15,
                                    borderColor: "gray",
                                    borderWidth: 1,
                                }}
                            >
                                <Text>{item.name}</Text>
                            </Pressable>
                        ))
                    }
                </ScrollView>
            </SafeAreaView>

            {
                total === 0 ? (
                    null
                ) : (
                    <Pressable style={styles.bottomPressable}>
                        <View>
                            <Text style={styles.bottomText}>{cart.length} items | {total}</Text>
                            <Text style={styles.bottomText1}>extra charges might apply</Text>
                        </View>

                        <Pressable onPress={proceedToCart}>
                            <Text style={styles.bottomText2}>Proceed to Cart</Text>
                        </Pressable>
                    </Pressable>
                )
            }


        </>
    )
}

export default PickUpScreen

const styles = StyleSheet.create({
    addressText: {
        fontSize: 18,
        fontWeight: "600",
        marginHorizontal: 10,
        marginTop: 40,
        marginBottom: 5,
        color: "#333",
    },
    input: {
        padding: 40,
        borderColor: "gray",
        borderWidth: 1,
        paddingVertical: 80,
        borderRadius: 9,
        margin: 10,

        /* padding: 12,
        borderColor: "gray",
        borderWidth: 1,
        borderRadius: 9,
        margin: 10,
        fontSize: 16,
        backgroundColor: "#f9f9f9", */
    },
    pickupText: {
        fontSize: 16,
        fontWeight: "500",
        marginHorizontal: 10,
    },
    bottomPressable: {
        backgroundColor: "#088F8F",
        marginTop: "auto",
        padding: 10,
        marginBottom: 40,
        margin: 15,
        borderRadius: 7,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    bottomText: {
        fontSize: 17,
        fontWeight: "600",
        color: "white",
    },
    bottomText1: {
        fontSize: 13,
        fontWeight: "400",
        color: "white",
        marginVertical: 6
    },
    bottomText2: {
        fontSize: 17,
        fontWeight: "600",
        color: "white",
    },
})