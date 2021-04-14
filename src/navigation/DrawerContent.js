import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { Drawer, Switch, Text, TouchableRipple } from 'react-native-paper'

export default function DrawerContent(props) {
    const { navigation } = props;
    const [active, setActive] = useState("home");

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
        </DrawerContentScrollView>
    )
}

const styles = StyleSheet.create({})
