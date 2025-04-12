import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  RefreshControl,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { spacing } from '../theme/spacing';

// Types for our notifications
type NotificationType =
  | 'follow_request'
  | 'new_follower'
  | 'like'
  | 'comment'
  | 'mention'
  | 'post_share'
  | 'job_recommendation';

interface Notification {
  id: string;
  type: NotificationType;
  user: {
    id: string;
    name: string;
    avatarUrl: string;
  };
  content?: string;
  postId?: string;
  postImage?: string;
  timestamp: number;
  read: boolean;
}

// Mock data for notifications
const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    type: 'follow_request',
    user: {
      id: 'user1',
      name: 'Jane Smith',
      avatarUrl: 'https://randomuser.me/api/portraits/women/12.jpg',
    },
    timestamp: Date.now() - 15 * 60 * 1000, // 15 minutes ago
    read: false,
  },
  {
    id: '2',
    type: 'like',
    user: {
      id: 'user2',
      name: 'Robert Johnson',
      avatarUrl: 'https://randomuser.me/api/portraits/men/32.jpg',
    },
    content: 'Building Scalable Mobile Apps',
    postId: 'post1',
    timestamp: Date.now() - 2 * 60 * 60 * 1000, // 2 hours ago
    read: false,
  },
  {
    id: '3',
    type: 'comment',
    user: {
      id: 'user3',
      name: 'Emily Davis',
      avatarUrl: 'https://randomuser.me/api/portraits/women/22.jpg',
    },
    content: 'Great insights! Would love to hear more about state management.',
    postId: 'post2',
    timestamp: Date.now() - 5 * 60 * 60 * 1000, // 5 hours ago
    read: true,
  },
  {
    id: '4',
    type: 'new_follower',
    user: {
      id: 'user4',
      name: 'Michael Wilson',
      avatarUrl: 'https://randomuser.me/api/portraits/men/42.jpg',
    },
    timestamp: Date.now() - 1 * 24 * 60 * 60 * 1000, // 1 day ago
    read: true,
  },
  {
    id: '5',
    type: 'mention',
    user: {
      id: 'user5',
      name: 'Sarah Thompson',
      avatarUrl: 'https://randomuser.me/api/portraits/women/32.jpg',
    },
    content: 'Hey @johndoe, check out this new React Native feature!',
    postId: 'post3',
    timestamp: Date.now() - 2 * 24 * 60 * 60 * 1000, // 2 days ago
    read: true,
  },
  {
    id: '6',
    type: 'post_share',
    user: {
      id: 'user6',
      name: 'David Brown',
      avatarUrl: 'https://randomuser.me/api/portraits/men/52.jpg',
    },
    content: 'Latest React Native Features',
    postId: 'post4',
    timestamp: Date.now() - 3 * 24 * 60 * 60 * 1000, // 3 days ago
    read: true,
  },
  {
    id: '7',
    type: 'job_recommendation',
    user: {
      id: 'system',
      name: 'Medial Jobs',
      avatarUrl: 'https://randomuser.me/api/portraits/lego/1.jpg',
    },
    content: 'Senior React Native Developer at Tech Innovations Inc.',
    timestamp: Date.now() - 4 * 24 * 60 * 60 * 1000, // 4 days ago
    read: true,
  },
];

