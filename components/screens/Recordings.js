import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Button } from 'react-native';
import { Audio } from 'expo-av';
import { MaterialIcons } from '@expo/vector-icons';
import Header from './Header';

export default function RecordingsScreen({ route, navigation }) {
  const [recordings, setRecordings] = useState([]);
  const [sound, setSound] = useState(null);

  useEffect(() => {
    if (route.params?.uri) {
      const newRecording = {
        uri: route.params.uri,
        sound: new Audio.Sound(),
        isPlaying: false,
      };
      setRecordings([...recordings, newRecording]);
    }
  }, [route.params?.uri]);

  const playRecording = async (index) => {
    if (sound) {
      await sound.unloadAsync();
    }
    const selectedRecording = recordings[index];
    try {
      await selectedRecording.sound.loadAsync({ uri: selectedRecording.uri });
      await selectedRecording.sound.playAsync();
      setSound(selectedRecording.sound);
      selectedRecording.isPlaying = true;
      setRecordings([...recordings]);
    } catch (error) {
      console.error('Failed to play audio', error);
    }
  };

  const pauseRecording = async (index) => {
    const selectedRecording = recordings[index];
    try {
      await selectedRecording.sound.pauseAsync();
      selectedRecording.isPlaying = false;
      setRecordings([...recordings]);
    } catch (error) {
      console.error('Failed to pause audio', error);
    }
  };

  const deleteRecording = async (index) => {
    const selectedRecording = recordings[index];
    try {
      await selectedRecording.sound.unloadAsync();
      recordings.splice(index, 1);
      setRecordings([...recordings]);
    } catch (error) {
      console.error('Failed to delete audio', error);
    }
  };

  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <Text style={styles.headerText}>Recorded Audio</Text>
      <FlatList
        data={recordings}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.recordingItem}>
            <Text>{`Recording ${index + 1}`}</Text>
            <TouchableOpacity
              onPress={() => {
                item.isPlaying ? pauseRecording(index) : playRecording(index);
              }}
            >
              <MaterialIcons
                name={item.isPlaying ? 'pause' : 'play-arrow'}
                size={24}
                color="#0077FF"
              />
            </TouchableOpacity>
            <Button
              title="Delete"
              onPress={() => deleteRecording(index)}
              color="red"
            />
          </View>
        )}
      />
      <View style={styles.footer}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <MaterialIcons name="home" size={30} color="#000000" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Recordings')}>
          <MaterialIcons name="list" size={30} color="#000000" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
  },
  headerText: {
    fontSize: 24,
    marginBottom: 20,
  },
  recordingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  footer: {
    position: 'absolute',
    bottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
  },
});
