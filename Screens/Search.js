import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View,TextInput,Button,ImageBackground, SafeAreaView } from 'react-native';
import { useEffect, useState } from 'react';
import { Configuration, OpenAIApi } from "openai";
import "react-native-url-polyfill/auto"
import { ActivityIndicator } from 'react-native';



function Search({navigation}) {

  const [textInput,setTextInput] = useState('')
  const [output,setOutput] = useState('')
  const [loading,setLoading] = useState(false)

  const configuration = new Configuration({
    apiKey: "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"
  });

  const openai = new OpenAIApi(configuration);
    const handleSend = async () =>{
      setOutput('')
      try{
        if(textInput.length == 0){
          setOutput('Please enter a country')
          setLoading(false)
         }
         else{
          setLoading(true)
          const response = await openai.createCompletion({
            model:"text-davinci-003",
            prompt:`Tell me about a holiday in ${textInput} in atleast 100 tokens.DO NOT END WITH AN IMCOMPLETE SENTENCE`,
            temperature:0.2,
            max_tokens:170,
         })
          setOutput(response.data.choices[0].text)
         setLoading(false)
         }
      }catch(error){
        console.log(error)
      }
      setTextInput('')
    }

  const image = {uri:'https://wallpaperaccess.com/full/553973.jpg'}

  if(output.length >=1 && output !='Please enter a country' ){
    navigation.navigate('Info',{info: output,country:textInput})
    setOutput('')
  }
  return (
    <>
    <SafeAreaView backgroundColor = "red"/>
       <ImageBackground style = {styles.background} source={image} resizeMode='cover'>
     <View style = {styles.content}>

        <Text style = {styles.title}>Holiday Generator</Text>
       <TextInput 
          style = {styles.textInput}
           placeholder='Enter Country'
           value={textInput}
           onChangeText={text => setTextInput(text)}/>
      <TouchableOpacity style = {styles.button} activeOpacity={0.7}  onPress={handleSend} >
          <Text style = {styles.buttonText}>Tell Me A Holiday!</Text>
      </TouchableOpacity>
    { loading ?
     <ActivityIndicator color = "red" size = "small" style = {{position:"absolute",top:240}} /> : null}
      <Text style = {{position:"absolute",top:240}}>{output}</Text>

     </View>
  </ImageBackground>
    </>

  
  );
}

export default Search

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
    fontSize:25,
    fontWeight:"bold",
    marginBottom:30
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
