# aviationstack-cli

CLI for the aviationstack API. Made with [api2cli.dev](https://api2cli.dev).

## Install

```bash
npx api2cli install <user>/aviationstack-cli
```

This clones the repo, builds the CLI, links it to your PATH, and installs the AgentSkill to your coding agents.

## Install AgentSkill only

```bash
npx skills add <user>/aviationstack-cli
```

## Usage

```bash
aviationstack-cli auth set "your-token"
aviationstack-cli auth test
aviationstack-cli --help
```

## Resources

Run `aviationstack-cli --help` to see available resources.

## Global Flags

All commands support: `--json`, `--format <text|json|csv|yaml>`, `--verbose`, `--no-color`, `--no-header`
