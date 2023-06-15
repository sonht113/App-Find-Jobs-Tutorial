import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';

import styles from './welcome.style';
import { SIZES, icons } from '../../../constants';

const jobTypes = ['Fulltime', 'Parttime', 'Hybrid', 'Remote', 'Offline'];

const Welcome = ({ searchTerm, setSearchTerm, handleClick }) => {
  const [activeType, setActiveType] = useState('Fulltime');
  const router = useRouter();

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.userName}>Hello Son</Text>
        <Text style={styles.welcomeMessage}>Find your perfect job</Text>
      </View>
      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            placeholder="What are you looking for?"
            value={searchTerm}
            onChangeText={(text) => setSearchTerm(text)}
          />
        </View>
        <TouchableOpacity style={styles.searchBtn} onPress={handleClick}>
          <Image
            source={icons.search}
            resizeMode="contain"
            style={styles.searchBtnImage}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.tabsContainer}>
        <FlatList
          data={jobTypes}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                setActiveType(item);
                router.push(`/search/${item}`);
              }}
              style={styles.tab(activeType, item)}
            >
              <Text style={styles.tabText(activeType, item)}>{item}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item}
          contentContainerStyle={{ columnGap: SIZES.small }}
          horizontal
        />
      </View>
    </View>
  );
};

export default Welcome;
