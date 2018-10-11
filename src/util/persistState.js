/**
 * @description Loads the state from localStorage. If no state is found,
 * return undefined so that reducers can instantiate the state.
 */
export const loadState = () => {
  const serializedState = localStorage.getItem('state');
  if (serializedState === null) return undefined;
  const state = JSON.parse(serializedState);
  // state.common.loading = false;
  return state;
};

  /**
   * @description Saves a copy of the state to the browser's localStorage
   * @param {object} state The state object
   */
export const saveState = (state) => {
  const serializedState = JSON.stringify(state);
  localStorage.setItem('state', serializedState);
};
export const clearState = () => {
  localStorage.removeItem('state');
};

