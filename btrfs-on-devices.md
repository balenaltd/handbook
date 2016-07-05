## Checking Disk Space Usage

Free space is difficult to determine correctly in btrfs due to nature of how
it is architected.

The [btrfs faq][faq-free-space] goes into a lot of detail, but in short, for
btrfs 3.18 and beyond (this seems to be tied to kernel version 3.18 and later),
the appropriate tool to use to determine free space is `btrfs fi usage <mount>`.

BTRFS is always mounted at `/var/lib/docker` (or for older devices,
`/var/lib/rce`), so this is a good mount to use as a parameter to the `btrfs`
tool.

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

[faq-free-space]:https://btrfs.wiki.kernel.org/index.php/FAQ#How_much_free_space_do_I_have.3F