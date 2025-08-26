import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const PageWrapper = ({ children }: Props) => {
  return (
    <div className="w-full min-h-screen py-24 px-6 lg:py-12">
      <div className="flex flex-col gap-24">
        <h1 className="text-2xl font-bold text-center">Simple, ToDo!</h1>
        <div className="w-full lg:max-w-[30vw] m-auto">{children}</div>
      </div>
    </div>
  );
};

export default PageWrapper;
