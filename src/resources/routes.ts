import { Command } from "commander";
import { client } from "../lib/client.js";
import { getToken } from "../lib/auth.js";
import { output } from "../lib/output.js";
import { handleError } from "../lib/errors.js";

export const routesResource = new Command("routes")
  .description("Search flight routes");

routesResource
  .command("search")
  .description("Search routes by departure/arrival airport or flight number")
  .option("--dep-iata <code>", "Departure airport IATA (e.g. ICN)")
  .option("--arr-iata <code>", "Arrival airport IATA (e.g. SFO)")
  .option("--flight-number <number>", "Flight number")
  .option("--fields <cols>", "Comma-separated columns to display")
  .option("--json", "Output as JSON")
  .option("--format <fmt>", "Output format: text, json, csv, yaml")
  .addHelpText(
    "after",
    "\nExamples:\n  aviationstack-cli routes search --dep-iata ICN --arr-iata SFO\n  aviationstack-cli routes search --flight-number 111 --json",
  )
  .action(async (opts: Record<string, string | undefined>) => {
    try {
      const params: Record<string, string> = { access_key: getToken() };
      if (opts.depIata) params.dep_iata = opts.depIata;
      if (opts.arrIata) params.arr_iata = opts.arrIata;
      if (opts.flightNumber) params.flight_number = opts.flightNumber;

      const data = (await client.get("/routes", params)) as { data: unknown[] };
      output(data.data ?? data, {
        json: opts.json === "" || opts.json === "true" ? true : !!opts.json,
        format: opts.format,
        fields: opts.fields?.split(","),
      });
    } catch (err) {
      handleError(err, !!opts.json);
    }
  });
