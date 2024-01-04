import ReactDOM from 'react-dom/client';
import App from './App';
import { G2Theme } from '@genre/g2common-theme';
import { GenReMsal } from "@genre/genre-msal";
import { Provider } from 'react-redux';
import { storeWithLogger } from './Store/Store';
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
const persistedStore = persistStore(storeWithLogger);

root.render(
    <GenReMsal clientId={process.env.REACT_APP_CLIENT_ID} authority={process.env.REACT_APP_AUTHORITY_ID} redirectUri="/">
        <Provider store={storeWithLogger}>
        <PersistGate loading={null} persistor={persistedStore}>
            <App />
        </PersistGate>
        </Provider>
     </GenReMsal>

)
