import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function TabLayout() {
  return (
    <Tabs
    screenOptions={{
        tabBarActiveTintColor: '#ffd33d',
        headerStyle: {
            backgroundColor: '#25292e'
        },
        headerShadowVisible: false,
        headerTintColor: '#fff',
        tabBarStyle: {
            backgroundColor: '#25292e'
        },
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