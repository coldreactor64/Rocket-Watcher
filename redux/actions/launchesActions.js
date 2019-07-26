import { LOAD_MORE_LAUNCHES, UPDATE_LAUNCHES } from "./actionTypes";
import axios from "axios";

/**
 * @function requestLaunches Gather news from API and return it
 * @param {number} -Page of news you want to get
 * @returns {JSON} - JSON list of News Articles
 */

export const requestLaunches = async (offset) => {
    try {
        const newsRequest = await axios.get(
            `https://launchlibrary.net/1.4/launch/next/6?offset=${offset}`
        );
        if (newsRequest.status === 200) {
            return newsRequest.data.launches;
            
        } else {
            return [];
        }
    }
    catch(error){
        return [];
    }


};

export const updateLaunches = () => async dispatch => {
  const launches = await requestLaunches(0);
  dispatch({
    type: UPDATE_LAUNCHES,
    launches: launches
  });
};

export const loadMoreLaunches = (launches) => async dispatch => {
  const launchCount = launches.length; //get Number of articles
  const newLaunches = await requestLaunches(launchCount); //request the pages + 1
  const newLaunchSchedule = launches.concat(newLaunches);
  /*Check new news if its null from an error*/

  if (newLaunches.length === 0) {
    //if error null out everything
    dispatch({
      type: LOAD_MORE_LAUNCHES,
      launches: []
    });
  } else {
    dispatch({
      type: LOAD_MORE_LAUNCHES,
      launches: [...newLaunchSchedule]
    });
  }
};
