import React from 'react';
import { View, TouchableOpacity, Image, Text } from 'react-native';

import styles from './pagination.style';
import { icons } from '../../../constants';

const Pagination = ({ handlePagination, page }) => {
  return (
    <View style={styles.footerContainer}>
      <TouchableOpacity
        style={styles.paginationButton}
        onPress={() => handlePagination('left')}
      >
        <Image
          source={icons.chevronLeft}
          style={styles.paginationImage}
          resizeMode="contain"
        />
      </TouchableOpacity>
      <View style={styles.paginationTextBox}>
        <Text style={styles.paginationText}>{page}</Text>
      </View>
      <TouchableOpacity
        style={styles.paginationButton}
        onPress={() => handlePagination('right')}
      >
        <Image
          source={icons.chevronRight}
          style={styles.paginationImage}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
};

export default Pagination;
