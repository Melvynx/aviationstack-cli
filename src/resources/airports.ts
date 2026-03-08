import { Command } from "commander";
import { client } from "../lib/client.js";
import { getToken } from "../lib/auth.js";
import { output } from "../lib/output.js";
import { handleError } from "../lib/errors.js";

export const airportsResource = new Command("airports")
  .description("Search and lookup airport data");

airportsResource
  .command("search")
  .description("Search airports by name or IATA code")
  .option("--search <term>", "Search term (airport name, city, etc.)")
  .option("--iata-code <code>", "Airport IATA code (e.g. ICN, SFO)")
  .option("--limit <n>", "Max results", "25")
  .option("--fields <cols>", "Comma-separated columns to display")
  .option("--json", "Output as JSON")
  .option("--format <fmt>", "Output format: text, json, csv, yaml")
  .addHelpText(
    "after",
    "\nExamples:\n  aviationstack-cli airports search --iata-code ICN\n  aviationstack-cli airports search --search \"San Francisco\" --json\n  aviationstack-cli airports search --limit 10",
  )
  .action(async (opts: Record<string, string | undefined>) => {
    try {
      const params: Record<string, string> = { access_key: getToken() };
      if (opts.search) params.search = opts.search;
      if (opts.iataCode) params.iata_code = opts.iataCode;
      if (opts.limit) params.limit = opts.limit;

      const data = (await client.get("/airports", params)) as { data: unknown[] };
      output(data.data ?? data, {
        json: opts.json === "" || opts.json === "true" ? true : !!opts.json,
        format: opts.format,
        fields: opts.fields?.split(","),
      });
    } catch (err) {
      handleError(err, !!opts.json);
    }
  });
