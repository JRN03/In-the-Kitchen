import * as React from "react";
import { View, Text, StyleSheet, SafeAreaView, Image, ImageBackground, TextInput, Button, TouchableOpacity, Alert} from "react-native";
import { useNavigation } from '@react-navigation/native';

const SignUpPage = () => {
	const navigation = useNavigation();
  const [fname, onChangeFname] = React.useState('');
  const [lname, onChangeLname] = React.useState('');
  const [usrnm, onChangeUsrn] = React.useState('');
  const [usrpwd, onChangePswd] = React.useState('');
	

	const submitForm = () => {
		console.log(fname, lname, usrnm, usrpwd)
		fetch('http://localhost:8080/auth/register', {
		method: 'POST',
		body: JSON.stringify({
			fName: fname,
			lName: lname,
			username: usrnm,
			password: usrpwd
		}),
		headers: {'Content-Type': 'application/json'}
	})
	.then(res => res.json())
	.then(data => {
		console.log(data);
		if (data.user) {
			navigation.navigate('Home');
		} else {
			Alert.alert('Sign Up Failed!');
		}
	})
	.catch(error => {
		console.error('Error:', error);
	});
}

	return (
		<SafeAreaView style = {{flex: 16, backgroundColor: '#176089', alignContent: 'space-between'}}>
			<View style={{bottom: 100}}>
				<TextInput style = {textboxStyle.fname}
					placeholder = 'First Name'
					placeholderTextColor={'maroon'}
					autoCapitalize='words'
					onChangeText={text => onChangeFname(text)}
					// onChangeText={onChangeFname}
					value={fname}
				></TextInput>

				<TextInput style = {textboxStyle.lname}
					placeholder = 'Last Name'
					placeholderTextColor={'maroon'}
					autoCapitalize='words'
					onChangeText={text => onChangeLname(text)}
					// onChangeText={onChangeLname}
					value={lname}
				></TextInput>

				<TextInput style = {textboxStyle.user}
					placeholder = 'Username'
					placeholderTextColor={'maroon'}
					autoCapitalize="none"
					onChangeText={text => onChangeUsrn(text)}
					// onChangeText={onChangeUsrn}
					value={usrnm}
				></TextInput>

				<TextInput style = {textboxStyle.pswd}
					placeholder = 'Password'
					placeholderTextColor={'maroon'}
					autoCapitalize="none"
					secureTextEntry={true}
					onChangeText={text => onChangePswd(text)}
					// onChangeText={onChangePswd}
					value={usrpwd}
				></TextInput>
			</View>

			<TouchableOpacity style={buttonStyle.picklebut}
				onPress={submitForm}>
				<Text>Get to Pickling</Text>
			</TouchableOpacity>
			{/* <TouchableOpacity style={buttonStyle.picklebut}
				onPress={()=>navigation.navigate('courts')}>
				<Text>Get to Pickling</Text>
			</TouchableOpacity> */}

			<TouchableOpacity
				onPress={() => navigation.navigate('Login')}>
				<Text style={{color: 'white', fontSize: 17, textDecorationLine: 'underline', left: 20}}>Sign Out :(</Text>
			</TouchableOpacity>
		</SafeAreaView>
	);
};

const buttonStyle = StyleSheet.create({
	picklebut: {
		borderRadius: 10,
		height: 38,
		width: 78,
		backgroundColor: 'white',
		position: 'absolute',
		top: 480,
		bottom: 0,
		left: 150,
		right: 0,
		justifyContent: 'center',
		alignItems: 'center',
		flex: 1,
	},
})

const textboxStyle = StyleSheet.create({
	fname: {
		backgroundColor: 'white',
		height: 40,
		margin: 12,
		borderWidth: 1,
		borderRadius: 10,
		padding: 10,
		width: 250,
		position: 'absolute',
		top: 270,
		bottom: 0,
		left: 40,
		right: 0,
		justifyContent: 'center',
		alignItems: 'center',
		flex: 1,
	},
	lname: {
		backgroundColor: 'white',
		height: 40,
		margin: 12,
		borderWidth: 1,
		borderRadius: 10,
		padding: 10,
		width: 250,
		position: 'absolute',
		top: 330,
		bottom: 0,
		left: 40,
		right: 0,
		justifyContent: 'center',
		alignItems: 'center',
		flex: 1,
	},
	user: {
		backgroundColor: 'white',
		height: 40,
		margin: 12,
		borderWidth: 1,
		borderRadius: 10,
		padding: 10,
		width: 250,
		position: 'absolute',
		top: 390,
		bottom: 0,
		left: 40,
		right: 0,
		justifyContent: 'center',
		alignItems: 'center',
		flex: 1,
	},
	pswd: {
		backgroundColor: 'white',
		height: 40,
		margin: 12,
		borderWidth: 1,
		borderRadius: 10,
		padding: 10,
		width: 250,
		position: 'absolute',
		top: 450,
		bottom: 0,
		left: 40,
		right: 0,
		justifyContent: 'center',
		alignItems: 'center',
		flex: 1,
	},
});

export default SignUpPage;