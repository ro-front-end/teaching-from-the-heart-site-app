import { useSelector } from "react-redux";

function useAuthHook() {
  const { token, user } = useSelector((state) => state.auth);

  const isLoggedIn = Boolean(token && user);

  return { token, user, isLoggedIn };
}

export default useAuthHook;
