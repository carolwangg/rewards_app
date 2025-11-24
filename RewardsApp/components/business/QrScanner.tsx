import React from 'react';
import { useState, useRef } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { CameraView, useCameraPermissions, BarcodeScanningResult, BarcodeBounds } from 'expo-camera';
import { SafeAreaView } from 'react-native-safe-area-context';
import FONTS from '@/fonts';
import { router } from 'expo-router';

import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';

interface RedeemInfo{
    customer_id: number,
    reward_id: number
}

interface AddPointInfo{
    customer_id: number,
}

const QrScanner = () => {
    const [barcodeBounds, setBarcodeBounds] = useState<BarcodeBounds>({origin: {x: 0, y: 0}, size: {height: 0, width: 0}});
    const [permission, requestPermission] = useCameraPermissions();
    const [buttonVisible, setButtonVisible] = useState<boolean>(false);
    const siteName = "http://10.0.0.91:8080/"
    const absolutePaths = ["", "customers", "businesses", "cards", "rewards"]
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

    const verifyUrl = (data: string) => {
        const absolutePathRegex = absolutePaths.join('');
        const regex = new RegExp(`${siteName}[${absolutePathRegex}]*`);
        return regex.test(data);
    }
    
    const handleScanSuccess = (scanData: BarcodeScanningResult) => {
        // Handle successful scan
        if (scannedRef.current) return;
        console.log('QR Code Scanned:', scanData);
        updateBoundingBox(scanData.bounds);
        if (verifyUrl(scanData.data)){
            scannedRef.current = true;
            router.push("/cart");
            setBarcodeBounds({origin: {x: 0, y: 0}, size: {height: 0, width: 0}});
            setButtonVisible(false);
        }
    };

    // useEffect(() => {}, [barcodeBounds]);
    
        return <View style={{flex: 1, top: 0, alignItems: "center"}}>
            <CameraView
            style={{flex: 1, alignSelf: 'stretch'}}
            barcodeScannerSettings={{
                barcodeTypes: ["qr"],
            }}
            onBarcodeScanned={handleScanSuccess}/>
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