import { ActivityIndicator, StyleSheet, SafeAreaView, StatusBar, Text, TextInput, View, KeyboardAvoidingView, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

import auth from '@react-native-firebase/auth';


const LoginScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();


    useEffect(() => {
        setLoading(true);
        const unsubscribe = auth().onAuthStateChanged((user) => {
            if (user) {
                navigation.replace("Home");
            } else {
                setLoading(false);
            }
        });

        return unsubscribe;
    }, []);

    const login = () => {
        if (!email || !password) {
            alert('Please enter email and password');
            return;
        }

        setLoading(true);

        auth()
            .signInWithEmailAndPassword(email.trim(), password)
            .then((userCredential) => {
                console.log('Login successful:', userCredential.user.email);

                navigation.replace('Home');
            })
            .catch((error) => {
                console.error('Login failed:', error.message);
                alert('Login failed: ' + error.message);
                setLoading(false);
            });
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor="white" />
            {
                loading ? (
                    <View style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "row",
                    }}>
                        <Text>Loading</Text>
                        <ActivityIndicator size="large" color={"red"} />
                    </View>
                ) : (
                    <KeyboardAvoidingView>
                        <View style={styles.signInView}>
                            <Text style={styles.signInText}>Sign In</Text>
                            <Text style={styles.signInAccountText}>Sign In to your account</Text>
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

                            <Pressable
                                onPress={login}
                                style={styles.loginButton}>
                                <Text style={styles.loginBtnText}>Login</Text>
                            </Pressable>

                            <Pressable onPress={() => navigation.navigate("Register")} style={{ marginTop: 20 }}>
                                <Text style={styles.dontHaveAccountText}>Don't have a account? Sign Up</Text>
                            </Pressable>
                        </View>

                    </KeyboardAvoidingView>
                )
            }

        </SafeAreaView>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "white",
        alignItems: "center",
        padding: 15
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
    dontHaveAccountText: {
        textAlign: "center",
        fontSize: 17,
        color: "gray",
        fontWeight: "500"
    },
})