import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';

const linkapi = 'http://10.0.2.2:3000/cart';

const DetailPlant = (props) => {

  const { navigation, route } = props;
  const item = route.params.itemChiTiet;
  const cart = route.params.cart;
  const [soluong, setSoluong] = useState(1);

  
  const addCart = () => {
    fetch(linkapi, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        soluong: soluong,
        itemCart: item
      })
    })
      .then((res) => {
        if (res.status == 201)
          Alert.alert("Thêm thành công")
      })
      .catch((ex) => {
        console.log(ex);
      });
  }
  

  const decreaseQuantity = () => {
    if (soluong > 1) {
      setSoluong(soluong - 1);
    }
  }

  const increaseQuantity = () => {
    setSoluong(soluong + 1);
  }

  return (
    <View style={ styles.container}>
      <View style={{ alignItems: 'center', marginTop: 10 }}>
        <Text style={{ fontSize: 25, color: '#333333', fontWeight: 'bold' }}>Chi tiết sản phẩm</Text>
      </View>
      <View style={{ width: '100%', marginTop: 20, flex: 3 }}>
        <Image style={{ width: '100%', height: '100%' }} source={{ uri: item.anh }} />
      </View>
      <View style={{ flex: 3.5, padding: 20 }}>
        <View style={{ marginBottom: 20 }}>
          <Text style={{ fontSize: 22, color: '#333333', fontWeight: 'bold' }}>Tên: {item.ten}</Text>
        </View>
        <View style={{ marginBottom: 20 }}>
          <Text style={{ fontSize: 22, color: 'red', fontWeight: 'bold' }}>Giá: {item.gia} đ</Text>
        </View>
        <View style={styles.view}>
          <Text style={{ fontSize: 20, color: '#222222' }}>Chi tiết sản phẩm</Text>
        </View>
        <View style={styles.view}>
          <Text style={styles.text}> Phân loại</Text>
          <Text style={styles.text}> {item.phanloai}</Text>
        </View>
        <View style={styles.view}>
          <Text style={styles.text}> Tình trạng</Text>
          <Text style={styles.text}> {item.trangthai ? 'Còn hàng' : 'Hết hàng'}</Text>
        </View>
        <View style={styles.view}>
          <Text style={styles.text}> Kích thước</Text>
          <Text style={styles.text}> {item.kichthuoc}</Text>
        </View>
      </View>
      <View style={{ flex: 0.5, justifyContent: 'space-between', backgroundColor: 'white', flexDirection: 'row' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 20 }}>
          <TouchableOpacity onPress={decreaseQuantity}>
            <Text style={{ marginRight: 15, color: '#444444', fontSize: 30 }}>-</Text>
          </TouchableOpacity>

          <View style={{ width: 30, alignItems: 'center' }}>
            <Text style={{ color: '#343434', fontSize: 20 }}>{soluong}</Text>
          </View>

          <TouchableOpacity onPress={increaseQuantity}>
            <Text style={{ marginLeft: 15, color: '#444444', fontSize: 23 }}>+</Text>
          </TouchableOpacity>
        </View>
        <View style={{ marginRight: 15 }}>
          <Text style={{ fontSize: 23, color: 'red', fontWeight: 'bold' }}>{item.gia * soluong} đ</Text>
        </View>
      </View>
      <View style={{ flex: 0.8, backgroundColor: 'white', padding: 20 }}>
        <TouchableOpacity
          onPress={() => addCart()}
          style={{ height: 60, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFA500', borderRadius: 15 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>THÊM VÀO GIỎ HÀNG</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={() => props.navigation.goBack()}
        style={{ position: 'absolute', top: 18, left: 20 }}>
        <Image style={{ width: 20, height: 20 }} source={require('../assets/icon/back.png')} />
      </TouchableOpacity>
    </View>
  )
}
export default DetailPlant

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#fff',
  },
  view: {
    borderBottomWidth: 1,
    borderBlockColor: '#333333',
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  text: {
    fontSize: 18,
    color: '#333333'
  }
})
