import dotEnv from "dotenv";
import fs from "node:fs";
import path from "node:path";

const nodeEnv = process.env.ENV_MODE;
const rootDirectory = fs.realpathSync(process.cwd());
const resolvePath = (relativePath: string) =>
  path.resolve(rootDirectory, relativePath);
const dotEnvMainPath = resolvePath(".env");

if (typeof nodeEnv !== "undefined") {
  dotEnv.config({ path: `${dotEnvMainPath}.${nodeEnv}.local` });
}
dotEnv.config({ path: `${dotEnvMainPath}.local` });
if (typeof nodeEnv !== "undefined") {
  dotEnv.config({ path: `${dotEnvMainPath}.${nodeEnv}` });
}
dotEnv.config({ path: `${dotEnvMainPath}` });
