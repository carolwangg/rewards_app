import {View, Text, StyleSheet, Dimensions, Pressable} from 'react-native';

import LanguageIcon from '@/assets/images/language-icon.svg';
import NotifsIcon from '@/assets/images/notifs-icon.svg';
import SettingsIcon from '@/assets/images/settings-icon.svg';
import ThemeIcon from '@/assets/images/theme-icon.svg';
import ProfileIcon from '@/assets/images/profile-icon.svg';
import FONTS from '@/constants/fonts';
import COLOURS from '@/constants/colours';
import { RelativePathString, router } from 'expo-router';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const DEFAULT_SELECTED_ID = "account";
const IDS = ["account", "settings", "language", "theme", "notifs"];
type Props = {
    selectedId: string
    setSelectedId: Function
}


export default function SettingsPage({selectedId, setSelectedId}: Props) {
  const {t} = useTranslation();
  const factory = useCallback((id: string, selectedId: string, setSelectedId: Function) => {
    let icon, text;
    let url: RelativePathString;
    let onPressAction = () => {setSelectedId(id); router.push(url)};
    switch(id){
        case "account":
            icon = <ProfileIcon/>;
            text = t("settings.accountDetails");
            url = "./account";
            onPressAction = () => {setSelectedId(id); router.replace(url)};
            break;
        case "settings":
            icon = <SettingsIcon/>;
            text = t("settings.settings&Privacy");
            url = "./settings";
            break;
        case "language":
            icon = <LanguageIcon/>;
            text = t("settings.language");
            url = "./language";
            break;
        case "theme":
            icon = <ThemeIcon/>;
            text = t("settings.theme");
            url = "./theme";
            break;
        case "notifs":
            icon = <NotifsIcon/>;
            text = t("settings.notifs");
            url = "./notifs";
            break;
        default:
            text = "Default";
            break;
    }
    if (id === selectedId){
        return <Pressable key={id} id={id} style={[styles.option, styles.selected]} onPress={onPressAction}>
        {icon}
        <Text style={styles.optionText}>
          {text}
        </Text>
      </Pressable>
    }
    return <Pressable key={id} id={id} style={[styles.option]} onPress={onPressAction}>
        {icon}
        <Text style={styles.optionText}>
          {text}
        </Text>
      </Pressable>
}, [t]);
  return (
    <View testID="247:1216" style={[styles.root]}>
        <View style={[styles.body, {paddingTop: '10%'}]}>
            {IDS.map((id) => factory(id, selectedId, setSelectedId))}
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    width: SCREEN_WIDTH,
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: "center",
    minHeight: '100%',
  },
  body:{
    marginTop: 20,
    width: '80%',
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    rowGap: 10,
  },
  option: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 10,
    justifyContent: 'flex-start',
    alignItems: 'center',
    alignSelf: 'stretch',
    borderRadius: 10,
    columnGap: 20,
  },
  optionText: {
    color: 'rgba(0, 0, 0, 1)',
    fontFamily: FONTS.GOWUN_DODUM,
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '400',
  },
  selected: {
    backgroundColor: COLOURS.LIGHT_GRAY
  }
});
