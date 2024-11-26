import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Avatar from "./Avatar.jsx";
import { useNavigation } from "@react-navigation/native";
import MainScreen from "./MainScreen.jsx";

const menuItems = [
  { text: "Dashboard", icon: "grid-outline", screen: "Dashboard" },
  { text: "Ranking", icon: "star-outline", screen: "Ranking" },
  { text: "Configurações", icon: "settings-outline", screen: "Settings" },
];

const menuItensSocial = [
  { text: "Amigos", icon: "people-outline", screen: "Friends" },
  { text: "Grupos", icon: "people-circle-outline", screen: "Groups" },
];

export default function MiniDrawer() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigation = useNavigation();

  const toggleDrawer = () => setDrawerOpen(!drawerOpen);

  const handleNavigation = (screen) => {
    navigation.navigate(screen);
  };

  const renderMenuItem = ({ item }) => (
    <TouchableOpacity
      style={drawerOpen ? styles.menuItemOpen : styles.menuItem}
      onPress={() => handleNavigation(item.screen)}
    >
      <Ionicons name={item.icon} size={20} color="black" style={styles.icon} />
      {drawerOpen && <Text style={styles.menuText}>{item.text}</Text>}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.appBar}>
        <TouchableOpacity onPress={toggleDrawer}>
          <Ionicons
            name={drawerOpen ? "chevron-back-outline" : "menu-outline"}
            size={24}
            color="white"
          />
        </TouchableOpacity>
        <Avatar />
      </View>

      <View style={styles.contentWrapper}>
        <View style={drawerOpen ? styles.drawerOpen : styles.drawer}>
          <FlatList
            data={menuItems}
            renderItem={renderMenuItem}
            keyExtractor={(item) => item.text}
          />
          <View style={styles.divider} />
          <FlatList
            data={menuItensSocial}
            renderItem={renderMenuItem}
            keyExtractor={(item) => item.text}
          />
        </View>

        <View style={styles.mainContent}>
          <MainScreen />
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  appBar: {
    height: 56,
    backgroundColor: "#3f51b5",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    width: "100%",
  },
  contentWrapper: {
    flex: 1,
    flexDirection: "row",
  },
  drawer: {
    width: 60,
    backgroundColor: "#ffffff",
    alignItems: "center",
    paddingVertical: 16,
    borderRightWidth: 1,
    borderRightColor: "#e0e0e0",
  },
  drawerOpen: {
    width: 260,
    backgroundColor: "#ffffff",
    paddingVertical: 16,
    borderRightWidth: 1,
    borderRightColor: "#e0e0e0",
  },
  menuItem: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 8,
  },
  menuItemOpen: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    marginVertical: 8,
  },
  icon: {
    marginRight: 8,
  },
  menuText: {
    fontSize: 16,
    color: "black",
  },
  divider: {
    height: 1,
    backgroundColor: "#e0e0e0",
    marginVertical: 16,
    width: "100%",
  },
  mainContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
