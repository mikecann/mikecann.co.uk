import * as React from "react";
import { useScrollYPosition } from "react-use-scroll-position";

export const useScrollYWithDelta = () => {
  const y = useScrollYPosition();
  const [state, setState] = React.useState(() => ({ y: 0, delta: 0 }));
  React.useEffect(() => {
    setState({ y, delta: y - state.y });
  }, [y]);
  return [state.y, state.delta];
};
