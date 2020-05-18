import React from "react";
import Layout from "./components/Layout";
import Auth from "./auth/Auth";
import LoadingIndicator from "./components/utility/LoadingIndicator";
import { LogIn } from "./components/Login";
import { CreateProfile } from "./components/CreateProfile";
import { StoreContextProvider, StoreContext } from "./store/store";
import { AuthContext } from "./context/authContext";
import { fetchUser } from "./api/users";

export interface AppProps {
  auth: Auth;
  history: any;
}

const App = (props: AppProps) => {
  const { auth } = props;
  const [renewingSession, setRenewingSession] = React.useState(false);
  
  const [loadingUser, setLoadingUser] = React.useState(false);
  const { user: currentUser, dispatch } = React.useContext(StoreContext);
  const [isAuthenticated, setisAuthenticated] = React.useState(false);
  const [isCreateProfileModalOpen, setCreateProfileModalOpen] = React.useState(
    false
  );
  const [user, setUser] = React.useState(currentUser);

  React.useEffect(() => {
    if (
      auth.isAuthenticated() &&
      !user &&
      !isCreateProfileModalOpen &&
      !renewingSession
    ) {
      const user = localStorage.getItem("current_user");
      if (user) {
        setUser(JSON.parse(user));
      } else {
        setLoadingUser(true);
        fetchUser()
          .then((data) => {
            if (!data.error) {
              localStorage.setItem("current_user", JSON.stringify(data));
              setUser(data);
              setLoadingUser(false);
            } else {
              setCreateProfileModalOpen(true);
              setLoadingUser(false);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  }, [isAuthenticated, isCreateProfileModalOpen]);

  if (renewingSession) {
    return <LoadingIndicator message='Authenticating...' />;
  }

  if (isCreateProfileModalOpen) {
    return (
      <CreateProfile exitCallback={() => setCreateProfileModalOpen(false)} />
    );
  }

  if (loadingUser && auth.isAuthenticated()) {
    return <LoadingIndicator message='Loading user profile...' />;
  }

  if (
    !auth.isAuthenticated() &&
    !isAuthenticated &&
    !loadingUser &&
    !renewingSession
  ) {
    return <LogIn auth={auth} />;
  } else if (!isAuthenticated) {
    setisAuthenticated(true);
  }

  return (
    <AuthContext.Provider value={auth.logout}>
      {user && (
        <StoreContextProvider user={user}>
          <div className='App'>
            <Layout />
          </div>
        </StoreContextProvider>
      )}
    </AuthContext.Provider>
  );
};

export default App;
