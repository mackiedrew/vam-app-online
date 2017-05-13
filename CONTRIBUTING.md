# Contributing to vam-online

Thanks for actually checking the contribution guide! I hope it helps get you on board.

**What does "contributing" mean?**

Creating an issue is the simplest form of contributing to a project. But there are many ways to contribute, including the following:

- Updating or correcting documentation
- Feature requests
- Bug reports

If you'd like to learn more about contributing in general, the [Guide to Idiomatic Contributing](https://github.com/jonschlinkert/idiomatic-contributing) has a lot of useful information.

## Issues

### Before creating an issue

Check to make sure the issue doesn't exist already in the [issues](https://github.com/mackiedrew/vam-online/issues) list.

Make sure if you are making an issue it is about the `master` branch. If it is related to a branch then you are almost certainly better off making a comment inside the pull request.

### Creating an issue

When creating an issue, follow the template provided by the issue template automatically added when you start a new issue. Try to be as descriptive as possible.

You should remember to utilize the organizational tools on GitHub and if appropriate, set the following:

- Labels
- Assignment
- Project
- Milestone

## Commits

Commit messages are only important when merging into `master` but keeping good practice everywhere can help personally enforce good practices. General commit writing guidelines can be found [here](https://robots.thoughtbot.com/5-useful-tips-for-a-better-commit-messages). 

However, in addition we use a new kind of commit system which makes use of markdown-style emoji called [Gitmoji](https://gitmoji.carloscuesta.me/).

Some basic formatting rules:
- Start commit message with a [Gitmoji](https://gitmoji.carloscuesta.me/)
- Follow with a descriptive title with no more than 50 characters including Gitmoji.
- Do not end title with a period
- Skip a line before writing the body
- Include changes summarized in the body considering the question of **why** and not **how**.
- You can also refer to an issue by using `Issue: #132` in the body

### Example Commit Formatting

```
:emoji: The title should be no longer than 50

See that space below the title, that should be there too. This line can
not be longer than 72 characters either...

I wouldn't worry too much about most commit messages though,
we now squash commits before merging.

```

## Branches

Our branching structure is actually not that important, typically we squash commits and shortly delete branches. But if you want a guide, try to loosely stick to: [A successful Git branching model](http://nvie.com/posts/a-successful-git-branching-model/).


## Pull Requests

Pull requests can be made against new branches without requiring immediate action on the part of maintainers and reviewers. This can be used as means to track the current state of integrations like CircleCI, CodeCov and CodeClimate. 

### General Guidelines
- Always make a pull request against the `master` branch.
- Follow the guide within the `PULL_REQUEST_TEMPLATE.md`
- Always squash into `master`
