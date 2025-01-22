import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  ActivityIndicator,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface ReviewStats {
  averageRating: number;
  totalReviews: number;
  ratingDistribution: {
    [key: string]: number; // 1-5 stars: count
  };
}

interface Review {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
  rating: number;
  comment: string;
  date: string;
  helpful: number;
  images?: string[];
}

export default function ReviewScreen() {
  const [stats, setStats] = useState<ReviewStats | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [userRating, setUserRating] = useState(0);
  const [userReview, setUserReview] = useState('');
  const [sortBy, setSortBy] = useState<'recent' | 'helpful' | 'rating'>('recent');
  const [filterRating, setFilterRating] = useState<number | null>(null);

  useEffect(() => {
    fetchReviewData();
  }, [sortBy, filterRating]);

  const fetchReviewData = async () => {
    try {
      setLoading(true);
      // Replace with your actual API endpoints
      const [statsResponse, reviewsResponse] = await Promise.all([
        fetch('https://your-api.com/products/123/review-stats'),
        fetch(`https://your-api.com/products/123/reviews?sort=${sortBy}&rating=${filterRating || ''}`),
      ]);
      
      const [statsData, reviewsData] = await Promise.all([
        statsResponse.json(),
        reviewsResponse.json(),
      ]);
      
      setStats(statsData);
      setReviews(reviewsData);
    } catch (err) {
      console.error('Error fetching review data:', err);
    } finally {
      setLoading(false);
    }
  };

  const submitReview = async () => {
    if (userRating === 0) return;

    try {
      // Replace with your actual API endpoint
      const response = await fetch('https://your-api.com/products/123/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          rating: userRating,
          comment: userReview,
        }),
      });

      if (response.ok) {
        setUserRating(0);
        setUserReview('');
        fetchReviewData(); // Refresh reviews
      }
    } catch (err) {
      console.error('Error submitting review:', err);
    }
  };

  const markHelpful = async (reviewId: string) => {
    try {
      // Replace with your actual API endpoint
      await fetch(`https://your-api.com/reviews/${reviewId}/helpful`, {
        method: 'POST',
      });
      
      setReviews(prev =>
        prev.map(review =>
          review.id === reviewId
            ? { ...review, helpful: review.helpful + 1 }
            : review
        )
      );
    } catch (err) {
      console.error('Error marking review as helpful:', err);
    }
  };

  const renderRatingBar = (rating: number, count: number, total: number) => (
    <View style={styles.ratingBar}>
      <Text style={styles.ratingNumber}>{rating}</Text>
      <MaterialCommunityIcons name="star" size={16} color="#FFC107" />
      <View style={styles.barContainer}>
        <View
          style={[
            styles.barFill,
            { width: `${(count / total) * 100}%` },
          ]}
        />
      </View>
      <Text style={styles.ratingCount}>{count}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#FFA500" style={styles.loader} />
      ) : (
        <ScrollView>
          {/* Rating Summary */}
          <View style={styles.summaryContainer}>
            <View style={styles.averageRating}>
              <Text style={styles.ratingNumber}>{stats?.averageRating.toFixed(1)}</Text>
              <View style={styles.starsContainer}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <MaterialCommunityIcons
                    key={star}
                    name={star <= stats?.averageRating! ? 'star' : 'star-outline'}
                    size={24}
                    color="#FFC107"
                  />
                ))}
              </View>
              <Text style={styles.totalReviews}>
                {stats?.totalReviews} reviews
              </Text>
            </View>
            <View style={styles.ratingBars}>
              {Object.entries(stats?.ratingDistribution || {})
                .sort(([a], [b]) => Number(b) - Number(a))
                .map(([rating, count]) =>
                  renderRatingBar(
                    Number(rating),
                    count,
                    stats?.totalReviews || 1
                  )
                )}
            </View>
          </View>

          {/* Write Review Section */}
          <View style={styles.writeReviewContainer}>
            <Text style={styles.sectionTitle}>Write a Review</Text>
            <View style={styles.ratingInput}>
              {[1, 2, 3, 4, 5].map((star) => (
                <TouchableOpacity
                  key={star}
                  onPress={() => setUserRating(star)}
                >
                  <MaterialCommunityIcons
                    name={star <= userRating ? 'star' : 'star-outline'}
                    size={32}
                    color="#FFC107"
                  />
                </TouchableOpacity>
              ))}
            </View>
            <TextInput
              style={styles.reviewInput}
              placeholder="Share your experience..."
              value={userReview}
              onChangeText={setUserReview}
              multiline
              numberOfLines={4}
            />
            <TouchableOpacity
              style={[
                styles.submitButton,
                userRating === 0 && styles.disabledButton,
              ]}
              onPress={submitReview}
              disabled={userRating === 0}
            >
              <Text style={styles.submitButtonText}>Submit Review</Text>
            </TouchableOpacity>
          </View>

          {/* Filters */}
          <View style={styles.filtersContainer}>
            <View style={styles.filterButtons}>
              {['recent', 'helpful', 'rating'].map((filter) => (
                <TouchableOpacity
                  key={filter}
                  style={[
                    styles.filterButton,
                    sortBy === filter && styles.activeFilter,
                  ]}
                  onPress={() => setSortBy(filter as typeof sortBy)}
                >
                  <Text
                    style={[
                      styles.filterText,
                      sortBy === filter && styles.activeFilterText,
                    ]}
                  >
                    {filter.charAt(0).toUpperCase() + filter.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <View style={styles.ratingFilter}>
              {[5, 4, 3, 2, 1].map((rating) => (
                <TouchableOpacity
                  key={rating}
                  style={[
                    styles.ratingFilterButton,
                    filterRating === rating && styles.activeRatingFilter,
                  ]}
                  onPress={() =>
                    setFilterRating(filterRating === rating ? null : rating)
                  }
                >
                  <MaterialCommunityIcons
                    name="star"
                    size={16}
                    color={filterRating === rating ? '#FFA500' : '#666'}
                  />
                  <Text
                    style={[
                      styles.ratingFilterText,
                      filterRating === rating && styles.activeRatingFilterText,
                    ]}
                  >
                    {rating}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Reviews List */}
          <View style={styles.reviewsContainer}>
            {reviews.map((review) => (
              <View key={review.id} style={styles.reviewCard}>
                <View style={styles.reviewHeader}>
                  <Image
                    source={{ uri: review.user.avatar }}
                    style={styles.avatar}
                  />
                  <View style={styles.reviewerInfo}>
                    <Text style={styles.reviewerName}>{review.user.name}</Text>
                    <View style={styles.ratingContainer}>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <MaterialCommunityIcons
                          key={star}
                          name={star <= review.rating ? 'star' : 'star-outline'}
                          size={16}
                          color="#FFC107"
                        />
                      ))}
                      <Text style={styles.reviewDate}>{review.date}</Text>
                    </View>
                  </View>
                </View>
                <Text style={styles.reviewText}>{review.comment}</Text>
                {review.images && (
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={styles.reviewImages}
                  >
                    {review.images.map((image, index) => (
                      <Image
                        key={index}
                        source={{ uri: image }}
                        style={styles.reviewImage}
                      />
                    ))}
                  </ScrollView>
                )}
                <TouchableOpacity
                  style={styles.helpfulButton}
                  onPress={() => markHelpful(review.id)}
                >
                  <MaterialCommunityIcons
                    name="thumb-up-outline"
                    size={16}
                    color="#666"
                  />
                  <Text style={styles.helpfulText}>
                    Helpful ({review.helpful})
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  summaryContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  averageRating: {
    alignItems: 'center',
    marginBottom: 16,
  },
  ratingNumber: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#333',
  },
  starsContainer: {
    flexDirection: 'row',
    marginVertical: 8,
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
  barContainer: {
    flex: 1,
    height: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
    marginHorizontal: 8,
  },
  barFill: {
    height: '100%',
    backgroundColor: '#FFA500',
    borderRadius: 4,
  },
  ratingCount: {
    fontSize: 12,
    color: '#666',
    width: 40,
    textAlign: 'right',
  },
  writeReviewContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  ratingInput: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
  },
  reviewInput: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 12,
    height: 100,
    textAlignVertical: 'top',
    marginBottom: 16,
  },
  submitButton: {
    backgroundColor: '#FFA500',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  filtersContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  filterButtons: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    marginRight: 8,
  },
  activeFilter: {
    backgroundColor: '#FFF3E0',
  },
  filterText: {
    color: '#666',
  },
  activeFilterText: {
    color: '#FFA500',
    fontWeight: '500',
  },
  ratingFilter: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  ratingFilterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  activeRatingFilter: {
    backgroundColor: '#FFF3E0',
    borderRadius: 16,
  },
  ratingFilterText: {
    marginLeft: 4,
    color: '#666',
  },
  activeRatingFilterText: {
    color: '#FFA500',
  },
  reviewsContainer: {
    padding: 16,
  },
  reviewCard: {
    marginBottom: 24,
    padding: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
  },
  reviewHeader: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  reviewerInfo: {
    marginLeft: 12,
    flex: 1,
  },
  reviewerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  reviewDate: {
    fontSize: 12,
    color: '#666',
    marginLeft: 8,
  },
  reviewText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 12,
  },
  reviewImages: {
    marginBottom: 12,
  },
  reviewImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 8,
  },
  helpfulButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  helpfulText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
  },
}); 