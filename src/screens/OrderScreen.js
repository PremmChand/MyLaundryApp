import { StyleSheet,SafeAreaView, Text, View } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native'

const OrderScreen = () => {
  return (
    <SafeAreaView>
     
     <LottieView source={require("../assets/thumbs.json")} style={{height:360,width:300,
        alignSelf:"center",marginTop:40,justifyContent:"center"}}
        autoPlay
        loop
        speed={0.7}                                                                                                         
        />
    
    <Text style={{marginTop:40,fontSize:19,fontWeight:"600",textAlign:"center"}}>Your order has been placed</Text>

     <LottieView source={require("../assets/sparkle.json")} style={{height:300,width:300,position:"absolute",
        alignSelf:"center",top:100,}}
        autoPlay
        loop
        speed={0.7}
        />
    </SafeAreaView>
  )
}

export default OrderScreen

const styles = StyleSheet.create({})