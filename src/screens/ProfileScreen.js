import { StyleSheet, Text, SafeAreaView, View, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native'; // Navigation import

const ProfileScreen = () => {
    const [user, setUser] = useState(null);
    const navigation = useNavigation(); // Navigation hook

    useEffect(() => {
        const unsubscribe = auth().onAuthStateChanged((firebaseUser) => {
            console.log("User:", firebaseUser);
            setUser(firebaseUser);
        });

        return unsubscribe;
    }, []);

    const handleSignOut = async () => {
        try {
            await auth().signOut();
            console.log("User signed out");
            navigation.replace("Login"); // Navigate to Login screen
        } catch (error) {
            console.error("Sign out error:", error);
        }
    };

    // Extract name from email
    const getUserNameFromEmail = (email) => {
        if (!email) return "User";
        return email.split('@')[0];
    };

    return (
        <SafeAreaView style={styles.container}>
            {user ? (
                <>
                    <Text style={styles.text}>Welcome, {getUserNameFromEmail(user.email)}</Text>
                    <Text style={styles.text}>Email: {user.email}</Text>
                </>
            ) : (
                <Text style={styles.text}>Loading user...</Text>
            )}
            <Pressable onPress={handleSignOut} style={styles.button}>
                <Text style={styles.signOutText}>Sign Out</Text>
            </Pressable>
        </SafeAreaView>
    );
};

export default ProfileScreen;

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", alignItems: "center" },
    text: { fontSize: 16, marginVertical: 4 },
    button: { marginTop: 20, padding: 10, backgroundColor: '#ddd', borderRadius: 6 },
    signOutText: { color: 'red', fontWeight: 'bold' },
});
