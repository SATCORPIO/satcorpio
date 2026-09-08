import { describe, it, expect, beforeEach, afterEach } from "vitest";
import path from "node:path";
import {
  buildReference,
  isEphemeralFilesystem,
  resolveRecordDir,
  wasDelivered,
} from "@/lib/delivery";

/**
 * Shared across four intake pipelines now (`app/actions/intake.ts`,
 * `partner.ts`, `notify.ts` and `reserve.ts`)   a bug here is a bug in every
 * one of them at once, which is exactly why it earns its own tests rather
 * than being re-verified by hand each time a caller changes.
 */

describe("buildReference", () => {
  it("produces PREFIX-YYMMDD-XXXX   a two-letter prefix, a six-digit date, a four-character suffix", () => {
    expect(buildReference("PR")).toMatch(/^PR-\d{6}-[0-9A-F]{4}$/);
  });

  it("uses whatever prefix the caller supplies", () => {
    expect(buildReference("SC")).toMatch(/^SC-/);
    expect(buildReference("SP")).toMatch(/^SP-/);
    expect(buildReference("FN")).toMatch(/^FN-/);
  });

  it("does not repeat itself on consecutive calls", () => {
    const refs = new Set(Array.from({ length: 20 }, () => buildReference("PR")));
    expect(refs.size).toBe(20);
  });
});

describe("wasDelivered", () => {
  it("is true when the webhook posted, regardless of anything else", () => {
    expect(
      wasDelivered({ posted: true, emailed: false, filed: false }),
    ).toBe(true);
  });

  it("is true when email sent, regardless of anything else", () => {
    expect(
      wasDelivered({ posted: false, emailed: true, filed: false }),
    ).toBe(true);
  });

  it("is false when nothing succeeded", () => {
    expect(
      wasDelivered({ posted: false, emailed: false, filed: false }),
    ).toBe(false);
  });

  describe("the filed-only case   depends on the filesystem", () => {
    const hadVercel = process.env.VERCEL;

    afterEach(() => {
      if (hadVercel === undefined) delete process.env.VERCEL;
      else process.env.VERCEL = hadVercel;
    });

    it("counts a filed record as durable off Vercel   a real disk", () => {
      delete process.env.VERCEL;
      expect(
        wasDelivered({ posted: false, emailed: false, filed: true }),
      ).toBe(true);
    });

    it("does not count a filed record as durable on Vercel   an ephemeral disk", () => {
      process.env.VERCEL = "1";
      expect(
        wasDelivered({ posted: false, emailed: false, filed: true }),
      ).toBe(false);
    });
  });
});

describe("isEphemeralFilesystem", () => {
  const hadVercel = process.env.VERCEL;

  afterEach(() => {
    if (hadVercel === undefined) delete process.env.VERCEL;
    else process.env.VERCEL = hadVercel;
  });

  it("is false with VERCEL unset", () => {
    delete process.env.VERCEL;
    expect(isEphemeralFilesystem()).toBe(false);
  });

  it("is true with VERCEL set", () => {
    process.env.VERCEL = "1";
    expect(isEphemeralFilesystem()).toBe(true);
  });
});

describe("resolveRecordDir", () => {
  const hadVercel = process.env.VERCEL;

  beforeEach(() => {
    delete process.env.VERCEL;
  });

  afterEach(() => {
    if (hadVercel === undefined) delete process.env.VERCEL;
    else process.env.VERCEL = hadVercel;
  });

  it("prefers an explicit override over anything derived", () => {
    expect(resolveRecordDir("/custom/path", "reservations")).toBe(
      "/custom/path",
    );
  });

  it("resolves to a dotfolder under the project root off Vercel", () => {
    expect(resolveRecordDir(undefined, "reservations")).toBe(
      path.join(process.cwd(), ".reservations"),
    );
  });

  it("resolves under the OS temp directory on Vercel", () => {
    process.env.VERCEL = "1";
    const dir = resolveRecordDir(undefined, "reservations");
    expect(dir).toContain("satcorp-reservations");
  });
});
