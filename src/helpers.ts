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
 * Formatter for USD currency.
 */
const usdFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
});

/**
 * Converts a number representing money into a formatted string.
 * 
 * @param money - The amount of money to convert.
 * @returns The formatted string representing the money.
 */
const convertMoney = (money: number): string => {
  return usdFormatter.format(money);
};


/**
 * Retrieves the persisted state from the session storage.
 * 
 * @param stateName - The name of the state to retrieve.
 * @returns The persisted state if found, otherwise null.
 */
const getPersistedState = <T>(stateName: string): T | null | Error => {
  const sessionState = sessionStorage.getItem(stateName);
  try {
    return sessionState ? (JSON.parse(sessionState) as T) : null;
  } catch (error) {
    console.error("Failed to parse session state for key", stateName, ":", error);
    return null;
  }
};

export { calcTime, convertMoney, getPersistedState };