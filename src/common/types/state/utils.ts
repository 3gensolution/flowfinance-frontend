/**
 * This function type can be used to set a zustand state from an external function to the store.
 */
export type SetState<State> = (
  partial: Partial<State> | ((state: State) => Partial<State>),
) => void;