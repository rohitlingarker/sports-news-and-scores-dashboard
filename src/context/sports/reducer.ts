export interface Sport {
  id: number;
  name: string;
}

export type SportState = Sport[];

export const initialState: SportState = [];

export type SportsActions = {
  type: "FETCH_SPORTS_SUCCESS";
  payload: SportState;
};

export const reducer = (
  state: Sport[] = initialState,
  action: SportsActions
): SportState => {
  switch (action.type) {
    case "FETCH_SPORTS_SUCCESS":
      return action.payload;

    default:
      return state;
  }
};
