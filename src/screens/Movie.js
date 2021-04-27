
import React, { Fragment, useEffect, useState } from 'react'
import { StyleSheet, View, ScrollView, Image } from 'react-native'
import { IconButton, Text, Title } from 'react-native-paper';
import { getMovieByIdApi } from '../api/movie';
import ModalVideo from '../components/ModalVideo';
import { BASE_PATH_IMG } from '../utils/contants';
import { map } from 'lodash';
import { Rating } from 'react-native-ratings';
import starDark from '../assets/png/starDark.png';
import starLight from '../assets/png/starLight.png';
import usePreferences from '../hook/usePreference'
export default function Movie(props) {
  const { route } = props;
  const { id } = route.params;

  const [movie, setMovie] = useState({});
  const [show, setShow] = useState(false);

  useEffect(() => {
    getMovieByIdApi(id).then((response) => {
      setMovie(response);
    });
  }, []);


  return (
    <Fragment>
      <ScrollView>
        <MovieImage posterPath={movie.poster_path} />
        <MovieTrailer setShow={setShow} />
        <MovieTitle movie={movie} />
        <MovieRating voteCount={movie.vote_count} voteAverage={movie.vote_average} />
      </ScrollView>
      <ModalVideo show={show} setShow={setShow} idMovie={id} />
    </Fragment>
  )
}

function MovieTitle(props) {
  const { movie } = props;

  return (
    <View style={styles.viewInfo}>
      <Title>{movie.title}</Title>
      <View style={styles.viewGenres}>
        {map(movie.genres, (genre) => (
          <Text key={genre.id} style={styles.genre}>
            {genre.name}
          </Text>
        ))}
      </View>
    </View>
  )
}

function MovieImage(props) {
  const { posterPath } = props;

  return (
    <View style={styles.viewPoster}>
      <Image
        style={styles.poster}
        source={{ uri: `${BASE_PATH_IMG}/w500${posterPath}` }}
      />
    </View>
  );
}

function MovieTrailer(props) {
  const { setShow } = props;
  return (
    <View style={styles.viewPlay}>
      <IconButton
        icon="play"
        color="#000"
        size={30}
        style={styles.play}
        onPress={() => setShow(true)}
      />
    </View>
  )
}

function MovieRating(props) {
  const { voteCount, voteAverage } = props;
  const media = voteAverage / 2;
  const { theme } = usePreferences();

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
    </View>
  )
}

const styles = StyleSheet.create({
  viewPoster: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10
    },
    shadowOpacity: 1,
    textShadowRadius: 10
  },
  poster: {
    width: '100%',
    height: 500,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30

  },
  viewPlay: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  },
  play: {
    backgroundColor: '#fff',
    marginTop: -40,
    marginRight: 30,
    width: 60,
    height: 60,
    borderRadius: 100
  },
  viewInfo: {
    marginHorizontal: 30
  },
  viewGenres: {
    flexDirection: 'row'
  },
  genre: {
    marginRight: 20,
    color: '#8697a5'
  },
  viewRating: {
    marginHorizontal: 3,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center'
  }
})
