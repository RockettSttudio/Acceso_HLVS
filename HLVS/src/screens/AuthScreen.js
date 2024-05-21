import React, { useEffect, useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet,Alert, Animated ,Image, ActivityIndicator} from 'react-native';
import { loginUser } from '../services/authService'; 
const AuthScreen = ({ navigation }) => {
    const [isSignUp, setIsSignUp] = useState(false); // Estado para alternar entre login y signup
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [loading, setLoading] = useState(false);
    const positionY = useState(new Animated.Value(0))[0];

    useEffect(() => {
        navigation.setOptions({ headerShown: false });
    }, [navigation]);

    const toggleForm = () => {
        Animated.timing(positionY, {
            toValue: isSignUp ? 0 : 100,  // Desplaza hacia abajo para Login, hacia arriba para Sign Up
            duration: 600,
            useNativeDriver: true
        }).start();
        setIsSignUp(!isSignUp);
    };
    const handleLogin = async () => {
        setLoading(true);
        try {
            const user = await loginUser(username, password);
            if (user) {
                navigation.replace('Home');
            }
        } catch (error) {
            Alert.alert('Login Failed', error.message);
        }
        setLoading(false);
    };

    const handleSignUp = async () => {
        setLoading(true);
        try {
            const user = await registerUser(username, email, password);
            if (user) {
                navigation.replace('Home');
            }
        } catch (error) {
            Alert.alert('Registration Failed', error.message);
        }
        setLoading(false);
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.formContainer_login, {
                transform: [{ translateY: positionY.interpolate({
                    inputRange: [0, 100],
                    outputRange: [0, 510]  // Mueve Login más abajo cuando se muestra Sign Up
                }) }]
            }]}>
                <TouchableOpacity onPress={toggleForm}>
                    <Text  style={styles.formTitle}>Login</Text>
                </TouchableOpacity>
                <TextInput style={styles.input} placeholder="Username" value={username} onChangeText={setUsername} keyboardType="Username" />
                <TextInput style={styles.input} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry={true} />
                <TouchableOpacity style={styles.googleButton}>
                    <Image source={require('../../assets/google-logo.png')} style={styles.googleLogo} />
                    <Text style={styles.googleButtonText}>Login with Google</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Text style={styles.buttonText} >Login</Text>
                </TouchableOpacity>
            </Animated.View>
            <Animated.View style={[styles.formContainer_signUp, {
                transform: [{ translateY: positionY.interpolate({
                    inputRange: [0, 100],
                    outputRange: [0, 0]
                }) }]
            }]}>
                <TouchableOpacity style={styles.containerBrand}>
                    <Image source={require('../../assets/icons8-lock-50.png')} style={styles.lockIcon} />
                    <Text style={styles.accessTitle}>HLVS Access</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={toggleForm}>
                    <Text style={styles.formTitle2}>Sign Up</Text>
                </TouchableOpacity>
                <TextInput style={styles.input} placeholder="Username" value={username} onChangeText={setUsername} placeholderTextColor="#7F7F7F" />
                <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} placeholderTextColor="#7F7F7F" keyboardType="email-address" />
                <TextInput style={styles.input} placeholder="Password" value={password} onChangeText={setPassword} placeholderTextColor="#7F7F7F" secureTextEntry={true} />
                <TouchableOpacity style={styles.googleButton}>
                    <Image source={require('../../assets/google-logo.png')} style={styles.googleLogo} />
                    <Text style={styles.googleButtonText}>Sign up with Google</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Sign Up</Text>
                </TouchableOpacity>
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'top',
        alignItems: 'center',
        backgroundColor: '#3C4295',
    position:'relative'
    },
    containerBrand:{
        position:'relative',
        top:0,
        display:'flex',
        flexDirection:'row',
        alignSelf:'center',
        justifyContent:'center',
        alignItems:'center',
        marginTop: 20,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9AE1D1',
    },
    formContainer_login: {
        position: 'absolute',
        width: '100%',
        height: '70%',
        bottom:0,
        justifyContent: 'top',
        alignItems: 'center',
        backgroundColor: '#9AE1D1',
        borderTopLeftRadius: 80,
        borderTopRightRadius: 80,
        padding: 40,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        zIndex:'100',
    },
    formContainer_signUp: {
        width: '100%',
        height: '80%',
        justifyContent: 'center',
        alignItems: 'center', 
        padding: 40,
        zIndex:'0',
    },
    input: {
        width: '90%',
        marginVertical: 20,
        padding: 15,
        backgroundColor: '#f0f0f0',
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    button: {
        width: '50%',
        backgroundColor: '#9D69FF',
        padding: 10,
        borderRadius: 10,
        marginTop: 30,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    formTitle: {
        fontSize: 40,
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 50,
    },
    formTitle2: {
        fontSize: 40,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 30,
        marginTop:80,
    },
    googleButton: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '90%',
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    googleLogo: {
        width: 20,
        height: 20,
        marginRight: 10,
    },
    googleButtonText: {
        color: '#7F7F7F',
        fontWeight: 'bold',
    },
    lockIcon: {
        width: 35,
        height: 35,
        marginBottom:15,
        marginRight:10,
    },
    accessTitle: {
        fontSize: 40,
        color: 'white',
        marginBottom: 10,
    }
});

export default AuthScreen;
