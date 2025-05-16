import { Alert, Image, StyleSheet, Text, View, SafeAreaView, StatusBar, ScrollView, PermissionsAndroid, Platform, Pressable, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styles from '../styles/HomeStyles';
import Geolocation from 'react-native-geolocation-service';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import axios from 'axios';
import Carousel from '../components/Carousel';
import Services from '../components/Services';
import DressItem from '../components/DressItem';
import { useSelector, useDispatch } from 'react-redux';
import { getProducts } from "../ProductReducer";
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';


const HomeScreen = () => {

  const cart = useSelector((state) => state.myCart.cart);
  console.warn("cart", cart);
  const total = cart.map((item) => item.quantity * item.price).reduce((cur, prev) => cur + prev, 0);
  const navigation = useNavigation();
  const [address, setaddress] = useState("We are loading your location");
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (Platform.OS === 'android') {
      requestLocationPermission();
    } else {
      getCurrentLocation();
    }
  }, []);

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'This app requires access to your location.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        getCurrentLocation();
      } else {
        Alert.alert('Permission Denied', 'Location permission is required.');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      async position => {
        const { latitude, longitude } = position.coords;
        console.warn('Current location:', latitude, longitude);
        setaddress(`Lat: ${latitude}, Long: ${longitude}`);

        try {
          const response = await axios.get(
            `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=2f3e3e48a8974f1bae20b54ec678b80a`
          );
          const details = response.data.results[0].components;
          const city = details.city || details.town || details.village;
          const postalCode = details.postcode;
          const country = details.country;

          const address = `${city}, ${postalCode}, ${country}`;
          console.warn('Address:', address);
          setaddress(address);
        } catch (err) {
          console.warn('Reverse geocoding error:', err);
        }
      },
      error => {
        console.warn(error.message);
        Alert.alert('Location Error', error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };


  const product = useSelector((state) => state.myProduct.product);
  console.warn("product array", product);
  const dispatch = useDispatch();

  useEffect(() => {
    if (product.length > 0) return;

    const fetchProducts = async () => {
      const unsubscribe = firestore()
        .collection('types')
        .onSnapshot(
          snapshot => {
            const fetchedItems = snapshot.docs.map(doc => doc.data());

            setItems(fetchedItems);

            fetchedItems.forEach(item => dispatch(getProducts(item)));

            console.log("Fetched from Firestore (realtime):", fetchedItems);
            console.log("Product array from Redux after dispatch:", product);
          },
          error => {
            console.error("Error fetching products:", error);
          }
        );

      return () => unsubscribe();

    };

    fetchProducts();

  }, [dispatch, product.length])


  const services = [
    {
      id: 1,
      name: 'Shirt',
      quantity: 0,
      price: 6,
      image: "https://pluspng.com/img-png/dress-shirt-png-image-951.png",
    },
    {
      id: 2,
      name: 'Pants',
      quantity: 0,
      price: 7,
      image: 'https://th.bing.com/th/id/OIP.mvnPrGHipGlEC41rdW-dsQHaHa?rs=1&pid=ImgDetMain',
    },
    {
      id: 3,
      name: 'Dry Clean',
      quantity: 0,
      price: 13,
      image: 'https://th.bing.com/th/id/OIP.-_zLCe0NJqFYHslBg_JCDQHaHa?rs=1&pid=ImgDetMain',
    },
    {
      id: 4,
      name: 'Jacket',
      quantity: 0,
      price: 16,
      image: 'https://happygentleman.com/wp-content/uploads/2019/11/remmy-hood-mens-leather-jacket-red6.jpg',
    },
    {
      id: 5,
      name: 'Bedding Set',
      quantity: 0,
      price: 26,
      image: 'https://th.bing.com/th/id/OIP.6c3jI55JE2nRJVvKw1nnUgHaHa?w=196&h=197&c=7&r=0&o=5&dpr=1.1&pid=1.7',
    },
    {
      id: 6,
      name: 'Curtain',
      quantity: 0,
      price: 19,
      image: 'https://m.media-amazon.com/images/I/71zwaRTbp0L._SL1500_.jpg',
    },
    {
      id: 7,
      name: 'Shoe',
      quantity: 0,
      price: 11,
      image: 'https://th.bing.com/th/id/OIP.UKnBMUAK3J4hcddrr4Ea2QHaHi?rs=1&pid=ImgDetMain',
    },
    {
      id: 9,
      name: 'sweater',
      quantity: 0,
      price: 23,
      image: 'https://pngimg.com/uploads/sweater/sweater_PNG9.png',
    },
    {
      id: 10,
      name: 'jeans',
      quantity: 0,
      price: 25,
      image: 'https://th.bing.com/th/id/OIP.k62mUY6A0WmMr1OkFgj64AHaJW?rs=1&pid=ImgDetMain',
    },
    {
      id: 11,
      name: 'sleeveless',
      quantity: 0,
      price: 20,
      image: 'https://t4.ftcdn.net/jpg/00/12/13/51/360_F_12135194_tjaQORqbS6LB9qiZvObhbTKAmRdsuOJd.jpg',
    },
    {
      id: 12,
      name: 'T-shirt',
      quantity: 0,
      price: 18,
      image: 'https://www.pngall.com/wp-content/uploads/2016/04/T-Shirt-PNG.png',
    },
    {
      id: 13,
      name: 'dresses',
      quantity: 0,
      price: 18,
      image: 'https://img.lovepik.com/free-png/20210919/lovepik-ladies-dress-png-image_400497681_wh1200.png',
    },
  ];

  return (
    <>
      <ScrollView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
        <View style={styles.containerView}>
          <Icon name="location-sharp" size={24} color="#F08080" />

          <View style={styles.textContainer}>
            <Text style={styles.homeText}>Home</Text>
            <Text>{address}</Text>
          </View>

          <Pressable 
          onPress={()=>navigation.navigate("Profile")}
          style={styles.pressableImage}>
            <Image
              style={styles.profileImage}
              source={{ uri: "https://th.bing.com/th/id/OIP.xrKzDQ5NVt_-lzO1X0aE3QHaHa?w=200&h=200&c=7&r=0&o=5&cb=iwc1&dpr=1.1&pid=1.7" }}
            />
          </Pressable>
        </View>

        <View style={styles.searchInputView}>
          <View style={{ flex: 1 }}>
            <TextInput
              placeholder='Search for items or more'
              style={{ fontSize: 16 }}
            />
          </View>
          <Icon name="search" size={24} color="#F08080" />
        </View>
        {/* Image Carousel */}
        <View>
          <Carousel />
        </View>
        {/* Services component */}
        <Services />

        {/* Render all the products */}
        {
          product.map((item, index) => (
            <DressItem item={item} key={index} />
          ))
        }
      </ScrollView>

      {
        total === 0 ? (
          null
        ) : (
          <Pressable style={styles.bottomPressable}>
            <View>
              <Text style={styles.bottomText}>{cart.length} items | {total}</Text>
              <Text style={styles.bottomText1}>extra charges might apply</Text>
            </View>

            <Pressable onPress={() => navigation.navigate("PickUp")}>
              <Text style={styles.bottomText2}>Proceed to pickup</Text>
            </Pressable>
          </Pressable>
        )
      }

    </>
  );
};

export default HomeScreen;
