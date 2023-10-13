import * as ActionTypes from "./type";
import Firebase from "../util/firebase";

export const getProducts = () => async (dispatch) => {
  const snapshot = await Firebase.firestore()
  .collection("partnerProducts")
  .get();

  let resultArray = [];

    snapshot.forEach((doc) => {
      const obj ={
        productId:doc.id,
        ...doc.data()
      };
      resultArray.push(obj);
    });

    dispatch({
        type: ActionTypes.SAVE_PARTNER_PRODUCTS,
        payload: resultArray,
      });
};