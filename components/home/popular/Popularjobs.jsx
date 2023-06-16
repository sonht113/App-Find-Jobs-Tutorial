import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import { useRouter } from 'expo-router';

import styles from './popularjobs.style';
import { COLORS, SIZES } from '../../../constants';
import PopularJobCard from '../../common/cards/popular/PopularJobCard';
import useFetch from '../../../hooks/useFetch';
import { jobs } from '../../../__mock__';

const Popularjobs = () => {
  const router = useRouter();
  const { data, isLoading, refetch, error } = useFetch('search', {
    query: 'React developer',
    num_page: 1,
  });

  const handleCardPress = (item) => {
    router.push(`/job-details/${item.job_id}`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Popular jobs</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>Show all</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
        {/* {isLoading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : error ? (
          <Text style={{ textAlign: 'center' }}>Some thing went wrong</Text>
        ) : (
          <FlatList
            data={jobs}
            renderItem={({ item }) => (
              <PopularJobCard item={item} handleCardPress={handleCardPress} />
            )}
            keyExtractor={(item) => item?.job_id}
            contentContainerStyle={{ columnGap: SIZES.medium }}
            horizontal
          />
        )} */}
        <FlatList
          data={jobs}
          renderItem={({ item }) => (
            <PopularJobCard item={item} handleCardPress={handleCardPress} />
          )}
          keyExtractor={(item) => item?.job_id}
          contentContainerStyle={{ columnGap: SIZES.medium }}
          horizontal
        />
      </View>
    </View>
  );
};

export default Popularjobs;
