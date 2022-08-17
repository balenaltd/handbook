# Hardware Process

This page documents the Hardware Process that you will use when working on a project that involves some kind of physical hardware - PCB, 3D design, assembly, etc.

## GitHub repo
Each repo that is part of the `hardware process` will have - 
1. A `repo.yml` file in the root of the repo, with the `type` field set to `hardware` and `release` field set to `github`. See example [here](https://github.com/balena-io/RPi-CM3-Heatsink/blob/master/repo.yml)
2. You should have the following files and folders in your repo 
```
├── README.md
├── outputs
├── repo.yml
├── source
│   └── specification
│       └── spec.json
└── testing
    └── Testing.md

```
You can read more about the purpose of each file and folder here (WIP)