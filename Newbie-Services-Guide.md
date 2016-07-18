A Newbie Guide To Resin.io Services
===================================

This guide is a whistlestop tour of the backend services behind Resin.io system. It's been written by a newbie for newbies, after digging through the code and asking questions of the team.

Its aim is to try and get new engineers up to speed a bit more quickly. As such, it includes a few tips and suggestions to quickly get the Development Environment running, and then some places to look in the code for several services to understand what happens underneath.

There will be bits that are incorrect. I'm trusting in the will of the hivemind to correct it. :)

The following are some influential services (as referenced by `fig.yml`, most repos on Github are prefixed with `resin-`, eg `resin-io/resin-api.git`). Each service is briefly described along with some relevant files inside them (good places to start looking at their operation). Described files are assumed to be within the repo cloned for that service.

# `api` (resin-api.git)

The best place to start is the `api` service, as this provides the endpoints for user interaction with the system. It is responsible for providing access to the user in all forms (UI/SDK/etc), and validating every operation that is requested before it occurs.

The entire system essentially is a framework around `pinejs`, which runs the show.

## `pinejs`

pinejs is essentially the core of the API system. It's a rule parser that takes the SBVR models defining all of the models for the system. These models let it define organised data that is stored in the database (tables in a Postgres DB), as well as accessing this data and ensuring that queries processed adhere to the rules. This includes checking permissions to access data requested.

Here's some excellent Flowdock-based explanation by Ilias (you can see the rest of the thread at https://www.flowdock.com/app/rulemotion/platform/threads/8M2yXFZiax7Sob5JmG_ClT1IA1s):

```
So, very roughly speaking, pine.js is a rules-driven API engine that enables you to define rules in a structured subset of English. Those rules are used in order to generate a database schema and also to generate the associated OData API. Pine.js is a core component of the resin-api.
You can take a look at the following tools:
https://github.com/resin-io-modules/sbvr-compiler
https://github.com/resin-io-modules/odata-compiler
The first one shows the way to use the compile chain from SBVR to SQL query, while the latter shows the way to compiler an OData URL into an SQL query.
You will notice that both tools use some of the main dependencies of pine.js, such as:

* abstract-sql-compiler
* lf-to-abstract-sql
* sbvr-parser
* odata-parser
* odata-to-abstract-sql
The above packages are written in OMeta and compiled into JS. I would recommend to bookmark the following resources in order to get a better understanding:

http://www.tinlizzie.org/~awarth/papers/dls07.pdf (OMeta paper)
http://www.tinlizzie.org/ometa/dls07-slides.pdf (OMeta slides)
http://b-studios.de/ometa-js/ (Intro to OMeta-js)
http://tinlizzie.org/ometa-js/#OMeta_Tutorial (OMeta workspace)
http://codeofrob.com/entries/ometa-odata-odear---polishing-it-off.html

I would also recommend Alexandros' papers:
http://ceur-ws.org/Vol-649/paper7.pdf
http://link.springer.com/chapter/10.1007%2F978-3-642-16289-3_12

From a technical perspective, Page is the guy who can answer everything regarding pine.js, but I will be happy to help as much as I can.

I believe the best way to test the above tools and also start experimenting with pine.js would be to setup your development environment and clone the tools there.
The sbvr lab (http://www.sbvr.co/) is also a good starting point to see some examples of sbvr rules.
Finally, the Open data protocol (http://www.odata.org/) is worth reading, since it constitutes the way we perform the requests to resin-api.
```

