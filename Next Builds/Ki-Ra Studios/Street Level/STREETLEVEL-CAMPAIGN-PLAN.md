# STREET LEVEL   Advertising Plan
### Positioning, campaign strategy, and the build for `satcorp.io/kira` and `satcorp.io/streetlevel`   v1.0 (17 September 2026)
**Prepared by: Marketing / Product / Web, in that order.**

Sources: `Streetlevel-AdBrief.md` (the brief this plan answers) and `GDD.md` v0.1,
both on `D:\Ki-Ra Studios\FORFEITURE\Street Level\`. GDD sections are cited
inline, because roughly every factual claim proposed for the page traces to one.
Parent doctrine: [`BUILD-PLAN.md`](../../../BUILD-PLAN.md) §2 (the six
fingerprints), §7 (Ki-Ra as built), §12 (placeholder discipline).
Sibling precedent: [`../NAMTAR RELENTLESS/RELENTLESS-ANNOUNCEMENT-PLAN.md`](../NAMTAR%20RELENTLESS/RELENTLESS-ANNOUNCEMENT-PLAN.md)
and [`../FORFEITURE/FORFEITURE-CAMPAIGN-PLAN.md`](../FORFEITURE/FORFEITURE-CAMPAIGN-PLAN.md).
The second of those is unbuilt and half-committed, and §0.2 below is about that.

---

## 0. Four judgments that shape everything below

### 0.1 This one is different from its two siblings: it is advertising a product that will actually be for sale

RELENTLESS is a Phase A prototype. FORFEITURE is pre-production with no build.
Both pages are position-planting exercises, and both plans say so.

Street Level is not that. The netcode spike is running on disk right now:
Fish-Net installed, a `_Spike` scene with a metrics harness, headless bot runs
logged yesterday. `GDD.md` §9.2 puts S0 first, S4 ships a store page, and §1.2
sets a one-time purchase at roughly $15 to $20. **This is the first Ki-Ra title
that will ask a stranger for money**, and it is the only one on the slate whose
page has a conversion funnel rather than a mailing list.

Three consequences, and they run through the whole plan:

| | |
|---|---|
| The page has a **real CTA ladder**, not a holding pattern | §2.6 |
| Community sign-up is a **first-class outcome**, because it is one of the product's three stated purposes (`GDD.md` §1.2) and not a consolation for having nothing to sell | §2.6, Appendix B.3 |
| The page can start answering the **thesis's riskiest question for free**, months before a build exists | §2.7 |

### 0.2 The brief was written for this title in isolation. satcorp.io is not isolated

The brief's brand-isolation rule is unambiguous and correct: no reference to the
flagship, no "prequel to", no "same universe as", no Unreal Engine 5. Credit
Ki-Ra Studios as the developer and stop. `GDD.md` §1.9 puts the reasoning
plainly: a poor Steam rating is permanent and searchable, and the wire between
the two products only gets connected in the direction that helps.

**The brief's author did not know that satcorp.io is simultaneously mid-build on
a FORFEITURE page.** That work is on the branch right now, uncommitted: a
`forfeiture` division entry, a theme block, a copy module, a bespoke `ProofLine`
component, and a notify-list discriminator. There is no route yet and no `/kira`
section yet, so nothing is public.

That matters, because the two products are the same pitch at two scales.
Persistent online crime sim. Player police as a real career. Seizure as the
stake. No wipes. Premium. PC and Steam. Server-authoritative. Self-hosting as a
first-class feature. If both pages go live on one domain, one tab bar apart,
under one studio name, the connection is made for anyone who looks, and Google
co-indexes them on overlapping terms without anyone looking at all.

**This is not a reason to refuse the page.** The brief already authorises a
satcorp.io page under the Ki-Ra name. It is a reason to be deliberate about
three things:

1. **Isolation is enforced in the build, not left to good intentions** (§3.1,
   §3.2, §4.4). Separate accent, separate copy module with no shared imports,
   separate file-number series, separate consent scope, separate room, no
   cross-links in either direction, and no shared vocabulary (§1.4 is the
   important one).
2. **Neither page ever names the other.** This is already true of the FORFEITURE
   plan by omission; here it is a stated constraint with a checklist line.
3. **The publication order is a decision, and it is the studio's** (Appendix B.1).
   My recommendation is in there, and it is not the obvious one.

### 0.3 The single largest copy risk is borrowing FORFEITURE's best lines, and neither brief mentions it

`forfeiture.ts` sits in the same folder Street Level's copy module will sit in.
Its strongest lines are right there: *every crime leaves evidence, every
detective is another player*, the heat-and-proof distinction, chain of custody,
the interview room. They are excellent, they are thematically adjacent, and
**every one of them is forbidden here**, for a reason the advertising brief does
not contain.

`GDD.md` §8.3 calls this "the deliberate omissions   protecting the moat", and
names it the section's most important content. The flagship's competitive moat
is the detective loop: multi-turn questioning, contradiction detection, an
evidence board. **Street Level must not build that, and therefore must not
advertise it.** The distinction the GDD asks to be held precisely:

| Street Level has | Street Level does not have |
|---|---|
| A case as a **gate**: a documented case is one of four conditions that authorises a treasury seizure (§3.6) | A case as **content**: the board, the evidence graph, linking, timeline reconstruction |
| Signature detection as a find-the-site mechanic (§2.2) | Forensics, or chain of custody as a system |
| The arrested player's own binary cooperation choice (§10.6) | A detective questioning someone else across turns and catching them in a lie |

§8.3 is explicit that naming §10.6 "the interrogation decision" in an earlier
draft was itself the error, because the word did damage the mechanic never did.
The same applies at four times the blast radius on a public advertising page.

**Concretely: `streetlevel.ts` imports nothing from `forfeiture.ts`, including
the Discord constant, and the words *evidence board*, *interrogation*, *chain of
custody*, *forensics* and *build the case* do not appear on either surface.**
This is §4.4's first checklist line.

### 0.4 The brief under-weights the one line the Rust and FiveM audience is actually shopping for

`GDD.md` §7.2 commits to community-hosted servers **from launch**, running the
official ruleset, with a self-hostable server build that is an S0 gate condition
(§9.2) and a ship condition (§9.3, condition 6). The advertising brief does not
mention it once.

For the audience segment with the highest intent and the shortest distance to
travel, *you can host it yourself* is a top-three line. It is also, usefully, a
decision already taken rather than a feature aspiration, which is the only
currency a page like this has. It goes in the covenant (§1.1 ⑤) and in the
apparatus block. Whether it deserves to be a pillar is Appendix B.6.

**One precision that must not slip:** the commitment is *you can host it*, not
*you can tune it*. §7.2 hands economy and rule configuration to community
servers only after the MVP is proven. The copy says the first and never the
second.

---

# PART I   What gets advertised

## 1.1 The hierarchy, in order

The brief gives five hooks and says the asymmetry should anchor every piece of
copy. It is right, with one reordering: hooks 2 and 3 are not two hooks, they
are one idea with two halves, and they are stronger presented together than
apart (§3.5).

**① The police are other players, with careers of their own.** The centrepiece,
and the only sentence on the page no competitor in this category can write. Five
ranks across three bands, four specializations chosen at rank 3, and a
three-tier undercover ladder where each tier is a different game: buying as a
customer, moving product distribution-side, or being invited into a rival crew
as a trusted member (`GDD.md` §4.2, §4.4, §4.5).

The detail that converts, and it is the game's own: **there is no infiltration
mechanic.** No disguise system, no reputation meter, no fake-credentials
minigame. An officer gets inside the way anyone else does, because someone in
that crew decided to trust them. That is why it cannot be defended against with
a button (§3.7), and it is a far better sentence than any feature list.

**② The threshold: what forfeiture takes, and what the safehouse keeps.** The
title's namesake and its counterweight, and the honest answer to "what happens
when I lose". Everything carried outside the door is gone on arrest or robbery;
tools and equipment persist, so you lose the run and not the ability to run
again (§2.6). Inside, nothing can be taken by force from any direction, police
or rival, ever (§5.1, §10.8).

This earns the page's one bespoke visual (§3.5), because the argument is spatial
and prose spends a paragraph on what a drawing settles in four seconds. It also
pre-empts the reader's instinctive objection, which is *so I just never leave*:
production at scale happens in exposed property that can be raided, and you
cannot build an empire inside the one room nobody can enter (§2.2, §5.1).

The line to build the section around is the game's own, verbatim:

> No badge crosses the threshold. Only a person does, and only if the
> organization lets them in.

It carries hook ② and sets up hook ① in one sentence, which is why it is the
section coda rather than a pull quote somewhere quieter.

**③ The crew is the unit of play, and betrayal is in the permission table.**
Hard cap of five including the founder, no expansion path (§3.1). Three ranks.
A Lieutenant can withdraw to a daily cap and vanish, and the audit log tells the
Boss who did it afterwards (§3.2, §3.3). The GDD calls this a feature and the
cost of delegation, and the page should too. *Ocean's Eleven energy* is the
brief's framing and it is right, with the tone caveat in §2.3.

**④ Where you are coming from.** The four audience segments, answered with
systems rather than reassurances (§1.6). This is the block that does the
conversion work once a reader has scrolled, and it is written to be read in any
order: recognise one card, read that one, skip the rest.

**⑤ What we are not selling you.** The covenant. Five lines, every one a
decision already recorded, and deliberately built out of claims the two sibling
pages cannot make (§2.5).

**Deliberately demoted:** hook 5 in the brief, *unscripted stories, not scripted
lore*. It is true, it is a good design decision, and as advertising it is an
absence. A page cannot show a story that has not happened yet on a shard that
does not exist. It survives as one line in the pitch paragraph and as the reason
the contact sheet is empty, and it becomes a real section the day there is a
shard with history. Same treatment the FORFEITURE plan gives the Chronicle, and
for the same reason.

## 1.2 The line that must be drawn: this is not a smaller NAMTAR, and it is not the other crime game

The slate on `/kira` is about to be four titles, and a reader meets all of them
within a few screens. RELENTLESS needed a whole comparison table to stop readers
thinking the flagship went mobile. Street Level's disambiguation problem splits
in two, and only one half gets a table.

**Against NAMTAR and RELENTLESS: no table needed.** A dead super-Earth and a
contemporary city are not confusable, and the accent, the voice and the
establishment framing do the work on arrival.

**Against FORFEITURE: a table is the one thing that must never be built.** A
comparison between the two crime games would be the single most efficient way to
connect them, which is the outcome §0.2 exists to prevent. The separation runs
entirely through the build: a different accent, a different grain weight, a
different file series, a different room, a different vocabulary, and neither
page naming the other. **If a reader connects them anyway, that is a studio
shipping two games in a genre, which is ordinary. What must not exist is the
site doing the connecting on the studio's behalf.**

## 1.3 What must not be advertised

Every line here is a build constraint, not a preference. The first four are the
brief's; the fifth is §0.3's and is the one most likely to be violated by
accident.

- **No reference to the flagship, in any form.** Not the name, not "our other
  game", not Unreal Engine 5, not "same universe", not "prequel to", not a
  teaser. Ki-Ra Studios as the developer, and nothing more. This covers the
  page, the metadata description, the OG card, the sitemap, and the KYRAX
  registry aliases.
- **No Early Access framing, even informally.** No "growing roadmap", no "more
  coming soon" as a headline promise, no "we'll add". The game ships finished
  with a frozen 1.0 list (`GDD.md` §7.8) and that is a selling point, not an
  omission to apologise for. It is fine to say post-launch support exists; it is
  not fine to sell the game as unfinished-but-improving.
- **No ship date.** None is set and none will be announced (§1.7). "Coming to
  Steam", "wishlist now", never a quarter or a year.
- **No cut or deferred feature, anywhere, even as "later".** The full exclusion
  list, assembled from §2.10, §3.9, §4.11 and §7.9: third and fourth product
  lines, recipe research, multi-stage chemistry, dirty/clean money and
  laundering fronts, NPC employees, vehicles beyond basic transport, heists,
  legal business ownership, formal alliances and diplomacy, declared wars,
  org skill trees, player-run Internal Affairs, courts, trials, player lawyers
  and judges, K9, SWAT as a distinct role, a federal tier, police vehicles
  beyond a patrol car, forensics as a discipline, console, mod support and
  scripting sandbox, third-person, character creation, dynamic weather,
  destructible environments, and localization beyond English.
- **No casework-as-content vocabulary.** See §0.3. The banned words are
  *evidence board*, *interrogation*, *chain of custody*, *forensics*, and
  *building the case*. A case in Street Level is a gate, and the copy says
  "a documented case" and stops.
- **No crime glamour, in copy or in a single pixel.** The brief: nobody in this
  game is cool, everybody is trying to make rent. No neon, no noir styling, no
  kingpin language, no stock photography, no image that would work on an album
  cover. This includes the link-preview card.
- **No scale the game does not have.** One small dense district, 4 to 6
  contestable zones, 40 to 80 players (§7.7, §3.5, §1.4). Not a metropolis, not
  an open world, not an MMO. The brief is right that overselling production
  values sets up a bad first-review cycle, and the honest numbers are more
  interesting than vague ones anyway.

## 1.4 What the page can honestly say about status

Everything below is true today, traces to a recorded decision, and stays true
regardless of what S0 through S4 teach:

- Ki-Ra Studios. PC, Steam-first. First-person. Unity.
- Persistent online multiplayer, **40 to 80 players per shard**, and that ceiling
  is a design choice rather than a limitation to grow out of (§1.4).
- **Premium, one-time purchase, roughly $15 to $20. No subscription. Not Early
  Access** (§1.2, and Appendix B.2 on whether to print the number).
- **No wipes, ever.** What you build stays until someone takes it (§1.6).
- Organizations cap at five, including the founder. Precincts cap at five (§3.1,
  §4.6).
- Five cop ranks in three bands; four specializations; three undercover tiers
  (§4.2 to §4.5).
- One small dense district, 4 to 6 contestable zones (§7.7, §3.5).
- Two product lines at 1.0 (§2.2).
- Server-authoritative dedicated server. Nothing that matters is client-decided
  (§7.3).
- **Official shards and community-hosted servers, both from launch**, with a
  self-hostable server build (§7.2).
- Easy Anti-Cheat on official shards; community servers get server authority and
  no EAC guarantee (§7.5). The GDD asks for this to be stated plainly rather
  than discovered; putting it on the advertising page a year early is the
  cheapest trust purchase available on this page.
- **Design complete and frozen. Netcode spike in progress.** Verified on disk,
  not taken on trust: Fish-Net, a metrics harness, and headless bot runs logged
  16 September 2026.
- No date, and none will be announced.

---

# PART II   How it is advertised

## 2.1 The strategy in one line

**Lead with the only thing nobody else can say, and let the stake close.**

The generic-but-strong line and the differentiating line are both available, and
the order matters. *Everything you build can be taken* is five words and it
lands, but Rust, Tarkov and EVE have all sold a version of it and the audience
has read it before. *The police hunting you are other players, with careers of
their own* is the sentence no competitor in this category can currently write,
and the brief is explicit that this asymmetry should anchor everything.

So the differentiator is the headline and the stake is the coda directly under
it. The hero is three lines:

> **STREET LEVEL**
>
> *The police hunting you are other players, with careers of their own.*
>
> Everything you build can be taken. By a rival crew, or by a warrant.

## 2.2 The hook, in priority order

1. *The police hunting you are other players, with careers of their own.* The
   differentiator, and the hero.
2. *Everything you build can be taken. By a rival crew, or by a warrant.* The
   stake, and the title.
3. *No badge crosses the threshold. Only a person does, and only if the
   organization lets them in.* The system, drawn (§3.5). It is the counterweight
   that makes the stake read as fair rather than punishing, and it sets up the
   undercover ladder in the same breath.
4. *There is no infiltration mechanic. Somebody in that crew decided to trust
   them.* The proof that hook 1 is designed rather than claimed.
5. *You can host it yourself, from launch.* The objection-handler and the
   highest-intent segment's shortest path (§0.4).

## 2.3 Tone, and the two ways this page goes wrong

The brief: grounded and unglamorous, working-class crime rather than cartel
spectacle, tension and consequence rather than slick criminal-mastermind
framing.

**Failure mode one, inherited from the site.** satcorp.io's Concierge register
is playful in places: "the safe houses", "arrange passage", "this evening's
programme". Playfulness applied to this subject curdles into exactly the crime
glamour the brief bans. The rule the FORFEITURE plan wrote is the right one and
it applies here unchanged: **the site's furniture may be theatrical; the claims
about the game may not.** Stamps, file numbers and the dossier grammar stay.
Winking about crime does not.

**Failure mode two, specific to this title.** The brief offers *Ocean's Eleven
energy* for the crew section, and it is the right read of the social core:
assembling and trusting five people is the game. But Ocean's Eleven is a heist
film about glamorous professionals, and this game explicitly has no heists
(§2.10) and explicitly has nobody cool in it. **Take the trust, leave the
tuxedos.** The crew copy sells the arithmetic of who you let in, not the caper.

The house test for every line on this page: would it survive being read aloud by
someone who has been arrested? If it reads as a fantasy about crime rather than
a description of a system, it is the wrong line.

## 2.4 The sequence

| Phase | What ships | Gate |
|---|---|---|
| **Now** | The `/kira` section and the `/streetlevel` page, copy-only, placeholder frames, Field Notes open, Discord as a peer CTA, wishlist slot present and visibly not-yet-live | This plan approved |
| **On the S0 gate** | The standing ladder flips: spike COMPLETE, the loop IN PROGRESS | All four S0 numbers met (§9.2) |
| **On first grey-box capture** | One unedited capture into `SL-015`, captioned as exactly what it is | S1 gate: a stranger's first sale, unaided, inside 30 minutes |
| **On the name** | `TITLE` swaps; a redirect is added if the final name forces a new route | Trademark clearance returns (§1.9) |
| **On the store listing** | Wishlist becomes the primary CTA; Field Notes drops to third | A Steam page exists |

Every one of those is a data edit against `streetlevel.ts`, not a rebuild. The
wishlist button's slot exists on the page from day one so that the last row is a
string change and a link.

## 2.5 The covenant: built out of lines the siblings cannot say

Every Ki-Ra page on this site publishes an anti-goal list, and the shape of it
is the conversion for an audience that has been burned. The risk here is that
three pages publishing near-identical covenants start to rhyme, which is a
studio voice on the good reading and connective tissue on the bad one (§0.2).

So Street Level's covenant is short, and every line is one neither sibling can
write:

- **It ships finished, or it does not ship. There is no Early Access tag.**
- **A frozen feature list. What arrives at 1.0 is what was designed, and nothing
  is being held back to sell you later.** (§7.8, and in a genre where everything
  is a roadmap this is the strongest line on the page.)
- **No seasons, no wipes, nothing ever erased.**
- **One purchase. No subscription.** (Appendix B.5 on whether the studio wants
  the stronger no-paid-advantage promise; the design documents do not currently
  make it, so the page does not either.)
- **You can host it yourself, from launch, on the official ruleset.**

Deliberately absent: any variant of *no footage of a game that does not exist*.
It is true here too, it is FORFEITURE's line, and the empty frames carry the
point better than a sentence does (§3.3).

## 2.6 The call to action, which is the brief's most actionable instruction and its hardest

The brief asks for **Wishlist on Steam** as primary and **Join the Discord** as
secondary, and insists community sign-up is treated as equally important rather
than an afterthought. Both are right, and there is a problem: **there is no
Steam page.** The store page is S4 work (§9.2) and the name is not chosen
(§1.9). A dead wishlist button is exactly the kind of promise this site's whole
discipline forbids.

So the CTA block ships in two states, and the page ships in state one:

| | **State 1: today** | **State 2: on store listing** |
|---|---|---|
| Primary | **Field Notes.** Leave a forwarding address | **Wishlist on Steam** |
| Peer | **The Discord**, at equal visual weight | **The Discord**, at equal visual weight |
| Third | The wishlist slot, present and honest: *there is no Steam page yet. When there is one, this is where it will be* | Field Notes |

Three notes on this, in descending order of how much they matter:

**The Discord is a peer, not a ghost link, and that is a deliberate deviation
from house pattern.** `/relentless` and the planned `/forfeiture` both give the
Discord a quiet outlined link beside a heavier primary. Here the brief's
reasoning is sound and specific: community building is one of three stated
purposes of the product (§1.2), not a nice-to-have, so the two actions get the
same weight in the same block.

**The third row is not filler.** An empty wishlist slot that says why it is empty
pre-sells the wishlist and proves the covenant in the same screen, which is the
same trick the FORFEITURE plan found for its contact sheet. It also means the
day the store page lands, nothing on the page moves.

**The Discord this points at should not be the studio's shared room.** See
Appendix B.3. This is both a moderation argument and a brand-isolation one, and
it is the decision on this list most likely to be regretted if deferred.

## 2.7 What success looks like, and the free thesis pre-read

Ninety days after publication. None of these are pageviews:

- **Forwarding addresses with the free-text field filled in.** That field is the
  qualitative signal and the recruiting channel at once.
- **Discord retention past day 7**, not Discord joins. A room that spikes and
  empties is a negative result about the pitch, and it is better to know.
- **One creator or outlet explaining the undercover ladder in their own words.**
  Press and creators before paid, always. A third party describing a cop being
  recognised inside a safehouse is credibility no ad buy can purchase.
- **Zero corrections.** Nothing had to be walked back, because nothing on the
  page was a promise.

And one that the other two plans had no way to earn:

**The page can start answering Q3 before a line of gameplay code exists.**
`GDD.md` §1.5 pre-registers cop supply as the thesis's highest-risk number, and
§1.8 names its collapse as a standing risk whose failure mode is an
*inconclusive* result rather than a *no*. The share of Field Notes signups who
volunteer, unprompted, that they want to play the police is a cheap, early,
directionally useful read on it, months before S3.

Getting it costs one string: the note field's prompt on this page asks **"Crew,
or badge?"** rather than a generic "why you're here". Implementation in §4.4.
It is optional, it is one line per list in `notify-schema.ts`, and it is the
highest-value-per-character change in this plan.

---

# PART III   Implementation

## 3.0 The placement decision

Both surfaces the brief asks for are correct, and the second one is what makes
the first honest.

**A section on `/kira`**, because that page is the studio's slate and a studio
with four announced titles that shows three is under-selling itself. It is an
announcement: the hook, the one visual, crew-versus-badge, and a link.

**A full page at `/streetlevel`**, as its own establishment with its own tab,
because a section on somebody else's page cannot honestly run a mailing list,
and because this is the one title on the slate with a conversion funnel to run.

**The one departure from the sibling plans: Street Level is not "the fourth
feature".** The running order in the screening room is *feature presentation*
(NAMTAR), *the second feature* (RELENTLESS), *the third feature* (FORFEITURE),
and continuing to count would do two unwanted things at once: it makes a slate
of four read as thin-spread, and it narrates a lineage between the third and
fourth entries, which is precisely the connection §0.2 is trying not to draw.

**The eyebrow is "First on the bill."** It is the room's own language, it is not
a sequence number, and it says the only thing that actually distinguishes this
title from the other three: it is the one you will be able to buy first.

That choice has a useful property. Because the section never carries a number,
it can sit third or fourth on the page with no copy change at all, which is what
makes Appendix B.1's sequencing decision reversible instead of a rewrite.

**Placement on the page:** after the third feature, before the safe houses. The
funnel does not depend on it: `/streetlevel` is a division with a tab, so it is
one click from anywhere on the site, which is exactly the reasoning that gave
RELENTLESS its own tab in the first place.

## 3.1 Theme fidelity: the non-negotiables

Both surfaces are BLK / RED / BONE, the Concierge typography, the dossier
grammar, the grain and the vignette. Nothing about this page is a new design
system. The reconciliation between the site's palette doctrine and the game's
tone direction happens in two values, and both of them are also doing
brand-isolation work.

**The accent is municipal green, `#6e8c5a`.**

