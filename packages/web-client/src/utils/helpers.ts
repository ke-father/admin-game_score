export const formatDate = (date: string | number | Date): string => {
  return new Date(date).toLocaleDateString('zh-CN');
};

export const sleep = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
}; 