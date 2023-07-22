import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View,TextInput,Button,ImageBackground, SafeAreaView } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Info from './Screens/Info';
import Search from './Screens/Search';


const Stack = createStackNavigator()


export default function App() {
  return (

    <NavigationContainer>
     <Stack.Navigator>
        <Stack.Screen
          name = "Search"
          component={Search}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name = "Info"
          component={Info}
          options={{headerShown: false}}
        />
    
     </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  background:{
    flex:1,
    justifyContent:"center",
    alignItems:"center"
  },
  content:{
    backgroundColor:"white",
    width:"60%",
    height:"40%",
    borderColor:"black",
    borderWidth:3,
    borderRadius:30,
    justifyContent:"center",
    alignItems:"center"
  },
  title:{
    fontSize:30,
    fontWeight:"bold",
    marginBottom:50
  },
  textInput:{
    width:"65%",
    height:"12%",
    borderWidth:1,
    borderColor:"black",
    marginBottom:10,
    paddingLeft:10,
    borderRadius:10
  },
  button:{
    backgroundColor:"black",
    width:"60%",
    height:"12%",
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius:20
  },
  buttonText:{
    color:"white",
    fontSize:15
  },
});
