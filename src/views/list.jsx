/* eslint-disable react/react-in-jsx-scope */
import {View, StyleSheet, Pressable, Text, Image, FlatList} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import {getList} from '../services';
import {useSelector} from 'react-redux';
const Item = ({nombre, direccion, datosAdicionales, categoria}) => (
  <View style={styles.itemContainer}>
    <Image style={styles.logo} source={require('../Assets/icon.png')} />
    <View>
      <View style={styles.textCont}>
        <Text style={styles.title}>{nombre}</Text>
        <Text style={styles.text}>{direccion}</Text>
        <Text style={styles.text}>{datosAdicionales}</Text>
        <Text style={styles.text}>{categoria}</Text>
      </View>
    </View>
  </View>
);

export default function ListScreen() {
  const navigation = useNavigation();

  const list = useSelector(state => state.resourcesReducer.list);

  return (
    <View style={styles.container}>
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
      <View style={styles.center}>
        <FlatList
          data={list}
          renderItem={({item}) => (
            <Item
              nombre={item.nombre}
              direccion={item.direccion}
              datosAdicionales={item.datosAdicionales}
              categoria={item.categoria}
            />
          )}
        />
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
  buttonTop: {
    flex: 1,
    zIndex: 3,
    elevation: 3,
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
  center: {
    marginVertical: 10,
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
  logo: {
    width: 50,
    height: 50,
  },
  itemContainer: {
    flexDirection: 'row',
    marginVertical: 10,
    marginHorizontal: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'black',
  },
  text: {
    fontSize: 12,
    color: 'black',
  },
  textCont: {
    marginLeft: 10,
  },
});
