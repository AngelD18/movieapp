import React, { useEffect, useState } from 'react';
import { StyleSheet, View, TouchableWithoutFeedback, Dimensions, Image } from 'react-native';
import { Text, Title } from 'react-native-paper';
import Carousel from 'react-native-snap-carousel';
import { getGenreMoviesApi } from '../api/movie';
import { map, size } from 'lodash';
import { BASE_PATH_IMG } from '../utils/contants';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = Math.round(width * 0.7);

export default function CarousellVertical(props) {
    const { data, navigation } = props;
    return (
        <Carousel
            layout={'default'}
            data={data}
            renderItem={(item) => <RenderItem navigation={navigation} data={item} />}
            sliderWidth={width}
            itemWidth={ITEM_WIDTH}

        />
    )
}
function RenderItem(props) {
    const { data, navigation } = props;
    const { title, poster_path, genre_ids } = data.item;
    const imageUrl = `${BASE_PATH_IMG}/w500${poster_path}`;
    const [genres, setGenres] = useState(null);
    useEffect(() => {
        getGenreMoviesApi(genre_ids).then((response) => {
            setGenres(response);
        });
    }, []);
    const onNavigation = () => {
        navigation.navigate('movie');
    }
    return (
        <TouchableWithoutFeedback onPress={onNavigation}>
            <View style={styles.card}>
                <Image style={styles.image} source={{ uri: imageUrl }} />
                <Title style={styles.title}>{title}</Title>

                <View style={styles.genres}>
                    {genres &&
                        map(genres, (genre, index) => (
                            <Text key={index} style={styles.genre}>
                                {genre}
                                {index !== size(genres) - 1 && ', '}
                            </Text>
                        ))}
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}
const styles = StyleSheet.create({
    card: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 10
        },
        shadowOpacity: 1,
        shadowRadius: 10
    },
    image: {
        width: '100%',
        height: 450,
        borderRadius: 20
    },
    title: {
        marginHorizontal: 10,
        marginTop: 10
    },
    genres: {
        marginHorizontal: 10,
        flexDirection: 'row'
    },
    genre: {
        fontSize: 12,
        color: '#8997a5'
    }

})
