import { createContext, useState } from "react";

const RefetchAfterDeleteContext = createContext({});

export const RefetchAfterDeleteProvider = ({ children }) => {
    const [isDeleted, setIsDeleted] = useState(false)

  return <RefetchAfterDeleteContext.Provider value={{ isDeleted, setIsDeleted }}>
    {children}
    </RefetchAfterDeleteContext.Provider>;
};

export default RefetchAfterDeleteContext;
