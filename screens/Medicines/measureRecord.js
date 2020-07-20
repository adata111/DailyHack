import 'react-native-gesture-handler';
import React, {useState} from "react";
import DateTimePicker from '@react-native-community/datetimepicker';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  TextInput, 
  Keyboard, 
  TouchableWithoutFeedback,
  ImageBackground,
  Image,
  ActivityIndicator,
  Picker } from 'react-native';
  import Constants from 'expo-constants';
  import moment from "moment";
  import TimePicker from 'react-native-simple-time-picker';
  export default class MeasureRecord extends React.Component{
    constructor(props){
      super(props);
      this.state={
        isStDatePickerVisible: false,
        isEnDatePickerVisible: false,
        isTimePickerVisible: false,
        key:0,
        Stdate: "",
        Endate: "",
        title: "",
        mode: "",
        time: "",
      };
      this.hideStDatePicker = this.hideStDatePicker.bind(this);
      this.hideEnDatePicker = this.hideEnDatePicker.bind(this);
      this.hideTimePicker = this.hideTimePicker.bind(this);
      this.handleTimeConfirm = this.handleTimeConfirm.bind(this);
      this.handleStDateConfirm = this.handleStDateConfirm.bind(this);
      this.handleEnDateConfirm = this.handleEnDateConfirm.bind(this);
      this.save = this.save.bind(this);
      this.handleTitleChange = this.handleTitleChange.bind(this);
    }

    hideStDatePicker(){
      this.setState({ isStDatePickerVisible: false});
    };

    hideEnDatePicker(){
      this.setState({ isEnDatePickerVisible: false});
    };

    hideTimePicker(){
      this.setState({ isTimePickerVisible: false});
    };

    handleStDateConfirm(Stdate) {
      this.hideStDatePicker();
      this.setState({ Stdate:moment(Stdate).format('Do MMMM YYYY')});
    };

    handleEnDateConfirm(Endate) {
      this.hideEnDatePicker();
      this.setState({ Endate:moment(Endate).format('Do MMMM YYYY')});
    };


    handleTimeConfirm(time) {
      this.hideTimePicker();
      this.setState({ time:moment(time).format('HH : mm')});
    };

    handleTitleChange(e){
      console.log(e.nativeEvent.text);
      this.setState({ title: e.nativeEvent.text});
    }

    save(){
      console.log(this.props.route);
      fetch(url+'/getMonthlyExpenses',{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name:this.props.route.params.name,
        start_year:this.state.Stdate.getFullYear(),
        start_month:this.state.Stdate.getMonth(),
        start_date: this.state.Stdate.getDate(),
        end_year:this.state.Endate.getFullYear(),
        end_month:this.state.Endate.getMonth(),
        end_date: this.state.Endate.getDate(),
        hour: this.state.Stdate.getHour(),
        minutes: this.state.Stdate.getMinute(),
        seconds: this.state.Stdate.getSeconds()
      })

    })

    .then((response) => (response.json()))
    
    .then((res) => {
      console.log("response");
      console.warn(res);
      //Alert.alert(res.message);
      if(res.success === true){
        console.warn(res);
        this.props.navigation.navigate('MedHome');
        
      }
      else {
        alert("Something went wrong. Please try again");
      }
    })
    
    .catch(err => {
      console.log(err);
    });
      
    }

    render(){

      return (
        <View style={styles.container}>


      

        <View style={styles.input}>

        <View style={styles.dropdown}>
          <Picker mode='dropdown' 
          style={styles.picker} 
          selectedValue={this.state.mode}
          onValueChange={(itemValue, itemIndex) => this.setState({ mode: itemValue })}>
          <Picker.Item label="Type of Measurement" value=""/>
          <Picker.Item label="Blood Sugar (before the meal)" value="Bb" />
          <Picker.Item label="Blood Sugar (after the meal)" value="Ba" />
          <Picker.Item label="Weight" value="Wt" />
          <Picker.Item label="Temperature" value="Tp" />
          <Picker.Item label="Heart Rate" value="Hr" />
          <Picker.Item label="Blood Pressure" value="Bp" />
          </Picker>
          </View>

        <TouchableOpacity onPress={() => this.setState({ isStDatePickerVisible: true})}>
        <TextInput style={styles.textinput} placeholder="Start Date for the reminder" 
        placeholderTextColor="black"
        underlineColorAndroid={'transparent'} 
        editable={false}
        value={this.state.Stdate}
        onTouchStart={() => this.setState({ isStDatePickerVisible: true})}
        />
        </TouchableOpacity>

        <DateTimePickerModal
        isVisible={this.state.isStDatePickerVisible}
        mode="date"
        onConfirm={this.handleStDateConfirm}
        onCancel={() => this.setState({ isStDatePickerVisible: false})}
        />

        <TouchableOpacity onPress={() => this.setState({ isEnDatePickerVisible: true})}>
        <TextInput style={styles.textinput} placeholder="End Date for the reminder" 
        placeholderTextColor="black"
        underlineColorAndroid={'transparent'} 
        editable={false}
        value={this.state.Endate}
        onTouchStart={() => this.setState({ isEnDatePickerVisible: true})}
        />
        </TouchableOpacity>

        <DateTimePickerModal
        isVisible={this.state.isEnDatePickerVisible}
        mode="date"
        onConfirm={this.handleEnDateConfirm}
        onCancel={() => this.setState({ isEnDatePickerVisible: false})}
        />

        <TouchableOpacity onPress={() => this.setState({ isTimePickerVisible: true})}>
        <TextInput style={styles.textinput} placeholder="Time" 
        placeholderTextColor="black"
        underlineColorAndroid={'transparent'} 
        editable={false}
        value={this.state.time}
        onTouchStart={() => this.setState({ isTimePickerVisible: true})}
        />
        </TouchableOpacity>

        <DateTimePickerModal
        isVisible={this.state.isTimePickerVisible}
        mode="time"
        onConfirm={this.handleTimeConfirm}
        onCancel={() => this.setState({ isTimePickerVisible: false})}
        />
        

        <TextInput style={styles.textinputDiary} placeholder="Description (Optional)" 
        placeholderTextColor="black" multiline={true}
        underlineColorAndroid={'transparent'} />

        <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('MedHome')}>
        <Text style={styles.btntext}>Set a Reminder</Text>
        </TouchableOpacity>
        </View>
        </View>


        );
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },

    input: {
      top: 100,
      paddingLeft: 40,
      paddingRight: 40,
    },

    header: {
      backgroundColor: '#457b9d',
      alignItems: 'center',
      justifyContent: 'center',
      top: 30,
    },

    headerText: {
      color: 'white',
      fontSize: 22,
      padding: 26,
    },

    title: {
      color: '#2BA189',
      fontWeight: 'bold',
      fontSize: 30,
      paddingBottom: 10,
      marginBottom: 40,
      borderBottomColor: 'black',
      borderBottomWidth: 1,

    },

    textinput: {
      color: 'black',
      fontSize: 18,
      alignSelf: 'stretch',
      height: 50,
      paddingTop: 10,
      paddingBottom: 10,
      paddingLeft:10,
      marginBottom: 20,
      borderColor: 'black',
      borderWidth: 1,
      borderRadius: 5,
      textAlignVertical: "top",
      backgroundColor: 'rgba(30, 85, 92,0.1)',
    },

    textinputDiary: {
      color: 'black',
      fontSize: 18,
      backgroundColor: 'rgba(30, 85, 92,0.1)',
      alignSelf: 'stretch',
      height: 150,
      marginBottom: 20,
      borderColor: 'black',
      borderWidth: 1,

      borderRadius: 5,
      textAlignVertical: "top",
      padding: 10,
    },

    button: {
      alignSelf: 'stretch',
      alignItems: 'center',
      padding: 20,
      backgroundColor: '#1e555c',
      borderColor: 'black',
      borderWidth: 1,
      borderRadius: 5,
    },
    btntext: {
      color: '#fff',
      fontSize: 20,
      fontWeight: "bold",
    },

    backBtn: {
      position: 'absolute',
      zIndex: 11,
      left: 20,
      alignItems: 'center',
      justifyContent: 'center',
      elevation: 8,
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

      dropdown: {
       color: 'black',
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
       textAlignVertical: "top",
       fontSize: 18,
       backgroundColor: 'rgba(30, 85, 92,0.1)',
     },

  });