export const getUserById = (idFromToken: string, idFromQuery: string): void => {
  if (idFromToken !== idFromQuery) {
    throw new Error('User not found');
  }

  return;
};
