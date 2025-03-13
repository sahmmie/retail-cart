export const validDiscounts: { [key: string]: (total: number) => number } = {
  'SAVE10': (total) => total * 0.1, // 10% off
  'SAVE5': () => 5 // $5 off
};
