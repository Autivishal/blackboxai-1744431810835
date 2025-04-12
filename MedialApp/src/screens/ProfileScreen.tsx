import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { spacing } from '../theme/spacing';

// Mock data for demonstration
const USER_DATA = {
  name: 'John Doe',
  handle: '@johndoe',
  avatarUrl: 'https://randomuser.me/api/portraits/men/1.jpg',
  bio: 'Software Engineer passionate about React Native and mobile development. Building great user experiences.',
  followers: 1240,
  following: 420,
  location: 'San Francisco, CA',
  education: [
    { id: '1', institution: 'Stanford University', degree: 'MS Computer Science', years: '2018-2020' },
    { id: '2', institution: 'UC Berkeley', degree: 'BS Computer Science', years: '2014-2018' },
  ],
  skills: ['React Native', 'JavaScript', 'TypeScript', 'Node.js', 'GraphQL', 'UI/UX Design'],
  industry: 'Software Development',
  posts: [
    { id: '1', title: 'Latest React Native Features', likes: 45, comments: 12 },
    { id: '2', title: 'Building Scalable Mobile Apps', likes: 38, comments: 8 },
    { id: '3', title: 'UI/UX Best Practices', likes: 72, comments: 24 },
  ],
};

type TabType = 'posts' | 'activity' | 'about';

const ProfileScreen = () => {
  const [activeTab, setActiveTab] = useState<TabType>('posts');
  const [isEditMode, setIsEditMode] = useState(false);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'posts':
        return (
          <View style={styles.tabContent}>
            <FlatList
              data={USER_DATA.posts}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={styles.postItem}>
                  <Text style={styles.postTitle}>{item.title}</Text>
                  <View style={styles.postStats}>
                    <View style={styles.statItem}>
                      <Icon name="heart" size={16} color={colors.textSecondary} />
                      <Text style={styles.statText}>{item.likes}</Text>
                    </View>
                    <View style={styles.statItem}>
                      <Icon name="chatbubble" size={16} color={colors.textSecondary} />
                      <Text style={styles.statText}>{item.comments}</Text>
                    </View>
                  </View>
                </View>
              )}
            />
          </View>
        );
      case 'activity':
        return (
          <View style={styles.tabContent}>
            <Text style={styles.emptyStateText}>No recent activity</Text>
          </View>
        );
      case 'about':
        return (
          <View style={styles.tabContent}>
            {USER_DATA.industry && (
              <InfoSection
                icon="briefcase"
                title="Industry"
                content={USER_DATA.industry}
              />
            )}

            {USER_DATA.location && (
              <InfoSection
                icon="location"
                title="Location"
                content={USER_DATA.location}
              />
            )}

            {USER_DATA.education?.length > 0 && (
              <View style={styles.infoSection}>
                <View style={styles.infoHeader}>
                  <Icon name="school" size={18} color={colors.primary} />
                  <Text style={styles.infoTitle}>Education</Text>
                </View>
                {USER_DATA.education.map((edu) => (
                  <View key={edu.id} style={styles.educationItem}>
                    <Text style={styles.eduInstitution}>{edu.institution}</Text>
                    <Text style={styles.eduDegree}>{edu.degree}</Text>
                    <Text style={styles.eduYears}>{edu.years}</Text>
                  </View>
                ))}
              </View>
            )}

            {USER_DATA.skills?.length > 0 && (
              <View style={styles.infoSection}>
                <View style={styles.infoHeader}>
                  <Icon name="code-working" size={18} color={colors.primary} />
                  <Text style={styles.infoTitle}>Skills</Text>
                </View>
                <View style={styles.skillsContainer}>
                  {USER_DATA.skills.map((skill, index) => (
                    <View key={index} style={styles.skillBadge}>
                      <Text style={styles.skillText}>{skill}</Text>
                    </View>
                  ))}
                </View>
              </View>
            )}
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.settingsButton}>
          <Icon name="settings-outline" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>

      <View style={styles.profileHeader}>
        <Image
          source={{ uri: USER_DATA.avatarUrl }}
          style={styles.avatar}
        />

        <Text style={styles.name}>{USER_DATA.name}</Text>
        <Text style={styles.handle}>{USER_DATA.handle}</Text>

        <Text style={styles.bio}>{USER_DATA.bio}</Text>

        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{USER_DATA.followers}</Text>
            <Text style={styles.statLabel}>Followers</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{USER_DATA.following}</Text>
            <Text style={styles.statLabel}>Following</Text>
          </View>
        </View>

        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => setIsEditMode(true)}
          >
            <Text style={styles.primaryButtonText}>Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondaryButton}>
            <Icon name="share-social-outline" size={20} color={colors.text} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'posts' && styles.activeTabButton]}
          onPress={() => setActiveTab('posts')}
        >
          <Text
            style={[
              styles.tabButtonText,
              activeTab === 'posts' && styles.activeTabButtonText,
            ]}
          >
            Posts
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'activity' && styles.activeTabButton]}
          onPress={() => setActiveTab('activity')}
        >
          <Text
            style={[
              styles.tabButtonText,
              activeTab === 'activity' && styles.activeTabButtonText,
            ]}
          >
            Activity
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'about' && styles.activeTabButton]}
          onPress={() => setActiveTab('about')}
        >
          <Text
            style={[
              styles.tabButtonText,
              activeTab === 'about' && styles.activeTabButtonText,
            ]}
          >
            About
          </Text>
        </TouchableOpacity>
      </View>

      {renderTabContent()}
    </ScrollView>
  );
};

