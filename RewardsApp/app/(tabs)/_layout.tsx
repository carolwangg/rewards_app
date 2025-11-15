import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs } from "expo-router";
import { useState } from "react";
import FONTS from "@/fonts";
const TABBAR_HEIGHT = 60
export default function TabLayout() {
  let [num, setNum] = useState(0);
    return (
      <Tabs
      screenOptions={{
          tabBarActiveTintColor: 'rgba(58, 73, 117, 1)',
          tabBarInactiveTintColor: 'rgba(58, 73, 117, 1)',
          headerShown: false,
          tabBarStyle: {
              backgroundColor: 'rgba(217, 217, 217, 1)',
              height: TABBAR_HEIGHT
          },
          tabBarShowLabel: false
      }}
      >
        <Tabs.Screen 
        name="(home)" 
        options={{ 
          title: 'Home',
          tabBarBadge: num? num : undefined,
          tabBarBadgeStyle: {
            backgroundColor: 'rgba(255, 131, 131, 1)',
            color: 'rgba(0, 0, 0, 1)',
            fontFamily: FONTS.BALOO_BHAI,
            fontSize: 18,
            fontStyle: 'normal',
            fontWeight: '800',
          },
          tabBarIcon: ({color, focused}) => (
            <Ionicons name={focused? 'cash-sharp': 'cash-outline'} color={color} size={24}/>
          ),
          }}
        />
        <Tabs.Screen name="qrcode" 
        options={{ 
          title: 'QR Code',
          tabBarIcon: ({color, focused}) => (
              <Ionicons name={focused? 'qr-code-sharp': 'qr-code-outline'} color={color} size={24}/>
          ),
          }}
          />
        <Tabs.Screen name="about" 
        options={{ 
          title: 'Profile',
          tabBarIcon: ({color, focused}) => (
              <Ionicons name={focused? 'person-circle-sharp': 'person-circle-outline'} color={color} size={24}/>
          ),
          }}
          />
      </Tabs>
    );
  }