The instinctive pick is wrong here in a way that matters. This game is about
police, so police blue is the obvious accent, and police blue is `#5a7d94`,
which is FORFEITURE's. **Taking it would visually merge the two crime games on
the tab bar, in the OG cards, and in every screenshot anyone ever takes of this
site.** The accent is the cheapest brand-isolation instrument available and it
should be spent as one.

**One limit on that, found in the build rather than at the desk.** The site
scopes its accent per route, through `data-division` on the shell, so a section
mounted on `/kira` wears Ki-Ra's teal rather than its own title's colour. The
`/kira` section therefore renders green nowhere: the drawing, the eyebrows and
the dossier rule all come out teal, exactly as the FORFEITURE section above it
comes out teal rather than institutional blue. The separation holds on the
title pages, in the tab bar and in the link-preview cards, and it does not hold
on the studio page. That is the existing system behaving as designed and the
sibling section accepting the same thing, so the build leaves it alone   but the
claim above is about the title surfaces, not about every surface, and it should
not be read wider than that. Overriding it is one wrapper element
(`<div data-division="streetlevel">` around the section) if the studio would
rather `/kira` showed each title in its own colour; that is a change to how the
studio page works, and it should be decided rather than slipped in.

So the colour is chosen off a different axis entirely. The brief asks for
grounded, unglamorous, working-class, legible: municipal paint, a stairwell
light, a bus shelter, old signage, army surplus. A desaturated yellow-leaning
green is the one thing on this site that is not a crime-thriller colour, which
is the brief's whole tone note expressed as a hex value.

