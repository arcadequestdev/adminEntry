import * as ActionTypes from "./type";
import Firebase from "../util/firebase";

export const getPartners = () => async (dispatch) => {
  const snapshot = await Firebase.firestore()
  .collection("partners")
  .get();

  let resultArray = [];

    snapshot.forEach((doc) => {
      const obj ={
        partnerId:doc.id,
        ...doc.data()
      };
      resultArray.push(obj);
    });

    dispatch({
        type: ActionTypes.SAVE_PARTNERS,
        payload: resultArray,
      });
};