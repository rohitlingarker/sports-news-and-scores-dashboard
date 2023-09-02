import { API_ENDPOINT } from "../../config/constants";
import { MatchItem } from "./reducer";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const fetchMatches = async (dispatch:any ) => {
  try {
    dispatch({ type: "FETCH_MATCHES_REQUEST" });
    const response = await fetch(`${API_ENDPOINT}/matches`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    //   console.log("fetched successfully");
    const data = await response.json();
    let matches: MatchItem[] = data.matches;

    // Custom sort function to prioritize live matches
    const customSort = (a:MatchItem, b:MatchItem)=>{
      if (a.isRunning && !b.isRunning) {
          return -1; 
      } else if (!a.isRunning && b.isRunning) {
          return 1; 
      } else {
          return 0; 
      }
    }
    matches = matches.sort(customSort)
    dispatch({
      type: "FETCH_MATCHES_SUCCESS",
      payload: matches,
    });

    console.log("matches",matches);
    
    // updateAllMatches(dispatch,matches)


  } catch (error) {
    console.error("", error);
    dispatch({ type: "FETCH_MATCHES_FAILURE" });
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
// export const updateAllMatches = async (dispatch: any, args: any) => {
//   try {
//     const updatedMatches = await Promise.all(
//       args.map(async (match: { id: unknown }) => await fetchMatchDetails({ id: match.id }))
//     );

//     dispatch({
//       type: "UPDATE_ALL_MATCHES",
//       payload: updatedMatches 
//     })
//     }
//     catch (err) {
//     console.error('Error in updating all matches', err);
//   }
// };




// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const fetchMatchDetails = async ( args:any)=>{
  try{
    const response = await fetch(`${API_ENDPOINT}/matches/${args.id}`);
    const matchData=await  response.json();
    console.log(matchData,"matchdata")
    
    return matchData;
  } catch(error){
    console.log('error',error,'fetch details')

  }
}

