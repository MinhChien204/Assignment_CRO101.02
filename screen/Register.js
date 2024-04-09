import { Switch, TextInput, Image, StyleSheet, View, StatusBar, Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react'

const Register = (props) => {
  const [hoTen, setHoTen] = useState('')
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const saveTaiKhoan = () => {
    let objTK = {
      hoten: hoTen,
      email: email,
      username: username,
      password: password
    };

    if (hoTen.length == 0 || email.length == 0 || username.length == 0 || password.length == 0) {
      Alert.alert("Vui lòng nhập đầy đủ thông tin")
      return
    }

    let url_api = "http://10.0.2.2:3000/users"

    fetch(url_api, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(objTK)
    })
      .then((res) => {
        if (res.status == 201)
          console.log("Thêm thành công")
        props.navigation.navigate('Login')
      })
      .catch((ex) => {
        console.log(ex);
      });

    navigation.navigate('Login')
  }

  return (
    <View style={styles.container}>

      <Image resizeMode='stretch' style={styles.imageHeader} source={require('../assets/img/imageHeader1.png')} />

      <TouchableOpacity
        onPress={() => props.navigation.navigate('Login')}
        style={{ position: 'absolute', top: 40, left: 15, width: 30, height: 30, borderRadius: 10, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
        <Image style={{ width: '80%', height: '80%' }} source={require('../assets/icon/back.png')} />
      </TouchableOpacity>

      <View style={styles.section}>
        <Text style={{ color: 'black', fontSize: 35, fontWeight: 'bold', marginTop: 20 }}>Đăng ký</Text>
        <Text style={{ color: 'black', fontSize: 20, marginTop: 5 }}>Tạo tài khoản</Text>

        <TextInput
          style={[styles.input, { marginTop: 30 }]}
          onChangeText={txt => setHoTen(txt)}
          placeholder='Họ tên'
          placeholderTextColor={"#606060"} />

        <TextInput
          style={styles.input}
          placeholder='Email'
          onChangeText={txt => setEmail(txt)}
          placeholderTextColor={"#606060"} />

        <TextInput
          style={styles.input}
          onChangeText={txt => setUsername(txt)}
          placeholder='Tài khoản'
          placeholderTextColor={"#606060"} />

        <View style={[styles.input, { flexDirection: 'row', padding: 0 }]}>
          <TextInput
            placeholder='Mật khẩu'
            onChangeText={txt => setPassword(txt)}
            style={{ padding: 15 }}
            placeholderTextColor={"#606060"} />
        </View>

        <View style={{ justifyContent: 'center', alignItems: 'center', width: '100%' }}>
          <TouchableOpacity 
          onPress={() => saveTaiKhoan()}
          style={[styles.button, { marginTop: 25 }]}>
            <Text style={{ color: 'white', fontSize: 20, fontWeight: "bold" }}>Đăng Ký</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.lineContainer}>
          <View style={styles.line} />
          <Text style={styles.orText}>Hoặc</Text>
          <View style={styles.line} />
        </View>

        <View style={{ flexDirection: 'row', marginTop: 25 }}>
          <Text style={{ fontSize: 17, color: 'black', marginRight: 5 }}>Tôi đã có tài khoản.</Text>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('Login')}>
            <Text style={{ fontSize: 17, color: 'green' }}>Đăng nhập</Text>
          </TouchableOpacity>
        </View>

      </View>
    </View>
  )
}

export default Register

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  imageHeader: {
    marginTop: -25,
    width: '100%',
    height: '24%',
  },
  section: {
    alignItems: 'center'
  },
  input: {
    marginTop: 15,
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