It clears the wheel. Ki-Ra and RELENTLESS teal sits at roughly 176 degrees and
this sits near 97, which is not a near-miss; ANU brass and NAMTAR orange are in
the 30s; PULSE and SATCORP are red; KYRAX is near-white; FORFEITURE is blue.
Contrast against the page ground lands around 5.3:1, slightly brighter than
FORFEITURE's blue, so the 0.52rem label sizes stay legible.

**Grain sits at `0.04`, lighter than FORFEITURE's `0.07`.** The FORFEITURE brief
asks for photographic and worn and buys it with texture. This brief asks for the
opposite: *restrained and readable over stylized, legibility beats mood*. The
grain weight is where the page says that without a single image, and it is a
second axis of separation between two pages that would otherwise feel like one
studio's house style applied twice.

Page ground `#08090a`, matching the neighbourhood.

## 3.2 Section anatomy

### `/kira`   first on the bill

| Block | Content |
|---|---|
| Eyebrow + headline | *First on the bill* · "The police hunting you are other players, with careers of their own." |
| Margin note | The newest picture on the slate, and the first one you will be able to buy |
| World dossier | `SL-001`, designation, standing, four facts that cannot expire |
| The hook | The threshold, drawn (§3.5), with the no-badge coda |
| Crew or badge | The two ways to play, side by side, as a real table |
| Frames | Three placeholders, honestly stamped |
| Actions | Read the full brief → `/streetlevel` · Join the room → Discord |

