import axios from "axios";


export const getWorkouts = (nextHref) => {
    console.log(process.env)
    var options = {
        method: "GET",
        url: nextHref
            ? `https://uarun-mobile.api.ua.com${nextHref}`
            : "https://uarun-mobile.api.ua.com/v7.2/workout",
        params: { order_by: "-start_datetime", user: process.env.WORKOUT_USER_ID },
        headers: {
            "api-key": process.env.WORKOUT_API_KEY,
            accept: "application/json, application/hal+json",
            "accept-language": "en-MA;q=1, ar-MA;q=0.9, fr-MA;q=0.8",
            authorization: `Bearer ${process.env.WORKOUT_API_TOKEN}`,
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
                        mapImage: `https://drzetlglcbfx.cloudfront.net/routes/thumbnail/${_links.route[0].id}/${process.env.WORKOUT_MAP_ID}?size=600x400`,
                    };
                    return workout;
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
