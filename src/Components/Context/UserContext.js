// Re-export the centralized AuthContext and provider so components under
// `Components/Context` can continue importing from this path without
// changing many import sites. The real implementation lives in
// `src/contexts/AuthContext.js` and App uses that provider.
import { AuthContext, AuthProvider } from "../../contexts/AuthContext";

export { AuthContext };

// Keep default export compatible with existing imports: default export a
// provider component that simply renders the centralized AuthProvider.
export default AuthProvider;
