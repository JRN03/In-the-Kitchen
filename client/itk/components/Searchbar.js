import * as React from "react";
import {View,TextInput, StyleSheet} from 'react-native';

export default function Searchbar({onSubmit}){
    const [text, onChangeText] = React.useState('');
    return(
    <View style={styles.searchWrap}>
        <TextInput 
         placeholder="Search Courts"
         onSubmitEditing={() => onSubmit(text)}
         onChangeText={onChangeText}
         value = {text}
         />

    </View>
    )
}

const styles = StyleSheet.create({
    searchWrap: {
        marginVertical: 10,
        height: 40,
        width: "100%",
        backgroundColor:"white",
        borderRadius: 50,
        justifyContent: "center",
        paddingHorizontal: 20
    }
});