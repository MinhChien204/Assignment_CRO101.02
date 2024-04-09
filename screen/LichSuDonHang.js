import { Image, TouchableOpacity, FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'

var linkapi = 'http://10.0.2.2:3000/orders';

const LichSuDonHang = (props) => {
  const [history, sethistory] = useState([]);

  const lay_ds = async () => {
    try {
      let res = await fetch(linkapi);
      let data = await res.json();

      console.log(data);

      sethistory(data);
    } catch (error) {
      console.log(error);
    }
  }

  React.useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      lay_ds();
    });

    return unsubscribe;
  }, [props.navigation]);

  const trangThai = (trangThai) => {
    if (trangThai == 1) {
      return <Text style={{ color: 'red', fontWeight: 'bold' }}>Đang giao</Text>
    } else {
      return <Text style={{ color: 'green', fontWeight: 'bold' }}>Đã giao</Text>
    }
  }

  const historyView = ({ item }) => (
    <View style={{ marginTop: 10 }}>
      <View style={{ width: '100%', borderBottomColor: '#444444', borderBottomWidth: 1 }}>
        <Text style={{ color: '#343434', fontSize: 18 }}>{item.thoigian}</Text>
      </View>
      {item.productOrder.map((product) => (
        <View key={product.id} style={{ backgroundColor: 'white', height: 140, marginTop: 7, flexDirection: 'row' }}>
          <View style={{ flex: 1.8 }}>
            <Image style={{ width: '100%', height: '100%' }} source={{ uri: product.itemCart.anh }} />
          </View>
          <View style={{ flex: 2.5, marginLeft: 20, marginTop: 5 }}>
            <View style={{ height: 60, marginTop: 5 }}>
              <Text style={{ color: '#343434', fontSize: 23, fontWeight: 'bold' }}>{product.itemCart.ten}</Text>
            </View>
            <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
              <Text style={{ color: 'red', fontSize: 22, fontWeight: 'bold' }}>{product.itemCart.gia * product.soluong} đ</Text>
              <Text style={{ color: '#343434', fontSize: 20, marginRight: 10 }}>x{product.soluong}</Text>
            </View>
            <Text style={{ fontSize: 17, marginTop: 5 }}>Trạng thái: {trangThai(item.trangthai)}</Text>
          </View>
        </View>
      ))}
    </View>
  )

  return (
    <View style={{ flex: 1 }}>
      <View style={{ width: '100%', alignItems: 'center', marginTop: 20 }}>
        <Text style={{ color: '#333333', fontSize: 23, fontWeight: 'bold' }}>Lịch sử giao dịch</Text>
      </View>
      <View style={{ flex: 12 }}>
      <FlatList
  data={history}
  renderItem={historyView}
  style={{ paddingLeft: 10, paddingRight: 10, paddingTop: 10, marginTop: 20 }}
/>
      </View>
      <TouchableOpacity
        onPress={() => props.navigation.goBack()}
        style={{ position: 'absolute', top: 27, left: 20 }}>
        <Image style={{ width: 20, height: 20 }} source={require('../assets/icon/back.png')} />
      </TouchableOpacity>
    </View>
  )
}

export default LichSuDonHang

const styles = StyleSheet.create({})