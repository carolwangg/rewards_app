import React from 'react';
import { useState, useRef } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { CameraView, useCameraPermissions, BarcodeScanningResult, BarcodeBounds } from 'expo-camera';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import FONTS from '@/constants/fonts';
import { router } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import QrMask from '@/assets/images/qr-scanner-border.svg'
const QrScanner = () => {
    const [barcodeBounds, setBarcodeBounds] = useState<BarcodeBounds>({origin: {x: 0, y: 0}, size: {height: 0, width: 0}});
    const [permission, requestPermission] = useCameraPermissions();
    const [buttonVisible, setButtonVisible] = useState<boolean>(false);
    const scannedRef = useRef(false);

    useFocusEffect(
    useCallback(() => {
        // Screen is focused
        scannedRef.current = false;
    }, [])
    );

    if (!permission) {
        // Camera permissions are still loading.
        return <View />;
    }
    if (!permission.granted) {
        return (
        <SafeAreaView style={{width: '100%', height: '100%'}}>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Text>We need your permission to show the camera</Text>
                <Button onPress={requestPermission} title="grant permission" />
            </View>
        </SafeAreaView>
        );
    }

    const updateBoundingBox = (barcodeBounds: BarcodeBounds) => {
        setBarcodeBounds(barcodeBounds);
        setButtonVisible(true);
    };

    const verifyData = (data: Object) => {
        return "customer_id" in data || "customer_id" in data && "reward_id" in data;
    }
    
    const handleScanSuccess = (scanData: BarcodeScanningResult) => {
        // Handle successful scan
        try{
            if (scannedRef.current) return;
            console.log('QR Code Scanned:', scanData.data);
            console.log('data json parsed:', JSON.parse(scanData.data));
            updateBoundingBox(scanData.bounds);
            const data = JSON.parse(scanData.data);
            if (verifyData(data)){
                scannedRef.current = true;
                router.push({pathname:'./cart',
                params: { data: scanData.data }});
                setBarcodeBounds({origin: {x: 0, y: 0}, size: {height: 0, width: 0}});
                setButtonVisible(false);
            }
        }catch(err){
                
        }
        
    };

    // useEffect(() => {}, [barcodeBounds]);
    
        return <View style={{flex: 1, top: 0, alignItems: "center", width: '100%', height: '100%'}}>
            <CameraView
            style={{flex: 1, alignSelf: 'stretch'}}
            barcodeScannerSettings={{
                barcodeTypes: ["qr"],
            }}
            onBarcodeScanned={handleScanSuccess}/>
            <QrMask style={{position: 'absolute', top: 0, left: 0, width: 100, height: 100}}/>
        <View style={[styles.boundingBox, {position: "absolute", left:barcodeBounds.origin.x, top:barcodeBounds.origin.y, width:barcodeBounds.size.width, height:barcodeBounds.size.height}]}/>
        <View style={[styles.button, {position: "absolute", bottom: 0, display:buttonVisible? "flex": "none"}]}><Text style={styles.buttonText}>Proceed</Text></View>
        </View>
        
};
const styles = StyleSheet.create({
  boundingBox: {
    borderWidth: 2,
    borderColor: 'blue'
  },
  button:{
    backgroundColor: "rgba(183, 230, 130, 1)",
    borderColor: "rgba(104, 155, 97, 1)",
    borderWidth: 2,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
    margin: 30,
  },
  buttonText: {
    fontFamily: FONTS.GOWUN_DODUM,
    fontSize: 18
  }
});
export default QrScanner;