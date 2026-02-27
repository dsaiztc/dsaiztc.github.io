# dev: Two Weeks of Rapid Evolution

_Published: 2026-02-27_

Two weeks ago I started developing [`dev`](/blog/posts/introducing-dev.html), a simple CLI for navigating between project repos. Since then, I've shipped four major updates based on how I actually use it every day.

Each new feature solves a specific friction point I kept hitting in my workflow. Here's what's changed and why.

## The Foundation

The original `dev` was minimal:
- `dev clone` — clone repos into `~/src/<source>/<org>/<project>`
- `dev cd` — fuzzy-find and navigate to any repo
- `dev init` — shell integration for directory changes

This covered the basics: cloning and navigating. But as I used it daily, I noticed gaps.

## v0.3.0: Starting Fresh Projects

**The problem**: I wanted to quickly start new projects without leaving the terminal or thinking about directory structure.

Before, starting a new idea meant:
```bash
cd ~/src/github.com/dsaiztc
mkdir new-project
cd new-project
git init
```

Boring, repetitive, easy to mess up.

**The solution**: `dev new`

```bash
dev new experiment
# → creates ~/src/github.com/dsaiztc/experiment
# → initializes git repo
# → cd's you into it
```

On first run, it prompts for your default source and org, saving them to `~/.config/dev/config.json`. You can override per-project with `--source` and `--org` flags.

**Real workflow**: I use this constantly for quick experiments, POCs, and scratch repos. No more "where did I put that test project?"

## v0.4.0: Seeing the Big Picture

**The problem**: I lost track of what repos I actually had cloned. Was that Apache Kafka repo still around? Did I fork PostHog or just clone it?

**The solution**: `dev tree`

```bash
dev tree
~/src/
├── github.com
│   ├── dsaiztc
│   │   ├── dev
│   │   ├── dotfiles
│   │   └── ai-playground
│   ├── apache
│   │   └── kafka
│   └── PostHog
│       └── posthog.com
└── gitlab.com
    └── myteam
        └── service
```

Simple ASCII tree showing the entire `~/src/` structure. Alphabetically sorted, fast, no dependencies.

**Real workflow**: Honesly a bit of a gimmick, though I foresee using it when cleaning up disk space to see what repos I can delete.

## v0.5.0: Extending with Plugins

**The problem**: Everyone has unique needs. Some folks want `dev deploy`, others want `dev logs`. I can't build everything into the core tool.

**The solution**: Plugin system via `PATH` convention

Any executable named `dev-<name>` on your PATH becomes available as `dev <name>`. The tool passes along stdin/stdout/stderr and exit codes, plus sets `DEV_ROOT` and `DEV_CWD` environment variables.

```bash
# Create a plugin
echo '#!/bin/bash\necho "Deploying from $DEV_CWD"' > ~/bin/dev-deploy
chmod +x ~/bin/dev-deploy

# Use it
dev deploy
# → Deploying from /Users/dsaiztc/src/github.com/dsaiztc/dev
```

Built-in commands are protected from being shadowed. Plugins appear under "Plugin Commands:" in `dev help`.

**Real workflow**: I've created custom plugins for deployment scripts, log tailing, and running project-specific commands without needing to remember where each repo's Makefile is.

## v0.6.0: Composability

**The problem**: I often needed repo paths for other commands. Opening VS Code, listing files, running scripts — all needed the full path.

Before:
```bash
cd ~/src/github.com/dsaiztc/dotfiles  # or dev cd dotfiles first
code .
```

Awkward. Either I'm already there (unnecessary cd), or I have to navigate first.

**The solution**: `dev loc` — prints paths to stdout

```bash
dev loc dotfiles
# → /Users/dsaiztc/src/github.com/dsaiztc/dotfiles

code $(dev loc api)
ls -la $(dev loc frontend)
du -sh $(dev loc *)  # size of all repos
```

Same fuzzy matching as `dev cd`, but outputs just the path. Fully composable with other Unix tools.

**Real workflow**:
- `code $(dev loc project)` — open any repo in VS Code
- `git -C $(dev loc api) status` — check git status without navigating

## The Larger Pattern

Building `dev` has reinforced a few principles:

**Start simple, add based on real pain.** Each feature came from actual friction I felt daily, not hypothetical "nice to have" features.

**Compose, don't monolith.** `dev loc` doesn't try to integrate with every editor and tool. It just outputs paths and lets you compose it however you want.

**Conventions are powerful.** The deterministic `~/src/<source>/<org>/<project>` structure makes everything else possible. No configuration, no ambiguity.

**Plugins over bloat.** Rather than building every possible feature into the core, the plugin system lets users extend it however they need.

## What's Next

Potential ideas (not committed):
- Manage development lifecycle (setup dev environment, run the service, run the tests, etc.)
- Git worktrees, since we're working parallel shifts nowadays with _Claude Code_ & friends
- Better plugin discovery/documentation

But honestly, I'll keep adding whatever I feel I need.

---

Check out [dev at dsaiztc.com/dev](/dev) for installation and full docs. It's open source on [GitHub](https://github.com/dsaiztc/dev).

Let me know how you're using it!

## Tags

`CLI` `Go` `Developer Tools` `Unix Philosophy` `Claude Code`
