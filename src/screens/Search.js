import React, { useEffect, useState } from 'react'
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    TouchableWithoutFeedback,
    Dimensions,
    Platform
} from 'react-native'
import { Searchbar } from 'react-native-paper'
import { searchMoviesApi } from '../api/movie';

export default function Search() {
    const [movies, setMovies] = useState(null);

    useEffect(() => {
        searchMoviesApi('dragon ball').then((response) => {
            setMovies(response.results);
        });
    }, []);

    return (
        <SafeAreaView>
            <Searchbar 
            placeholder="Busca tu pelicula"
             iconColor={Platform.OS==='ios' && 'transparent'}
             icon="arrow-left"
             style={styles.input} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    input: {
        marginTop: -3,
        backgroundColor: '#15212b'
    }
})