// Component for displaying information sections in the About tab
const InfoSection = ({
  icon,
  title,
  content,
}: {
  icon: string;
  title: string;
  content: string;
}) => (
  <View style={styles.infoSection}>
    <View style={styles.infoHeader}>
      <Icon name={icon} size={18} color={colors.primary} />
      <Text style={styles.infoTitle}>{title}</Text>
    </View>
    <Text style={styles.infoContent}>{content}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: spacing.md,
  },
  settingsButton: {
    padding: spacing.xs,
  },
  profileHeader: {
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: spacing.md,
    borderWidth: 3,
    borderColor: colors.primary,
  },
  name: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold as any,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  handle: {
    fontSize: typography.sizes.md,
    color: colors.textSecondary,
    marginBottom: spacing.md,
  },
  bio: {
    fontSize: typography.sizes.md,
    color: colors.text,
    textAlign: 'center',
    marginBottom: spacing.lg,
    lineHeight: 22,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: spacing.lg,
    width: '80%',
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    backgroundColor: colors.border,
    marginHorizontal: spacing.md,
  },
  statValue: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold as any,
    color: colors.text,
  },
  statLabel: {
    fontSize: typography.sizes.sm,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  actionButtons: {
    flexDirection: 'row',
    marginBottom: spacing.lg,
  },
  primaryButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    borderRadius: 20,
    marginRight: spacing.sm,
  },
  primaryButtonText: {
    color: colors.text,
    fontWeight: typography.weights.medium as any,
  },
  secondaryButton: {
    backgroundColor: colors.surface,
    padding: spacing.sm,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
  },
  tabBar: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  tabButton: {
    flex: 1,
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
  activeTabButton: {
    borderBottomWidth: 2,
    borderBottomColor: colors.primary,
  },
  tabButtonText: {
    fontSize: typography.sizes.md,
    color: colors.textSecondary,
  },
  activeTabButtonText: {
    color: colors.primary,
    fontWeight: typography.weights.medium as any,
  },
  tabContent: {
    padding: spacing.md,
    minHeight: 200,
  },
  emptyStateText: {
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: spacing.xl,
  },
  postItem: {
    backgroundColor: colors.surface,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  postTitle: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.medium as any,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  postStats: {
    flexDirection: 'row',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  statText: {
    color: colors.textSecondary,
    fontSize: typography.sizes.sm,
    marginLeft: spacing.xs,
  },
  infoSection: {
    marginBottom: spacing.lg,
  },
  infoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  infoTitle: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.medium as any,
    color: colors.text,
    marginLeft: spacing.sm,
  },
  infoContent: {
    fontSize: typography.sizes.md,
    color: colors.text,
    marginLeft: spacing.lg + spacing.sm,
  },
  educationItem: {
    marginBottom: spacing.md,
    marginLeft: spacing.lg + spacing.sm,
  },
  eduInstitution: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.medium as any,
    color: colors.text,
  },
  eduDegree: {
    fontSize: typography.sizes.sm,
    color: colors.text,
    marginTop: spacing.xs,
  },
  eduYears: {
    fontSize: typography.sizes.sm,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginLeft: spacing.lg + spacing.sm,
  },
  skillBadge: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    margin: spacing.xs,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  skillText: {
    color: colors.primary,
    fontSize: typography.sizes.sm,
  },
});

export default ProfileScreen;
