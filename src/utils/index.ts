export const isValidDate = (stringDate: string): boolean => {
  try {
    let date = new Date(stringDate);

    return !isNaN(date.getTime());
  } catch {
    return false;
  }
};

/**
 *
 * @param from Date
 * @param to Date
 *
 * calcule la dure en minute entre les 2 date
 *
 */
export const DateDiffInMinutes = (from: Date, to: Date): number => {
  const diffTime = Math.abs(from.getTime() - to.getTime());
  const diffMin = Math.ceil(diffTime / (1000 * 60));

  return diffMin;
};
