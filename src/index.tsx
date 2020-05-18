import ReactDOM from "react-dom";
import "./index.css";
import { makeAuthRouting } from "./routing";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faBell,
  faPlus,
  faUser,
  faTimesCircle,
  faPaperclip,
  faSpinner,
  faPencilAlt,
  faTrash,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";

library.add(
  faBell,
  faPlus,
  faUser,
  faTimesCircle,
  faPaperclip,
  faSpinner,
  faPencilAlt,
  faTrash,
  faSignOutAlt
);

ReactDOM.render(makeAuthRouting(), document.getElementById("root"));
