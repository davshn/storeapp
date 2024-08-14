import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from '../views/home'
import ListScreen from '../views/list'
import NewRegisterScreen from '../views/newRegister'

const Stack = createNativeStackNavigator()

function Nav() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name="Home" options={{ title: 'Mapa de comercios' }} component={HomeScreen} />
        <Stack.Screen
          name="List"
          component={ListScreen}
          options={{ title: 'Listado de comercios' }}
        />
        <Stack.Screen
          name="NewRegister"
          component={NewRegisterScreen}
          options={{ title: 'Agregar nuevo', headerShown: true }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Nav
