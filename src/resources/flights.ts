import { Command } from "commander";
import { client } from "../lib/client.js";
import { getToken } from "../lib/auth.js";
import { output } from "../lib/output.js";
import { handleError } from "../lib/errors.js";

export const flightsResource = new Command("flights")
  .description("Search and lookup flight data");

flightsResource
  .command("search")
  .description("Search flights by various criteria")
  .option("--iata <code>", "Flight IATA code (e.g. YP111)")
  .option("--airline-iata <code>", "Airline IATA code (e.g. YP)")
  .option("--flight-number <number>", "Flight number (e.g. 111)")
  .option("--dep-iata <code>", "Departure airport IATA (e.g. ICN)")
  .option("--arr-iata <code>", "Arrival airport IATA (e.g. SFO)")
  .option("--limit <n>", "Max results", "25")
  .option("--offset <n>", "Offset for pagination", "0")
  .option("--fields <cols>", "Comma-separated columns to display")
  .option("--json", "Output as JSON")
  .option("--format <fmt>", "Output format: text, json, csv, yaml")
  .addHelpText(
    "after",
    "\nExamples:\n  aviationstack-cli flights search --iata YP111\n  aviationstack-cli flights search --dep-iata ICN --arr-iata SFO\n  aviationstack-cli flights search --airline-iata KE --json",
  )
  .action(async (opts: Record<string, string | undefined>) => {
    try {
      const params: Record<string, string> = { access_key: getToken() };
      if (opts.iata) params.flight_iata = opts.iata;
      if (opts.airlineIata) params.airline_iata = opts.airlineIata;
      if (opts.flightNumber) params.flight_number = opts.flightNumber;
      if (opts.depIata) params.dep_iata = opts.depIata;
      if (opts.arrIata) params.arr_iata = opts.arrIata;
      if (opts.limit) params.limit = opts.limit;
      if (opts.offset) params.offset = opts.offset;

      const data = (await client.get("/flights", params)) as { data: unknown[] };
      output(data.data ?? data, {
        json: opts.json === "" || opts.json === "true" ? true : !!opts.json,
        format: opts.format,
        fields: opts.fields?.split(","),
      });
    } catch (err) {
      handleError(err, !!opts.json);
    }
  });
