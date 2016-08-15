Exporting the Development Environment
=====================================

This details the `export-devenv` tool, which can be used to easily achieve this, instead of manually hacking around. It can be found in the `resin-containers` repository in `tools/export-devenv`. There is a little more info here than in the tools `README.md`.

# What Is It?

The exported Devenv consists of a VM and a `Vagrantfile` used to drive it. It is essentially an extremely stripped-down `resin-containers` with only the components that are required to actually run the Devenv. It should be noted:

* The VM is essentially a snapshot of a 'freshly started' Devenv, without any of the provisioning files and source requirements
* The exported Devenv still runs the containers that make up our Resin.io service. This means localised versions of thing such as the API, `git` repo, Image Maker, Registry, etc. As such anyone with access to it will be able to enter these containers and look at the special source. We should think long and hard who gets access to this.
* A useful tool for showing the system off and how we could add new devices (self-contained, wipeable environment for doing tutorial workshops for customers, perhaps)
* Access to the builders are still required, and therefore Internet access is required. It would be nice to somehow shoehorn pre-loadeds in here, to remove this


# Running The Tool

The tool needs two arguments:

* Base directory where it will carry out its work, as well as where it will write the final packaged files
* The 'Vagrant friendly' name of the network interface to use as a bridge during processing
* Optionally a name for the bridge NIC used to share network access with
* Optionally a name for the generated Vagrant box

As an example:

    ./export-devenv.coffee -w /Work/tmp/export-dir -b "en0: Wi-Fi (AirPort)"

This will create a working directory (`/Work/tmp/export-dir/working-dir`) and a final packaged directory (`/Work/tmp/export-dir/resin-devenv`).

This packaged directory contains all the files required to run the Devenv as a Vagrant machine elsewhere. Tar up, copy, etc.


# Adding New Images

Currently, only a single target device type is exported. However, this can easily be altered by creating new device types in the `injections/images` directory.

For each new device, create a base version directory for the device (by slug name) along with a `latest` file using that base version. Populate it with a `VERSION`, `VERSION_HOSTOS` and `device-type.json` file relevant to the new device type.

For example:

    images
    |
    +- edison
    |  |
    |  + latest
    |  L 0.0.1
    |    |
    |    + VERSION
    |    + VERSION_HOSTOS
    |    L device-type.json
    |
    +- raspberrypi3
       |
       + latest
       L 0.0.1
         |
         + VERSION
         + VERSION_HOSTOS
         L device-type.json


# Getting Real Devices working

Because the device information loaded into the Devenv doesn't currently include the actual images from the `resin-image-maker` repo, you can currently only use custom built OS images that are pre-loaded onto a device.

You can see how to do this in the 'Using Custom Generated Images' section of the Devices wiki entry [here](https://github.com/resin-io/hq/wiki/Devices).

Note that it's really important to have a way to route any device to the Devenv, which requires the manual configuring of a `config.json` and either a gateway on the subnet the Devenv runs on, or alterations to the image running on devices to route directly to the host machine.

An `import-images` tool is currently being worked on which will allow the full import of OS images into the Devenv (and to pre-load them with changes that will make using the Devenv transparent). This should be available shortly.

# How The Export Works

By taking a virgin 'resin-containers' repo, we can instantiate and provision it, moving it into a state where it can be frozen and be ready to run.

`export-devenv` does this by:

* Cloning and provisioning a 'resin-containers' repo
* Ensuring that the Vagrantfile is modified to allow an exportable Vagrant box
* Removing components from the Devenv that are not required/should not be exported
* Injecting default device type information so that they may be used (currently just RPi3) and dummys for other requirements so the containers may be run
* Removing the shared host/guest FS layer
* Generating a new `fig.yml` to use the new device information
* Exporting the modified VM as a new Vagrant box
* Generating a new `Vagrantfile` for the exported package
* Writing the new files to the target directory

This leaves two files, the Vagrant box and the `Vagrantfile`. These are all that are required to run the Devenv successfully.
