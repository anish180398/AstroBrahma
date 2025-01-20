import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

export default function AstrologerProfile() {
  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Image
            source={require("@/assets/images/icon.png")}
            style={styles.icon}
          />
        </TouchableOpacity>
        <View style={styles.headerIcons}>
          <TouchableOpacity>
            <Image
              source={require("@/assets/images/icon.png")}
              style={styles.icon}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              source={require("@/assets/images/icon.png")}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Profile Section */}
      <View style={styles.profileSection}>
        <Image
          source={{
            uri: "https://via.placeholder.com/150",
          }}
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>Sanyuri</Text>
        <View style={styles.verifiedContainer}>
          <Text style={styles.verifiedText}>Verified</Text>
        </View>
        <TouchableOpacity style={styles.followButton}>
          <Text style={styles.followText}>Follow</Text>
        </TouchableOpacity>
        <Text style={styles.profileDetails}>Numerology, Vedic, Vastu</Text>
        <Text style={styles.profileDetails}>English, Hindi</Text>
        <Text style={styles.experience}>4 Years</Text>
      </View>

      {/* Stats Section */}
      <View style={styles.stats}>
        <View style={styles.statsItem}>
          <Text style={styles.statsValue}>67K mins</Text>
          <Text style={styles.statsLabel}>Chat Section</Text>
        </View>
        <View style={styles.statsItem}>
          <Text style={styles.statsValue}>10K mins</Text>
          <Text style={styles.statsLabel}>Call Section</Text>
        </View>
        <View style={styles.statsItem}>
          <Text style={styles.statsValue}>4.5 (326)</Text>
          <Text style={styles.statsLabel}>Rating</Text>
        </View>
      </View>

      {/* About Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>
        <Text style={styles.sectionContent}>
          Astrology is the study of how the positions and movements of celestial
          bodies, like planets and stars, may influence human life and natural
          events on Earth. Each person’s birth chart, based on the date, time,
          and place of birth, can offer insights into their personality,
          relationships, strengths, and challenges.
        </Text>
      </View>

      {/* Reviews Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Reviews</Text>
        {[1, 2].map((review, index) => (
          <View key={index} style={styles.reviewCard}>
            <Image
              source={{
                uri: "https://via.placeholder.com/50",
              }}
              style={styles.reviewerImage}
            />
            <View style={styles.reviewContent}>
              <Text style={styles.reviewerName}>Sumit Bhalla</Text>
              <Text style={styles.reviewText}>
                Wonderful session with Sanyuri ma'am, loved it. I recommend
                others as well to take a session with Sanyuri ma’am and feel the
                power inside you.
              </Text>
            </View>
          </View>
        ))}
      </View>

      {/* Action Buttons */}
      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionText}>Chat</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionText}>Call</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#FFF",
  },
  headerIcons: {
    flexDirection: "row", // Align icons in a horizontal row
    alignItems: "center",
  },
  icon: {
    width: 24,
    height: 24,
    marginHorizontal: 8,
  },
  profileSection: {
    alignItems: "center",
    padding: 16,
    backgroundColor: "#FFF",
    marginBottom: 8,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 8,
  },
  profileName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  verifiedContainer: {
    backgroundColor: "#DFF6DD",
    borderRadius: 4,
    paddingHorizontal: 8,
    marginVertical: 8,
  },
  verifiedText: {
    color: "#5CB85C",
  },
  followButton: {
    borderColor: "#FFA500",
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    marginVertical: 8,
  },
  followText: {
    color: "#FFA500",
    fontWeight: "bold",
  },
  profileDetails: {
    color: "#666",
    fontSize: 14,
  },
  experience: {
    color: "#888",
    fontSize: 12,
  },
  stats: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#FFF",
    paddingVertical: 16,
  },
  statsItem: {
    alignItems: "center",
  },
  statsValue: {
    fontSize: 18,
    fontWeight: "bold",
  },
  statsLabel: {
    color: "#666",
    fontSize: 12,
  },
  section: {
    backgroundColor: "#FFF",
    padding: 16,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  sectionContent: {
    fontSize: 14,
    color: "#666",
  },
  reviewCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  reviewerImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 8,
  },
  reviewContent: {
    flex: 1,
  },
  reviewerName: {
    fontWeight: "bold",
    marginBottom: 4,
  },
  reviewText: {
    fontSize: 14,
    color: "#666",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 16,
    backgroundColor: "#FFF",
  },
  actionButton: {
    backgroundColor: "#FFA500",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  actionText: {
    color: "#FFF",
    fontWeight: "bold",
  },
});
