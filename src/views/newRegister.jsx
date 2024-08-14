/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  Alert,
  Pressable,
  ScrollView,
  ActivityIndicator,
  Switch,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useState, useEffect} from 'react';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
// import * as Location from 'expo-location';
import {addShop, getCategories, addShopImage} from '../services';
import {Picker} from '@react-native-picker/picker';
import Geolocation from '@react-native-community/geolocation';
import * as ImagePicker from 'expo-image-picker';
import {useSelector} from 'react-redux';
export default function NewRegisterScreen() {
  const navigation = useNavigation();
  const [name, onChangeName] = useState('');
  const [address, onChangeAddress] = useState('');
  const [address2, onChangeAddress2] = useState('');
  const [additionalData, onChangeAdditionalData] = useState('');
  const [latitude, onChangeLatitude] = useState(0);
  const [longitude, onChangeLongitude] = useState(0);
  const [observations, onChangeObservations] = useState('');
  const [category, setCategory] = useState('');
  const [subcategory, setSubcategory] = useState('');

  const categories = useSelector(state => state.resourcesReducer.categories);
  const subcategories = useSelector(
    state => state.resourcesReducer.subcategories,
  );
  const [activateMap, setActivateMap] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);

  const [errorMsg, setErrorMsg] = useState('');

  const selectedCategory = subcategories[category] || [];

  const [isLoading, setIsLoading] = useState(false);
  const [id, setId] = useState(0);

  useEffect(() => {
    Geolocation.getCurrentPosition(
      info => {
        onChangeLatitude(info.coords.latitude);
        onChangeLongitude(info.coords.longitude);
      },
      error => Alert.alert(error.message),
      {enableHighAccuracy: true},
    );
  }, []);

  const saveRegister = () => {
    setActivateMap(false);
  };

  const getVoucher = async shopId => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled) {
      const voutcher = result.assets[0].uri;

      await addShopImage(shopId, voutcher);

      Alert.alert('La tienda ha sido registrada exitosamente');
      navigation.navigate('Home');
    } else {
      Alert.alert('La tienda ha sido registrada exitosamente');
      navigation.navigate('Home');
    }
  };

  const registerStore = async () => {
    setErrorMsg('');
    if (name === '') {
      setErrorMsg('El nombre es obligatorio');
      return;
    }
    if (address === '') {
      setErrorMsg('La dirección es obligatoria');
      return;
    }
    if (latitude === 0 || longitude === 0) {
      setErrorMsg('La ubicación es obligatoria');
      return;
    }
    if (category === '') {
      setErrorMsg('La categoría es obligatoria');
      return;
    }

    if (subcategory === '') {
      setErrorMsg('La subcategoría es obligatoria');
      return;
    }
    setIsLoading(true);
    const newshop = await addShop({
      nombre: name,
      callePrincipal: address,
      calleSecundaria: address2,
      datosAdicionales: additionalData,
      latitud: latitude,
      longitud: longitude,
      referencias: observations,
      categoria: category,
      subcategoria: subcategory,
      existenciaMarca: isEnabled,
    });

    if (newshop.status === 400 || newshop.status === 401) {
      setErrorMsg(newshop?.errors?.Nombre[0]);
      setIsLoading(false);
      return;
    }
    setId(newshop.id);
    onChangeName('');
    onChangeAddress('');
    onChangeAddress2('');
    onChangeAdditionalData('');
    Geolocation.getCurrentPosition(
      info => {
        onChangeLatitude(info.coords.latitude);
        onChangeLongitude(info.coords.longitude);
      },
      error => Alert.alert(error.message),
      {enableHighAccuracy: true},
    );
    onChangeObservations('');
    setCategory('');
    setSubcategory('');
    setIsLoading(false);
    setIsEnabled(false);
    await getVoucher(newshop.id);
  };

  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
  };

  return (
    <>
      {activateMap ? (
        <View style={styles.mapContainer}>
          <Text style={styles.title}>
            Mueva el marcador a la ubicacion exacta de la tienda
          </Text>
          <MapView
            style={styles.map}
            provider={PROVIDER_GOOGLE}
            initialRegion={{
              latitude: latitude,
              longitude: longitude,
              latitudeDelta: 0.015,
              longitudeDelta: 0.0121,
            }}>
            <Marker
              coordinate={{
                latitude: latitude,
                longitude: longitude,
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121,
              }}
              draggable
              onDragEnd={e => {
                onChangeLatitude(e.nativeEvent.coordinate.latitude);
                onChangeLongitude(e.nativeEvent.coordinate.longitude);
              }}
              title={name}
              description={address}
            />
          </MapView>
          <Pressable style={styles.button} onPress={saveRegister}>
            <Text style={styles.textButton}>Registrar</Text>
          </Pressable>
        </View>
      ) : (
        <ScrollView style={styles.container}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 10,
            }}>
            <View style={styles.inputContainer}>
              <Text style={styles.title}>Tipo de negocio</Text>
              <Picker
                selectedValue={category}
                style={{
                  height: 40,
                  width: '100%',
                  borderWidth: 1,
                  color: 'black',
                  borderRadius: 10,
                  padding: 10,
                }}
                onValueChange={(itemValue, itemIndex) => {
                  setCategory(itemValue);
                  setSubcategory('');
                }}>
                <Picker.Item label="Seleccione una categoría" value="" />
                {categories.map((item, index) => (
                  <Picker.Item key={index} label={item} value={item} />
                ))}
              </Picker>
              <Picker
                selectedValue={subcategory}
                style={{
                  height: 40,
                  width: '100%',
                  borderWidth: 1,
                  color: 'black',
                  borderRadius: 10,
                  padding: 10,
                }}
                onValueChange={(itemValue, itemIndex) => {
                  setSubcategory(itemValue);
                }}>
                <Picker.Item label="Seleccione una subcategoría" value="" />
                {selectedCategory.map((item, index) => (
                  <Picker.Item key={index} label={item} value={item} />
                ))}
              </Picker>
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.title}>Nombre (Mas de 5 caracteres)</Text>
              <TextInput
                style={styles.input}
                onChangeText={onChangeName}
                placeholder="Nombre de la tienda"
                placeholderTextColor="#6E6E6E"
                value={name}
              />
              <Text style={styles.title}>Dirección</Text>
              <TextInput
                style={styles.input}
                placeholder="Calle principal"
                placeholderTextColor="#6E6E6E"
                onChangeText={onChangeAddress}
                value={address}
              />
              <TextInput
                placeholder="Calle secundaria"
                placeholderTextColor="#6E6E6E"
                style={styles.input}
                onChangeText={onChangeAddress2}
                value={address2}
              />
              <TextInput
                style={styles.input}
                placeholder="Referencias"
                placeholderTextColor="#6E6E6E"
                onChangeText={onChangeObservations}
                value={observations}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.title}>Ubicación</Text>
              <Pressable
                style={styles.altButton}
                onPress={() => setActivateMap(true)}>
                <Text style={styles.altTextButton}>
                  Marcar ubicación en el mapa
                </Text>
              </Pressable>
              <View style={styles.locationContainer}>
                <Text style={{color: '#6E6E6E'}}>{latitude}</Text>
                <Text style={{color: '#6E6E6E'}}>{longitude}</Text>
              </View>
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.title}>Hay existencia de marca?</Text>
              <View style={styles.locationContainer}>
                <Text style={{color: '#6E6E6E'}}>No</Text>
                <Switch onValueChange={toggleSwitch} value={isEnabled} />
                <Text style={{color: '#6E6E6E'}}>Si</Text>
              </View>
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.title}>Observaciones</Text>
              <TextInput
                style={styles.input}
                placeholder="Observaciones o datos adicionales"
                placeholderTextColor="#6E6E6E"
                onChangeText={onChangeAdditionalData}
                value={additionalData}
              />
            </View>
            {errorMsg !== '' && (
              <Text style={styles.errorText}>{errorMsg}</Text>
            )}
            {isLoading ? (
              <ActivityIndicator size="large" color="black" />
            ) : (
              <Pressable style={styles.button} onPress={registerStore}>
                <Text style={styles.textButton}>Guardar</Text>
              </Pressable>
            )}
          </View>
        </ScrollView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    height: '100%',
  },
  mapContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderColor: '#BDBDBD',
    borderRadius: 10,
    padding: 10,
    color: 'black',
  },
  locationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  map: {
    width: '90%',
    height: '80%',
  },
  errorText: {
    color: 'red',
  },
  title: {
    fontWeight: 'bold',
    color: 'black',
  },
  inputContainer: {
    width: '80%',
    marginBottom: 20,
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
  altButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: 'white',
    width: '90%',
    alignSelf: 'center',
    borderColor: 'black',
    borderWidth: 2,
    marginVertical: 20,
  },
  altTextButton: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'black',
  },
  textButton: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});
