import { Text } from "react-native";

type Props={
    items: Array<any>,
    setItems: React.Dispatch<React.SetStateAction<Array<any>>>,
    offers: Array<any>,
    setOffers: React.Dispatch<React.SetStateAction<Array<any>>>,
}
const QrScanner = ({items, setItems, offers, setOffers}: Props) => {
    // const { hasPermission, requestPermission } = useCameraPermission()


    // const handleScanSuccess = (scanData: any) => {
    //     // Handle successful scan
    //     console.log('QR Code Scanned:', scanData);
    //     let str = JSON.parse(scanData);
    //     console.log('items:', str);
    //     setItems(str);
    //     setOffers(items.map((item) => <div>{item['title']}</div>))
    //     console.log('offers:', offers);
    // };

    // const handleScanFail = () => {
    //     // Handle scan failure
    //     console.log('Failed to scan QR Code.');
    // };

    // const device = useCameraDevice('back')

    // if (device == null) return <NoCameraErrorView />
    return (
        <Text>Temporary stuff</Text>
        // <Camera
        // style={StyleSheet.absoluteFill}
        // device={device}
        // isActive={true}
        // />
    )
};

export default QrScanner;
