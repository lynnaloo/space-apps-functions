module.exports = async function (context, req) {
    context.log('ParseCrewData processed a request');

    if (req && req.body) {
      const crew = req.body.docs || [];
      const filteredCrew = [];

      crew.forEach((member) => {
        const filteredLaunches = [];
        member.launches.forEach((launch) => {
          filteredLaunches.push({
            "patch": launch.links.patch.large,
            "webcast": launch.links.webcast,
            "details": launch.details,
            "failures": [],
            "flight_number": launch.flight_number,
            "launch_name": launch.name,
            "launch_date": launch.date_utc,
            "failures": launch.failures ? launch.failures.length : 0,
            "payloads": launch.payloads
          });
        });

        filteredCrew.push({
          "name": member.name,
          "agency": member.agency,
          "image": member.image,
          "wikipedia": member.wikipedia,
          "status": member.status,
          "launches": filteredLaunches
        });
      });

      context.res = {
          body: {
            crew: filteredCrew
          }
      };
      context.done();
    }

    context.res = {
        body: {}
    };
}
