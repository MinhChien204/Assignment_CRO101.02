import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screen/Home';
import Profile from '../screen/Profile';
import Search from '../screen/Search';
import Cart from '../screen/Cart';
import Order from '../screen/Order';

const Tab = createBottomTabNavigator();

const TabNavigator = (props) => {
  return (
    <Tab.Navigator screenOptions={{
      tabBarActiveTintColor: 'green',
      headerShown: false,
    }}>
      <Tab.Screen
        options={{
          tabBarIcon: () =>
            <Icon name="home" size={25} color="gray" />
        }}
        name="Home"
        component={Home} />
      <Tab.Screen
        options={{
          tabBarIcon: () =>
            <Icon name="shopping-cart" size={25} color="gray" />
        }}
        name="Cart"
        component={Cart} />
      <Tab.Screen
        options={{
          tabBarIcon: () =>
            <Icon name="list" size={25} color="gray" />
        }}
        name="Order"
        component={Order} 
        initialParams={{ lsdh: 0 }}/>
      <Tab.Screen
        options={{
          tabBarIcon: () =>
            <Icon name="user" size={25} color="gray" />
        }}
        name="Profile"
        component={Profile} />
    </Tab.Navigator>
  )
}

export default TabNavigator

const styles = StyleSheet.create({})