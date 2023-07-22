import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Button } from 'react-native'
import { ImageBackground } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native'
import { Image } from 'react-native'
import { ActivityIndicator } from 'react-native'
import { Configuration, OpenAIApi } from "openai";

const Info = ({navigation,route}) => {
    const {info,country} = route.params
    const image = {uri:'https://wallpaperaccess.com/full/553973.jpg'}

    const [aiImage,setAiImage] = useState("")
    const [loading,setLoading] = useState(false)

    const sendBack= () =>{
        navigation.navigate("Search")
    }

    const configuration = new Configuration({
      apiKey: "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"
    });
    const openai = new OpenAIApi(configuration);

    let generatedImage;
   async function getImage(){
      try{
        setLoading(true)
        const response = await openai.createImage({
          prompt:`${country} flag`,
          n:1,
          size:"256x256"
       })

       generatedImage = response.data.data[0].url
       setAiImage(generatedImage)
       setLoading(false)
      }catch(error){
        console.log(error)
      }
    }

    useEffect(() =>{
      getImage()
    },[])

  return (
    <>
      <SafeAreaView backgroundColor = "red"/>
    <ImageBackground style = {styles.background} source={image} resizeMode='cover'>
        <View style = {styles.container}>
        { loading ?
           <ActivityIndicator color = "red" size = "large"/> : 
           <View style = {styles.output}>
              <Image source={{uri:aiImage}} style = {styles.image}/>
             <Text style = {styles.text}>{info}</Text>
           <TouchableOpacity style = {styles.button} activeOpacity={0.7} onPress = {sendBack}>
               <Text style = {styles.buttonText}>Back</Text>
           </TouchableOpacity>
        </View>
           }
        </View>
    </ImageBackground>
    </>
  )
}

export default Info

const styles = StyleSheet.create({
    background:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
      },
      output:{
        width:"100%",
        alignItems:"center",
        justifyContent:"center",
      },
      text:{
        fontWeight:"bold",
        fontSize:12,
        marginHorizontal:20,
      },
      container:{
        backgroundColor:"white",
        width:"90%",
        height:"80%",
        borderColor:"black",
        borderWidth:3,
        borderRadius:30,
        justifyContent:"center",
        alignItems:"center"
      },
      button:{
        backgroundColor:"black",
        width:"20%",
        height:"5%",
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf:"flex-start",
        borderRadius:20,
        margin:15,
      },
      buttonText:{
        color:"white",
        fontSize:15
      },
      image:{
        width:"80%",
        height:"30%",
        marginTop:30,
        borderWidth:1
      }
})