# aviationstack-cli

CLI for the AviationStack API - flight data, airports, airlines, and routes. Made with [api2cli.dev](https://api2cli.dev).

## Install

```bash
npx api2cli install Melvynx/aviationstack-cli
```

## Install AgentSkill only

```bash
npx skills add Melvynx/aviationstack-cli
```

## Auth

```bash
aviationstack-cli auth set <token>
aviationstack-cli auth show          # masked
aviationstack-cli auth show --raw    # full token
aviationstack-cli auth test          # verify token works
aviationstack-cli auth remove        # delete saved token
```

## Flights

Search flights by IATA code, airline, flight number, or departure/arrival airports.

```bash
aviationstack-cli flights search --iata YP111
aviationstack-cli flights search --dep-iata ICN --arr-iata SFO
aviationstack-cli flights search --airline-iata KE --limit 10
aviationstack-cli flights search --flight-number 111 --json
```

| Flag | Description |
|---|---|
| `--iata <code>` | Flight IATA code |
| `--airline-iata <code>` | Airline IATA code |
| `--flight-number <number>` | Flight number |
| `--dep-iata <code>` | Departure airport IATA |
| `--arr-iata <code>` | Arrival airport IATA |
| `--limit <n>` | Max results (default: 25) |
| `--offset <n>` | Pagination offset (default: 0) |
| `--fields <cols>` | Comma-separated columns to display |

## Airports

Search airports by name, city, or IATA code.

```bash
aviationstack-cli airports search --iata-code ICN
aviationstack-cli airports search --search "San Francisco" --json
aviationstack-cli airports search --limit 10
```

| Flag | Description |
|---|---|
| `--search <term>` | Search term (name, city, etc.) |
| `--iata-code <code>` | Airport IATA code |
| `--limit <n>` | Max results (default: 25) |
| `--fields <cols>` | Comma-separated columns to display |

## Airlines

Search airlines by name or IATA code.

```bash
aviationstack-cli airlines search --iata-code KE
aviationstack-cli airlines search --search "Korean Air" --json
aviationstack-cli airlines search --limit 5
```

| Flag | Description |
|---|---|
| `--search <term>` | Search term (airline name, etc.) |
| `--iata-code <code>` | Airline IATA code |
| `--limit <n>` | Max results (default: 25) |
| `--fields <cols>` | Comma-separated columns to display |

## Routes

Search flight routes by departure/arrival airport or flight number.

```bash
aviationstack-cli routes search --dep-iata ICN --arr-iata SFO
aviationstack-cli routes search --flight-number 111 --json
```

| Flag | Description |
|---|---|
| `--dep-iata <code>` | Departure airport IATA |
| `--arr-iata <code>` | Arrival airport IATA |
| `--flight-number <number>` | Flight number |
| `--fields <cols>` | Comma-separated columns to display |

## Global Flags

All commands support: `--json`, `--format <text|json|csv|yaml>`, `--verbose`, `--no-color`, `--no-header`
