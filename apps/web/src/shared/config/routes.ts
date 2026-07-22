export const routes = {
  home: () => '/',
  about: () => '/about',
  quizzes: () => '/quizzes',
  signUp: () => '/sign-up',
  signIn: () => '/sign-in',
  forbidden: () => '/forbidden',
  user: {
    profile: () => '/profile',
  },
  admin: {
    dashboard: () => '/admin/dashboard',
    users: () => '/admin/users',
    tags: () => '/admin/tags',
    createTag: () => '/admin/tags/create',
    updateTag: (id: number) => `/admin/tags/${id}`,
    quizzes: () => '/admin/quizzes',
  },
} as const;

export const apiRoutes = {
  auth: {
    refresh: () => '/api/auth/refresh',
    signUp: () => '/api/auth/sign-up',
    signIn: () => '/api/auth/sign-in',
    signOut: () => '/api/auth/sign-out',
  },
  users: {
    me: () => '/api/users/me',
  },
  tags: {
    list: () => '/api/tags',
    detail: (id: number) => `/api/tags/${id}`,
  },
} as const;