The pillars, the covenant, the undercover ladder and the audience segments are
deliberately **not** here. This is an announcement; the page is one click away.

### `/streetlevel`   the full page

Linear, in the brief's own recommended order, every section short. Folders are
right for RELENTLESS, which is publishing a prototype's design philosophy to
people who already care. **An advertisement that asks a reader to open things is
an advertisement that does not get read**, and this is the first Ki-Ra page with
something to sell.

1. **The file** (hero). Stamp, file number, title, the positioning line, the
   stake, four facts.
2. **The pitch.** The loop, and the sentence that reframes it: every arrow in it
   is somewhere a rival crew or an undercover officer can interrupt you, and a
   player who runs it uninterrupted for an hour has had a bad session.
3. **The threshold.** The bespoke visual, forfeiture and the safehouse as one
   idea, the no-badge coda.
4. **The badge is a career.** Five ranks, three bands, four specializations, and
   the undercover ladder as three tiers that are three different games. The
   "no infiltration mechanic" line closes it.
5. **Crew or badge.** The two ways to play, side by side.
6. **Five people, and what each of them can do to you.** The cap, the three
   ranks, the withdrawal cap, the audit log, and betrayal as a permission rather
   than a plot.
7. **Nothing resets.** No seasons, no wipes, what you build stays until it is
   taken. Kept short: it is a promise, not a section.
