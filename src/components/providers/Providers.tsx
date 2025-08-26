"use client";

import ReactQueryProvider from "./ReactQueryProvider";
import ReduxProvider from "./ReduxProvider";

const Providers = ({ children }: { children: React.ReactNode }) => (
  <ReduxProvider>
    <ReactQueryProvider>{children}</ReactQueryProvider>
  </ReduxProvider>
);

export default Providers;
