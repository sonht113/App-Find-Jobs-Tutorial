import React, { useState, useCallback } from 'react';
import {
  ActivityIndicator,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { Stack, useRouter, useSearchParams } from 'expo-router';

import {
  Company,
  JobAbout,
  JobFooter,
  JobTabs,
  ScreenHeaderBtn,
  Specifics,
} from '../../components';
import useFetch from '../../hooks/useFetch';
import { COLORS, SIZES, icons } from '../../constants';
import { jobs } from '../../__mock__';

const tabs = ['About', 'Qualifications', 'Responsibilities'];

const JobDetails = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const param = useSearchParams();
  const router = useRouter();

  const { data, isLoading, error, refetch } = useFetch('job-details', {
    job_id: param.id,
  });

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetch();
    setRefreshing(false);
  });

  const displayTabContent = () => {
    switch (activeTab) {
      case 'About':
        return (
          <JobAbout
            info={
              jobs.find((job) => job.job_id == param.id)?.job_description ??
              'No data provided'
            }
          />
        );
      case 'Qualifications':
        return (
          <Specifics
            title={'Qualifications'}
            points={
              jobs.find((job) => job.job_id == param.id)?.job_highlights
                ?.Qualifications ?? ['N/A']
            }
          />
        );
      case 'Responsibilities':
        return (
          <Specifics
            title={'Responsibilities'}
            points={
              jobs.find((job) => job.job_id == param.id)?.job_highlights
                ?.Responsibilities ?? ['N/A']
            }
          />
        );
      default:
        break;
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerBackVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn
              iconUrl={icons.left}
              dimension={'60%'}
              handlePress={() => router.back()}
            />
          ),
          headerRight: () => (
            <ScreenHeaderBtn iconUrl={icons.share} dimension={'60%'} />
          ),
          headerTitle: '',
        }}
      />
      <>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {/* {isLoading ? (
            <ActivityIndicator size={'large'} color={COLORS.primary} />
          ) : error ? (
            <Text style={{ textAlign: 'center' }}>Something went wrong</Text>
          ) : data.length === 0 ? (
            <Text style={{ textAlign: 'center' }}>No data</Text>
          ) : (
            <View style={{ padding: SIZES.medium, paddingBottom: 100 }}>
              <Company
                logo={data[0].employer_logo}
                title={data[0].job_title}
                name={data[0].employer_name}
                location={data[0].job_country}
              />
              <JobTabs
                tabs={tabs}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />
              {displayTabContent()}
            </View>
          )} */}
          <View style={{ padding: SIZES.medium, paddingBottom: 100 }}>
            <Company
              logo={jobs.find((job) => job.job_id == param.id).employer_logo}
              title={jobs.find((job) => job.job_id == param.id).job_title}
              name={jobs.find((job) => job.job_id == param.id).employer_name}
              location={jobs.find((job) => job.job_id == param.id).job_country}
            />
            <JobTabs
              tabs={tabs}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
            {displayTabContent()}
          </View>
        </ScrollView>
        <JobFooter
          url={
            jobs.find((job) => job.job_id == param.id)?.job_google_link ??
            'https://careers.google.com/jobs/results/'
          }
        />
      </>
    </SafeAreaView>
  );
};

export default JobDetails;
