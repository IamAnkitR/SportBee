import React from "react";
import { useEffect } from "react";
import "./MatchList.css";
import MatchDetails from "./MatchDetails";
import Skeleton from "./Skeleton";
import { fetchMatches } from "../../context/matches/actions";
import { Match } from "../../context/matches/reducer";

import {
  useMatchesDispatch,
  useMatchesState,
} from "../../context/matches/context";

const MatchList: React.FC = () => {
  const dispatchMatches = useMatchesDispatch();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const state: any = useMatchesState();
  const { isLoading, matches } = state;
  useEffect(() => {
    fetchMatches(dispatchMatches);
  }, []);

  const renderMatchDetailsWithId = (id: number) => {
    return <MatchDetails id={id} />;
  };

  return (
    <>
      {isLoading ? (
        <div className="flex gap-3 w-screen">
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </div>
      ) : (
        <div className="flex gap-4 w-full border-b-2 border-gray-400 pt-6 pb-6 bg-white  overflow-x-scroll">
          {matches.map((match: Match) => (
            <div
              key={match.id}
              className="ml-2 flex-shrink-0 h-40 w-64 p-2 border-2 border-black rounded-md bg-[#F1F6F9]"
            >
              <div className="flex justify-between">
                <h2 className="text-lg font-semibold">{match.sportName}</h2>
                {match.isRunning ? (
                  <span>
                    <span className="animate-ping">🟢</span>Live
                  </span>
                ) : (
                  <span>
                    <span className="animate-pulse">🔴</span>Ended
                  </span>
                )}
              </div>

              <div key={match.endsAt}>
                <div className="overflow-hidden h-8">
                  {" "}
                  <h1 className="font-bold pt-1">
                    {match.name.split("at")[0]}
                  </h1>
                </div>
                <div>{renderMatchDetailsWithId(match.id)}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default MatchList;
