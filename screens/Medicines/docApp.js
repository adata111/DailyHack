/*All entries file for doctor appointments*/
import React from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity, Platform } from 'react-native';
import Constants from 'expo-constants';
import DocAppNote from './docAppNotes';
import moment from "moment";
import AsyncStorage from '@react-native-community/async-storage';
const { manifest } = Constants;
import { Entypo } from '@expo/vector-icons';
import { url } from './../../components/url';

export default class DocApp extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      docAppArray: [],
      docAppText: '',
      name:'',
      
    }
    this.reloadOnBack=this.reloadOnBack.bind(this);
    this.fetchEntries=this.fetchEntries.bind(this);
    this.createEntries=this.createEntries.bind(this);
      this.getFromAsync = this.getFromAsync.bind(this);
    
 //   this._unsubscribeSiBlur = this.props.navigation.addListener('blur', e => {
        //console.warn('blur diary');
   // });
  }

  fetchEntries(){
console.log("fethcing");
 // if(Platform.OS === 'ios' || Platform.OS === 'android'){
  //  return [{key:12345679, date:"22nd June 2020", title:"check", text:"this is some text"}];
 // }
  //else{
        setTimeout(() => {
  fetch(url+'/getDocApp',{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userName: this.state.name
    })
    })

    .then((response) => (response.json()))
    
    .then((res) => {
      console.log("response");
      console.warn(res);
      if(res.success){
        console.log("responsexfvsv");
      this.setState({docAppArray:res.data.appointments});
      }
      else{
        alert("Couldn't fetch data. Please try again.");
      }
      //Alert.alert(res.message);
      
    })
    
    .catch(err => {
      console.log(err);
    });
  },10);
  //}
}
getFromAsync = async()=>{
    if(Platform.OS === 'ios' || Platform.OS === 'android'){
      const authData = await AsyncStorage.getItem('auth_data');
      if(authData !== null){
        console.log("async");
        const authDataJson = JSON.parse(authData);
        console.log(authDataJson);
        this.setState({name: authDataJson.name});
      }
    }
    else{
      const authData = localStorage.getItem('auth_data');
      if(authData !== null){
        console.log("web");
        const authDataJson = JSON.parse(authData);
        this.setState({name: authDataJson.name});
      }
    }   
  //  this.sendToken();  
  }
 componentDidMount(){
    this.getFromAsync();
//  if(Platform.OS === 'ios' || Platform.OS === 'android'){}
//  else{
  console.log("got from async");
  setTimeout(() => {
    this._unsubscribeSiFocus = this.props.navigation.addListener('focus', e => {
        console.warn('focus doc app');
        this.fetchEntries();
    });
    console.log(this.state.docAppArray);
  //}
    console.log("diary mount");
  },10);
  }


  componentWillUnmount(){
    this._unsubscribeSiFocus;
  }

  reloadOnBack(){
    this.fetchEntries();
  //  this.setState({docAppArray: entries});
  }

  createEntries(){
   return (this.state.docAppArray.map((val) => {
      console.log("key"+val.key);
      return <DocAppNote key={val.key} val={val}
          deleteMethod={ ()=> this.deleteEntry(val.key) }  view={ ()=> this.viewEntry(val.key)}/>
    })
   )
 }

  render() {
    console.log("DocApp render");
    
    /*if(this.props.route.params){
      console.log(this.props.route.params);
      var entries=this.state.docAppArray;
      console.log(entries);
      var it=this.state.docAppArray.filter(i => i.key===this.props.route.params.key);
      console.log(it);
      if(it && it.length){}
      else{
      entries.push({
          key:this.props.route.params.key,
          date:this.props.route.params.date,
          title:this.props.route.params.title,
          text: this.props.route.params.text
        });
      console.log(entries);
    this.state.docAppArray=entries;
      }
      console.log("entries");
      console.log(entries);
      console.log("entries");
    }*/

    
//    console.log(entries);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>- YOUR APPOINTMENTS -</Text>
       
      </View>

      <ScrollView style={styles.scrollContainer}>
      {console.log("hihi")}
      {this.createEntries()}

      </ScrollView>

      <View style={styles.footer}>
      
      </View>

    </View>
    );
  }

  //

  deleteEntry(key) {
    console.log("del");
    
  /*  if(Platform.OS === 'ios' || Platform.OS === 'android'){
      var itt=this.state.docAppArray.filter(it => it.key!==key);
      console.log(itt);
      this.setState({ docAppArray: itt });
    }

    else{
*/    //send to backend
    
    fetch(url+'/saveDocApp',{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        edit:3,
        key:key,
        name:this.state.name
      })
    })

    //recieve entry added confirmation from backend
    .then((response) => (response.json()))
    
    .then((res) => {
      console.log("response");
      console.warn(res);
      //Alert.alert(res.message);
      //if entry added
      if(res.success === true){
    //    alert(res.message);
    //    this.setState({docAppArray:res.content});
        var entry = this.state.docAppArray.filter(it => it.key!==key);
        this.setState({docAppArray:entry});
        
      }
      else {
        alert(res.message);
        console.warn("error");
      }
    })
    
    .catch(err => {
      console.log(err);
    });
  //  }
  }

  viewEntry(key){
    console.log("view");
    console.log(key);
    var itt=this.state.docAppArray.filter(it => it.key===key);
    //get text value from backend
    console.log(this.state.docAppArray);
    console.log(itt);
    //var itt = JSON.parse(ittt);
    console.log(itt[0]);
    var dateDisplay = itt[0].date + "/" + Number(itt[0].month) + "/" + itt[0].year;
    var timeDisplay = itt[0].hour + ":" + itt[0].minutes;

    this.props.navigation.navigate('DocRecord', {edit:false, key:key, date:dateDisplay, time:timeDisplay, 
      spec:itt[0].medicalSpeciality, addr:itt[0].address, phn:itt[0].phoneNumber, name:this.state.name})
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    backgroundColor: '#1e555c',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 10,
    borderBottomColor: '#ddd',
  },

  headerText: {
    color: 'white',
    fontSize: 18,
    padding: 26,
    top: 30,
  },

  scrollContainer: {
    flex: 1,
    marginBottom: 10,
  },

  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },

  textInput: {
    alignSelf: 'stretch',
    color: '#fff',
    padding: 20,
    backgroundColor: '#252525',
    borderTopWidth: 2,
    borderTopColor: '#ededed',
  },

  addButton: {
    position: 'absolute',
    zIndex: 11,
    right: 20,
    bottom: 90,
    backgroundColor: '#2BA189',
    width: 90,
    height: 90,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
  },

  addButtonText: {
    color: '#fff',
    fontSize: 24,
  }
});