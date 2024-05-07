// Convert time to hours and minutes
export const calcTime = (time: number): string => {
  const hours: number = Math.floor(time / 60);
  const mins: number = time % 60;
  return `${hours}h ${mins}m`;
};
// Convert a number to money formatting
export const convertMoney = (money: number): string => {
  const formatter: Intl.NumberFormat = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  });
  return formatter.format(money);
};

export const getPersistedState = <T>(stateName: string): T | null => {
  const sessionState = sessionStorage.getItem(stateName);
  try {
    return sessionState ? (JSON.parse(sessionState) as T) : null;
  } catch (error) {
    console.error("Failed to parse session state for key", stateName, ":", error);
    return null;
  }
};
