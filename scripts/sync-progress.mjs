import { readFile, writeFile } from "node:fs/promises";

const SOURCE_URL = "https://raw.githubusercontent.com/desenlab/desen-app/main/README.md";
const PROFILE_PATH = new URL("../profile/README.md", import.meta.url);
const SOURCE_START = "<!-- task-progress:start -->";
const SOURCE_END = "<!-- task-progress:end -->";
const PROFILE_START = "<!-- desen-progress:start -->";
const PROFILE_END = "<!-- desen-progress:end -->";

const response = await fetch(SOURCE_URL, {
  headers: { "user-agent": "desenlab-progress-sync" },
});
if (!response.ok) {
  throw new Error(`Could not read DESEN progress: HTTP ${response.status}.`);
}

const source = await response.text();
const sourceStart = source.indexOf(SOURCE_START);
const sourceEnd = source.indexOf(SOURCE_END);
if (sourceStart < 0 || sourceEnd <= sourceStart) {
  throw new Error("The DESEN implementation README has no valid task-progress block.");
}

const sourceLines = source
  .slice(sourceStart + SOURCE_START.length, sourceEnd)
  .split("\n")
  .map((line) => line.trim())
  .filter((line) => line.startsWith("**"));
const overall = sourceLines.find((line) => line.startsWith("**Overall:**"));
const proofGates = sourceLines.find((line) => line.startsWith("**Proof gates:**"));
const milestone = sourceLines
  .filter((line) => /^\*\*M\d+ (?:complete|progress):\*\*/u.test(line))
  .at(-1);

if (overall === undefined || milestone === undefined || proofGates === undefined) {
  throw new Error("The DESEN task-progress block is missing a required summary line.");
}

const currentProfile = await readFile(PROFILE_PATH, "utf8");
const profileStart = currentProfile.indexOf(PROFILE_START);
const profileEnd = currentProfile.indexOf(PROFILE_END);
if (profileStart < 0 || profileEnd <= profileStart) {
  throw new Error("The organization profile has no valid progress-sync block.");
}

const replacement = [
  PROFILE_START,
  "",
  overall,
  "",
  milestone,
  "",
  proofGates,
  "",
  "[Follow the detailed task board](https://github.com/desenlab/desen-app/blob/main/docs/plan/TASKS.md)",
  "",
  PROFILE_END,
].join("\n");
const updatedProfile =
  currentProfile.slice(0, profileStart) +
  replacement +
  currentProfile.slice(profileEnd + PROFILE_END.length);

if (updatedProfile === currentProfile) {
  process.stdout.write("DESEN organization progress is already current.\n");
} else {
  await writeFile(PROFILE_PATH, updatedProfile);
  process.stdout.write("Updated DESEN organization progress.\n");
}
