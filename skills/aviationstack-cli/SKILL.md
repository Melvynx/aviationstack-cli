---
name: aviationstack
description: "Manage aviationstack via CLI - {{RESOURCES_LIST}}. Use when user mentions 'aviationstack' or wants to interact with the aviationstack API."
category: {{CATEGORY}}
---

# aviationstack-cli

## Setup

If `aviationstack-cli` is not found, install and build it:
```bash
bun --version || curl -fsSL https://bun.sh/install | bash
npx api2cli bundle aviationstack
npx api2cli link aviationstack
```

`api2cli link` adds `~/.local/bin` to PATH automatically. The CLI is available in the next command.

Always use `--json` flag when calling commands programmatically.

## Authentication

```bash
aviationstack-cli auth set "your-token"
aviationstack-cli auth test
```

## Resources

{{RESOURCES_HELP}}

## Global Flags

All commands support: `--json`, `--format <text|json|csv|yaml>`, `--verbose`, `--no-color`, `--no-header`
