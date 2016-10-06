# Add SSH keys to prod/staging without deploying cloudformation

1. Determine the branch/tag/commit you want to "deploy"
2. SSH into `manager.<environment>.io`
3. `cd` into `resin-containers`
4. Run `git fetch origin` to pull down all changes and references
5. Run `git checkout <branch/tag/commit>`
6. `cd` into cloud_formation/systemd/services
7. Run `sudo fleetctl submit *`. You'll see output about what was added and what was different.
8. For the services you've added and want to run, run `sudo fleetctl start <service>`
