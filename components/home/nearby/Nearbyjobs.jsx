import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import { useRouter } from 'expo-router';

import styles from './nearbyjobs.style';
import { COLORS, SIZES } from '../../../constants';
import useFetch from '../../../hooks/useFetch';
import NearbyJobCard from '../../common/cards/nearby/NearbyJobCard';
import { jobs } from '../../../__mock__';

const Nearbyjobs = () => {
  const router = useRouter();

  const { data, isLoading, refetch, error } = useFetch('search', {
    query: 'React',
    num_pages: 1,
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Nearby jobs</Text>
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
          <>
            {data?.map((job, index) => (
              <NearbyJobCard
                key={job?.job_id}
                job={job}
                handleNavigate={() => router.push(`/job-details/${job.job_id}`)}
              />
            ))}
          </>
        )} */}
        {jobs?.map((job, index) => (
          <NearbyJobCard
            key={job?.job_id}
            job={job}
            handleNavigate={() => router.push(`/job-details/${job.job_id}`)}
          />
        ))}
      </View>
    </View>
  );
};

export default Nearbyjobs;
