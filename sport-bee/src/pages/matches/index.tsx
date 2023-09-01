import MatchList from "./MatchList";
import React, { Suspense } from "react";
import ErrorBoundary from "../../components/ErrorBoundary";

const Matches = () => {
  return (
    <>
      <ErrorBoundary>
        <Suspense fallback={<div className="suspense-loading">Loading...</div>}>
          <MatchList />
        </Suspense>
      </ErrorBoundary>
    </>
  );
};

export default Matches;
