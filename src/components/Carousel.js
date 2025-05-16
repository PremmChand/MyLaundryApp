import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import Swiper from 'react-native-swiper';

const Carousel = () => {
  const images = [
    'https://www.credencys.com/wp-content/uploads/2019/04/laundry-steps.jpg',
    'https://www.solulab.com/wp-content/uploads/2019/10/Dry-Cleaning-and-Laundry-Apps-Blog-2.jpg',
    'https://www.ebizneeds.com/front/img/new-png/laundry-app-development.png',
    'https://magnetoitsolutions.com/wp-content/uploads/2020/05/How-Laundry-App-Development-is-Changing-Scenario-of-Laundry-Business.jpg'
  ];

  return (
    <View style={styles.container}>
      <Swiper autoplay height={200} dotColor="#ccc" activeDotColor="#F08080">
        {images.map((img, index) => (
          <Image
            key={index}
            style={styles.image}
            source={{ uri: img }}
          />
        ))}
      </Swiper>
    </View>
  );
};

export default Carousel;

const styles = StyleSheet.create({
  container: {
    height: 200,
  },
  image: {
    flex: 1,
    height: 200,
    resizeMode: 'cover',
  },
});