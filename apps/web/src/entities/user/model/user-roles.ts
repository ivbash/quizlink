export const USER_ROLES_MAP = {
  admin: 'Администратор',
  user: 'Пользователь',
} as const;

export const USER_ROLES_ITEMS = Object.entries(USER_ROLES_MAP).map(
  ([value, label]) => ({ label, value }),
);
