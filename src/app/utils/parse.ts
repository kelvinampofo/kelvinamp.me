export const parseError = (error: unknown): string => {
  return error instanceof Error ? error.message : String(error);
};
