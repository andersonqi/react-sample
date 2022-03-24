import { Admins } from "./admins";
import { Auth } from "./auth";
import { Categories } from "./categories";
import { Properties } from "./property";
import { Works } from "./work";
import { Workers } from "./workers";
import { Plans } from "./plans";
import { Subscriptions } from "./subscriptions";
import { Statistics } from "./statistics";
import { Settings } from "./settings";

export interface Store {
  auth: Auth;
  statistics: Statistics;
  admins: Admins;
  properties: Properties;
  categories: Categories;
  works: Works;
  workers: Workers;
  plans: Plans;
  subscriptions: Subscriptions;
  settings: Settings;
}
