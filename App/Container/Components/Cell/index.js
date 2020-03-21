import React, { Component } from 'react'
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
   } from 'react-native';

import styles from './styles';
   
export default class Cell extends Component {
    render() {
        return (
          
         <View  style={styles.container}>
         <View style={styles.cell} />
         </View>
        )
    }
}
