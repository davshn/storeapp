/* eslint-disable react/react-in-jsx-scope */
import {View, StyleSheet, Pressable, Text} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {useNavigation} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import {getList, getCategories} from '../services';
import Geolocation from '@react-native-community/geolocation';
import {useDispatch, useSelector} from 'react-redux';
export default function HomeScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const list = useSelector(state => state.resourcesReducer.list);
  const [latitude, onChangeLatitude] = useState(-0.207381);
  const [longitude, onChangeLongitude] = useState(-78.3331617);

  useEffect(() => {
    async function fetchData() {
      const list = await getList();
      console.log(list);
      const cats = await getCategories();
      dispatch({type: 'GET_SUBCATEGORIES', payload: cats});
      const formattedCategories = Object.keys(cats);
      dispatch({type: 'GET_CATEGORIES', payload: formattedCategories});
      dispatch({type: 'GET_LIST', payload: list});
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  Geolocation.getCurrentPosition(info => {
    onChangeLatitude(info.coords.latitude);
    onChangeLongitude(info.coords.longitude);
  });

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        showsUserLocation
        region={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}>
        {list.map((item, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: item.latitud,
              longitude: item.longitud,
            }}
            title={item.nombre}
            description={item.direccion}
          />
        ))}
      </MapView>
      <View style={styles.buttonTop}>
        <Pressable
          style={styles.miniButton}
          onPress={() => navigation.navigate('List')}>
          <Text style={styles.textButton}>Lista</Text>
        </Pressable>
        <Pressable
          style={styles.miniButton}
          onPress={() => navigation.navigate('Home')}>
          <Text style={styles.textButton}>Mapa</Text>
        </Pressable>
      </View>
      <View style={styles.buttonBottom}>
        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate('NewRegister')}>
          <Text style={styles.textButton}>Agregar nuevo</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  buttonTop: {
    flex: 1,
    position: 'absolute',
    top: 70,
    alignContent: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonBottom: {
    flex: 1,
    position: 'absolute',
    bottom: 70,
    alignContent: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: 'black',
    width: '70%',
    alignSelf: 'center',
  },
  miniButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: 'black',
    width: '40%',
    alignSelf: 'center',
  },
  textButton: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});
