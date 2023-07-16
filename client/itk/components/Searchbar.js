import * as React from "react";
import {View,TextInput, StyleSheet} from 'react-native';

export default function Searchbar({onSubmit}){
    const [text, onChangeText] = React.useState('');
    return(
    <View style={styles.searchWrap}>
        <TextInput 
         placeholder="Search Friends"
         onSubmitEditing={() => onSubmit(text)}
         onChangeText={onChangeText}
         value = {text}
         />

    </View>
    )
}

const styles = StyleSheet.create({
    searchWrap: {
        marginBottom: 20,
        height: 30,
        width: "100%",
        backgroundColor:"white",
        borderRadius: 50,
        justifyContent: "center",
        paddingHorizontal: 20
    }
});