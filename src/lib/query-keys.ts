export const queryKeys = {
  // Posts
  posts: {
    all: ['posts'] as const,
    lists: () => [...queryKeys.posts.all, 'list'] as const,
    list: (page: number, limit: number) =>
      [...queryKeys.posts.lists(), { page, limit }] as const,
    details: () => [...queryKeys.posts.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.posts.details(), id] as const,
  },

  // Timeline
  timeline: {
    all: ['timeline'] as const,
    lists: () => [...queryKeys.timeline.all, 'list'] as const,
    list: (page: number, limit: number) =>
      [...queryKeys.timeline.lists(), { page, limit }] as const,
  },

  // Likes
  likes: {
    all: ['likes'] as const,
    byPost: (postId: string, page: number, limit: number) =>
      [...queryKeys.likes.all, 'post', postId, { page, limit }] as const,
  },

  // Comments
  comments: {
    all: ['comments'] as const,
    byPost: (
      postId: string,
      parentCommentId: string | null,
      page: number,
      limit: number,
    ) =>
      [
        ...queryKeys.comments.all,
        'post',
        postId,
        { parentCommentId, page, limit },
      ] as const,
  },

  // Conversations
  conversations: {
    all: ['conversations'] as const,
    lists: () => [...queryKeys.conversations.all, 'list'] as const,
  },

  // Groups
  groups: {
    all: ['groups'] as const,
    lists: () => [...queryKeys.groups.all, 'list'] as const,
    detail: (id: string) => [...queryKeys.groups.all, 'detail', id] as const,
  },

  // Messages
  messages: {
    all: ['messages'] as const,
    byConversation: (conversationId: string) =>
      [...queryKeys.messages.all, 'conversation', conversationId] as const,
    byGroup: (groupId: string) =>
      [...queryKeys.messages.all, 'group', groupId] as const,
  },

  // User
  user: {
    all: ['user'] as const,
    profile: () => [...queryKeys.user.all, 'profile'] as const,
    detail: (id: string) => [...queryKeys.user.all, 'detail', id] as const,
  },
} as const;
