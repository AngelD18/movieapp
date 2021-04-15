import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { Title } from 'react-native-paper'
import { getNewsMoviesApi } from '../api/movie';
import CarousellVertical from '../components/CarousellVertical';

export default function Home(props) {
    const { navigation } = props;
    const [newMovies, setNewMovies] = useState(null);
    console.log(newMovies)
    useEffect(async () => {
        const data = await getNewsMoviesApi();
        setNewMovies(data.results);

    }, []);

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            {newMovies && (
                <View style={styles.news}>
                    <Title style={styles.newTitle}>Nuevas Peliculas</Title>
                    <CarousellVertical navigation={navigation} data={newMovies} />
                </View>
            )}
            <View style={styles.genres}>
                <Title style={styles.genreByGenreTitle}>Peliculas por genero</Title>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    news: {
        marginVertical: 10
    },
    newTitle: {
        marginBottom: 15,
        marginHorizontal: 20,
        fontWeight: 'bold',
        fontSize: 22
    },
    genres: {
        marginTop: 20,
        marginBottom: 50
    },
    genreByGenreTitle: {
        marginHorizontal: 20,
        fontWeight: 'bold',
        fontSize: 22
    }
});