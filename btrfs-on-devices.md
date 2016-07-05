# BTRFS

__NOTE:__ Below I refer to `/var/lib/docker` and the `docker` command. If you
are using an older device which uses the 'rce' (resin container engine) alias,
translate these to `/var/lib/rce` and `rce`. You can find out very easily by
simply running `docker` and `rce` - if the former works you have a modern device
which uses docker direct, if the latter works you have an older device so need
to translate the commands to reference rce, and if neither work you're in
serious trouble :)

## Checking Disk Space Usage

Free space is difficult to determine correctly in btrfs due to nature of how
it is architected.

The [btrfs faq][faq-free-space] goes into a lot of detail, but in short, for
btrfs 3.18 and beyond (this seems to be tied to kernel version 3.18 and later),
the appropriate tool to use to determine free space is `btrfs fi usage <mount>`.

BTRFS is always mounted at `/var/lib/docker`, so this is a good mount to use as
a parameter to the `btrfs` tool.

Let's take a look at some sample output:

```
root@raspberrypi3:~# btrfs fi usage /var/lib/docker
Overall:
 Device size: 14.42GiB
 Device allocated: 2.59GiB
 Device unallocated: 11.82GiB
 Device missing: 0.00B
 Used: 1.10GiB
 Free (estimated): 13.14GiB (min: 7.23GiB)
 Data ratio: 1.00
 Metadata ratio: 2.00
 Global reserve: 32.00MiB (used: 0.00B)
Data,single: Size:2.23GiB, Used:932.32MiB
 /dev/mmcblk0p6 2.23GiB
Metadata,DUP: Size:179.19MiB, Used:98.52MiB
 /dev/mmcblk0p6 358.38MiB
System,DUP: Size:8.00MiB, Used:16.00KiB
 /dev/mmcblk0p6 16.00MiB
Unallocated:
 /dev/mmcblk0p6 11.82GiB
```

The value to look at here is `min: 7.23GiB` - this is all that can be
_guaranteed_ to actually be available.

Note that btrfs pre-allocates disk space and allocates more as needed, so `df`
will provide misleading information. `btrfs fi usage` takes this into account.

### Pre-3.18

In a pinch on a pre-3.18 system, you can _roughly_ determine minimum free space
by running `btrfs fi show /var/lib/docker`, subtracting used from size, then
running `btrfs fi df /var/lib/docker`, and subtracting Data, single used from
total, summing the two numbers and dividing that result by 2.

## Clearing Down Space

Firstly it's useful to determine what kind of situation the device is in -
out of space errors will be reported as `No space left on device`, but
__importantly__, so will out of metadata errors.

To determine which situation you have - check available free space as described
above - if it is at or close to 0 then it's a genuine out of space, otherwise it
is out of metadata space.

Generally it seems that metadata usage of 75% or above is problematic. See the
`Metadata,DUP` line in the `btrfs fi usage /var/lib/docker` or `btrfs fi df
/var/lib/docker` output to chec kthis.

### Fixing the Inability to Delete Files

Regardless of the case you are faced with, you may find the system is so broken
you are unable to even delete files.

To workaround the issue, you can create a block of space on the tmpfs device
(i.e. RAM-backed storage) and use btrfs's ability to add capacity to a device
live:

```bash
# Add extra (temporary) space to btrfs
dd if=/dev/zero of=/tmp/btrfs bs=1M count=100
loopdev=$(losetup -v -f --show /tmp/btrfs)
btrfs device add $loopdev /var/lib/docker
```

Once you've performed the steps detailed below to free space, you can remove
this temporary addition via:

```bash
btrfs device delete $loopdev /var/lib/docker
btrfs balance start -v -dusage=1 /var/lib/docker
losetup -D
rm /tmp/btrfs
```

### Clearing Down Space

Firstly, make sure the user is ok with the application not running briefly. In
many cases the out of space issue will actually prevent proper operation of the
application so this won't be necessary, but otherwise do ensure you have
permission.

A good first step is to check whether the user's `/data` directory is taking up
undue space, to see combined usage of all apps and the supervisor sqlite
database run:

```bash
du -hs /mnt/data/resin-data
```

If there is serious space usage here, talk to the user about this as they will
need to authorise removal of any data here.

Next, check whether the supervisor is currently running. This may interfere with
removing images/containers and start them up again while you are trying to
delete things:

```
docker ps                                    # Shows whether it's running.
docker stop resin_supervisor                 # Stop the supervisor.
systemctl stop update-resin-supervisor.timer # Prevent a timer event from restarting it.
```

Next, run `docker images --all` to get a list of all images on the
system. Remove the users' images via `docker rmi`, once the supervisor is
running again it'll update them.

Additionally, run `docker ps --all` to see if there are any stale containers
left hanging around, and delete those too, via `docker rm --volumes`.

### Removing Orphaned Subvolumes

At this point you should have cleared up a decent amount of space. However,
there is an issue, in particular for supervisor versions prior to v1.3, whereby
btrfs subvolumes are present which are not used by docker (this can occur from
improper cleanup from an old container.)

To see whether any exist, run the following:

```bash
btrfs subvolume list /var/lib/docker/btrfs/subvolumes | awk '{print $9}' | sed 's|docker/btrfs/subvolumes/||' | grep -v init | sort -u
```

Store this list - it's a list of all possibly docker btrfs subvolumes on the device.

```bash
(docker ps -a --no-trunc | tail -n+2 | awk '{print $1}'; docker images -a --no-trunc | tail -n+2 | awk '{print $3}') | sort -u
```

Also store this list - this is the list of unique subvolumes used by docker.


Compare the two lists - if there are entries in the former list that are not in the latter list, then these are orphaned and ought to be removed.

To remove orphaned subvolumes run the below for each `<id>` discovered above:

```bash
btrfs subvolume delete -C /var/lib/docker/btrfs/subvolumes/<id>
```

## Getting Back to Normal

Finally, you can get the device back to normal by simply restarting it.

If this is not appropriate, you can start the resin supervisor up again by
running `systemctl start resin-supervisor.service`. In this case, if you stopped
the `update-resin-supervisor` timer above, start it again via `systemctl start
update-resin-supervisor.timer`.


[faq-free-space]:https://btrfs.wiki.kernel.org/index.php/FAQ#How_much_free_space_do_I_have.3F