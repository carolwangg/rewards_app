import { AppContext } from '@/app/AppContext';
import QrScanner from '@/components/business/QrScanner';
import QrCode_Customer from '@/components/customer/QrCode_Customer';
import { useContext } from 'react';
export default function QRcodePage() {
    const {userType, setUserType} = useContext(AppContext)!;
    console.log("user type:"+ userType)
    
    if (userType == "customer") {
        return (<QrCode_Customer/>);
    }else{
        return <QrScanner />;
    }
}
// items={[]} setItems={()=>{}} offers={[]} setOffers={()=>{}}
// import QrScanner from '@/components/business/QrScanner';
// import QrCode_Customer from '@/components/customer/QrCode_Customer';
// import { useState } from 'react';
// import { StyleSheet, Text, View } from 'react-native';
// const type_: "business" |  "customer" = "business";

// export default function Login() {
//     if (type_ == "customer") {
//         return (<QrCode_Customer/>);
//     } else{
//     let longDescription = `Scan customer QR codes`;
//     const [items, setItems] = useState<any[]>([]);
//     const [offers, setOffers] = useState<any[]>([]);
//     return (
//       <View style={styles.container}>
//         <View style={styles.itemDescription}>
//           <Text style={styles.text}>{longDescription}</Text>
//         </View>
//         <View style={styles.itemQR}>
//           <QrScanner
//             items={items}
//             setItems={setItems}
//             offers={offers}
//             setOffers={setOffers}
//           />
//         </View>
//         <View style={styles.cartContainer}>
//           <View style={styles.cartText}>
//             <Text style={styles.text}>Cart</Text>
//           </View>
//           <View style={styles.cart}>
//             <Text style={styles.text}>{offers}</Text>
//           </View>
//         </View>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'white',
//     justifyContent: 'center',
//     alignItems: 'center',
//     width: '100%',
//     height: '100%'
//   },
//   title: {
//     color: 'black',
//     fontSize: 18,
//   },
//   text: {
//     color: 'black',
//   },
//   button: {
//     fontSize: 20,
//     color: 'black',
//   },
//   itemHeader: {
//     flex: 1/4,
//     flexDirection: 'row',
//     backgroundColor: 'blue',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },  
//   itemPoints: {
//     flex: 1/4,
//     right: 0,
//     top: 0,
//     backgroundColor: 'red',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   itemDescription: {
//     flex: 1/4,
//     backgroundColor: 'purple',
//     justifyContent: 'center',
//     alignItems: 'center',
//     width: '80%'
//   },
//   itemQR: {
//     flex: 1/2,
//     backgroundColor: 'green',
//     justifyContent: 'center',
//     alignItems: 'center',
//     width: '80%'
//   },
//   cartContainer: {
//     flexDirection: 'row',
//     backgroundColor: 'green',
//     justifyContent: 'center',
//     alignItems: 'center',
//     width: '80%'
//   },
//   cartText: {
//     backgroundColor: 'yellow',
//     flex: 1/3,
//   },
//   cart: {
//     flexDirection: 'column',
//     backgroundColor: 'orange',
//     flex: 2/3,
//   }
// })

