import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs } from "expo-router";
const TABBAR_HEIGHT = 50
export default function TabLayout() {
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