8. **Where you are coming from.** The four segments, answered (§1.6 below).
9. **What we are not selling you.** The covenant (§2.5).
10. **Nothing to show yet.** The contact sheet, and why it is empty.
11. **Standing.** The ladder, the apparatus, no date, and the working-title line.
12. **The room, and the list.** The CTA block (§2.6).

The brief's recommended hero carries a grounded documentary image. None exists,
and a placeholder in a hero is weaker than no image at all, so the hero is
typographic and the frames live at §10. **This is the one deviation from the
brief's structure and it reverses itself the day there is a capture.**

## 3.3 Where the constraint becomes the art direction

There is no art, and there is no build. The site's placeholder discipline
(`BUILD-PLAN.md` §12) turns that into a designed statement rather than an
apology: registration marks, hatching, a rubber stamp, a file number.

The stamps are written for this title's situation specifically, and
deliberately differ from both siblings':

| Slot | Stamp |
|---|---|
| Anything of the world or a moment in it | `NOT BUILT YET` |
| The capture slot | `NO CAPTURE YET` |

Not `COMING SOON`, which is a promise. Not `AWAITING CLEARANCE`, which is
RELENTLESS's legal situation. Not `NOTHING SHOT YET` or `NO FOOTAGE EXISTS`,
which are FORFEITURE's, and reusing a sibling's stamp on this page is a small
version of exactly the wrong thing (§0.2). `NO CAPTURE YET` is also the more
accurate word: what this game will have first is an unedited grey-box capture,
not a rendered trailer.

