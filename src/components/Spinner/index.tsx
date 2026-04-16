/**
 * A spinner component that indicates loading or processing state.
 */
import type { ReactElement } from "react";
import { Spinner as SpinnerEl } from "./styles";

export default function Spinner(): ReactElement {
  return <SpinnerEl data-testid="spinner" />;
}
