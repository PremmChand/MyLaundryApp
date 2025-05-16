import { Image,StyleSheet, Text, ScrollView, View, Pressable } from 'react-native'
import React from 'react'

const Services = () => {

    const services = [
        {
            id: 1,
            name: 'Wash & Fold',
            description: 'Regular clothes wash, dry, and fold service.',
            image: "https://www.freshrobe.com/assets/images/blog/Woman-giving-away-washed-and-folded-clothing.jpg",
        },
        {
            id: 2,
            name: 'Dry Cleaning',
            description: 'Professional cleaning for delicate or special fabrics.',
            image: "https://th.bing.com/th/id/OIP.eRCJ6QSOxmRNzT2tmr7jqAHaE8?pid=ImgDet&w=206&h=137&c=7&dpr=1.1",
        },
        {
            id: 3,
            name: 'Ironing / Pressing',
            description: 'Clothes neatly pressed and wrinkle-free.',
            image: "https://thumbs.dreamstime.com/z/worker-laundry-ironed-clothes-iron-dry-to-to-cleaners-75023280.jpg",
        },
        {
            id: 4,
            name: 'Shoe Cleaning',
            description: 'Deep cleaning and polishing of shoes.',
            image: "https://fashiongtonpost.com/wp-content/uploads/2019/03/shoeshine_3.jpg",
        },
        {
            id: 5,
            name: 'Carpet Cleaning',
            description: 'Vacuum and deep cleaning of carpets or rugs.',
            image: "https://nextdaycleaning.com/wp-content/uploads/2020/02/What-Is-the-Best-Method-of-Cleaning-Carpets.jpg",
        },
        {
            id: 6,
            name: 'Curtain Cleaning',
            description: 'Special wash and press for home curtains.',
            image: "https://www.carpetcleaningservices.com.au/images/services/curtain-cleaning-ccs.jpg",
        },
        {
            id: 7,
            name: 'Pickup & Delivery',
            description: 'Free pickup and drop-off service for your convenience.',
            image: "https://www.gopackagingstore.com/sites/all/themes/hwcps_zen/images/topper/pickupdelivery_topper.png",
        },
        {
            id: 8,
            name: 'Stain Removal',
            description: 'Targeted treatment for tough stains.',
            image: "https://www.ultra-guard.com/wp-content/uploads/2023/04/Why-Is-Stain-Removal-Important-1.jpg",
        },

    ];

    return (
        <View style={styles.mainView}>
            <Text style={styles.serviceText}>Services Available</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {services.map((service,index) => (

                    <Pressable style={styles.pressable} key={index}>
                        <Image source={{uri:service.image}} style={{width:70,height:70  }}/> 
                        <Text style={styles.name}>{service.name}</Text>   
                    </Pressable>

                ))}
                
            </ScrollView>
        </View>
    )
}

export default Services

const styles = StyleSheet.create({
    mainView: {
        padding: 10,
    },
    serviceText: {
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 7,
    },
    pressable: {
        margin: 10,
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center', 
        width: 90, 
        height: 120, 
        elevation: 3, 
        shadowColor: '#000', 
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 10, // Round image corners
        marginBottom: 5, // Adds space between image and text
    },
    name: {
        fontSize: 14,
        textAlign: 'center',
        color: '#333',
        marginTop: 5,
    },
      });
      