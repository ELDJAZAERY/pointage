export const isValidDate = (stringDate: string): boolean => {
  try {
    const date = new Date(stringDate);

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
 * calcule la dure en HH:MM entre les 2 date
 *
 */
export const DiffIn_HH_MM = (from: Date, to: Date): string | undefined => {
  try {
    const diffTime = Math.abs(from.getTime() - to.getTime());
    const diffMin = Math.ceil(diffTime / (1000 * 60));

    const HH_MM = `${Math.floor(diffMin / 60)} H : ${Math.floor(
      diffMin % 60
    )} Min`;

    return HH_MM;
  } catch {
    return undefined;
  }
};
