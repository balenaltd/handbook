## Add SSH keys to prod/staging without deploying cloudformation

1. Determine the branch/tag/commit you want to "deploy"
2. SSH into `manager.<environment>.io`
3. `cd` into `resin-containers`
4. Run `git fetch origin` to pull down all changes and references
5. Run `git checkout <branch/tag/commit>`
6. `cd` into cloud_formation/systemd/services
7. Run `sudo fleetctl submit *`. You'll see output about what was added and what was different.
8. For the services you've added and want to run, run `sudo fleetctl start <service>`

## Update a CloudFormation template variable

1. Edit the CloudFormation template in the AWS console, but don't upload a new template.
2. Change the value of the variable you want to update
3. Click through to the confirmation page
4. Wait for AWS to predict the changes that will occur, and confirm that the only 2 are related to the manager
5. Accept. AWS will restart the manager of the cluster
6. SSH in to manager.resinstaging.io (or the appropriate host) and confirm that the key is set correctly. It may take a few minutes to show up.
