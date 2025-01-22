import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface Review {
  id: number;
  userName: string;
  userImage: any;
  rating: number;
  comment: string;
  date: string;
  likes: number;
  isLiked: boolean;
}

export default function ServiceReviews() {
  const [reviews, setReviews] = React.useState<Review[]>([
    {
      id: 1,
      userName: 'John Doe',
      userImage: require('@/assets/images/user1.png'),
      rating: 5,
      comment: 'Amazing experience! The astrologer was very knowledgeable and provided accurate insights.',
      date: '2 days ago',
      likes: 12,
      isLiked: false,
    },
    // Add more reviews
  ]);

  const toggleLike = (reviewId: number) => {
    setReviews(prevReviews =>
      prevReviews.map(review =>
        review.id === reviewId
          ? {
              ...review,
              likes: review.isLiked ? review.likes - 1 : review.likes + 1,
              isLiked: !review.isLiked,
            }
          : review
      )
    );
  };

  const renderReview = ({ item }: { item: Review }) => (
    <View style={styles.reviewCard}>
      <View style={styles.reviewHeader}>
        <View style={styles.userInfo}>
          <Image source={item.userImage} style={styles.userImage} />
          <View>
            <Text style={styles.userName}>{item.userName}</Text>
            <View style={styles.ratingContainer}>
              {[...Array(5)].map((_, index) => (
                <MaterialCommunityIcons
                  key={index}
                  name={index < item.rating ? 'star' : 'star-outline'}
                  size={16}
                  color="#FFC107"
                />
              ))}
            </View>
          </View>
        </View>
        <Text style={styles.date}>{item.date}</Text>
      </View>

      <Text style={styles.comment}>{item.comment}</Text>

      <View style={styles.reviewFooter}>
        <TouchableOpacity
          style={styles.likeButton}
          onPress={() => toggleLike(item.id)}
        >
          <MaterialCommunityIcons
            name={item.isLiked ? 'thumb-up' : 'thumb-up-outline'}
            size={20}
            color={item.isLiked ? '#FFA500' : '#666'}
          />
          <Text
            style={[
              styles.likeCount,
              item.isLiked && styles.likedText,
            ]}
          >
            {item.likes}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.replyButton}>
          <MaterialCommunityIcons name="reply" size={20} color="#666" />
          <Text style={styles.replyText}>Reply</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.ratingOverview}>
          <Text style={styles.averageRating}>4.8</Text>
          <View style={styles.starsContainer}>
            {[...Array(5)].map((_, index) => (
              <MaterialCommunityIcons
                key={index}
                name="star"
                size={24}
                color="#FFC107"
              />
            ))}
          </View>
          <Text style={styles.totalReviews}>Based on 128 reviews</Text>
        </View>

        <View style={styles.ratingBars}>
          {[5, 4, 3, 2, 1].map((rating) => (
            <View key={rating} style={styles.ratingBar}>
              <Text style={styles.ratingNumber}>{rating}</Text>
              <View style={styles.barContainer}>
                <View
                  style={[
                    styles.barFill,
                    { width: `${rating * 20}%` },
                  ]}
                />
              </View>
            </View>
          ))}
        </View>
      </View>

      <FlatList
        data={reviews}
        renderItem={renderReview}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.reviewsList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  ratingOverview: {
    alignItems: 'center',
    marginBottom: 24,
  },
  averageRating: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  starsContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  totalReviews: {
    fontSize: 14,
    color: '#666',
  },
  ratingBars: {
    marginTop: 16,
  },
  ratingBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  ratingNumber: {
    width: 24,
    fontSize: 14,
    color: '#666',
    marginRight: 8,
  },
  barContainer: {
    flex: 1,
    height: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    backgroundColor: '#FFC107',
  },
  reviewsList: {
    padding: 16,
  },
  reviewCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  userName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
  },
  date: {
    fontSize: 12,
    color: '#999',
  },
  comment: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 12,
  },
  reviewFooter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  likeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  likeCount: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
  likedText: {
    color: '#FFA500',
  },
  replyButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  replyText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
}); 