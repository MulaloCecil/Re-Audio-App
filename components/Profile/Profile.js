import React, { createContext, useState } from "react";

const ProfileContext = createContext();

const ProfileProvider = ({ children }) => {
  const [key, SetKey] = useState(null);

  return (
    <ProfileContext.Provider
      value={{
        key,
        SetKey,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export { ProfileContext, ProfileProvider };
