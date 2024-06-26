import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice/userSlice";
import ProductSlice from "./ProductSlice/ProductSlice";
import MinistriesState from "./MinistriesState/MinistriesSlice";
import ProjectSLice from "./ProjectSlice/ProjectSlice";
import WorkNaturalSlice from"./Whorkntural/WorkNuralSlice"
import notificationSlice from "./Notification/NotificationState";
import DepartmentSlice from "./DepartmentState/DepartmentSlice";
import languageSlice from "./LanguageState"
import CustomDataFormPriceOfferPrice  from "./OfferPriceCustomStat/OfferPriceCustomSlice";
import  RolesReducer  from "./RoleSlice/RoleSlice";
import  themesSlice  from "./theme/themeReducer";
// @ts-ignore
const enhance = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
const store = configureStore(
  {
    reducer: {
      user: userSlice,
      products: ProductSlice,
      Ministries: MinistriesState,
      Project: ProjectSLice,
      natural:WorkNaturalSlice,
      notification: notificationSlice,
      Department:DepartmentSlice,
      language: languageSlice,
      CustomDataPrice:CustomDataFormPriceOfferPrice,
      RolesData:RolesReducer,
      ThemeData:themesSlice
    },
  },
  // @ts-ignore
  enhance
);
export default store;
