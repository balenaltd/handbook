Once code has been pushed to a new branch for a component, and you're confident it's a potential candidate for merging to the `master` branch, it needs to go into review state as a Pull Request.

To do this:

1. Navigate to the Github repo for the component you've altered
2. Select the branch you've pushed to the component, via the `Branch:` drop-down above the source file index (it defaults to `master`)
3. When you've selected the appropriate branch, click the 'New pull request' button
4. You'll be asked for a title for the new PR, if the first line of the commit message for the changes is a short, snappy title (which it should be), then you can just use that. Else ensure that it's something which is obvious when the list of PRs is browsed
5. By default, if left, an automatic message will eventually be raised to ask one of the admins to review the changes. Far better is to pick a number of reviewers to start with. How many you pick depends on the type of changes. Very small changes (for example renaming vars, non-risky fixes) probably only need one reviewer. However anything more substantial will most likely require at least two. To pick a reviewer, click on the little gear icon next to the `Assignees` section in the right-hand panel of the PR, and select as many reviewers as you require. It's a good idea to pick reviewers who know the component!
6. Select the little gear icon next to the 'Labels' section in the right-hand panel of the PR, and select `flow/in-review`. This ensures that anyone looking at it understands that it's currently in review
7. Reviewers will comment on the code. Respond to each comment individually, as opposed to responding to all comments in one big comment
8. If the review requires code changes, set the label for the PR to `flow/in-progress` and return to make the code changes required on the branch, following the [commit](https://github.com/resin-io/hq/wiki/Commit-Guidelines-&-Issues) guidelines
9. Return to step `6.` and continue in the loop until reviewers make the comment `LGTM` (Looks Good To Me) or `SGTM` (Sounds Good To Me, which Pepe will write)
10. If the changes are for an issue (which should be referenced in the initial push), then you most probably want to add a final comment `Fixes #<issueNumber>` or the like (see [here](https://help.github.com/articles/closing-issues-via-commit-messages/) for a list of all suitable phrases). This ensures that the issue is automatically closed.
11. Finally if all is well, the reviewers are happy and the Jenkins status is green across the board, hit the 'Merge pull request' button at the bottom of the PR
12. You should see a 'Pull request successfully merged and closed' message appear. **IMPORTANT:** At this point, it is most probably worth you deleting the branch you used to carry out the work on. Leaving branches hanging around clutters up the list for new PRs, and isn't desirable. Unless there's a good reason for doing so, delete the branch

Labels may well update automatically from this point on, as PRs go through the route of being first deployed onto staging and then finally to production.

# If The Worst Should Happen...

Should things go horribly wrong post-merge, and it becomes obvious something to do with the changes has caused knock-on effects, then you still have the ability to revert the changes from the branch.

1. Go back to the PR that made the changes and find the comment at the bottom of the PR confirming the merge
2. There will be a 'Revert' button next to it. As long as no changes have been made after the merge which affects files for it, you should be able to easily revert
3. Start the whole process again (this may be easy, this may be hard)