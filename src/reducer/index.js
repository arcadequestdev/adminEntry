import { combineReducers } from "redux";
import user from "./user";
import partners from "./partners";
import products from "./products";

export default combineReducers({
  user,
  partners,
  products
});
