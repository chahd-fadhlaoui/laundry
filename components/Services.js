import React from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

const Services = () => {
  const services = [
    {
      id: "0",
      image: "https://cdn-icons-png.flaticon.com/128/3003/3003984.png",
      name: "Washing",
    },
    {
      id: "11",
      image: "https://cdn-icons-png.flaticon.com/128/2975/2975175.png",
      name: "Laundry",
    },
    {
      id: "12",
      image: "https://cdn-icons-png.flaticon.com/128/9753/9753675.png",
      name: "Wash & Iron",
    },
    {
      id: "13",
      image: "https://cdn-icons-png.flaticon.com/128/995/995016.png",
      name: "Cleaning",
    },
  ];

  return (
    <View style={{padding:10}}> 
        <Text style={{fontSize:18,fontWeight:"500"}}>Services Available </Text>
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={{ paddingHorizontal: 10, marginTop: 10 }}
    >
      {services.map((service, index) => (
        <Pressable
          key={index}
          style={{margin: 10,backgroundColor:"white",padding:20,borderRadius:7 }}
        >
          <Image
            source={{ uri: service.image }}
            style={{ width: 60, height: 60 }}
          />
          <Text style={{ marginTop: 10, fontSize: 16, fontWeight: "bold",alignItems:"center" }}>
            {service.name}
          </Text>
        </Pressable>
      ))}
    </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Services;
