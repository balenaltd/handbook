Frontend
========

Ensuring the Frontend can be installed from source and run involves an extra step to that of most of the other services (namely Bower installation).

You'll need to have your public/private keypair installed in the DevEnv to ensure it will check these components out (see the 'Developing Inside Vagrant' section of [this](https://github.com/resin-io/hq/wiki/Setting-up-the-Development-Environment) page).

Make the relevant change to `fig.yml` by uncommenting the `# - ./src/ui/:/usr/src/app/` line in the `ui` section, then setup the Frontend in the following way:

    cd src
    git clone https://github.com/resin-io/resin-ui.git ui
    cd ui
    npm install && bower install
    fig kill ui && fig rm -f ui && fig up -d ui

Installing the `node_modules` and `bower` will take some time. You will have to hang around for the `bower` install though, as it will ask to confirm the authenticity of bitbucket.