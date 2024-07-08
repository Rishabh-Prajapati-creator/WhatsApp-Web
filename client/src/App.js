import Messenger from "./components/Messenger";
import { GoogleOAuthProvider } from "@react-oauth/google";
import AccountProvider from "./context/AccountProvider";

export default function App() {

  const clientId = '587768752560-qpogkpcprssoue842i1tcnj92efd3fea.apps.googleusercontent.com';

  return (
      <GoogleOAuthProvider clientId={clientId}>
        <AccountProvider >
          <Messenger />
        </AccountProvider>
      </GoogleOAuthProvider>
  )
}