# Standard Sales Demo

**NEEDS UPDATING**

## Table of Contents:
* [Environment overview](#overview)
* Environments
 * [Seattle](#seattle)
 * [London](#london)
 * [Athens](#athens)
 * [Global/combined](#combined)
* [Project code](#project-code)
* [Demo script](#demo)

## Environment
### Overview
There are currently two demo environments, one in Seattle and one in London.  A third will be online in Athens soon.

Each environment contains a "microBeast" tile consisting of 6 Raspberry Pi 3s with Adafruit 320x240 TFT LCD displays attached.  A Nest camera is in each location, pointed at the Beast tile and streaming the video online.

Each environment is typically within its own application, though the environments can be combined together to make a single application with devices in all locations managed in one place.  (See under "Combined" below.)

NB: The Nest cameras have a nasty habit of freezing while streaming (while still showing a "LIVE" icon falsely indicating that they are streaming).  You might want to refresh the page in the browser with the camera right before pushing new code.
Access

In order to push code to any of these applications, you must be added as a collaborator to the application.  Contact [ronald@resin.io](mailto:ronald@resin.io), [bryan@resin.io](mailto:bryan@resin.io), or [gergely@resin.io](mailto:gergely@resin.io) to be added as a collaborator.

A calendar is available for each environment and should be checked before using or modifying any of the environments.  If you plan to use any/all of the environments, please mark it on the appropriate calendar(s).  Contact [ronald@resin.io](mailto:ronald@resin.io) to be added to the calendars.

### Environments
#### Seattle
* Nest camera URL: [https://video.nest.com/live/yCZmOyvz1e](https://video.nest.com/live/yCZmOyvz1e)
* Application: [microBeastSeattle](https://dashboard.resin.io/apps/116732)

#### London
* Nest camera URL: [https://video.nest.com/live/wYUOUK](https://video.nest.com/live/wYUOUK)
* Application: [microBeastLondon](https://dashboard.resin.io/apps/114299)

#### Athens
* Nest camera URL: TODO
* Application: TODO

#### Combined
* Nest camera URL: N/A (you will need to open all the cameras)
* Application: [microBeastGlobal](https://dashboard.resin.io/apps/130151)

There is a set of scripts that is used to combine the devices from the different regional environments into a single "microBeastGlobal" project.  The project should be cloned from GitHub: [https://github.com/resin-io-playground/manage_beasts](https://github.com/resin-io-playground/manage_beasts)

Once you have cloned this project, you can use these scripts to combine the various devices into the microBeastGlobal application or split them up into their regional applications, like so:

NB: On certain browsers, including Chrome, you may see this message when attempting to obtain the video feed: "No compatible source was found for this media." You need to make an exception for the Nest cam: 
Settings->Advanced Settings->Privacy->Content Settings->Flash->Manage Exceptions. 
Then add the exception [*.]nest.com

```
# combine the devices into one global application:
./combine.sh
```

```
# split the devices back up:
./split.sh
```

### Project code
All the regional applications as well as the global application use the same code, which is available on GitHub here: [https://github.com/resin-io-playground/multiBeast](https://github.com/resin-io-playground/multiBeast)

To use this, you will need to:
1. Clone the project:
`git clone https://github.com/resin-io-playground/multiBeast`
2. Copy it once for each environment:
`cp --recursive beast microbeastSeattle`
`cp --recursive beast microbeastLondon`
`cp --recursive beast microbeastAthens`
`cp --recursive beast microbeastGlobal`
3. Copy the resin endpoint (top right of each application page) and run that command in the proper directory for each application.
![git remote location](https://github.com/resin-io/hq/blob/master/images/git-remote.png)
  
I.e. you should:
```
cd microbeastSeattle
```
then go to the Seattle application in the dashboard and copy the git remote line from that page and run it.
  
Then
```
cd microbeastLondon
```
and go to the London application in the dashboard and do the same.  Be sure to get the right page in the dashboard for each project.


### Flashing devices
If you need to reflash a device, it's best practice to log into the admin account ("unicorn") and download ResinOS from the page under that account.  This ensures that all the devices are owned by the same account.


## Demo
### Set the stage
First show the devices and dashboard.  Explain that these devices are Raspberry Pis with displays attached running a simple application to display an image.  (Similar to a digital signage application.)  Each device has a corresponding entry in the dashboard for monitoring and management.

The code is divided into two services: a **frontend** service and a **backend** service.  These are then defined and linked together in the `docker-compose.yml` file.

The backend service runs a webserver and holds one or more images that can be fetched for display.  It does not actually display anything or take any action when a request is not being made to the webserver.

The frontend service contains a script that downloads an image from the backend every five seconds and then displays it on the device's display.  This container is marked as privileged in `docker-compose.yml` so that it has access to the raw hardware.

### The code
Next show the code of the application.  If the audience is experienced with Docker or wants to know more detail about how Dockerfiles work, it is worthwhile to show the Dockerfile for the services.  It's a very short file and can help allay some fears that working with a resin.io managed device will be much more difficult than working with devices in a datacenter.

It's important to make clear that while the "application" involved in this demo is a very simple shell script, this process is identical for any code.  Any language or runtime that works in Linux can be used here.  (C/C++, Java, Go, Python… even assembly if people want it.)  Resin.io is agnostic about what is deployed through our service and adds no special library or runtime requirements to applications.

### Making a change
First go to Google Images (or similar) and find an image that the prospect would like to use.  (This can be basically any image type and you do not need to do any sort of conversion.)  Letting them pick the image reinforces that this is real and not a pre-canned demo.

Click the image so that it is loaded and then right-click and save it.  Convert it to a PNG file if necessary and save the it as "image.png" in the "images" directory inside the backend service of the project you are using.

### Add to git
Now you will add the changes you just made to source control.  There are several ways to do this, but the most straightforward in my opinion is:
`git add .`
`git commit -m'changed an image'`

The first line adds all changed or new files to the list of files to be pushed.  The second commits those changes and adds a commit log message (which is required -- this is the part inside the quotes).

### Push to resin.io
Finally, push the new code to resin.io:
```
git push resin master
```
This will push your local 'master' code branch to resin.io.

NB: If you get an error message telling you that there is a conflict, **don't panic**!  It just means someone else has pushed code and you haven't synced up with them, which we really don't care about.  Just do:
```
git push resin master --force
```

Once you push the code, resin.io will receive the push and build an image, wrap it in a Docker container, and put it in our Docker registry (which is where devices will be able to access it).

When the build finishes, you will see a unicorn in the terminal and the devices in the dashboard should almost immediately move from "Online" to "Downloading".  A minute or two later your new image will be on the devices.

Note that since you have updated only the backend container, the frontend will not be updated or restarted.  You can illustrate this by showing the supervisor device logs in the dashboard: only the backend container will have "downloading", "killing", and "starting" events listed.