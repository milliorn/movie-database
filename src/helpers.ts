/**
 * Calculates the time in hours and minutes based on the given time in minutes.
 * @param time - The time in minutes.
 * @returns A string representing the time in the format "Xh Ym".
 */
const calcTime = (time: number): string => {
  const hours: number = Math.floor(time / 60);
  const mins: number = time % 60;
  return `${hours}h ${mins}m`;
};

/**
 * Converts a number representing money into a formatted currency string.
 * @param money - The number representing the amount of money.
 * @returns The formatted currency string.
 */
const convertMoney = (money: number): string => {
  const formatter: Intl.NumberFormat = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  });
  return formatter.format(money);
};

/**
 * Retrieves the persisted state from the session storage.
 * 
 * @param stateName - The name of the state to retrieve.
 * @returns The persisted state if found, otherwise null.
 */
const getPersistedState = <T>(stateName: string): T | null => {
  const sessionState = sessionStorage.getItem(stateName);
  try {
    return sessionState ? (JSON.parse(sessionState) as T) : null;
  } catch (error) {
    console.error("Failed to parse session state for key", stateName, ":", error);
    return null;
  }
};

export { calcTime, convertMoney, getPersistedState };