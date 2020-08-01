import 'react-native-gesture-handler';
import React from "react";
import { SafeAreaView, ScrollView, KeyboardAvoidingView, StyleSheet,Text, View, TouchableOpacity, Picker, TextInput, Platform } from "react-native";
import AsyncStorage from '@react-native-community/async-storage';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import { url } from './../components/url';

export default class Signup extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      Fname:"",
      Lname:"",
      name: "",
      pass: "",
      email: "",
      age: 0,
    };
    this.handleSignup = this.handleSignup.bind(this);
    this.storeInAsync = this.storeInAsync.bind(this);
    this.getToken = this.getToken.bind(this);
  }

  storeInAsync = async(ageGrp) =>{
    await AsyncStorage.setItem('auth_data', JSON.stringify({
      age: ageGrp,
      name: this.state.name,
      fname: this.state.Fname,
      lname: this.state.Lname,
      email: this.state.email,
    }));
  }

  getToken = async () => {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    if (status !== 'granted') {
      return;
    }
    let token = (await Notifications.getExpoPushTokenAsync());
    console.log(token);
    return token;  
  }


  async handleSignup(){
    var ageGrp=0;
//    var token = await this.getToken();
//    console.log(token);
    if(this.state.age==="kids"){
      ageGrp=1;
    }
    else if(this.state.age==="teens"){
      ageGrp=2;
    }
    else if(this.state.age==="adults"){
      ageGrp=3;
    }
    else if(this.state.age==="elderly"){
      ageGrp=4;
    }
    else{ 
      //alert select age  
      alert("Select Age");
      return;
    }
    
  /*  if(Platform.OS === 'ios' || Platform.OS === 'android'){
      this.storeInAsync();
     //   alert(res.message);
      this.props.navigation.reset({
        routes: [{ name: 'loading',params: {age: ageGrp, name:this.state.name}}]    
      });
    }
    else{*/
    //send data to backend
    console.log(" token");
    fetch(url+'/signup',{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userName:this.state.name,
        password:this.state.pass,
        email:this.state.email,
        age:ageGrp,
        fName:this.state.Fname,
        lName:this.state.Lname,
    //    reminderToken: token.data
      })
    })

    //recieve sigup confirmation from backend
    .then((response) => (response.json()))
    
    .then((res) => {
      console.log("responseh");
      console.log(res);
//      console.log(" token");
  //    console.log(token);
    //  console.log(" token");
      //Alert.alert(res.message);
      //if signup successful
      if(res.success === true){
        
        this.storeInAsync(ageGrp);
        alert(res.message);
        this.props.navigation.reset({
          routes: [{ name: 'loading',params: {age: ageGrp, name:this.state.name}}]
          
        });
      }
      else {
        alert(res.message);
        console.log("user already exists or error");
      }
    })
    
    .catch(err => {
      console.log(err);
    });
//    }
  //  this.props.navigation.navigate('loading', {age: this.state.age});
  }

  render(){
  return (
    <View style={styles.containerV}>
    
      <Text style={styles.title}>Sign Up!</Text>
    {/*  <KeyboardAvoidingView style={styles.container} behavior={Platform.Os==="ios"?"padding":"height"} enable>*/}
    <ScrollView contentContainerStyle={styles.scrollView} enable>
      
      <Text style={styles.text}>First Name</Text>
        <TextInput style={styles.input} //placeholder="First Name" 
        placeholderTextColor='black'
        underlineColorAndroid={'transparent'} 
        onChange = {(e) => this.setState({ Fname: e.nativeEvent.text})}/>
        <Text style={styles.text}>Last Name</Text>
        <TextInput style={styles.input} //placeholder="Last Name" 
        placeholderTextColor='black'
        underlineColorAndroid={'transparent'} 
        onChange = {(e) => this.setState({ Lname: e.nativeEvent.text})}/>
        <Text style={styles.text}>Username</Text>
        <TextInput style={styles.input} //placeholder="Username" 
        placeholderTextColor='black'
        underlineColorAndroid={'transparent'}
        autoCapitalize="none" 
        onChange = {(e) => this.setState({ name: e.nativeEvent.text})}/>
        <Text style={styles.text}>Password</Text>
        <TextInput style={styles.input} 
        placeholderTextColor='black'
        underlineColorAndroid={'transparent'} 
        autoCapitalize="none"
        secureTextEntry={true}
        onChange = {(e) => this.setState({ pass: e.nativeEvent.text})}/>
        <Text style={styles.text}>Email-id</Text>
        <TextInput style={styles.input}
        placeholderTextColor='black'
        underlineColorAndroid={'transparent'} 
        autoCapitalize="none"
        onChange = {(e) => this.setState({ email: e.nativeEvent.text})}/>
        <View style={styles.dropdown}>
        <Picker mode='dropdown' 
        style={styles.picker} 
        selectedValue={this.state.age}
        onValueChange={(itemValue, itemIndex) => this.setState({ age: itemValue })}>
        <Picker.Item label="Select your age group..." value=""/>
        <Picker.Item label="Below 13" value="kids" />
        <Picker.Item label="13-20" value="teens" />
        <Picker.Item label="21-60" value="adults" />
        <Picker.Item label="Above 60" value="elderly" />
        </Picker>
        </View>
        
        <TouchableOpacity style={styles.button} onPress={this.handleSignup}>
        <Text style={styles.btntext}>Submit</Text>
        </TouchableOpacity>
        </ScrollView>
      {/*  </KeyboardAvoidingView> */}
        </View>
      );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 300,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'rgba(43,161,137,0)',
    paddingTop: 10,
    paddingLeft: 0,
    paddingRight: 0,
  },
  containerV: {
    flex: 1,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'rgba(43,161,137,0.6)',
    paddingTop: 30,
    paddingLeft: 55,
    paddingRight: 60,
  },
  scrollView: {
   width: 295,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'rgba(43,161,137,0)',
    paddingTop: 10,
    paddingLeft: 0,
    paddingRight: 0,
  },
  title: {
    //color: '#2BA189',
      fontWeight: 'bold',
      fontSize: 30,
      paddingBottom: 10,
      marginBottom: 20,
      borderBottomColor: 'black',
      borderBottomWidth: 1,
  },
  picker: {
    height: 50, 
   // width: 220,
   alignSelf: 'stretch',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    //borderRadius: 5,
    //backgroundColor: 'rgba(255,255,255,0.6)',
  },

  text: {
    alignSelf: 'flex-start',
  },

  input: {
     color: 'black',
     alignSelf: 'stretch',
     height: 40,
     paddingTop: 10,
     paddingBottom: 10,
     paddingLeft:10,
     marginTop: 5,
     marginBottom: 15,
     borderColor: 'black',
     borderWidth: 1,
     borderRadius: 5,
     textAlignVertical: "top",
     backgroundColor: 'rgba(255,255,255,0.6)',
   },
   dropdown: {
     alignSelf: 'stretch',
     height: 50,
     paddingTop: 0,
     paddingBottom: 10,
     paddingLeft:0,
     marginTop: 10,
     marginBottom: 20,
     borderColor: 'black',
     borderWidth: 1,
     borderRadius: 5,
     backgroundColor: 'rgba(255,255,255,0.7)',
   },
   button: {
      alignSelf: 'stretch',
      alignItems: 'center',
      padding: 20,
      backgroundColor: '#2BA189',
      borderColor: 'black',
      borderWidth: 1,
      borderRadius: 5,
    },
});