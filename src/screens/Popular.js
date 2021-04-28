import { map } from 'lodash';
import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, View, Image, TouchableWithoutFeedback } from 'react-native'
import { Text, Title, Button } from 'react-native-paper';

import { getPopularMoviesApi } from '../api/movie';
import { BASE_PATH_IMG } from '../utils/contants';

import noImage from '../assets/jpg/default-imgage.png';
import { Rating } from 'react-native-ratings';
import starDark from '../assets/png/starDark.png';
import starLight from '../assets/png/starLight.png';
import usePreference from '../hook/usePreference';


export default function Popular(props) {
  const { navigation } = props;
  const { theme } = usePreference();
  const [movies, setMovies] = useState(null);
  const [showBtnMore, setshowBtnMore] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    getPopularMoviesApi(page).then((response) => {
      const totalPages = response.total_pages;
      if (page < totalPages) {
        if (!movies) {
          setMovies(response.results);
        } else {
          setMovies([...movies, ...response.results]);
        }

      } else {
        setshowBtnMore(false);
      }

    });
  }, [page]);


  return (
    <ScrollView>
      {map(movies, (movie, index) => (
        <Movie
          key={index}
          movie={movie}
          theme={theme}
          navigation={navigation}
        />
      ))}
      {showBtnMore && (
        <Button
          mode="contained"
          contentStyle={styles.lodadMoreContainer}
          style={styles.loadMore}
          labelStyle={{ color: theme === 'dark' ? '#fff' : '#000' }}
          onPress={() => setPage(page + 1)}>
          Cargar mas...
        </Button>
      )}
    </ScrollView>
  );
}

function Movie(props) {
  const { movie, theme, navigation } = props;
  const {
    id,
    poster_path,
    title,
    release_date,
    vote_count,
    vote_average
  }
= movie;

const goMovie = () => {
  navigation.navigate('movie', { id });
}
return (
  <TouchableWithoutFeedback onPress={goMovie}>
    <View style={styles.movie}>
      <View style={styles.left}>
        <Image style={styles.image}
          source={
            poster_path
              ? { uri: `${BASE_PATH_IMG}/w500${poster_path}` }
              : noImage
          }
        />
      </View>
      <View>
        <Title>{title}</Title>
        <Text>{release_date}</Text>
        <MovieRating theme={theme} voteCount={vote_count} voteAverage={vote_average} />
      </View>
    </View>
  </TouchableWithoutFeedback>
)
}
function MovieRating(props) {
  const { voteCount, voteAverage, theme } = props;
  const media = voteAverage / 2;

  return (
    <View style={styles.viewRating}>
      <Rating
        type="custom"
        ratingImage={theme === 'dark' ? starDark : starLight}
        ratingColor="#ffc205"
        ratingBackgroundColor={theme === 'dark' ? '#192734' : '#f0f0f0'}
        startingValue={media}
        imageSize={20}
        style={{ marginRight: 15 }}
      />
      <Text style={{ fontSize: 12, color: '#8697a5', marginTop: 5 }}>
        {voteCount} votos
      </Text>
    </View>
  );
}
const styles = StyleSheet.create({
  movie: {
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center'
  },
  left: {
    marginRight: 20
  },
  image: {
    height: 100,
    width: 150
  },
  viewRating: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginTop: 10
  },
  lodadMoreContainer: {
    paddingTop: 10,
    paddingBottom: 30,
  },
  loadMore: {
    backgroundColor: 'transparent',
  },
})