Frame labels come straight from the brief's own screenshot priority list, so the
empty frames still advertise the game:

| File | Label |
|---|---|
| `SL-010` | A buy that might be a cop |
| `SL-011` | The block outside a safehouse |
| `SL-012` | A zone contested |
| `SL-013` | What was carried, seized |
| `SL-014` | Five, moving together |
| `SL-015` | First capture |

## 3.4 The audience segments, answered

The brief's table, converted into the page's `SEGMENTS` block. **The first card
is the one to get right**, because the brief is emphatic that this game must not
be marketed as the next Schedule 1, and the segment most likely to arrive is the
one that came from it. So the card is written as a differentiation and never as
an association.

| From | What they want | The answer on the page |
|---|---|---|
| **Production-loop crime sims** | The acquire, produce, sell loop, against something other than an AI script | The loop is familiar on purpose. What is new is that every arrow in it is a place a rival crew or an undercover officer can interrupt you. A player who runs it uninterrupted for an hour has had a bad session |
| **Faction and territory PvP** | Contested ground, betrayal, anything can be taken | Four to six zones, taken by a declared fight with a clock, capped at ten people and winnable by five in one sitting. A Lieutenant can legally drain to their cap and walk. Nothing wipes |
| **Full-loss sandboxes** | Real stakes without losing the evening | Everything carried outside the door goes on arrest or robbery. Tools and equipment persist, so you lose the run and not the ability to run again. And the safehouse cannot be entered by anyone, from any direction |
| **"I want to play the cop"** | A career, not a minigame and not a chore | Five ranks, three bands, four specializations, three undercover tiers, and a precinct with a ladder of its own. Cops do not lose career progress on death |

## 3.5 The one bespoke component: `Threshold`

Each Ki-Ra title on this site earns exactly one bespoke SVG that carries its
hardest idea: RELENTLESS has `CycleClock`, FORFEITURE has `ProofLine`. Street
Level's hardest idea in prose, and its most valuable, is the pair the brief
splits into hooks 2 and 3.

The argument is spatial, which is why a drawing settles it and a paragraph does
not. A plan view, three bands, one marked line:

- **Inside.** Nothing here can be taken by force, by anyone, ever. No badge
  crosses; a person can, if the crew invites them.
- **The block.** Police presence is legal here and it costs. A shared counter
  runs, the crew gets a ping when it trips, and standing there drains an
  officer's rank permanently rather than just their pay.
- **The street.** Everything carried is forfeit on arrest or robbery. Tools
  persist. This is where the game happens.

**The middle band is the one that earns the component.** Anyone can draw a safe
room and a dangerous street. What no competitor's page can draw is the band in
between, where the rule is neither "safe" nor "unsafe" but *priced*, and where
the crew can see the price being paid. That band is also the answer to the
reader's real question, which is not "is my base safe" but "so they just wait
outside, then?"

Engineering, matching `ProofLine` and `CycleClock` exactly: inline SVG derived
from a table of coordinates rather than a hand-tuned path string, `vectorEffect`
holding stroke weight under a stretched viewBox, GSAP drawing it once on scroll
and killing its own ScrollTrigger on unmount, a full `aria-label` carrying the
whole argument in prose, and the three bands repeated as a legible list beneath
the drawing rather than as a caption for it. No canvas and no second WebGL
context: the performance budget is enforced, and an SVG says this better anyway,
at 360px, in a screenshot, and in print.

Caption, which doubles as the section coda and is the game's own sentence:

> No badge crosses the threshold. Only a person does, and only if the
> organization lets them in.

## 3.6 File-by-file changes

**New**

| File | What it is |
|---|---|
| `components/worlds/kira/streetlevel.ts` | **Every string on both surfaces.** Data, not prose in JSX, so the complete set of claims satcorp.io makes about this title can be reviewed in ninety seconds by someone who does not read React. **Imports nothing from `forfeiture.ts` or `relentless.ts`, including `DISCORD`** (§0.3) |
| `components/worlds/kira/Threshold.tsx` | The one bespoke visual (§3.5) |
| `components/worlds/kira/FirstOnTheBill.tsx` | The `/kira` section |
| `app/(streetlevel)/layout.tsx` | Division shell and metadata |
| `app/(streetlevel)/streetlevel/page.tsx` | The full page |
| `app/(streetlevel)/streetlevel/opengraph-image.tsx` | The link-preview card, which is the actual ad unit when the page is shared |

**Changed**

