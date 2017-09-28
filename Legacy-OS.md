Notes on legacy resinOS versions, and how to use them. Partly for historical reasons, partly because we'll still have to work with them for a while and it's good to know how to do that.

## Early resinOS versions

There was [a discussion](https://www.flowdock.com/app/rulemotion/r-resinos/threads/m8UFn40WueuiNVxiC--Y_zuwqco) on how to get as early resinOS images. The nutshell is:

*   The images are contained in the `resin/resin-img` containers.
*   Login to docker with `resindev` user (password is [here](https://github.com/resin-io/resin-containers/blob/7a78d4ffcdc0011147288f90431204fbc4e430da/cloud_formation/systemd/services/docker_login.service#L11)), and then you can just `docker pull resin/resin-img`
*   The tags of the image correspond to commits on [resin-image-maker](https://github.com/resin-io/resin-image-maker/), that the tags are shortened versions of the commit SHA for specific commits (not all commits, not all shortened, not all shortened the same way...)
*   These files are huge in general! Not all commits contain resinOS images. [This spreadsheet](https://docs.google.com/a/resin.io/spreadsheets/d/1AGseXOAGpQfI9t4jXg_wD_a4knaocf1d8ZdCKquIVeg/edit?usp=sharing) is started to keep track of the commit SHA / docker image tags and the resinOS / supervisor version they contain. It's not a work in progress. To use, pick a supervisor version, and use the "docker image tag" column to pull that particular version.
*   Get the resinOS image file out of the image by:
    *   run the container as:
    ```
    docker run -it --rm resin/resin-img:020b3f bash
    ```
    and find the image file's location (e.g `/usr/src/app/raspberry-pi/resin.img`), then copy it out with:
    ```
    docker cp <CONTAINERID>:/usr/src/app/raspberry-pi/resin.img
    ```

### 1.0.0-pre and init scripts

ResinOS releases up to supervisor version `0.0.12` seem to be running init scripts (for exmple `resin/resin-img:c20782` has `0.0.12`).

Setup notes:

*   root partition
    *   `/etc/openvpn/client.conf` such that the correct VPN address is included. For example for staging:
        ```
        client
        remote vpn.resinstaging.io 443
        resolv-retry infinite

        remote-cert-tls server
        ca /etc/openvpn/ca.crt
        auth-user-pass /var/volatile/vpnfile
        auth-retry nointeract

        comp-lzo
        dev tun
        proto tcp
        nobind

        persist-key
        persist-tun
        verb 3
        ```
    *   replace `/etc/resin.conf` with a file that has the correct `API_ENDPOINT` and `REGISTRY_ENDPOINT` values (besides the tokens). For example, for staging:
        ```
        API_ENDPOINT=https://api.resinstaging.io
        CONFIG_PATH=/mnt/data-disk/config.json
        REGISTRY_ENDPOINT=registry.resinstaging.io
        PUBNUB_SUBSCRIBE_KEY=sub-c-bbc12eba-ce4a-11e3-9782-02ee2ddab7fe
        PUBNUB_PUBLISH_KEY=pub-c-6cbce8db-bfd1-4fdf-a8c8-53671ae2b226
        MIXPANEL_TOKEN=cb974f32bab01ecc1171937026774b18
        LISTEN_PORT=48484
        ```
*   `config.json` file:
    The required items in the config are: `applicationId`, `apiKey`, `userId`, `username`, `deviceType`, `files`. All of these you can get from a generated `config.json`, e.g. downloading it from the dashboard (select the oldest available resinOS version in the download modal, if you do that!)

    Make sure that in the connman config (`network/settings` section), the `[global]` block has `TimeUpdates=manual` removed. This version of resinOS relies on connman to get NTP update, while newer versions use systemd and block connman doing that. Failure of removing that section will result in an inability to provision (due to wrong time blocking https connection).

    Here's a full example, using Ethernet:

    ```json
    {
      "applicationId": 21945,
      "apiKey": "zRzCYrFjBJMEx3RqeFxH734dcYjGtWPP",
      "userId": 285,
      "username": "imrehg",
      "deviceType": "raspberry-pi",
      "files": {
        "network/settings": "[global]\nOfflineMode=false\n\n[WiFi]\nEnable=true\nTethering=false\n\n[Wired]\nEnable=true\nTethering=false\n\n[Bluetooth]\nEnable=true\nTethering=false",
        "network/network.config": "[service_home_ethernet]\nType = ethernet\nNameservers = 8.8.8.8,8.8.4.4"
      }
    }
    ```

    Not sure if required, but you can minify this file by:

    ```
    jq -c .  < input.config.json > config.json
    ```

    Then you have to copy the configuration to the into the raw `mmcblk0p5` partition on the SD card (as root):

    ```
    cat config.json > /dev/mmcblk0p5
    ```

    After this, the device should boot up and provision correctly.

### 1.0.0-pre and systemd

ResinOS releases with supervisor `0.0.14` and newer seem to be running systemd. (instructions incoming)


### Built images

The earliest images that can be rebuilt seem to be resinOS `1.1.4`, from [`meta-resin`](https://github.com/resin-os/meta-resin) (instructions incoming).


## Historical notes on resinOS versions

There are a number of differences between resinOS versions, and it is crucial to extract them from Changelogs and code, otherwise it's impossible to create a hostOS updater that can account for all the transitions and settings between them. Adding notes here on the differences found

### BBB

#### BBB RootFS name

Finding the root device with `findmnt -n --raw --evaluate --output=source /`, the results are like:

* 1.26.0: `/dev/mmcblk1p2`
* 2.x (tested up to 2.4.2+rev1): `/dev/disk/by-partuuid/93956da0-02` (the other parts are `01`, ...)