const NotificationsScreen = () => {
  const [notifications, setNotifications] = useState<Notification[]>(MOCK_NOTIFICATIONS);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Simulate fetching new notifications
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const markAsRead = (id: string) => {
    setNotifications(prevNotifications =>
      prevNotifications.map(notification =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const getFormattedTime = (timestamp: number) => {
    const now = Date.now();
    const diffMs = now - timestamp;
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHour = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHour / 24);

    if (diffDay > 0) {
      return diffDay === 1 ? '1 day ago' : `${diffDay} days ago`;
    } else if (diffHour > 0) {
      return diffHour === 1 ? '1 hour ago' : `${diffHour} hours ago`;
    } else if (diffMin > 0) {
      return diffMin === 1 ? '1 minute ago' : `${diffMin} minutes ago`;
    } else {
      return 'Just now';
    }
  };

  const getNotificationContent = (item: Notification) => {
    switch (item.type) {
      case 'follow_request':
        return (
          <View style={styles.contentContainer}>
            <Text style={styles.contentText}>
              <Text style={styles.userName}>{item.user.name}</Text> requested to follow you
            </Text>
            <View style={styles.actionButtons}>
              <TouchableOpacity style={styles.acceptButton} onPress={() => markAsRead(item.id)}>
                <Text style={styles.acceptButtonText}>Accept</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.declineButton} onPress={() => markAsRead(item.id)}>
                <Text style={styles.declineButtonText}>Decline</Text>
              </TouchableOpacity>
            </View>
          </View>
        );

      case 'new_follower':
        return (
          <View style={styles.contentContainer}>
            <Text style={styles.contentText}>
              <Text style={styles.userName}>{item.user.name}</Text> started following you
            </Text>
            <TouchableOpacity style={styles.followButton} onPress={() => markAsRead(item.id)}>
              <Text style={styles.followButtonText}>Follow Back</Text>
            </TouchableOpacity>
          </View>
        );

      case 'like':
        return (
          <View style={styles.contentContainer}>
            <Text style={styles.contentText}>
              <Text style={styles.userName}>{item.user.name}</Text> liked your post{' '}
              <Text style={styles.contentHighlight}>"{item.content}"</Text>
            </Text>
          </View>
        );

      case 'comment':
        return (
          <View style={styles.contentContainer}>
            <Text style={styles.contentText}>
              <Text style={styles.userName}>{item.user.name}</Text> commented on your post:
            </Text>
            <Text style={styles.commentText}>"{item.content}"</Text>
          </View>
        );

      case 'mention':
        return (
          <View style={styles.contentContainer}>
            <Text style={styles.contentText}>
              <Text style={styles.userName}>{item.user.name}</Text> mentioned you in a post:
            </Text>
            <Text style={styles.mentionText}>"{item.content}"</Text>
          </View>
        );

      case 'post_share':
        return (
          <View style={styles.contentContainer}>
            <Text style={styles.contentText}>
              <Text style={styles.userName}>{item.user.name}</Text> shared your post{' '}
              <Text style={styles.contentHighlight}>"{item.content}"</Text>
            </Text>
          </View>
        );

      case 'job_recommendation':
        return (
          <View style={styles.contentContainer}>
            <Text style={styles.contentText}>
              <Text style={styles.userName}>{item.user.name}</Text> recommended a job for you
            </Text>
            <Text style={styles.jobText}>{item.content}</Text>
            <TouchableOpacity style={styles.viewJobButton} onPress={() => markAsRead(item.id)}>
              <Text style={styles.viewJobButtonText}>View Job</Text>
            </TouchableOpacity>
          </View>
        );

      default:
        return (
          <View style={styles.contentContainer}>
            <Text style={styles.contentText}>
              <Text style={styles.userName}>{item.user.name}</Text> interacted with your profile
            </Text>
          </View>
        );
    }
  };

  const renderNotificationItem = ({ item }: { item: Notification }) => (
    <TouchableOpacity
      style={[styles.notificationItem, !item.read && styles.unreadNotification]}
      onPress={() => markAsRead(item.id)}
      activeOpacity={0.7}
    >
      {!item.read && <View style={styles.unreadDot} />}

      <Image source={{ uri: item.user.avatarUrl }} style={styles.userAvatar} />

      {getNotificationContent(item)}

      <Text style={styles.timestamp}>{getFormattedTime(item.timestamp)}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={colors.background} />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Notifications</Text>
        <TouchableOpacity style={styles.settingsButton}>
          <Icon name="settings-outline" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>

      {notifications.length > 0 ? (
        <FlatList
          data={notifications}
          renderItem={renderNotificationItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={colors.primary}
              colors={[colors.primary]}
            />
          }
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Icon name="notifications-off-outline" size={64} color={colors.textSecondary} />
          <Text style={styles.emptyText}>No notifications yet</Text>
          <Text style={styles.emptySubtext}>
            When you get notifications, they'll appear here
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerTitle: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold as any,
    color: colors.text,
  },
  settingsButton: {
    padding: spacing.xs,
  },
  listContainer: {
    padding: spacing.sm,
  },
  notificationItem: {
    flexDirection: 'row',
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    position: 'relative',
  },
  unreadNotification: {
    backgroundColor: `${colors.primary}10`, // 10% opacity of primary color
  },
  unreadDot: {
    position: 'absolute',
    width: 8,
    height: 8,
    backgroundColor: colors.primary,
    borderRadius: 4,
    top: spacing.md,
    left: spacing.xs / 2,
  },
  userAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: spacing.md,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  contentText: {
    fontSize: typography.sizes.md,
    color: colors.text,
    flexWrap: 'wrap',
    marginBottom: spacing.xs,
  },
  userName: {
    fontWeight: typography.weights.bold as any,
    color: colors.text,
  },
  contentHighlight: {
    color: colors.primary,
  },
  commentText: {
    fontSize: typography.sizes.sm,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
    fontStyle: 'italic',
  },
  mentionText: {
    fontSize: typography.sizes.sm,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  jobText: {
    fontSize: typography.sizes.sm,
    color: colors.primary,
    marginBottom: spacing.xs,
    fontWeight: typography.weights.medium as any,
  },
  timestamp: {
    position: 'absolute',
    top: spacing.md,
    right: spacing.md,
    fontSize: typography.sizes.xs,
    color: colors.textSecondary,
  },
  actionButtons: {
    flexDirection: 'row',
    marginTop: spacing.xs,
  },
  acceptButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
    borderRadius: 16,
    marginRight: spacing.sm,
  },
  acceptButtonText: {
    color: colors.text,
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.medium as any,
  },
  declineButton: {
    backgroundColor: colors.surface,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  declineButtonText: {
    color: colors.textSecondary,
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.medium as any,
  },
  followButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
    borderRadius: 16,
    alignSelf: 'flex-start',
    marginTop: spacing.xs,
  },
  followButtonText: {
    color: colors.text,
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.medium as any,
  },
  viewJobButton: {
    backgroundColor: colors.surface,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
    borderRadius: 16,
    alignSelf: 'flex-start',
    marginTop: spacing.xs,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  viewJobButtonText: {
    color: colors.primary,
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.medium as any,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  emptyText: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.medium as any,
    color: colors.text,
    marginTop: spacing.md,
  },
  emptySubtext: {
    fontSize: typography.sizes.sm,
    color: colors.textSecondary,
    marginTop: spacing.sm,
    textAlign: 'center',
  },
});

export default NotificationsScreen;
