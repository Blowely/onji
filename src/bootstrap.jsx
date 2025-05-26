import React, {useEffect} from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store";
import { ConfigProvider, Layout } from "antd";
import ru_RU from "antd/lib/locale/ru_RU";
import { ErrorBoundary } from "react-error-boundary";
import { BrowserRouter as Router } from "react-router-dom";
import moment from "moment";
import Root from "./Root";
import reportWebVitals from "./reportWebVitals";
import * as serviceWorker from "./serviceWorkerRegistration.ts";
import "./index.scss"

moment.locale("ru");
export const ErrorFallback = ({ error, resetErrorBoundary }) => {
  return (
    <Layout>
      Упс, что-то пошло не так
    </Layout>
  );
};

export const API_URL = "https://api.re-poizon.ru/api";

const Index = () => {
  return (
      <Provider store={store}>
          <ConfigProvider
              locale={ru_RU}
              getPopupContainer={(triggerNode) =>
                  triggerNode?.parentNode || document.body
              }
          >
              <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => {}}>
                  <Router>
                      <Root />
                  </Router>
              </ErrorBoundary>
          </ConfigProvider>
      </Provider>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Index />);

reportWebVitals();

serviceWorker.register();
