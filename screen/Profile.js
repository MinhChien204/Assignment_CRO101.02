import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';

var linkapi = 'http://10.0.2.2:3000/users';

const Profile = ({navigation}) => {
  const userData = useSelector(state => state.user.userData);
  const [email, setEmail] = useState('')

  useEffect(() => {
    
    const lay_ds = async () => {
        try {
            let res = await fetch(linkapi);
            let data = await res.json();

            data.forEach(data => {
                if (userData.username == data.username) {
                    setEmail(data.email);
                }
            });
            
        } catch (error) {
            console.log(error);
        }
    }

    lay_ds();
}, []);
  return (
    <View style={{ flex: 1, padding: 20 }}>
      <View style={{  alignItems: 'center' }}>
        <Text style={{ fontSize: 22, color: '#333333' }}>PROFILE</Text>
      </View>
      <View style={{ marginTop: 40, marginLeft: 15, marginBottom: 20, flexDirection: 'row' }}>
        <Image style={{ width: 60, height: 60, borderRadius: 50 }} source={require('../assets/img/avatar.png')} />
        <View style={{ marginLeft: 20 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#444444' }}>{userData ? userData.username : ''}</Text>
          <Text style={{ marginTop: 5, fontSize: 17 }}>{email}</Text>
        </View>
      </View>
      <View >
        <View style={{ marginTop: 20, borderBottomColor: "#444444", borderBottomWidth: 1 }}>
          <Text style={{ fontSize: 18, color: '#555555', marginBottom: 5 }}>Chung</Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('ThongTinCaNhan')}>
          <Text style={styles.text}>Chỉnh sửa thông tin cá nhân</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('LichSuDonHang')}>
          <Text style={styles.text}>Lịch sử giao dịch</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.text}>Cẩm nang trồng cây</Text>
        </TouchableOpacity>

        <View style={{ marginTop: 50, borderBottomColor: "#444444", borderBottomWidth: 1 }}>
          <Text style={{ fontSize: 18, color: '#555555', marginBottom: 5 }}>Bảo mật và điều khoản</Text>
        </View>
        <Text style={styles.text}>Điều khoản và điều kiện</Text>
        <Text style={styles.text}>Chính sách quyền riêng tư</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('Login')}>
          <Text style={{ marginTop: 25, fontSize: 20, fontWeight: 'bold', color: 'red' }}>Đăng xuất</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    color: '#333333',
    marginTop: 20,
    fontWeight: 'bold'
  }
});
