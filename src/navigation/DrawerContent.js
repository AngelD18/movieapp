import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { Drawer, Switch, Text, TouchableRipple } from 'react-native-paper'
import usePreference from '../hook/usePreference';

export default function DrawerContent(props) {
    const { navigation } = props;
    const [active, setActive] = useState("home");

    const { theme, toggleTheme } = usePreference();


    const onChangeScreeen = (screen) => {
        setActive(screen);
        navigation.navigate(screen)
    }
    return (
        <DrawerContentScrollView>
            <Drawer.Section>
                <Drawer.Item
                    label="Inicio"
                    active={active === 'home'}
                    onPress={() => onChangeScreeen('home')}
                />
                <Drawer.Item
                    label="Peliculas Populares"
                    active={active === 'popular'}
                    onPress={() => onChangeScreeen('popular')}
                />
                <Drawer.Item
                    label="Nuevas Peliculas"
                    active={active === 'news'}
                    onPress={() => onChangeScreeen('news')}
                />

            </Drawer.Section>
            <Drawer.Section title="Opciones">
                <TouchableRipple>
                    <View style={styles.preference}>
                        <Text>Tema Oscuro</Text>
                        <Switch value={theme === "dark"} onValueChange={toggleTheme}/>
                    </View>
                </TouchableRipple>
            </Drawer.Section>
        </DrawerContentScrollView>
    )
}

const styles = StyleSheet.create({
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 16
    }
})