Requests coming into pinejs do so as OData (see https://en.wikipedia.org/wiki/Open_Data_Protocol), via the API. The OData is then compiled to SQL queries that are sent to the DB. Data returned from the DB is then translated back into OData and sent out to the caller.

Extra functionality can be added to the models by adding hooks. There are `PREPARSE`, `POSTPARSE` and `POSTRUN` hooks that get called before an incoming request is parsed, after it's been parsed and before the operation that would occur for it is executed.

Some relevant paths:

* `src/models/resin.sbvr` - The SBVR rules for the API. Defines the (and interactions between) apps, devices, users, etc.
* `src/app.coffee` - Shows initialisation and registration of further hooks for models.
* `node_modules/@resin/pinejs/src/server/src/sbvr-api/sbvr-utils.coffee` - Search for `exports.handleODataRequest`. Entrypoint for requests, and a good place to start watching how they're processed.
* `api/src/modules/hooks/index.coffee` - Search for `sbvrUtils.addHook`. Shows how the `PREPARSE`, `POSTPARSE` and `POSTRUN` hooks can be used to augment a request.
* `src/routes/*` - Shows top-level routes for non-model based endpoints.

Important used services:

* `git` - For creating/deleting repos for each user application
* `img` - For getting an initial base image for each new application/device type

# `git` (resin-git.git)

When a user pushes their changes to the resin repo, the `git` service lets all attempts at SSH login succeed (via a custom libnss library and PAM config), and then uses the `api` service to try and get a valid SSH key (the key registered on service signup). If the keys match, it then runs the `git-receive-pack` command against the incoming pack data for that user. It then runs an update hook that kicks the `builder` service into building the new image.

Some relevant paths:

* `src/app.coffee` - Application endpoints called by other services
* `src/bin/shell` - Command called once an SSH authentication has occurred
* `src/hooks/update` - The server-side update hook used to retrieve the newly commit ids and kick off the `builder` service

Important used services:

* `api` - To ensure a user is valid and has correct SSH key
* `builder` - To actually build the new user application

## `builder` (resin-builder.git)

The builder takes freshly pushed changes from the git repo for a users app and then creates the Docker container for that application. Once a build has completed, the 'flow' from a `git push` has ended as far as immediate service calling is concerned. Future actions, such as the download of the application onto a device works via the device being told what it's new state should be (and the new application) when it polls.

 It does this by:

1. Ensuring the user/app are valid
2. Ensuring the architecture type is valid
3. Ensuring there's a valid `Dockerfile` in the pushed repo (generating one first if it finds a `Dockerfile.template` or a `package.json` and no other Dockerfiles)
4. Pulling the previous version of the application from the registry cache (should it exist, checks via previous commit hash of application)
5. Building the new Docker container
6. Pushing the new Docker container to the registry
7. Cleaning up old images

Some relevant paths:

* `app.coffee` - Actual build service
* `project-types/*` - Selection of different ways of acquiring the Dockerfile required (including generating one for `Dockerfile.template` and `package.json` files)

Important used services:

* `api` - To retrieve application data (user validity, etc.)
* `image` - To ensure architecture is valid
* `registry{/2}` - To pull previously/push new cached version of the application

# `registry{/2}` (resin-registry{2}.git)

The registry stores versions of user applications. This is carried out storage-wise by S3 buckets (AWS based).

It essentially runs a private Docker registry using the `docker-registry` script (in `registry` this is a deprecated Python script, in `registry2` it's... compiled Go?), pointing storage to our S3 buckets.

The Docker docs provide a good rundown of how you can run your own registry [here]( https://docs.docker.com/registry/deploying/).

# `img` (resin-image-maker.git)

The image-maker is responsible for the creation of the base image for devices. The `/images` directory should contains sub-directories listing all the current known device types. The contents is compiled so that when a new image is requested (eg. `/v1/image/raspberry-pi3`), the types can be tested against to verify its existence.

**Note**: The `image-maker` used in the Devenv is cut-down version, as the full-fat repo has every base image for all architectures included with it. The branch for this is `master-slim`. A JSON file provides information required for a particular device types image. The 'DEVELOPMENT' Envvar allows simluation of images that don't actually exist, by downloading a config file from https://api.resinstaging.io).

Some relevant paths:

* `src/app.coffee` - Endpoint definition.
* `src/make.coffee` - Generation of images.
* `src/storage.coffee` - Retrieval of image information for device types.