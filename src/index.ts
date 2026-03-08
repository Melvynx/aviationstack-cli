#!/usr/bin/env bun
import { Command } from "commander";
import { globalFlags } from "./lib/config.js";
import { authCommand } from "./commands/auth.js";
import { flightsResource } from "./resources/flights.js";
import { airportsResource } from "./resources/airports.js";
import { airlinesResource } from "./resources/airlines.js";
import { routesResource } from "./resources/routes.js";

const program = new Command();

program
  .name("aviationstack-cli")
  .description("CLI for the AviationStack API - flight data, airports, airlines, and routes")
  .version("0.1.0")
  .option("--json", "Output as JSON", false)
  .option("--format <fmt>", "Output format: text, json, csv, yaml", "text")
  .option("--verbose", "Enable debug logging", false)
  .option("--no-color", "Disable colored output")
  .option("--no-header", "Omit table/csv headers (for piping)")
  .hook("preAction", (_thisCmd, actionCmd) => {
    const root = actionCmd.optsWithGlobals();
    globalFlags.json = root.json ?? false;
    globalFlags.format = root.format ?? "text";
    globalFlags.verbose = root.verbose ?? false;
    globalFlags.noColor = root.color === false;
    globalFlags.noHeader = root.header === false;
  });

program.addCommand(authCommand);
program.addCommand(flightsResource);
program.addCommand(airportsResource);
program.addCommand(airlinesResource);
program.addCommand(routesResource);

program.parse();
