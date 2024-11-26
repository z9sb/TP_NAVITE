import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Menu, MenuItem } from 'react-native-material-menu';
import { Avatar } from 'react-native-paper';

export default function ImageAvatars() {
  const [menuVisible, setMenuVisible] = React.useState(false);

  const handleMenuClick = (menuItem) => {
    console.log(`Clicked on ${menuItem}`);
    setMenuVisible(false);
  };

  const showMenu = () => setMenuVisible(true);
  const hideMenu = () => setMenuVisible(false);

  return (
    <View style={styles.container}>
      <Menu
        visible={menuVisible}
        anchor={
          <TouchableOpacity onPress={showMenu}>
            <Avatar.Text size={48} label="U" style={styles.avatar} />
          </TouchableOpacity>
        }
        onRequestClose={hideMenu}
      >
        <MenuItem onPress={() => handleMenuClick('Profile')}>Profile</MenuItem>
        <MenuItem onPress={() => handleMenuClick('Language settings')}>
          Language settings
        </MenuItem>
        <MenuItem onPress={() => handleMenuClick('Log out')}>Log out</MenuItem>
      </Menu>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  avatar: {
    backgroundColor: '#ff7043',
  },
});
