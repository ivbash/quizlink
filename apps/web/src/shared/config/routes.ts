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
    dashboard: () => '/admin',
    users: () => '/admin/users',
    tags: () => '/admin/tags',
    quizzes: () => '/admin/quizzes',
  },
} as const;

export const routesAPI = {
  auth: {
    refresh: () => '/api/auth/refresh',
    signUp: () => '/api/auth/sign-up',
    signIn: () => '/api/auth/sign-in',
    signOut: () => '/api/auth/sign-out',
  },
  users: {
    me: () => '/api/users/me',
  },
};