| File | Change | Why |
|---|---|---|
| `lib/divisions.ts` | Add the `streetlevel` establishment | Single source of truth: one entry yields the tab, the front-page network card, the sitemap entry and the KYRAX registry record |
| `app/globals.css` | `[data-division="streetlevel"]` | Accent, ground and grain weight (§3.1) |
| `app/(kira)/kira/page.tsx` | Mount `<FirstOnTheBill />` | The slate is four titles now |
| `app/(kira)/layout.tsx` | Name the title in the description | A search result naming three of four titles sends readers to the wrong page |
| `lib/notify-schema.ts` | Third list id, scope string, label; plus the per-list note prompt (§2.7) | The consent record has to say what this reader actually agreed to hear about |
| `lib/registry-index.ts` | `DIVISION_ALIASES` entry | So the KYRAX registry answers "crime sim", "crew", "cops", "multiplayer", "street level". **Aliases must not overlap FORFEITURE's** or one question returns both games side by side, which is the connection §0.2 is avoiding |
| `components/fingerprints/FileTabs.tsx` | Breakpoint and overflow (§3.7) | Nine tabs do not fit where seven did |

**Already done by the in-flight FORFEITURE work**, and listed so it is not done
twice or differently: `FieldNotes` already takes a `list` prop, and
`notify-schema.ts` already carries the list discriminator, the scope map and the
label map. Adding this title is three entries, not a pipeline change.

**Shared with the FORFEITURE plan**, and whichever build lands first should do
them: generalising `lib/pulse-og.tsx` into `lib/og-card.tsx`, deriving the
division count on `app/(satcorp)/page.tsx` instead of counting by hand, and
adding the missing `LAYOUT` keys in `components/worlds/satcorp/NetworkBoard.tsx`.
**All three get worse with every division added**, and this plan adds the ninth.

## 3.7 The tab bar is at its structural limit, and this is the change that finds out

With `streetlevel`, `DIVISIONS` reaches nine: SATCORP, ANU, KYRAX, KI-RA,
NAMTAR, RELENTLESS, FORFEITURE, STREET LEVEL, PULSE.

`FileTabs` renders the full drawer from `lg` (1024px) in a non-scrolling flex
row, `px-4` per tab, `tracking-[0.22em]`, plus a role label that appears at `xl`.
Rough arithmetic on the new labels puts the row somewhere north of 1000px
without role labels and well past 1280px with them, against a SATCORP mark that
already takes ~140px. **This needs measuring in the browser rather than trusting
the estimate, but it will not fit, and the failure is a wrapped or clipped nav
on the site's primary navigation.**

The proportionate fix, and it is two lines:

- Move the full drawer from `lg` to `xl`, so 1024px to 1279px gets the mobile
  INDEX drawer, which already works and is already designed.
- Allow the row to scroll horizontally at `xl` as the honest fallback.

**The real answer is a different piece of work and should be named rather than
smuggled in here:** four Ki-Ra titles want to be a grouped drawer under the
KI-RA tab, not four peer tabs. That is a navigation change with its own design
questions, it affects `divisionFromPath`, and it should not ride along inside an
advertising build. Appendix B.7.

## 3.8 Phasing

| Phase | Work |
|---|---|
| **A** | `streetlevel.ts`, the division entry, the theme block, the route group, the full page, `Threshold` |
| **B** | `FirstOnTheBill` on `/kira`, the `/kira` metadata line, the OG card |
| **C** | Notify list entries and the note prompt; registry aliases; the `FileTabs` breakpoint |
| **D** | Verification: `npm run check`, then both surfaces read in the browser at 360, 768, 1024, 1280 and 1440, with reduced motion on and off |

## 3.9 Acceptance checklist

Isolation, which is the part that cannot be fixed after publication:

- [ ] The words FORFEITURE, Unreal, UE5, flagship, prequel and universe appear
      nowhere on either surface, in metadata, in the OG card, or in the registry
      aliases.
- [ ] `streetlevel.ts` imports nothing from `forfeiture.ts` or `relentless.ts`.
- [ ] No casework-as-content vocabulary: no evidence board, no interrogation, no
      chain of custody, no forensics, no "building the case".
- [ ] Registry aliases for `streetlevel` and `forfeiture` do not overlap.
- [ ] The accent is `#6e8c5a` on `/streetlevel`, in its tab and in its OG card,
      and on no other establishment. (Not on the `/kira` section, which inherits
      Ki-Ra's teal by the site's own per-route scoping   see §3.1.)

Truth, which is the part the studio gets quoted on:

- [ ] No date appears anywhere.
- [ ] The words "Early Access" appear only in the covenant's refusal of them.
- [ ] No cut or deferred feature is named. Check against the §1.3 list in full.
- [ ] Every number matches the GDD: 40 to 80 per shard, cap of 5, 4 to 6 zones,
      five ranks, three bands, four specializations, three undercover tiers, two
      product lines.
- [ ] The price appears once as a band, or not at all, per Appendix B.2.
- [ ] No image, stamp or caption implies a build exists.
- [ ] Every claim on both surfaces resolves from `streetlevel.ts`.

Craft:

- [ ] Nothing reads as crime glamour. No neon, no noir styling, no kingpin
      language, no image that would work on an album cover, including the OG
      card.
- [ ] The wishlist slot is present and visibly not-yet-live, never a dead link.
- [ ] The Discord is a peer CTA at equal weight, not a ghost link.
- [ ] A Street Level signup records `streetlevel` as its consent scope.
- [ ] `/streetlevel` reaches the sitemap, the tab bar, the front-page network and
      the KYRAX registry without any of them being hand-edited.
- [ ] Reduced motion: `Threshold` is fully legible with animation disabled, and
      every band's text is in the DOM rather than in the drawing.
- [ ] The tab bar does not wrap or clip at 1024, 1280 or 1440.
- [ ] `npm run check` passes.

---

## Appendix A   Copy deck

**Hero**

> STREET LEVEL
>
> *The police hunting you are other players, with careers of their own.*
>
> Everything you build can be taken. By a rival crew, or by a warrant.

**Dossier facts** (`SL-001`)

| Designation | Persistent online crime sim |
| Standing | Design frozen · netcode spike in progress |
| Played on | PC · Steam |
| Model | Premium, one purchase. Not Early Access |

