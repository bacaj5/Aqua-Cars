import { useEffect, useState } from "react";

export function useIsNotAuthorized() {
  const [isNotAuthorized, setIsNotAuthorized] = useState(false);

  useEffect(() => {
    const tokenExpiration = localStorage.getItem("tokenExpiration");
    const token = localStorage.getItem("token");

    const now = new Date().getTime();
    const expirationTime = new Date(tokenExpiration).getTime();

    if (!token || !tokenExpiration || now > expirationTime) {
      localStorage.removeItem("token");
      localStorage.removeItem("tokenExpiration");
      localStorage.removeItem("loggedInUserEmail");
      localStorage.removeItem("role");
      setIsNotAuthorized(true);
    }
  }, []);

  return isNotAuthorized;
}
