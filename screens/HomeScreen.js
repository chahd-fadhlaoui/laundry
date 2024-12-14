import {
  StyleSheet,
  Text,
  SafeAreaView,
  Alert,
  View,
  Pressable,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import * as Location from "expo-location";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Feather from "@expo/vector-icons/Feather";
import Services from "../components/Services";
import Dressitem from "../components/Dressitem";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../ProductReducer";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
  const cart = useSelector((state) => state.cart.cart);
  const total=cart.map((item)=>item.quantity*item.price).reduce((curr,prev)=>curr+prev,0)
  const navigation=useNavigation();
  console.log(cart);
  const [displayCurrentAdress, setdisplayCurrentAdress] = useState(
    "we are loading the location "
  );
  const [locationServiceEnabled, setlocationServiceEnabled] = useState(false);
  useEffect(() => {
    checkIfLocationEnabled();
    getCurentLocation();
  }, []);
  const checkIfLocationEnabled = async () => {
    let enabled = await Location.hasServicesEnabledAsync();
    if (!enabled) {
      Alert.alert(
        " location service are not enable ",
        "Please enable the location service .",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ]
      );
    } else {
      setlocationServiceEnabled(enabled);
    }
  };
  const getCurentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        " permission denied  ",
        " allow the app to use the location services  .",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ]
      );
    }
    const { coords } = await Location.getCurrentPositionAsync();
    console.log(coords);
    if (coords) {
      const { latitude, longitude } = coords;

      let response = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });
      //console.log(response)
      for (let item of response) {
        if (item.country === "Tunisia" || item.isoCountryCode === "TN") {
          let address = `${item.name || ""} ${item.street || ""} ${
            item.city || ""
          } ${item.postalCode || ""}`;
          setdisplayCurrentAdress(address);
          return;
        }
      }
      setdisplayCurrentAdress("Location is outside tn");
    }
  };
  const product = useSelector((state) => state.product.product);
  const dispatch = useDispatch();
  useEffect(() => {
    if (product.length > 0) return;
    const fetchProducts = () => {
      items.map((service) => dispatch(getProducts(service)));
    };
    fetchProducts();
  }, []);
  console.log(product);
  const items = [
    {
      id: "0",
      image: "https://cdn-icons-png.flaticon.com/128/4643/4643574.png",
      name: "shirt",
      quantity: 0,
      price: 15,
    },
    {
      id: "11",
      image: "https://cdn-icons-png.flaticon.com/128/892/892458.png",
      name: "T-shirt",
      quantity: 0,
      price: 10,
    },
    {
      id: "12",
      image: "https://cdn-icons-png.flaticon.com/128/9609/9609161.png",
      name: "dresses",
      quantity: 0,
      price: 20,
    },
    {
      id: "13",
      image: "https://cdn-icons-png.flaticon.com/128/599/599388.png",
      name: "jeans",
      quantity: 0,
      price: 10,
    },
    {
      id: "14",
      image: "https://cdn-icons-png.flaticon.com/128/9431/9431166.png",
      name: "Sweater",
      quantity: 0,
      price: 10,
    },
    {
      id: "15",
      image: "https://cdn-icons-png.flaticon.com/128/3345/3345397.png",
      name: "shorts",
      quantity: 0,
      price: 10,
    },
    {
      id: "16",
      image: "https://cdn-icons-png.flaticon.com/128/293/293241.png",
      name: "Sleeveless",
      quantity: 0,
      price: 10,
    },
  ];

  return (
    <>
      <SafeAreaView
        style={{ backgroundColor: "#DFF2FE", flex: 1, marginTop: -25 }}
      >
        {/* Location and profile */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            padding: 16,
            marginTop: 40,
          }}
        >
          <MaterialIcons name="location-on" size={30} color="#fd5c63" />
          <View>
            <Text style={{ fontSize: 18, fontWeight: "600" }}>Home</Text>
            <Text>{displayCurrentAdress}</Text>
          </View>
          <Pressable style={{ marginLeft: "auto", marginRight: 7 }}>
            <Image
              style={{ width: 40, height: 40, borderRadius: 20 }}
              source={require("../assets/profile.png")}
            />
          </Pressable>
        </View>

        {/*search bar */}
        <View
          style={{
            padding: 10,
            margin: 10,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            borderWidth: 0.8,
            borderColor: "#C0C0C0",
            borderRadius: 7,
          }}
        >
          <TextInput placeholder="search for items" />
          <Feather name="search" size={24} color="#fd5c63" />
        </View>

        {/*image carousel */}
        <View style={{ width: 400, height: 160 }}>
          <Image
            source={require("../assets/l4.jpg")}
            style={{ width: "100%", height: "100%" }}
            resizeMode="cover"
          />
        </View>
        {/*services component */}

        <Services />
        {/*render all the items  */}
        <ScrollView>
          {product.map((item, index) => (
            <Dressitem item={item} key={index} />
          ))}
        </ScrollView>
      </SafeAreaView>
      {total===0?(
        null
      ):(
        <Pressable
        style={{
          backgroundColor: "#088F8F",
          padding: 10,
          marginBottom: 40,
          margin: 20,
          borderRadius: 7,
          flexDirection: "row",
          alignItems: "center",
          justifyContent:"space-between"
        }}
      >
        <View>
          <Text style={{fontSize:15,fontWeight:"600",color:"white"}}>{cart.length}items|{total}dt</Text>
          <Text style={{fontSize:13,fontWeight:"400",color:"white",marginVertical:6}}>extra charges may be applied</Text>
        </View>
        <Pressable onPress={()=>navigation.navigate("PickUp")}>
          <Text style={{fontSize:17,fontWeight:"600",color:"white"}}>proceed to pick up </Text>
        </Pressable>
      </Pressable>
      )}
    
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
