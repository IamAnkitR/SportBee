import React, { Suspense } from "react";
import ArticleList from "./ArticleList";
import ErrorBoundary from "../../components/ErrorBoundary";

const Articles = () => {
  return (
    <>
      <ErrorBoundary>
        <Suspense fallback={<div className="suspense-loading">Loading...</div>}>
          <ArticleList />
        </Suspense>
      </ErrorBoundary>
    </>
  );
};

export default Articles;
