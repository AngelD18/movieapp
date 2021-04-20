import React, { Fragment, useEffect, useState } from 'react'
import { StyleSheet, View, ScrollView, Image } from 'react-native'
import { IconButton, Text, Title } from 'react-native-paper';
import { getMovieByIdApi } from '../api/movie';
import ModalVideo from '../components/ModalVideo';
import { BASE_PATH_IMG } from '../utils/contants';
export default function Movie(props) {
  const { route } = props;
  const { id } = route.params;

  const [movie, setMovie] = useState({});
  const [show, setShow] = useState(false);
  console.log(movie.poster_path)
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
      </ScrollView>
      <ModalVideo show={show} setShow={setShow} idMovie={id}/>
    </Fragment>
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
  }
})
