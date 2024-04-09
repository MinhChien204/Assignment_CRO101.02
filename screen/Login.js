import React, { useState } from 'react';
import { Switch, TextInput, Image, StyleSheet, View, StatusBar, Text, TouchableOpacity, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { saveUserData } from './Redux/action';
import WarpInput from '../components/WarppedInnput';

const Login = (props) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const handleLogin = () => {
    doLogin();

    const userData = {
      username: username
    };
    dispatch(saveUserData(userData)); 
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const lay_ds = async () => {
    let url_check_login = 'http://10.0.2.2:3000/users?username=' + username
    console.log(url_check_login);
    try{
      const res = await fetch(url_check_login);
      const data = await res.json();
      
      if(data.length != 1){
        alert("Sai tên tài khoản hoặc mật khẩu")
        return
      }else{
        let objU = data[0];
        if(objU.password != password){
          alert("Sai tên tài khoản hoặc mật khẩu")
          return
        }else{
          try{
            props.navigation.navigate('Tabnavigator')
          }catch(e){
            console.log(e);
          }
        }
      }
    }catch(error){
      console.log(error);
    }
  }
  
  const doLogin = () => {
    if(username.length == 0){
      Alert.alert("Chưa nhập username")
      return
    }
    if(password.length == 0){
      Alert.alert("Chưa nhập password")
      return
    }

    lay_ds();
  
  }

  return (
    <View style={styles.container}>
      <Image resizeMode='stretch' style={styles.imageHeader} source={require('../assets/img/imageHeader.png')} />

      <View style={styles.section}>
        <Text style={{ color: 'black', fontSize: 30, fontWeight: 'bold', marginTop: 20 }}>Chào mừng bạn</Text>
        <Text style={{ color: 'black', fontSize: 20, marginTop: 5 }}>Đăng nhập tại khoản</Text>

        <TextInput
          style={[styles.input, { marginTop: 30 }]}
          placeholder='Tài khoản'
          placeholderTextColor={"#606060"} 
          onChangeText={txt => setUsername(txt)}/>

        <View style={[styles.input, { flexDirection: 'row', padding: 0 }]}>
          <TextInput
            placeholder='Mật khẩu'
            style={{ padding: 15 }}
            // style={styles.input}
            placeholderTextColor={"#606060"}
            secureTextEntry={!showPassword} 
            onChangeText={txt => setPassword(txt)}/>
          <TouchableOpacity
            onPress={toggleShowPassword}
            style={{ position: 'absolute', right: 40, top: 45 }}
          >
            <Image
              source={showPassword ? require('../assets/icon/eye.png') : require('../assets/icon/eye1.png')}
              style={{ width: 24, height: 24, tintColor: 'black', position: 'absolute', bottom: 5 }}
            />
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 15, justifyContent: 'space-between', width: '90%' }}>
          <View style={{ flexDirection: 'row' }}>
            <Switch value={isChecked} onValueChange={handleCheckboxChange} />
            <Text style={{ color: '#828282', fontSize: 15, marginLeft: 10, marginTop: 3 }}>Nhớ mật khẩu</Text>
          </View>
          <TouchableOpacity>
            <Text style={{ color: 'green', fontSize: 15, fontWeight: 'bold', fontStyle: 'italic' }}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>

        <View style={{ justifyContent: 'center', alignItems: 'center', width: '100%' }}>
          <TouchableOpacity
            onPress={handleLogin}
            style={[styles.button, { marginTop: 25 }]}>
            <Text style={{ color: 'white', fontSize: 20, fontWeight: "bold" }}>Đăng nhập</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.lineContainer}>
          <View style={styles.line} />
          <Text style={styles.orText}>Hoặc</Text>
          <View style={styles.line} />
        </View>

        <View style={{ flexDirection: 'row', marginTop: 25 }}>
          <Text style={{ fontSize: 17, color: 'black', marginRight: 10 }}>Bạn không có tài khoản?</Text>
          <TouchableOpacity onPress={() => props.navigation.navigate('Register')}>
            <Text style={{ fontSize: 17, color: 'green' }}>Tạo tài khoản</Text>
          </TouchableOpacity>
        </View>

      </View>
    </View>
  )
}

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  imageHeader: {
    marginTop: -25,
    width: '100%',
    height: '35%',
    // position: 'absolute',
  },
  section: {
    alignItems: 'center'
  },
  input: {
    marginTop: 20,
    height: 55,
    width: '90%',
    borderWidth: 1,
    padding: 15,
    borderColor: '#606060',
    color: '#606060',
    fontSize: 16,
    borderRadius: 13,
  },
  button: {
    backgroundColor: 'green',
    height: 60,
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 17
  },
  lineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    width: '90%',
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: 'black',
  },
  orText: {
    marginHorizontal: 10,
    fontSize: 17,
    fontWeight: 'bold',
    color: 'black'
  },
  iconLogin: {
    width: 40,
    height: 40
  }
});