import MatchList from "./MatchList";
import React, { Suspense } from "react";
import ErrorBoundary from "../../components/ErrorBoundary";

const Matches = () => {
  return (
    <>
      <h1 className="bg-gray-300 text-xl font-mono pt-1 pl-4">Live Matches</h1>
      <ErrorBoundary>
        <Suspense fallback={<div className="suspense-loading">Loading...</div>}>
          <MatchList />
        </Suspense>
      </ErrorBoundary>
    </>
  );
};

export default Matches;
