
import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { Title, Text } from 'react-native-paper'
import { map } from 'lodash';
import { getNewsMoviesApi, getAllGenresApi, getGenresMoviesApi } from '../api/movie';
import CarousellVertical from '../components/CarousellVertical';
import CarouselMulti from '../components/CarouselMulti';

export default function Home(props) {
  const { navigation } = props;
  const [newMovies, setNewMovies] = useState(null);
  const [genresList, setGenresList] = useState([]);
  const [genreSelected, setGenreSelected] = useState(28);
  const [genreMovies, setGenreMovies] = useState(null)
  console.log(genreMovies);

  useEffect(async () => {
    const data = await getNewsMoviesApi();
    setNewMovies(data.results);

  }, []);

  useEffect(() => {
    getAllGenresApi().then((response) => {
      setGenresList(response.genres);
    });
  }, []);

  useEffect(() => {
    getGenresMoviesApi(genreSelected).then((response) => {
      setGenreMovies(response.results);
    });
  }, [genreSelected]);

  const onChangeGenre = (newGenreId) => {
    setGenreSelected(newGenreId);
  }
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
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.genresList}>
          {map(genresList, (genre) => {
            return (
              <Text
                key={genre.id}
                style={[styles.genre, { color: genre.id !== genreSelected ? '#8697a5' : 'red' }]}
                onPress={() => onChangeGenre(genre.id)}
              >
                {genre.name}
              </Text>
            )

          })}
          
        </ScrollView>
       {genreMovies &&(
          <CarouselMulti data={genreMovies} navigation={navigation} />
       )}
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
  },
  genresList: {
    marginTop: 5,
    marginBottom: 15,
    paddingHorizontal: 20,
    padding: 10,

  },
  genre: {
    marginRight: 20,
    fontSize: 16,
    fontWeight: 'bold'
  }
});