import {
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';

var linkapi = 'http://10.0.2.2:3000/orders';

const Order = props => {
  const [cart, setCart] = useState([]);

  const lay_ds = async () => {
    try {
      let res = await fetch(linkapi);
      let data = await res.json();
      setCart(data);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      lay_ds();
    });

    return unsubscribe;
  }, [props.navigation]);


  const trangThai = trangThai => {
    if (trangThai == 1) {
      return <Text style={{color: 'red', fontWeight: 'bold'}}>Đang giao</Text>;
    } else {
      return <Text style={{color: 'green', fontWeight: 'bold'}}>Đã giao</Text>;
    }
  };

  const cartView = ({item}) => (
    <TouchableOpacity onPress={() => props.navigation.navigate('OrderDetail', { product: item })}>

    <View >
      <View
        style={{
          width: '100%',
          borderBottomColor: '#444444',
          borderBottomWidth: 1,
        }}>
      </View>
        {item.productOrder.map(product => (
          <View
            key={product.id}
            style={{
              backgroundColor: 'white',
              height: 140,
              marginTop: 7,
              flexDirection: 'row',
            }}>
            <View style={{flex: 1.8}}>
              <Image
                style={{width: '100%', height: '100%'}}
                source={{uri: product.itemCart.anh}}
              />
            </View>
            <View style={{flex: 2.5, marginLeft: 20, marginTop: 5}}>
              <View style={{height: 40}}>
                <Text
                  style={{color: '#343434', fontSize: 23, fontWeight: 'bold'}}>
                  {product.itemCart.ten}
                </Text>
              </View>
              <View
                style={{justifyContent: 'space-between', flexDirection: 'row'}}>
                <Text style={{color: 'red', fontSize: 22, fontWeight: 'bold'}}>
                  Giá:{product.itemCart.gia * product.soluong} đ
                </Text>
                <Text style={{color: '#343434', fontSize: 20, marginRight: 10}}>
                  x{product.soluong}
                </Text>
              </View>
              <Text style={{fontSize: 17, marginTop: 5}}>
                Trạng thái: {trangThai(item.trangthai)}
              </Text>
        <Text style={{color: '#343434', fontSize: 18}}>{item.thoigian}</Text>

            </View>
          </View>
        ))}
    </View>
    </TouchableOpacity>
  );

  return (
    <View style={{flex: 1}}>
      <View style={{flex: 12, marginTop: 20}}>
        <FlatList
          data={cart}
          renderItem={cartView}
          style={{
            paddingLeft: 10,
            paddingRight: 10,
            paddingTop: 10,
          }}
        />
      </View>
    </View>
  );
};

export default Order;

const styles = StyleSheet.create({});
