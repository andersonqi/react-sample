import { combineReducers } from "redux";

import auth from "./Auth/reducer";
import statistics from "./Statistics/reducer";
import admins from "./Admins/reducer";
import properties from "./Properties/reducer";
import settings from "./Settings/reducer";
import workers from "./Workers/reducer";
import categories from "./Categories/reducer";
import works from "./Works/reducer";
import plans from "./Plans/reducer";
import subscriptions from "./Subscriptions/reducer";

export default combineReducers({
  auth,
  statistics,
  admins,
  properties,
  settings,
  workers,
  categories,
  works,
  plans,
  subscriptions,
});
