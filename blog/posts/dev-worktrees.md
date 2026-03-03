# dev wkt: Git Worktrees for Parallel Development

_Published: 2026-03-03_

In my [last post](/blog/posts/dev-evolution.html) I mentioned git worktrees as something I wanted to add to `dev`. Well, here it is.

## The Problem

I've been using _Claude Code_ a lot. And one thing I keep wanting to do is work on multiple things at the same time within the same repo.

Say I'm on `main`, working on feature A with Claude. But I also want to kick off feature B in a separate session. Or maybe I want to review a PR while Claude keeps working on something else.

With a single checkout, you can't. You'd have to stash, switch branches, do your thing, switch back. Or clone the repo again somewhere else. Both options are annoying.

Git worktrees solve this cleanly — they let you have multiple branches checked out simultaneously, each in its own directory. But managing them manually is tedious:

```bash
git worktree add ../my-repo-feature-b -b feature-b
cd ../my-repo-feature-b
# ... do work ...
git worktree remove ../my-repo-feature-b
git branch -D feature-b
git push origin --delete feature-b
```

Where do you put them? How do you name them? How do you navigate between them? How do you clean up after?

## The Solution: `dev wkt`

Three new subcommands: `new`, `cd`, and `rm`.

### Creating a worktree

```bash
dev wkt new feature-login
# → creates ~/src__worktrees/github.com/dsaiztc/my-service__feature-login
# → cd's into it
```

That's it. New branch, new directory, you're in it.

The worktree lives under `~/src__worktrees/` instead of `~/src/`. This is intentional — `dev cd` only looks at `~/src/`, so worktrees don't pollute your main repo list. They're temporary workspaces, not permanent clones.

### Navigating between worktrees

```bash
dev wkt cd
# → fuzzy finder showing all worktrees for the current repo
# → main is annotated with (main)
```

Same fuzzy finder you're used to from `dev cd`, but scoped to the current repo's worktrees.

### Cleaning up

```bash
# From a linked worktree — just run rm, it knows what to remove
dev wkt rm
# → confirms, removes worktree, deletes local + remote branch, cd's to main

# From main — specify or pick from fuzzy finder
dev wkt rm feature-login
```

This is the most opinionated part. `dev wkt rm` doesn't just remove the worktree — it also deletes the local branch and the remote branch. My reasoning: if the worktree is gone, the branch is done. If it was merged, the remote branch should go. If it wasn't, I probably abandoned it. Either way, clean up.

## Design Decisions

### Why `~/src__worktrees/`?

I considered putting worktrees next to the main repo (e.g. `~/src/github.com/dsaiztc/my-service__feature-b`). But that would mean `dev cd` and `dev tree` would show them. Worktrees are ephemeral — they come and go with branches. I don't want them mixed in with my actual repos.

A separate root keeps the mental model clean: `~/src/` is your repos, `~/src__worktrees/` is your temporary parallel checkouts.

The worktree root is configurable via `~/.config/dev/config.json`:

```json
{
  "worktree_root": "~/my_worktrees"
}
```

### Naming: `repo__branch`

Worktree directories are named `<repo>__<branch>`. The double underscore is a clear separator that doesn't conflict with repo or branch names.

Branch names with slashes (like `fix/bug-123`) get the `/` replaced with `--`, so the path stays flat: `my-service__fix--bug-123`.

### The shell wrapper

Like `dev cd` and `dev clone`, the `wkt` subcommands need to change your shell's working directory. The shell wrapper (`eval "$(dev init)"`) now also intercepts `dev wkt cd`, `dev wkt new`, and `dev wkt rm`. Bare `dev wkt` shows help normally — it only evals when a subcommand is present.

## How I Actually Use This

My typical workflow now looks like:

1. I'm on `main` in a repo, working on something with _Claude Code_
2. I want to start a second task in parallel: `dev wkt new feature-x`
3. I'm now in a fresh checkout on a new branch — I open another _Claude Code_ session here
4. When I need to switch between them: `dev wkt cd`
5. When a branch is merged: `dev wkt rm` cleans everything up

The key insight is that worktrees + AI coding agents = true parallelism. You're not context-switching between branches anymore. Each branch has its own directory, its own editor window, its own Claude session. They don't interfere with each other.

## What I Called in the Last Post

From my [previous post](/blog/posts/dev-evolution.html):

> **Potential ideas (not committed):**
> - Git worktrees, since we're working parallel shifts nowadays with _Claude Code_ & friends

Shipped. Sometimes the "not committed" ideas are the ones you actually need.

---

Check out [dev at dsaiztc.com/dev](/dev) for installation and full docs. `brew upgrade dev` to get the latest.

## Tags

`CLI` `Go` `Developer Tools` `Git Worktrees` `Claude Code`
