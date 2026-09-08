import os from "node:os";
import path from "node:path";
import { randomUUID } from "node:crypto";

/**
 * SHARED INTAKE MACHINERY
 *
 * Three pipelines now write records the same way: the Engagement Brief
 * (`app/actions/intake.ts`), the Approach (`app/actions/partner.ts`), and the
 * PULSE handle reservation (`app/actions/reserve.ts`). The first two carried
 * their own copies of this logic; the third is the point the phase guide
 * flagged for extracting it
 * (`../../Next Builds/PULSE/PULSE-PHASE-GUIDE.md` §A3)   two copies is a
 * coincidence, three is a pattern, and an unshared pattern duplicated a third
 * time is a pattern that will eventually drift.
 *
 * Nothing here is pipeline-specific. Each caller still owns its own record
 * directory env var, webhook, inbox and reference prefix   only the *shape*
 * of the decision is shared.
 */

/**
 * Serverless platforms mount the deployment read-only and recycle instances
 * without warning, so anything written during a request is a scratch file
 * rather than a record. True on Vercel; false on a box with a real disk.
 */
export function isEphemeralFilesystem(): boolean {
  return Boolean(process.env.VERCEL);
}

/**
 * Resolves where a pipeline writes its records: an explicit override, else
 * the platform's temp directory on an ephemeral filesystem, else a dotfolder
 * under the project root. `name` is the bare pipeline name   `"intake"`,
 * `"partner"`, `"reservations"`   never a path.
 */
export function resolveRecordDir(
  envOverride: string | undefined,
  name: string,
): string {
  // Turbopack cannot statically resolve `name` back to the literal string
  // each call site actually passes ("intake", "partner", "reservations"),
  // so without the ignore comment it conservatively traces the whole project
  // as a dependency of every server action that writes a record   the exact
  // fix Turbopack's own build warning names. Nothing here reads project
  // files; it only ever writes a fresh directory at runtime.
  return (
    envOverride ??
    (isEphemeralFilesystem()
      ? path.join(os.tmpdir(), `satcorp-${name}`)
      : path.join(/* turbopackIgnore: true */ process.cwd(), `.${name}`))
  );
}

/**
 * A dated, unique reference: `PREFIX-YYMMDD-XXXX`. Each pipeline supplies its
 * own two-letter prefix (`SC` for the brief, `SP` for an approach, `PR` for a
 * handle claim); the date stamp and the random suffix are shared machinery.
 */
export function buildReference(prefix: string): string {
  const now = new Date();
  const stamp =
    `${now.getUTCFullYear()}`.slice(2) +
    String(now.getUTCMonth() + 1).padStart(2, "0") +
    String(now.getUTCDate()).padStart(2, "0");
  return `${prefix}-${stamp}-${randomUUID().slice(0, 4).toUpperCase()}`;
}

/**
 * The durability rule. On a box with a real disk, the filed record alone is
 * enough   transports fail, a disk does not. On an ephemeral filesystem a
 * write proves nothing, so a submission is only reported as received once at
 * least one *transport* has actually succeeded.
 */
export function wasDelivered(outcome: {
  posted: boolean;
  emailed: boolean;
  filed: boolean;
}): boolean {
  return (
    outcome.posted ||
    outcome.emailed ||
    (outcome.filed && !isEphemeralFilesystem())
  );
}
