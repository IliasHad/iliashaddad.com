import React from "react";
import Layout from "../components/layout";
import { StaticQuery, graphql } from "gatsby";
import { formatRelative, formatDistanceToNow } from "date-fns";

function AboutPage() {
  return (
    <Layout>
      <section className="p-12 blog-page">
        <div className=" w-2/4 ">
          <h5 className="text-3xl font-bold">Cycling</h5>
        </div>
        <div className="grid  grid-cols-1 md:grid-cols-2  py-4">
          <p className="w-full">I like to share my cycling journey</p>
        </div>
        <StaticQuery
          query={graphql`
            {
              allWorkout {
                nodes {
                  workoutId
                  reference_key
                  aggregates {
                    speed_max
                    active_time_total
                    distance_total
                  }
                  routeId
                  start_datetime
                  name
                  mapImage
                }
              }
            }
          `}
          render={({ allWorkout }) => (
            <div className="mt-12 max-w-lg mx-auto grid gap-12 lg:grid-cols-3 lg:max-w-none">
              {allWorkout.nodes.map((workout) => (
                <div
                  key={workout.reference_key}
                  className="flex bg-stone pb-4 flex-col rounded-lg shadow-lg overflow-hidden "
                >
                  <div className="group relative block w-full aspect-w-10 aspect-h-7  bg-gray-100 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500 overflow-hidden">
                    <img
                      src={workout.mapImage}
                      alt={workout.name}
                      className="object-cover pointer-events-none group-hover:opacity-75"
                    />

                    <div className="absolute bottom-0 h-full w-full  bg-gradient mix-blend-multiply" />

                    <div className="flex  text-white absolute bottom-0 w-full px-4 py-3 gap-4 items-center justify-center">
                      <div className="flex flex-col items-center gap-2">
                        <span className="font-bold">Max. speed</span>{" "}
                        {workout.aggregates.speed_max.toFixed(1)} KM
                      </div>
                      <div className="flex flex-col  items-center gap-2">
                        <span className="font-bold">Active time</span>{" "}
                        {new Date(workout.aggregates.active_time_total * 1000)
                          .toISOString()
                          .slice(11, 19)}
                      </div>
                      <div className="flex flex-col  items-center gap-2">
                        <span className="font-bold">Distance total</span>{" "}
                        {(workout.aggregates.distance_total / 1000).toFixed(1)}{" "}
                        KM
                      </div>
                    </div>
                  </div>
                  <h2 className="mt-4 text-center text-lg   px-4 block  font-medium text-white truncate pointer-events-none">
                    {workout.name}
                    <div className="mt-4">
                      {formatRelative(
                        new Date(workout.start_datetime),
                        new Date()
                      )}{" "}
                      ({formatDistanceToNow(new Date(workout.start_datetime))})
                    </div>
                  </h2>
                </div>
              ))}
            </div>
          )}
        />
      </section>
    </Layout>
  );
}

export default AboutPage;
