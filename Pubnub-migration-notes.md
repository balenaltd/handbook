Collection of some operational notes on Pubnub supervisor migration

## Metadata tag for the supervisor version

* To be able to update the supervisor, the new release will need a different docker tag, such as `vX.Y.Z_logger` or some other value than `_logger`. The supervisor with that tag needs to be released on the API
* The supervisor version could also be updated to make it clear for us which devices are running the new supervisor and which are not: `X.Y.Z+logger` in this case, or some other value than `+logger`. This will show up as `supervisor_version` for the device the API, and displayed in the UI.

These two are independent from each other, and only the first is a strict requirement, the second is helpful operationally if not too confusing for the users.

What label should we use? `logger` or something more neutral?

## Devices with broken `update-resin-supervisor`

Devices with `>=2.0.8 || <2.7.0` resinOS have broken `update-resin-supervisor` script. In that case the the script will just stop early, and not even trying any update:

```
Getting image name and tag...
jq: error (at <stdin>:0): Cannot index string with string "d"
No supervisor configuration found from API. Using arguments for image and tag.
Set based on arguments image=resin/amd64-supervisor and tag=v6.1.3.
Getting image id...
Supervisor resin/amd64-supervisor:v6.1.3 already downloaded.
```

Thus it would likely be safe to update the supervisor in the API, and then independently patch the script on the devices to be able to update.

## Images/data to replace on the backend

* remove old supervisors from the API (can only do delete when all devices set to that supervisor are removed)
* resinOS images (S3 / DockerHub) replaced with images having the new supervisor in there (as well as new version in the default `supervisor.conf`
