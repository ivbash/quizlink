export const routes = {
  home: () => '/',
  about: () => '/about',
  quizzes: () => '/quizzes',
  signUp: () => '/sign-up',
  signIn: () => '/sign-in',
  admin: {
    dashboard: () => '/admin',
    users: () => '/admin/users',
    tags: () => '/admin/tags',
    quizzes: () => '/admin/quizzes',
  },
} as const;
