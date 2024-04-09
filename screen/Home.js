import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput,
} from 'react-native';

const Home = props => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [isPlantaVisible, setIsPlantaVisible] = useState(true); // Thêm state mới

  const lay_ds = async () => {
    try {
      let res = await fetch('http://10.0.2.2:3000/plants');
      let data = await res.json();
      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      lay_ds();
    });

    return unsubscribe;
  }, [props.navigation]);

  const handleSearchIconPress = () => {
    setIsSearchVisible(true);
    setIsPlantaVisible(false); // Ẩn văn bản "Planta-tỏa sáng không gian"
  };

  const handleCancelSearch = () => {
    setIsSearchVisible(false);
    setIsPlantaVisible(true); // Hiển thị lại văn bản "Planta-tỏa sáng không gian"
    setSearch(''); // Xóa nội dung tìm kiếm
  };

  const renderItem = ({item}) => (
    <View style={styles.item}>
      <TouchableOpacity
        onPress={() =>
          props.navigation.navigate('DetailPlant', {itemChiTiet: item})
        }>
        <View
          style={{
            padding: 7,
            width: 170,
            margin: 10,
            height: 190,
            backgroundColor: '#d8eddd',
          }}>
          <Image
            source={{uri: item.anh}}
            style={{width: '100%', height: '62%', borderRadius: 0}}
          />
          <View style={{padding: 10, justifyContent: 'space-between'}}>
            <View>
              <Text
                style={{fontSize: 19, fontWeight: 'bold', color: '#1C1C1C'}}>
                {item.ten}
              </Text>
              <Text style={{fontSize: 20, color: 'black', fontWeight: 'bold'}}>
                Giá: {item.gia} đ
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );

  const renderDetail = ({item}) => (
    <View style={styles.sanPham}>
      <TouchableOpacity
        onPress={() =>
          props.navigation.navigate('DetailPlant', {itemChiTiet: item})
        }>
        <View style={{padding: 5}}>
          <Image
            source={{uri: item.anh}}
            style={{width: '100%', height: '62%', borderRadius: 0}}
          />
          <View style={{padding: 10, justifyContent: 'space-between'}}>
            <View style={{height: 48}}>
              <Text
                style={{fontSize: 19, fontWeight: 'bold', color: '#1C1C1C'}}>
                {item.ten}
              </Text>
            </View>
            <Text style={{fontSize: 20, color: 'green', fontWeight: 'bold'}}>
              Gía: {item.gia} đ
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row'}}>
        {isPlantaVisible &&
          !isSearchVisible && ( // Thêm điều kiện để kiểm tra hiển thị văn bản "Planta-tỏa sáng không gian"
            <Text
              style={{
                color: 'black',
                margin: 15,
                fontSize: 20,
                fontWeight: 'bold',
              }}>
              Planta-tỏa sáng không gian
            </Text>
          )}
        {isSearchVisible ? (
          <TextInput
            style={styles.input}
            onChangeText={setSearch}
            value={search}
            placeholder="Tìm kiếm sản phẩm"
          />
        ) : (
          <TouchableOpacity onPress={handleSearchIconPress}>
            <Image
              style={styles.search}
              source={require('../images/magnifier.png')}
            />
          </TouchableOpacity>
        )}
        {isSearchVisible && ( // Hiển thị nút hủy tìm kiếm khi `TextInput` được hiển thị
          <TouchableOpacity onPress={handleCancelSearch}>
            <Text style={{margin: 15, color: 'blue'}}>Hủy</Text>
          </TouchableOpacity>
        )}
      </View>

      <View>
        <Image
          style={{width: 400, height: 200}}
          source={require('../images/banner2.jpg')}
        />
      </View>

      <Text style={{fontSize: 25, fontWeight: '900', margin: 10}}>
        Cây Trồng
      </Text>

      <FlatList
        horizontal={true}
        data={products}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.flatListContainer}
        showsHorizontalScrollIndicator={false}
      />
      <View style={{flex: 6}}>
        {search == '' ? (
          <FlatList
            style={{marginLeft: 20, marginBottom: 10}}
            data={products || []}
            renderItem={renderDetail}
            keyExtractor={item => item.id}
            numColumns={2}
          />
        ) : (
          <FlatList
            style={{marginLeft: 20, marginBottom: 10}}
            data={products.filter(item =>
              item.ten.toLowerCase().includes(search.toLowerCase()),
            )}
            renderItem={renderDetail}
            keyExtractor={item => item.id}
            numColumns={2}
          />
        )}
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  search: {
    width: 30,
    height: 30,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    color: '#000',
  },
  item: {
    width: 180,
    height: 220,
  },
  flatListContainer: {
    flexDirection: 'column',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
});
