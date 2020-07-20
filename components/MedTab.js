import React from 'react';
import { Component, ReactElement } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Constants from 'expo-constants';
import { Ionicons, FontAwesome, Entypo, AntDesign, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import MedHome from './../screens/Medicines/medHome.js';
import MedReports from './../screens/Medicines/medReports.js';
import PillReports from './../screens/Medicines/pillReports.js';
import MedRecord from './../screens/Medicines/medRecord.js';
import MeasureRecord from './../screens/Medicines/measureRecord.js';
import DocRecord from './../screens/Medicines/docRecord.js';


const MedHomeStk = createStackNavigator();

function MedHomeStack({navigation}){
	return(
	<MedHomeStk.Navigator>
		<MedHomeStk.Screen name="MedReminder" component={MedHome} options={{title: "Medicine Home Page", headerShown: true, 
			headerLeft: (props)=>(
        <TouchableOpacity onPress={()=>{navigation.navigate('Home')}}>
          <AntDesign name="arrowleft" size={24} color="black" style={{marginLeft:15}}/>
				</TouchableOpacity>),
      headerRight: (props)=>(
        <TouchableOpacity onPress={()=>{navigation.navigate('Inventory')}}>
          <FontAwesome5 name="file-medical" size={35} color="#1e555c" style={{marginRight:15}}/>
        </TouchableOpacity>)
      }} />
		<MedHomeStk.Screen name="MedRecord" component={MedRecord} options={{title: "Medicine Reminder", headerShown: true}} />
		<MedHomeStk.Screen name="MeasureRecord" component={MeasureRecord} options={{title: "Measurement Reminder", headerShown: true}} />
		<MedHomeStk.Screen name="DocRecord" component={DocRecord} options={{title: "Doctor Appointments", headerShown: true}} />
	</MedHomeStk.Navigator>
	)
}

const Tab = createBottomTabNavigator();

export function MedTab({navigation}){
	return (
     
      <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'MedHome') {
            iconName = focused ? 'home' : 'home-outline';
            return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
          } else if (route.name === 'Reports') {
            iconName = focused ? 'areachart' : 'linechart';
            return <AntDesign name={iconName} size={size} color={color} />;
          }

          else if (route.name === 'Pill-Check') {
            iconName = focused ? 'checkcircle' : 'checkcircleo';
            return <AntDesign name={iconName} size={size} color={color} />;
          }

          },

        })}

      tabBarOptions={{
        activeTintColor: '#1e555c',
        inactiveTintColor: 'gray',
        fontSize: 18,
        fontWeight: "700",
        alignItems: 'center',
        justifyContent: 'center',
        top: 20,
      }}
      >
      <Tab.Screen name="MedHome" component={MedHomeStack} options={{ title: "Home"}}/>
      <Tab.Screen name="Reports" component={MedReports} options={{ headerShown: true }} />
      
      <Tab.Screen name="Pill-Check" component={PillReports} options={{ headerShown: false }} />
      </Tab.Navigator>

      );
  }


