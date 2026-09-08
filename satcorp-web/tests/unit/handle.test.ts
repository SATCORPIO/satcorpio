import { describe, it, expect } from "vitest";
import { normaliseHandle } from "@/lib/pulse-schema";

/**
 * A handle is an identity, so this is a security boundary under test, not a
 * formatting nicety (build plan §6.3). Every rejection case here is a case
 * that mattered enough to be named in the plan   confusables, reserved
 * words, zero-width characters, the shape rules   and every one should stay
 * covered even if the implementation underneath changes.
 */

describe("normaliseHandle   rejections", () => {
  const cases: [string, string][] = [
    ["", "empty"],
    ["   ", "whitespace only"],
    ["ab", "too short"],
    ["a".repeat(25), "too long   twenty-five characters"],
    ["_lead", "leading underscore"],
    ["123456", "all digits"],
    ["0", "single digit, also too short"],
    ["admin", "reserved   admin"],
    ["administrator", "reserved   administrator"],
    ["satcorp", "reserved   a division-adjacent name"],
    ["pulse", "reserved   the division itself"],
    ["kyrax", "reserved   a division"],
    ["namtar", "reserved   a division"],
    ["kira", "reserved   a division"],
    ["official", "reserved   an impersonation risk"],
    ["support", "reserved   an impersonation risk"],
    ["root", "reserved   a system-adjacent word"],
    ["hi there", "contains a space"],
    ["hé", "non-ASCII   phase one is ASCII only"],
    ["yourname!", "punctuation outside the allowed set"],
  ];

  for (const [input, reason] of cases) {
    it(`rejects ${JSON.stringify(input)}   ${reason}`, () => {
      expect(normaliseHandle(input)).toBeNull();
    });
  }
});

describe("normaliseHandle   acceptances", () => {
  it("accepts a well-formed handle and returns it lowercased", () => {
    const result = normaliseHandle("YourName_1");
    expect(result).not.toBeNull();
    expect(result?.handle).toBe("yourname_1");
  });

  it("accepts a trailing underscore   only a leading one is rejected", () => {
    expect(normaliseHandle("trail_")).not.toBeNull();
  });

  it("accepts exactly three characters, the floor", () => {
    expect(normaliseHandle("abc")).not.toBeNull();
  });

  it("accepts exactly twenty-four characters, the ceiling", () => {
    expect(normaliseHandle("a".repeat(24))).not.toBeNull();
  });
});

describe("normaliseHandle   confusable folding on the comparison key only", () => {
  // None of these target words are themselves reserved   a folded key that
  // happens to land on a reserved word is covered separately below, where the
  // expected outcome is rejection rather than a specific key value.
  it("folds 0 to o on the comparison key", () => {
    expect(normaliseHandle("cr0wd")?.key).toBe("crowd");
  });

  it("folds 1 to l on the comparison key   a doubled L spelled with a digit", () => {
    // "1" is folded to the letter "l", not to "i"   "he11o" collides with
    // "hello" (spelled with two Ls), not with a word containing "i".
    expect(normaliseHandle("he11o")?.key).toBe("hello");
  });

  it("folds an underscore to nothing on the comparison key", () => {
    expect(normaliseHandle("cre_ator")?.key).toBe("creator");
  });

  it("does not fold the stored handle itself   only the comparison key", () => {
    const result = normaliseHandle("cr0wd");
    // The comparison key is "crowd", but what would actually be stored and
    // displayed keeps the digit exactly as typed.
    expect(result?.handle).toBe("cr0wd");
    expect(result?.handle).not.toBe(result?.key);
  });

  it("rejects a confusable spelling of a reserved word", () => {
    // "0" -> "o" and "_" -> "" both land on "satcorp" when spelled with a
    // digit standing in for a letter, or split with an underscore   exactly
    // the impersonation this folding exists to catch.
    expect(normaliseHandle("satc0rp")).toBeNull();
    expect(normaliseHandle("sat_corp")).toBeNull();
  });

  it("does not fold characters outside the named set", () => {
    // Plan §6.3 names exactly three substitutions   0, 1 and _. "3" for "e"
    // is a real leetspeak convention and is deliberately out of scope rather
    // than half-implemented; broader confusable defence is future work
    // (plan §6.3: "Not because Unicode handles are wrong, but because
    // confusable-character defence... is a project").
    expect(normaliseHandle("puls3")).not.toBeNull();
  });
});

describe("normaliseHandle   zero-width characters are stripped, not preserved", () => {
  it("strips a zero-width space before validating", () => {
    const withZeroWidth = `yo${String.fromCharCode(0x200b)}urname`;
    const result = normaliseHandle(withZeroWidth);
    expect(result).not.toBeNull();
    expect(result?.handle).toBe("yourname");
  });

  it("strips the byte-order mark", () => {
    const withBom = `${String.fromCharCode(0xfeff)}yourname`;
    expect(normaliseHandle(withBom)?.handle).toBe("yourname");
  });
});

describe("normaliseHandle   input type", () => {
  it("returns null for non-string input rather than throwing", () => {
    expect(normaliseHandle(undefined)).toBeNull();
    expect(normaliseHandle(null)).toBeNull();
    expect(normaliseHandle(42)).toBeNull();
    expect(normaliseHandle({})).toBeNull();
  });
});
