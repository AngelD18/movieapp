import React, { useEffect, useState } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { IconButton, Modal, Title } from 'react-native-paper';
import YouTube from 'react-native-youtube';
import  WebView  from 'react-native-webview';
import { getVideoMovieApi } from '../api/movie';

export default function ModalVideo(props) {
    const { show, setShow, idMovie } = props;
    const [video, setVideo] = useState(null);
    useEffect(() => {

        getVideoMovieApi(idMovie).then((response) => {
            let idVideo = null;
            response.results.forEach(video => {
                if (video.site === 'YouTube' && !idVideo) {
                    idVideo = video.key;
                }
            });
            console.log(response)
            setVideo(idVideo);
        })
    }, [])
    return (
        <Modal visible={show} contentContainerStyle={styles.modal}>
            {Platform.OS !== 'ios' ? (
               <WebView style={{ width: 500 }} source={{ uri: `https://www.youtube.com/embed/${video}?controls=0&showinfo=0` }} />
            ) : (
                <YouTube videoId={video} style={styles.video} />        
            )}

            <IconButton
                icon="close"
                onPress={() => setShow(false)}
                style={styles.close}
            />
        </Modal>
    )
}

const styles = StyleSheet.create({
    modal: {
        backgroundColor: '#000',
        height: '120%',
        alignItems: 'center'
    },
    close: {
        backgroundColor: '#1ea1f2',
        width: 50,
        height: 50,
        borderRadius: 100,
        position: 'absolute',
        bottom: 100
    },
    video: {
        alignSelf: 'stretch',
        height: 300
    }
})
