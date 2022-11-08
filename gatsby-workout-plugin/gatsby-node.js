const axios = require("axios");
exports.onPreInit = () => console.log("Loaded gatsby-workout-plugin");

// constants for your GraphQL Post and Author types
const POST_NODE_TYPE = `Workout`;

exports.sourceNodes = async (
  { actions, createContentDigest, createNodeId },
  pluginOptions
) => {
  const { createNode } = actions;
  const { apiKey, apiToken, userId, mapId } = pluginOptions;

  const getWorkouts = (nextHref) => {
    var options = {
      method: "GET",
      url: nextHref
        ? `https://uarun-mobile.api.ua.com${nextHref}`
        : "https://uarun-mobile.api.ua.com/v7.2/workout",
      params: { order_by: "-start_datetime", user: userId },
      headers: {
        "api-key": apiKey,
        accept: "application/json, application/hal+json",
        "accept-language": "en-MA;q=1, ar-MA;q=0.9, fr-MA;q=0.8",
        authorization: `Bearer ${apiToken}`,
      },
    };
    axios
      .request(options)
      .then(function (response) {
        response.data._embedded.workouts.forEach(
          (
            { _links, aggregates, name, reference_key, start_datetime },
            node
          ) => {
            console.log(node);
            const workout = {
              workoutId: _links.self[0].id,
              aggregates,
              name,
              reference_key,
              routeId: _links.route[0].id,
              start_datetime,
              mapImage: `https://drzetlglcbfx.cloudfront.net/routes/thumbnail/${_links.route[0].id}/${mapId}?size=600x400`,
            };
            createNode({
              ...workout,
              id: createNodeId(`${POST_NODE_TYPE}-${_links.self[0].id}`),
              parent: null,
              children: [],
              internal: {
                type: POST_NODE_TYPE,
                contentDigest: createContentDigest(workout),
              },
            });
          }
        );
        if (response.data._links.next[0]) {
          getWorkouts(response.data._links.next[0].href);
        }
      })
      .catch(function (error) {
        console.error(error);
      })
      .finally(function () {
        // setLoading(false);
      });
  };
  getWorkouts();

  return;
};
