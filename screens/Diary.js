import 'react-native-gesture-handler';
import React from "react";
import { StyleSheet,Text, View } from "react-native";

export default class newList extends React.Component{
  render(){
  return (
    <View style={{ 
   flex: 1,
   alignItems:'center',
   justifyContent:'center'
  }}>
      <Text>Diary</Text>
    </View>
  );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});