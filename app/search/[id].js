import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  TouchableOpacity,
  View,
} from 'react-native';
import { Stack, useRouter, useSearchParams } from 'expo-router';
import { Text, SafeAreaView } from 'react-native';
import axios from 'axios';

import { ScreenHeaderBtn, NearbyJobCard } from '../../components';
import { COLORS, icons, SIZES } from '../../constants';
import styles from '../../styles/search';
import Pagination from '../../components/common/pagination/Pagination';
import { jobs } from '../../__mock__';

const JobSearch = () => {
  const params = useSearchParams();
  const router = useRouter();

  const [searchResult, setSearchResult] = useState([]);
  const [searchLoader, setSearchLoader] = useState(false);
  const [searchError, setSearchError] = useState(null);
  const [page, setPage] = useState(1);

  const handleSearch = async () => {
    setSearchLoader(true);
    setSearchResult([]);

    try {
      const options = {
        method: 'GET',
        url: `https://jsearch.p.rapidapi.com/search`,
        headers: {
          'X-RapidAPI-Key':
            'c83806568dmsh829dd0fafcb8d63p190e3bjsn8d571923d429',
          'X-RapidAPI-Host': 'jsearch.p.rapidapi.com',
        },
        params: {
          query: params.id,
          page: page.toString(),
        },
      };

      const response = await axios.request(options);
      setSearchResult(response.data.data);
    } catch (error) {
      setSearchError(error);
    } finally {
      setSearchLoader(false);
    }
  };

  const handlePagination = (direction) => {
    if (direction === 'left' && page > 1) {
      setPage(page - 1);
      //handleSearch();
    } else if (direction === 'right') {
      setPage(page + 1);
      // handleSearch();
    }
  };

  // useEffect(() => {
  //   handleSearch();
  // }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn
              iconUrl={icons.left}
              dimension="60%"
              handlePress={() => router.back()}
            />
          ),
          headerTitle: 'Kết quả',
          headerTitleAlign: 'center',
          headerTitleStyle: { fontSize: SIZES.large, fontWeight: '700' },
        }}
      />

      <FlatList
        data={jobs.filter((job) => job.employer_name.includes(params.id))}
        renderItem={({ item }) => (
          <NearbyJobCard
            job={item}
            handleNavigate={() => router.push(`/job-details/${item.job_id}`)}
          />
        )}
        keyExtractor={(item) => item.job_id}
        contentContainerStyle={{ padding: SIZES.medium, rowGap: SIZES.medium }}
        ListHeaderComponent={() => (
          <>
            <View style={styles.container}>
              <Text style={styles.searchTitle}>{params.id}</Text>
              <Text style={styles.noOfSearchedJobs}>Job Opportunities</Text>
            </View>
            {/* <View style={styles.loaderContainer}>
              {searchLoader ? (
                <ActivityIndicator size="large" color={COLORS.primary} />
              ) : (
                searchError && <Text>Oops something went wrong</Text>
              )}
            </View> */}
          </>
        )}
        ListFooterComponent={() => {
          if (!searchLoader) {
            return (
              <Pagination handlePagination={handlePagination} page={page} />
            );
          }
        }}
      />
    </SafeAreaView>
  );
};

export default JobSearch;
