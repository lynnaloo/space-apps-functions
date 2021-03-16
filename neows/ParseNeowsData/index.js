module.exports = async function (context, req) {
    if (req && req.body) {
        const asteroidCount = req.body.element_count || 0;
        const asteroidData = req.body.near_earth_objects || {};

        // near_earth_objects is an object and shouldn't be
        const asteroids = asteroidData[Object.keys(asteroidData)[0]];

        // close approach data is an array and shouldn't be
        asteroids.forEach(function (value, index) {
          value.close_approach_data = value.close_approach_data[0];
        })
    
        context.res = {
          body: {
            element_count: asteroidCount,
            near_earth_objects: asteroids
          }
        };
        context.done();
      }
    
      context.res = {
        body: {}
      };
    
      context.done();
};