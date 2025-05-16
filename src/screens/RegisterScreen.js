import { Alert, StyleSheet, SafeAreaView, StatusBar, Pressable, Text, TextInput, View, KeyboardAvoidingView, } from 'react-native'
import React, { useState } from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';



/* import { firebase } from '../firebaseConfig' */

import { getAuth, createUserWithEmailAndPassword } from '@react-native-firebase/auth';
import { getFirestore, doc, setDoc, serverTimestamp } from '@react-native-firebase/firestore';
import { getApp } from '@react-native-firebase/app';

const RegisterScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const navigation = useNavigation();



    const register = async () => {
        if (email === "" || password === "" || phone === "") {
            Alert.alert(
                'Invalid Details',
                'Please fill all the details',
                [
                    { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                    { text: 'Ok', onPress: () => console.log('Ok Pressed'), style: 'destructive' }
                ],
                { cancelable: false }
            );
            return;
        }

        try {
            const app = getApp(); // gets the default app instance
            const auth = getAuth(app);
            const firestore = getFirestore(app);

            console.warn("authValueReceived", auth)
            // Create user
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            console.warn("userCredential", userCredential)
            const uid = userCredential.user.uid;

            // Save user details
            await setDoc(doc(firestore, 'users', uid), {
                email: email,
                phone: phone,
                createdAt: serverTimestamp(),
            });

            Alert.alert('Success', 'User registered and saved!');
            navigation.navigate('Login');
        } catch (error) {
            console.warn("errorReceived", error.message)
            Alert.alert('Error', error.message);
        }
    };


    return (
        <SafeAreaView style={styles.safeAreaView}>
            <StatusBar barStyle="dark-content" backgroundColor="white" />
            <KeyboardAvoidingView>
                <View style={styles.signInView}>
                    <Text style={styles.signInText}>Register</Text>
                    <Text style={styles.signInAccountText}>Create an account</Text>
                </View>

                <View style={{ marginTop: 50 }}>
                    <View style={styles.iconView}>
                        <MaterialCommunityIcons name="email-outline" size={30} color="#000" />
                        <TextInput value={email} onChangeText={(text) => setEmail(text)} placeholder="Email" placeholderTextColor="black" style={styles.emailInput} />
                    </View>
                    <View style={styles.iconView}>
                        <MaterialCommunityIcons style={{ transform: [{ scaleX: -1 }], }} name="key-outline" size={30} color="#333" />
                        <TextInput secureTextEntry={true} value={password} onChangeText={(text) => setPassword(text)} placeholder="Password" placeholderTextColor="black" style={styles.emailInput} />
                    </View>

                    <View style={styles.iconView}>
                        <Ionicons name="call-outline" size={30} color="black" />
                        <TextInput secureTextEntry={true} value={phone} onChangeText={(text) => setPhone(text)} placeholder="Phone No" placeholderTextColor="black" style={styles.emailInput} />
                    </View>


                    <Pressable onPress={register}
                        style={styles.loginButton}>
                        <Text style={styles.loginBtnText}>Register</Text>
                    </Pressable>

                    <Pressable onPress={() => navigation.goBack()} style={{ marginTop: 20 }}>
                        <Text style={styles.alreadyHaveAccountText}>Already have an account? Sign In</Text>
                    </Pressable>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default RegisterScreen

const styles = StyleSheet.create({
    safeAreaView: {
        flex: 1,
        backgroundColor: "white",
        alignItems: "center",
        padding: 10
    },

    signInView: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: 100,
    },
    signInText: {
        fontSize: 20,
        color: "#662d91",
        fontWeight: "bold"
    },
    signInAccountText: {
        fontSize: 18,
        marginTop: 8,
        fontWeight: "600"
    },
    iconView: {
        flexDirection: "row",
        alignItems: "center",
    },
    emailInput: {
        fontSize: 18,
        width: 300,
        marginLeft: 13,
        borderBottomWidth: 1,
        borderBottomColor: "gray",
        marginVertical: 10
    },

    loginButton: {
        width: 200,
        backgroundColor: "#318CE7",
        padding: 15,
        borderRadius: 7,
        marginTop: 50,
        marginLeft: "auto",
        marginRight: "auto"
    },
    loginBtnText: {
        fontSize: 18,
        textAlign: "center",
        color: "white"
    },
    alreadyHaveAccountText: {
        textAlign: "center",
        fontSize: 17,
        color: "gray",
        fontWeight: "500"
    }
})