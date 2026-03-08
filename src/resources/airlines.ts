import { Command } from "commander";
import { client } from "../lib/client.js";
import { getToken } from "../lib/auth.js";
import { output } from "../lib/output.js";
import { handleError } from "../lib/errors.js";

export const airlinesResource = new Command("airlines")
  .description("Search and lookup airline data");

airlinesResource
  .command("search")
  .description("Search airlines by name or IATA code")
  .option("--search <term>", "Search term (airline name, etc.)")
  .option("--iata-code <code>", "Airline IATA code (e.g. KE, YP)")
  .option("--limit <n>", "Max results", "25")
  .option("--fields <cols>", "Comma-separated columns to display")
  .option("--json", "Output as JSON")
  .option("--format <fmt>", "Output format: text, json, csv, yaml")
  .addHelpText(
    "after",
    "\nExamples:\n  aviationstack-cli airlines search --iata-code KE\n  aviationstack-cli airlines search --search \"Korean Air\" --json\n  aviationstack-cli airlines search --limit 5",
  )
  .action(async (opts: Record<string, string | undefined>) => {
    try {
      const params: Record<string, string> = { access_key: getToken() };
      if (opts.search) params.search = opts.search;
      if (opts.iataCode) params.iata_code = opts.iataCode;
      if (opts.limit) params.limit = opts.limit;

      const data = (await client.get("/airlines", params)) as { data: unknown[] };
      output(data.data ?? data, {
        json: opts.json === "" || opts.json === "true" ? true : !!opts.json,
        format: opts.format,
        fields: opts.fields?.split(","),
      });
    } catch (err) {
      handleError(err, !!opts.json);
    }
  });
