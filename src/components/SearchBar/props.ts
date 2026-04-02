/**
 * Represents the props for the SearchBar component.
 */
export interface SearchBarProps {
  /**
   * A function to set the search term.
   * @param searchTerm - The new search term.
   */
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}
