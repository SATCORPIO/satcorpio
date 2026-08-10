import type { Metadata } from "next";
import { ThreadLink } from "@/components/fingerprints/CaseFileTransition";
import {
  LegalDocument,
  type LegalSection,
} from "@/components/system/LegalDocument";
import { LEGAL } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "What SATCORP collects, why, who else sees it, how long it is kept, and the rights you have over it.",
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true },
};

const Mail = () => (
  <a href={`mailto:${LEGAL.contactEmail}`}>{LEGAL.contactEmail}</a>
);

const SECTIONS: LegalSection[] = [
  {
    id: "at-a-glance",
    title: "At a glance",
    short:
      "No cookies, no analytics, no advertising, no tracking. The only personal data we hold is what you deliberately send us.",
    body: (
      <>
        <p>
          Most privacy policies are long because the operation behind them is
          complicated. This one is long because it is specific. The short version
          is on this page, and everything after it is the detail behind each
          line.
        </p>
        <dl>
          <dt>What we collect</dt>
          <dd>
            What you type into the Engagement Brief, and the technical
            information any web server necessarily sees when it answers a
            request.
          </dd>

          <dt>What we do not collect</dt>
          <dd>
            We run no analytics, no advertising or marketing pixels, no session
            recording, no fingerprinting, and no third-party trackers of any
            kind. We do not build profiles, and we do not track you across sites.
          </dd>

          <dt>Cookies</dt>
          <dd>
            This site sets no cookies at all. Two items of browser local storage
            hold your own choices on your own device, and are never transmitted
            to us.
          </dd>

          <dt>Selling your data</dt>
          <dd>
            We have never sold or shared personal information, and we do not
            intend to. There is no advertising business here to sell it to.
          </dd>

          <dt>Who else sees it</dt>
          <dd>
            The infrastructure that hosts the site, and the services that carry a
            submitted brief to us. Each one is named in this policy.
          </dd>

          <dt>Your rights</dt>
          <dd>
            Access, correction, deletion, portability, objection and complaint —
            available to you wherever you live, not only where the law compels
            it. Write to <Mail />.
          </dd>
        </dl>
      </>
    ),
  },
  {
    id: "who-we-are",
    title: "Who is responsible for your data",
    short: `${LEGAL.entity} decides what is collected and why, which makes us the controller. Reach us at ${LEGAL.contactEmail}.`,
    body: (
      <>
        <p>
          This policy applies to <a href={LEGAL.siteUrl}>{LEGAL.domain}</a> and
          every establishment presented on it — SATCORP, ANU, KYRAX, Ki-Ra
          Studios, NAMTAR and PULSE — and to the enquiries we receive through it.
        </p>
        <p>
          The controller, in the language of the European and United Kingdom
          General Data Protection Regulations, is {LEGAL.entity}, {LEGAL.form}.
          {LEGAL.registration ? ` Registered as ${LEGAL.registration}.` : ""} You
          can reach us about anything in this policy at <Mail />. We have not
          appointed a data protection officer, because the scale and nature of
          our processing does not require one. Requests come to that address and
          are handled by the person who runs the operation.
        </p>
        <p>
          SATCORP has no establishment in the European Economic Area or the
          United Kingdom. Individuals in those regions should send requests
          directly to the address above, and they are handled on the same
          timelines and to the same standard as any other.
        </p>
      </>
    ),
  },
  {
    id: "what-we-collect",
    title: "What we collect",
    short:
      "The fields of the Engagement Brief, and the request data a web server cannot avoid seeing.",
    body: (
      <>
        <h3>What you send us in the Engagement Brief</h3>
        <p>
          The <ThreadLink href="/engage">brief</ThreadLink> is the only place on
          this site where you are asked for personal information. It collects
          exactly these fields, and nothing else:
        </p>
        <ul>
          <li>
            <strong>Clarity</strong> — your name; your organisation, if you give
            one; your preferred contact channel; the address, handle or number to
            use; a description of the matter; and how you found us.
          </li>
          <li>
            <strong>Scope</strong> — the service entries you marked, the retainer
            class you indicated, your timeline, and a description of assets you
            already have.
          </li>
          <li>
            <strong>Execution</strong> — the reporting cadence you prefer, and
            any further notes you choose to add.
          </li>
        </ul>
        <p>
          Only your name, a contact channel, a contact address and a description
          of the matter are required. Every other field is optional, and leaving
          one blank has no consequence beyond a slower first conversation. What
          you write into a free-text box is a matter for you, and we ask you not
          to include sensitive categories of personal data, third-party personal
          data, credentials or payment details there.
        </p>

        <h3>What the server sees</h3>
        <ul>
          <li>
            <strong>Your IP address.</strong> Used to enforce a limit of three
            submissions per minute so that the form cannot be flooded. It is held
            in memory for sixty seconds for that purpose and is not written to
            the enquiry record.
          </li>
          <li>
            <strong>Your browser user-agent string.</strong> Stored alongside a
            submitted brief, so that a malformed or fraudulent submission can be
            understood after the fact.
          </li>
          <li>
            <strong>Ordinary server logs.</strong> Our hosting provider records
            requests, including IP address, timestamp, page requested and
            user-agent, as part of delivering and protecting the site. Those logs
            are held under that provider&rsquo;s retention schedule.
          </li>
        </ul>

        <h3>Automated screening</h3>
        <p>
          The brief carries two silent checks: a form field hidden from people
          and visible to automated scripts, and a measurement of how long the
          form was open before it was submitted. Both exist solely to identify
          automated submissions. Neither is used to evaluate you, neither
          produces any legal or similarly significant effect, and no profile is
          built from either.
        </p>

        <h3>What we do not collect</h3>
        <p>
          We do not knowingly collect special categories of personal data, and we
          do not process payment information anywhere on this site. Typefaces are
          compiled into the site and served from our own domain, so simply
          viewing a page makes no request to any font, analytics or advertising
          provider.
        </p>
      </>
    ),
  },
  {
    id: "why",
    title: "Why we process it, and on what legal basis",
    short:
      "To answer you, to run an engagement, to keep the form from being abused, and to meet our own legal obligations.",
    body: (
      <>
        <p>
          Where the European or United Kingdom GDPR applies, we rely on the
          following bases. Where it does not, the purposes are still these.
        </p>
        <dl>
          <dt>Responding to your enquiry</dt>
          <dd>
            Taking steps at your request prior to entering a contract, under
            Article 6(1)(b). Without this data we cannot answer you.
          </dd>

          <dt>Carrying out an engagement</dt>
          <dd>
            Performance of a contract with you, under Article 6(1)(b), where an
            enquiry becomes commissioned work.
          </dd>

          <dt>Security, rate limiting and anti-abuse</dt>
          <dd>
            Our legitimate interests in keeping the site available and the intake
            channel usable, under Article 6(1)(f). We have weighed this against
            your interests and consider the intrusion minimal, since the data is
            transient and is not used to make decisions about you.
          </dd>

          <dt>Keeping business records</dt>
          <dd>
            Compliance with a legal obligation, under Article 6(1)(c), for
            accounting and tax records once you become a client, and our
            legitimate interests in establishing or defending legal claims under
            Article 6(1)(f).
          </dd>

          <dt>Anything else</dt>
          <dd>
            Your consent, under Article 6(1)(a), which you may withdraw at any
            time without affecting what was done before you withdrew it.
          </dd>
        </dl>
        <p>
          We do not send marketing email. If that ever changes, it will be to
          people who asked for it, with a working unsubscribe link in every
          message, and this policy will say so before the first one is sent.
        </p>
      </>
    ),
  },
  {
    id: "cookies",
    title: "Cookies and local storage",
    short:
      "There are no cookies on this site. Two local-storage entries hold your own choices on your own device.",
    body: (
      <>
        <p>
          This site sets no cookies — not necessary ones, not analytics ones, not
          advertising ones. That is why you have not been shown a consent banner:
          there is nothing to consent to. Under the European ePrivacy rules and
          the United Kingdom Privacy and Electronic Communications Regulations,
          consent is required before storing or accessing information on your
          device except where that storage is strictly necessary for a service
          you requested. We store nothing that falls outside that exemption.
        </p>
        <p>
          Two entries are written to your browser local storage. They stay on
          your device, they are never sent to our server, and they contain no
          identifier of any kind.
        </p>
        <dl>
          <dt>satcorp.engagement</dt>
          <dd>
            The service entries you marked in the Ledger, so that they are still
            marked if you navigate away and come back, and so they arrive
            pre-filled on the Engagement Brief. Strictly necessary for a feature
            you asked for by using it.
          </dd>

          <dt>satcorp.ui</dt>
          <dd>
            Whether you enabled sound. A preference, remembered so you are not
            asked twice.
          </dd>
        </dl>
        <p>
          You can clear both at any time through your browser settings for site
          data, and doing so costs you nothing but the marks in your Ledger. The
          site works normally with local storage disabled.
        </p>
        <p>
          Our hosting provider may set a strictly necessary cookie for load
          balancing or attack mitigation on its own infrastructure. We do not
          place, read or receive any such cookie, and none is used for analytics
          or advertising.
        </p>
      </>
    ),
  },
  {
    id: "sharing",
    title: "Who else sees your data",
    short:
      "Our host, and the services that carry a submitted brief to us. Named, with what each one receives.",
    body: (
      <>
        <p>
          We do not sell personal information, we do not share it for
          cross-context behavioural advertising, and we do not disclose it to
          data brokers or advertising networks. The following processors act on
          our instructions under contracts that require them to protect it.
        </p>
        <dl>
          <dt>Vercel Inc. — hosting and delivery</dt>
          <dd>
            Hosts and serves the site and runs the code that receives a brief.
            Sees request data including IP address and user-agent as part of
            delivering the site. United States, with a global edge network.
          </dd>

          <dt>Discord Inc. — enquiry notification</dt>
          <dd>
            A submitted brief is delivered as a formatted message into a private,
            access-controlled operations channel so that it is seen promptly.
            This means the content of your brief, including your name and contact
            details, passes through and is stored on Discord infrastructure.
            United States.
          </dd>

          <dt>Resend — email delivery</dt>
          <dd>
            Where email notification is enabled, carries a copy of the brief to
            our inbox. United States.
          </dd>

          <dt>Our email provider</dt>
          <dd>
            The mailbox at {LEGAL.contactEmail} holds correspondence with you,
            including anything you send us directly.
          </dd>
        </dl>
        <p>
          Beyond those, we disclose personal data only where we are legally
          required to, where it is necessary to establish, exercise or defend a
          legal claim, or where it is necessary to protect the rights or safety
          of any person. If the business is ever incorporated, sold or
          reorganised, records may transfer with it, and this policy continues to
          apply to them until you are told otherwise.
        </p>
        <p>
          Where an engagement requires a specific additional service — a code
          repository, a design platform, a hosting account in your name — we will
          tell you what it is before your material goes into it.
        </p>
      </>
    ),
  },
  {
    id: "transfers",
    title: "International transfers",
    short:
      "The site is operated from the United States, and your data is processed there.",
    body: (
      <>
        <p>
          SATCORP operates from the United States and the processors named above
          are United States companies. If you contact us from the European
          Economic Area, the United Kingdom, Switzerland or another country with
          transfer restrictions, your personal data is transferred to and
          processed in the United States.
        </p>
        <p>
          For those transfers we rely on the European Commission Standard
          Contractual Clauses and, for the United Kingdom, the International Data
          Transfer Addendum, as incorporated into our agreements with each
          processor, together with the supplementary technical measures described
          under security below. Where you send us an enquiry directly, that
          transfer is also necessary for the performance of a contract with you
          or for steps taken at your request before entering one.
        </p>
        <p>
          You may request details of the safeguards applied to a specific
          transfer by writing to <Mail />.
        </p>
      </>
    ),
  },
  {
    id: "retention",
    title: "How long we keep it",
    short: `Enquiries that go nowhere are deleted within ${LEGAL.retentionMonths} months. Client records are kept as long as the law requires.`,
    body: (
      <>
        <dl>
          <dt>An enquiry that does not become an engagement</dt>
          <dd>
            Kept for up to {LEGAL.retentionMonths} months from our last
            correspondence, so that a conversation resumed later still has its
            context, then deleted.
          </dd>

          <dt>An enquiry that becomes an engagement</dt>
          <dd>
            Kept for the life of the engagement, and afterwards for as long as
            needed for accounting, tax and limitation purposes — ordinarily seven
            years from the end of the relationship.
          </dd>

          <dt>IP addresses used for rate limiting</dt>
          <dd>Held in memory for sixty seconds, then discarded.</dd>

          <dt>Server logs</dt>
          <dd>Retained by our hosting provider on its own schedule.</dd>

          <dt>Correspondence</dt>
          <dd>
            Email is kept while it remains useful to the relationship, and
            reviewed periodically.
          </dd>
        </dl>
        <p>
          When a retention period ends, records are deleted or irreversibly
          anonymised. You can ask us to delete yours sooner, and we will unless
          we are required to keep it.
        </p>
      </>
    ),
  },
  {
    id: "security",
    title: "How it is protected",
    short:
      "Encrypted in transit, held in access-controlled places, and kept out of the public repository by design.",
    body: (
      <>
        <p>
          The site is served only over HTTPS. Enquiry records are held in
          access-controlled storage and are excluded from the public source
          repository by configuration, so a brief cannot be published by
          accident. Access is limited to the people who need it to answer you.
          Credentials for third-party services are held as environment secrets
          and never committed to source control.
        </p>
        <p>
          No system is perfectly secure, and we will not pretend otherwise. If a
          breach occurs that is likely to result in a risk to your rights and
          freedoms, we will notify the relevant supervisory authority within
          seventy-two hours of becoming aware of it where the law requires, and
          we will tell you directly and without undue delay where the risk to you
          is high.
        </p>
      </>
    ),
  },
  {
    id: "rights",
    title: "Your rights",
    short:
      "Access, correction, deletion, restriction, portability, objection, and the right to complain. We extend these to everyone.",
    body: (
      <>
        <p>
          Under the European and United Kingdom GDPR you have the rights below.
          We extend the same rights to everyone who writes to us, whichever
          country they are in, because operating two standards would be more
          work than operating one.
        </p>
        <ul>
          <li>
            <strong>Access</strong> — a copy of the personal data we hold about
            you, and an explanation of what we do with it.
          </li>
          <li>
            <strong>Rectification</strong> — correction of anything inaccurate,
            and completion of anything incomplete.
          </li>
          <li>
            <strong>Erasure</strong> — deletion, where we no longer need the data
            or where you withdraw the consent it rested on.
          </li>
          <li>
            <strong>Restriction</strong> — a pause on processing while a dispute
            about accuracy or legitimate interests is worked out.
          </li>
          <li>
            <strong>Portability</strong> — the data you gave us, in a structured,
            commonly used, machine-readable format.
          </li>
          <li>
            <strong>Objection</strong> — to processing based on legitimate
            interests, on grounds relating to your situation, and absolutely to
            direct marketing at any time.
          </li>
          <li>
            <strong>Withdrawal of consent</strong> — at any time, where consent
            was the basis, without affecting what was lawful before.
          </li>
        </ul>
        <p>
          To exercise any of them, write to <Mail /> and say what you want. We
          respond within one month, extendable by two further months for a
          complex request, and we will tell you if we need that extension and
          why. There is no charge unless a request is manifestly unfounded or
          excessive. We may need to confirm your identity before acting, and we
          will ask for no more information than is needed to do that.
        </p>
        <p>
          You also have the right to complain to a data protection authority. In
          the United Kingdom that is the Information Commissioner&rsquo;s Office;
          in the European Economic Area it is the supervisory authority in your
          country of residence, place of work, or where the issue arose. We would
          rather you raised it with us first, but that is your choice and not a
          precondition.
        </p>
      </>
    ),
  },
  {
    id: "us-states",
    title: "If you are in the United States",
    short:
      "California and the other state privacy laws give you specific rights. We do not sell or share personal information, and we never have.",
    body: (
      <>
        <p>
          This section applies to residents of California, and of the other
          states with comprehensive privacy laws including Virginia, Colorado,
          Connecticut, Utah, Texas, Oregon, Montana and those that follow.
        </p>
        <p>
          <strong>Notice at collection.</strong> The categories of personal
          information we collect are identifiers such as your name, email
          address, telephone number, online identifier and IP address; commercial
          information in the form of the services you enquired about and the
          budget band you indicated; internet activity in the form of server logs
          and your user-agent; and professional or employment information where
          you choose to give it. All of it comes from you, or from your device
          making a request. It is collected for the business purposes described
          in this policy, and retained as described above. We do not collect
          sensitive personal information as that term is defined by the
          California Privacy Rights Act.
        </p>
        <p>
          <strong>No sale, no sharing, no targeted advertising.</strong> We have
          not sold personal information, and have not shared it for
          cross-context behavioural advertising, in the preceding twelve months
          or at any time. We do not process personal information for targeted
          advertising or for profiling in furtherance of decisions producing
          legal or similarly significant effects. We do not knowingly sell or
          share the personal information of anyone under sixteen.
        </p>
        <p>You have the right to:</p>
        <ul>
          <li>
            know what personal information we have collected, used, disclosed and
            for what purpose;
          </li>
          <li>obtain a portable copy of it;</li>
          <li>correct inaccurate personal information;</li>
          <li>
            delete personal information, subject to the exceptions the statutes
            allow;
          </li>
          <li>
            opt out of sale, sharing and targeted advertising — there is nothing
            to opt out of here, and an opt-out signal is honoured regardless;
          </li>
          <li>
            limit the use of sensitive personal information, which we do not
            collect;
          </li>
          <li>
            appeal a refusal of any request, where your state law provides for an
            appeal, by replying to our decision;
          </li>
          <li>
            not be discriminated against for exercising any of these rights. We
            offer no financial incentive in exchange for personal information.
          </li>
        </ul>
        <p>
          Submit a request to <Mail />. We confirm receipt within ten business
          days and respond within forty-five days, extendable once by a further
          forty-five days where reasonably necessary, and we will tell you if
          that is needed. An authorised agent may act for you with written
          permission that we can verify. Because we set no cookies and run no
          advertising technology, browser-level opt-out preference signals
          including Global Privacy Control encounter nothing to disable, and are
          honoured by default.
        </p>
        <p>
          California residents may also request, under the Shine the Light law,
          details of personal information disclosed to third parties for their
          direct marketing purposes. We make no such disclosures.
        </p>
      </>
    ),
  },
  {
    id: "other-regions",
    title: "If you are elsewhere",
    short:
      "Canada, Brazil, Australia, Switzerland and beyond — the same rights, exercised the same way.",
    body: (
      <>
        <p>
          <strong>Canada.</strong> We handle personal information consistently
          with the Personal Information Protection and Electronic Documents Act.
          You may access and correct your information and challenge our handling
          of it by writing to us, and you may complain to the Office of the
          Privacy Commissioner of Canada.
        </p>
        <p>
          <strong>Brazil.</strong> Under the Lei Geral de Proteção de Dados you
          have rights of confirmation, access, correction, anonymisation,
          portability, deletion, information about sharing, and revocation of
          consent, exercisable at the address above.
        </p>
        <p>
          <strong>Australia.</strong> We handle personal information consistently
          with the Australian Privacy Principles, and complaints may be made to
          the Office of the Australian Information Commissioner.
        </p>
        <p>
          <strong>Switzerland.</strong> The rights described in the GDPR section
          are available to you under the Federal Act on Data Protection, and you
          may contact the Federal Data Protection and Information Commissioner.
        </p>
        <p>
          If you are somewhere not named here, write to us anyway. The rights in
          this policy are offered to everyone.
        </p>
      </>
    ),
  },
  {
    id: "children",
    title: "Children",
    short: "This site is not for children, and we do not want their data.",
    body: (
      <p>
        This site is intended for adults acting in a professional capacity. It is
        not directed at children, and we do not knowingly collect personal data
        from anyone under sixteen, or under thirteen in the United States. If you
        believe a child has sent us personal data, write to <Mail /> and we will
        delete it promptly.
      </p>
    ),
  },
  {
    id: "automated",
    title: "Automated decisions and profiling",
    short: "There are none. A person reads every brief.",
    body: (
      <p>
        We do not carry out automated decision-making that produces legal or
        similarly significant effects, and we do not profile you. The two
        anti-automation checks on the Engagement Brief filter scripted
        submissions only; they do not evaluate you, and a legitimate enquiry
        caught by one can simply be resent, or sent to <Mail /> instead. Every
        brief that reaches us is read by a person.
      </p>
    ),
  },
  {
    id: "changes",
    title: "Changes to this policy",
    short:
      "The date at the top moves whenever the substance does. Material changes are flagged.",
    body: (
      <p>
        We revise this policy when what we do changes, and the revision date at
        the head of the document always reflects the current version. Where a
        change materially affects your rights or how your data is used, we will
        make that plain on this page, and where the law requires consent for the
        change, we will ask for it before it takes effect. A policy quietly
        rewritten is not a policy, so we do not do that.
      </p>
    ),
  },
  {
    id: "contact",
    title: "Contact",
    short: `Everything in this document is answered at ${LEGAL.contactEmail}.`,
    body: (
      <>
        <p>
          Questions, requests, corrections, complaints and requests for the
          detail behind any statement in this policy all go to the same place:
        </p>
        <p>
          <strong>{LEGAL.entity}</strong>
          <br />
          <Mail />
          <br />
          <a href={LEGAL.siteUrl}>{LEGAL.domain}</a>
        </p>
        <p>
          Related reading: the{" "}
          <ThreadLink href="/terms">Terms of Service</ThreadLink>, which govern
          the use of this site and the work commissioned through it.
        </p>
      </>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <LegalDocument
      fileNumber="FILE 02 — PRIVACY"
      title="Privacy Policy"
      lede={
        <>
          What is collected, why, who else sees it, how long it is kept, and what
          you can require of us. No cookies, no analytics, no trackers — and this
          document says so in the specific rather than the general.
        </>
      }
      sections={SECTIONS}
    />
  );
}
