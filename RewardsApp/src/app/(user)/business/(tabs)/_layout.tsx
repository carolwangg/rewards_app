import FONTS from "@/constants/fonts";
import { CartContext } from "@/store/CartContext";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs } from "expo-router";
import { useContext, useState } from "react";
const TABBAR_HEIGHT = 65;
const ICON_SIZE = 35;
export default function TabLayout() {
  const {cart} = useContext(CartContext)!;
    return (
      <Tabs
      screenOptions={{
          tabBarActiveTintColor: 'rgba(58, 73, 117, 1)',
          tabBarInactiveTintColor: 'rgba(58, 73, 117, 1)',
          headerShown: false,
          tabBarStyle: {
              backgroundColor: 'rgba(217, 217, 217, 1)',
              height: TABBAR_HEIGHT,
          },
          tabBarShowLabel: false,
          tabBarIconStyle:  {width: ICON_SIZE + 10, height: ICON_SIZE + 10}
      }}
      >
        <Tabs.Screen 
        name="(home)" 
        options={{ 
          title: 'Home',
          tabBarIcon: ({color, focused}) => (
            <Ionicons name={focused? 'cash-sharp': 'cash-outline'} color={color} size={ICON_SIZE}/>
          ),
          }}
        />
        <Tabs.Screen name="(qrcode)" 
        
        options={{ 
  
          title: 'QR Code',
          tabBarIcon: ({color, focused}) => (
              <Ionicons name={focused? 'qr-code-sharp': 'qr-code-outline'} color={color} size={ICON_SIZE}/>
          ),
          }}
          />
        <Tabs.Screen name="about" 
        options={{ 
          title: 'Profile',
          tabBarIcon: ({color, focused}) => (
              <Ionicons name={focused? 'person-circle-sharp': 'person-circle-outline'} color={color} size={ICON_SIZE}/>
          ),
          }}
          />
      </Tabs>
    );
  }