**The pitch**

> Build a production operation with a crew of up to five. Fight rival crews for
> the streets. Sell where the price is good, which is never where you are safe.
>
> The loop is familiar ground on purpose. What is new is that every step of it
> is somewhere a rival crew or an undercover officer can interrupt you. A player
> who runs it uninterrupted for an hour has had a bad session, not a good one.

**The threshold** (§3.5 coda)

> No badge crosses the threshold. Only a person does, and only if the
> organization lets them in.

**The badge**

> Five ranks across three bands, from taking dispatch calls to deep-cover work,
> and four specializations chosen at the third. The undercover ladder is three
> tiers and each one is a different game: buying as a customer, moving product
> distribution-side, or being invited into a crew as a trusted member.
>
> There is no infiltration mechanic. No disguise system, no reputation meter, no
> fake-credentials minigame. An officer gets inside the way anyone else does,
> because somebody in that crew decided to trust them. That is why it cannot be
> defended against with a button.
>
> Your own convictions are what burn your face. Go loud early and you spend the
> anonymity the rank you are climbing toward requires.

**The crew**

> Five people, including you. No expansion path, no upgrade that raises it.
>
> Three ranks and a permission table, and the table is where betrayal lives. A
> Lieutenant can withdraw to their daily cap and disappear, and the audit log
> tells the Boss who did it afterwards. That is not an exploit. It is the cost
> of delegation, and it is why deciding who gets an invite is the hardest thing
> a crew does.

**Nothing resets**

> No seasons. No wipes. What you build stays until somebody takes it.

**The covenant** (§2.5)

> It ships finished, or it does not ship. There is no Early Access tag.
> A frozen feature list: what arrives at 1.0 is what was designed, and nothing is
> being held back to sell you later.
> No seasons, no wipes, nothing ever erased.
> One purchase. No subscription.
> You can host it yourself, from launch, on the official ruleset.

**Standing, and the working title**

> No date, and none will be announced. When there is one it will be a real one.
>
> Working title. The name on the store page will be its own.

**The CTA block**

> There is no Steam page yet. When there is one, this is where it will be.
>
> Until then: leave a forwarding address, or come and argue about it in the room.

---

## Appendix B   Open decisions for the studio

**1. Publication order, relative to `/forfeiture`.** The only decision here that
is not mine to make, and the one with a deadline attached. `GDD.md` §1.9 puts
the brand-isolation deadline at *before the Steam page exists* and notes it
cannot be undone afterwards.

My recommendation is the non-obvious one: **publish `/streetlevel` now and hold
`/forfeiture`.** The reasoning is that the costs are asymmetric. Street Level is
the nearer product, the spike is running, it needs a room and a list now, and it
has a store page in its own roadmap. FORFEITURE is pre-production with no build,
no footage and no date; its page can wait a year at approximately zero cost, and
when it does go up, the isolation question has resolved itself one way or the
other, because either Street Level has proven itself and §1.9's retro-branding
is earned, or it has not and the wire stays cut.

If the studio wants both live regardless, that is entirely defensible, and §0.2
plus the §3.9 checklist is what makes it survivable. **What is not defensible is
deciding this by accident, by whichever branch happens to merge first.**

**2. The price band.** The brief asks for "roughly $15 to $20" on the page and
this plan delivers it, because unlike FORFEITURE's number it is doing real
conversion work: it positions against free-to-play suspicion and it is a nearer
product. The risk is the ordinary one, that a band published today gets quoted
back at a storefront that lands at $24.99. It is one string, and the discipline
is to change it the day it is decided rather than to leave it drifting. **If the
studio would rather publish the model and withhold the number, say so and it
comes out.**

**3. Street Level needs its own room.** Both surfaces currently point at
`discord.gg/guDzGUkJSb`, shared with RELENTLESS and the ARK clusters. Two
independent arguments say that does not hold here. Community building is one of
three stated purposes of this product, so the room is a deliverable rather than
a link; and a shared room where FORFEITURE readers and Street Level readers talk
to each other is a brand-isolation leak that no amount of care on the page
prevents. The FORFEITURE plan's own rule applies: **do not offer a Discord
nobody is going to moderate.**

**4. The name, and what the route costs.** "Street Level" is an internal working
title, the standalone name is unchosen, and clearance has not run (§1.9). The
`TITLE` constant makes the display name a one-line change, exactly as RELENTLESS
does. **The route is the part that is not free after publication.** Links,
shares and search indexing all attach to `/streetlevel`. The cost is bounded and
known: a redirect in `next.config.ts` is three lines, and it should be budgeted
rather than discovered.

**5. How strong a monetisation promise.** The covenant currently says "one
purchase, no subscription", which is what the design documents actually decide.
FORFEITURE's covenant goes further and promises nothing for sale that touches
power. **Street Level's documents do not make that promise, so this plan does
not put it in the copy.** If the studio wants to make it, it is a strong line
and it is free today. If it does not, leaving it out now is much cheaper than
withdrawing it later.

**6. Self-hosting may deserve to be a pillar.** §0.4. It is currently a covenant
line and an apparatus entry. For the highest-intent segment it may be the
strongest single sentence on the page, and the brief does not mention it at all.

**7. Four Ki-Ra titles want a grouped tab.** §3.7 proposes a two-line fix that
keeps the nav working. The structural answer is a Ki-Ra drawer with four titles
under it, and that is its own piece of work with its own design questions. It
should be scheduled, not absorbed.

**8. This page signs off the setting.** `GDD.md` §1.1 marks the city, era,
register and palette as "provisional, needs sign-off", and invites someone to
say if they want somewhere specific and characterful. **Publishing an
advertising page makes the provisional version public, which is a sign-off in
practice even if nobody calls it one.** If the setting is genuinely still open,
it is cheaper to close it this week than to change it after the page has been
shared.
