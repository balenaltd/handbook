As part of moving towards fully Open Sourcing the Resin codebase, there are currently a few checklist items that need to be worked through to ensure a repository is ready:

* Opening up repository
  - Check security/business implications with Petros/Alex
  - Code Audit git & code
    * Include commit comments
    * Include code comments (e.g. builder comment)
    * Include history: **Note:** You will have to trawl the history to make sure there is nothing sensitive in it. If in doubt, ask.
    * Include issues: **Note:** Again, trawl the issue history to make sure there is nothing sensitive in it.
    * Ensure a relevant licence (Apache 2.0) exists
* Make it easy to contribute
  - Add docs and markdown files
  - Create brand and landing page
  - Announce new project

Security and business are a big part of this focus. We should not release anything that has any implications for Resin going forward. Ensure that you make a PR on the repo for OSSing and get that reviewed by several engineers, including at least two Seniors, before a merge to allow OSSing to proceed.
