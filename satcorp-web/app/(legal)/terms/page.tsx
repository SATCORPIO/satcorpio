import type { Metadata } from "next";
import { ThreadLink } from "@/components/fingerprints/CaseFileTransition";
import {
  LegalDocument,
  type LegalSection,
} from "@/components/system/LegalDocument";
import { LEGAL, governingForum, governingLaw } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms on which SATCORP makes this site available, and the default terms of engagement for commissioned work.",
  alternates: { canonical: "/terms" },
  robots: { index: true, follow: true },
};

const Mail = () => (
  <a href={`mailto:${LEGAL.contactEmail}`}>{LEGAL.contactEmail}</a>
);

const SECTIONS: LegalSection[] = [
  {
    id: "who",
    title: "Who you are dealing with",
    short: `This site is operated by ${LEGAL.entity}. Written notice reaches us at ${LEGAL.contactEmail}.`,
    body: (
      <>
        <p>
          This website at{" "}
          <a href={LEGAL.siteUrl}>{LEGAL.domain}</a> and each of its
          establishments — SATCORP, ANU, KYRAX, Ki-Ra Studios, NAMTAR and PULSE
          — are operated by {LEGAL.entity}, {LEGAL.form} (
          <strong>&ldquo;SATCORP&rdquo;</strong>,{" "}
          <strong>&ldquo;we&rdquo;</strong>, <strong>&ldquo;us&rdquo;</strong>).
          {LEGAL.registration ? ` Registered as ${LEGAL.registration}.` : ""}
        </p>
        <p>
          The establishments are divisions of a single operation presented under
          distinct names. They are not separate legal entities, and a contract
          formed with any of them is a contract with {LEGAL.entity}.
        </p>
        <p>
          Legal notices, privacy requests and copyright complaints should be
          sent to <Mail />. Notices are treated as given on the day they are
          sent, unless sent outside business hours, in which case they are
          treated as given on the next business day.
        </p>
      </>
    ),
  },
  {
    id: "acceptance",
    title: "Acceptance, and changes to these terms",
    short:
      "Using the site means accepting these terms. If we change them materially, the date at the top moves and continued use is acceptance of the new version.",
    body: (
      <>
        <p>
          By accessing this site you agree to these Terms of Service and to the{" "}
          <ThreadLink href="/privacy">Privacy Policy</ThreadLink>, which is
          incorporated into these terms by reference. If you do not agree, do
          not use the site.
        </p>
        <p>
          We may revise these terms at any time. The revision date at the head of
          this document is authoritative. Material changes take effect when
          published, and your continued use of the site after that point is
          acceptance of the revised terms. Changes never apply retroactively to
          a dispute that arose before they were published, and they never vary a
          signed engagement agreement already in force.
        </p>
        <p>
          You are entering into these terms on your own behalf, and if you are
          doing so for an organisation, you confirm you are authorised to bind
          it. You must be at least 18 years old, or the age of majority where you
          live, whichever is higher.
        </p>
      </>
    ),
  },
  {
    id: "what-this-is",
    title: "What this site is, and what it is not",
    short:
      "It is a portfolio and a shop window. Nothing on it is an offer, a price, a guarantee, or professional advice.",
    body: (
      <>
        <p>
          This site presents the SATCORP ecosystem, describes services, and takes
          enquiries. Everything published on it is provided for general
          information.
        </p>
        <ul>
          <li>
            <strong>Nothing here is an offer capable of acceptance.</strong> The
            service entries in the Ledger, the retainer classes, the timelines
            and any figure shown are indicative ranges intended to orient a
            conversation. They are not quotations, and they do not bind either of
            us until a written engagement agreement is signed.
          </li>
          <li>
            <strong>Nothing here is professional advice.</strong> Statements
            about strategy, brand, technology or systems are commentary, not
            advice on which you should act without your own diligence.
          </li>
          <li>
            <strong>Forward-looking statements are not commitments.</strong>{" "}
            Projects marked <em>in development</em> or <em>in production</em> —
            including NAMTAR and the Ki-Ra Studios slate — describe present
            intent. Features, release dates, platforms and content may change or
            be abandoned entirely. Nothing about them constitutes a promise, a
            pre-order, or a solicitation of investment.
          </li>
          <li>
            <strong>Depictions are illustrative.</strong> Renders, prototypes,
            placeholder frames and interactive scenes represent work in progress
            or artistic direction rather than a finished product.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "permitted-use",
    title: "Permitted use of the site",
    short:
      "Read it, browse it, share links to it. Do not attack it, scrape it wholesale, or pass its work off as your own.",
    body: (
      <>
        <p>
          We grant you a personal, revocable, non-exclusive and
          non-transferable licence to access the site for your own
          non-commercial evaluation of our services. You may link to any public
          page.
        </p>
        <p>You agree that you will not, and will not attempt to:</p>
        <ul>
          <li>
            copy, reproduce, distribute, republish, sell or licence any part of
            the site or its content beyond what these terms allow;
          </li>
          <li>
            use automated means to harvest content, extract data at scale, or
            build a competing or derivative dataset, including scraping for the
            training of machine-learning models, except where a machine-readable
            directive on this site expressly permits it;
          </li>
          <li>
            circumvent, disable or test any rate limit, screening measure,
            security control or access restriction, including the measures that
            protect the engagement brief;
          </li>
          <li>
            submit false, misleading or impersonating information through any
            form, or submit briefs in bulk or by automated means;
          </li>
          <li>
            introduce malicious code, attempt unauthorised access to any system
            or account, or interfere with the operation or availability of the
            site;
          </li>
          <li>
            reverse engineer, decompile or attempt to derive the source of any
            part of the site except to the extent that restriction is
            unenforceable under applicable law;
          </li>
          <li>
            use the site in breach of any applicable law, or in a way that
            infringes the rights of anyone else.
          </li>
        </ul>
        <p>
          We may investigate suspected breaches and may involve law enforcement
          where the conduct warrants it.
        </p>
      </>
    ),
  },
  {
    id: "enquiries",
    title: "Enquiries and the Engagement Brief",
    short:
      "Sending a brief opens a conversation. It does not create a contract, reserve capacity, or oblige us to take the work.",
    body: (
      <>
        <p>
          The <ThreadLink href="/engage">Engagement Brief</ThreadLink> is an
          enquiry form. When you complete it we record what you send, issue you a
          reference, and aim to respond within twenty-four hours. That aim is a
          statement of ordinary practice, not a contractual service level.
        </p>
        <p>
          Submitting a brief creates no contract and no obligation on either
          side. We may decline any enquiry, for any reason or none, and we are
          not required to explain a decision to decline. Work begins only when
          scope, fees and timing are agreed in a written engagement agreement or
          statement of work signed or expressly confirmed in writing by both of
          us.
        </p>
        <p>
          You are responsible for what you put in a brief. Please do not send
          material you are not free to share. In particular, do not submit
          another party&rsquo;s confidential information, personal data about
          third parties, payment card details, passwords or credentials, or
          special-category personal data such as health or biometric
          information. Nothing you send through the form is treated as
          confidential unless a confidentiality agreement is already in place
          between us, although in practice we do not disclose the substance of
          an enquiry to anyone outside the people and services described in the{" "}
          <ThreadLink href="/privacy">Privacy Policy</ThreadLink>.
        </p>
        <p>
          The form applies automated screening to filter out automated
          submissions. These measures produce no legal or similarly significant
          effect on you, and a legitimate enquiry that is caught by them can be
          resent, or sent directly to <Mail />.
        </p>
      </>
    ),
  },
  {
    id: "engagement",
    title: "Terms of engagement for commissioned work",
    short:
      "These are the defaults for paid work. A signed statement of work overrides anything here that conflicts with it.",
    body: (
      <>
        <p>
          Where we agree to carry out work for you, this clause applies unless
          the signed engagement agreement says otherwise. Where the two conflict,
          the signed agreement prevails.
        </p>

        <h3>Scope and change</h3>
        <p>
          The agreed statement of work defines the deliverables, the number of
          revision rounds and the acceptance criteria. Anything not stated in it
          is out of scope. Requests beyond that scope are quoted and agreed
          separately before they are carried out, and may move agreed dates.
        </p>

        <h3>Fees, deposits and payment</h3>
        <ul>
          <li>
            Unless agreed otherwise, an engagement begins on payment of a
            non-refundable deposit of fifty per cent of the agreed fee, which
            reserves capacity and covers work commenced.
          </li>
          <li>
            The balance falls due on delivery, and in any event before final
            files, source assets or production credentials are released.
          </li>
          <li>
            Retainers are billed in advance for the agreed period, and unused
            time does not carry forward unless the agreement says so.
          </li>
          <li>
            Invoices are payable within fourteen days. Late sums may carry
            interest at one and a half per cent per month, or the maximum
            permitted by law if lower, and we may suspend work and withhold
            delivery while an invoice is overdue.
          </li>
          <li>
            Fees are exclusive of taxes, duties, third-party licence fees,
            hosting, domains, stock assets, fonts and platform charges, which are
            your responsibility unless expressly included.
          </li>
          <li>
            Payments are made in the currency stated on the invoice, and you bear
            any bank, transfer or currency-conversion charges.
          </li>
        </ul>

        <h3>Your materials, and your responsibilities</h3>
        <p>
          You will provide the content, assets, access and decisions the work
          depends on, in a timely way. You warrant that you own or are licensed
          to use everything you supply, and that our use of it as instructed will
          not infringe anyone&rsquo;s rights. Delay in providing materials,
          feedback or approvals moves the schedule, and a project left without
          response for sixty days may be treated as suspended, with restart
          subject to current availability and rates.
        </p>

        <h3>Intellectual property in the work</h3>
        <ul>
          <li>
            On receipt of all sums due, we assign to you the rights in the final
            deliverables prepared specifically for you, to the extent those
            rights are ours to assign.
          </li>
          <li>
            We retain ownership of everything pre-existing: our tools,
            frameworks, components, code libraries, techniques, know-how and
            generic elements. Where those are embedded in a deliverable, you
            receive a perpetual, worldwide, non-exclusive licence to use them as
            part of it.
          </li>
          <li>
            Concepts, drafts and directions not selected remain ours.
          </li>
          <li>
            Third-party assets — fonts, stock, plugins, engines, models and
            libraries — are licensed to you on their own terms, not assigned, and
            it is your responsibility to maintain those licences.
          </li>
          <li>
            Until payment is made in full, any licence to use the deliverables is
            provisional and revocable.
          </li>
        </ul>

        <h3>Credit and portfolio rights</h3>
        <p>
          We may identify you as a client and display the work in a portfolio,
          case study or showreel once it is public, unless you tell us in writing
          not to. We will not disclose confidential details, figures or
          unpublished material in doing so, and we will remove published work
          from our portfolio on written request.
        </p>

        <h3>Artificial intelligence in production</h3>
        <p>
          Some services described on this site use generative tools as part of
          the production pipeline. Where that is the case for your engagement we
          will tell you, and you should be aware that the intellectual-property
          status of purely machine-generated output is unsettled in several
          jurisdictions. We do not warrant that such output attracts copyright
          protection, and we exercise human authorship and review over
          deliverables where that protection matters.
        </p>

        <h3>Cancellation</h3>
        <p>
          Either of us may terminate an engagement on written notice. On
          termination you pay for all work performed to that date and for
          committed third-party costs. Deposits are not refundable. Where you are
          a consumer, any statutory right of cancellation you have is unaffected
          by this clause, and where you ask us to begin work inside a statutory
          cancellation period you may be required to pay for what has been done
          if you then cancel.
        </p>
      </>
    ),
  },
  {
    id: "site-ip",
    title: "Intellectual property in the site",
    short:
      "The names, marks, copy, code, 3D scenes and design of this site are ours. Using them is not included with reading them.",
    body: (
      <>
        <p>
          The SATCORP name, the establishment names ANU, KYRAX, Ki-Ra Studios,
          NAMTAR and PULSE, the monogram and seal, and all text, design, layout,
          typography, imagery, models, shaders, animation and source code on this
          site are owned by {LEGAL.entity} or used under licence, and are
          protected by copyright, trade mark and other laws.
        </p>
        <p>
          No right or licence is granted in them by implication, estoppel or
          otherwise. You may quote short extracts for review, commentary or
          reporting with attribution and a link, which is the ordinary scope of
          fair use or fair dealing, and nothing beyond that without our written
          permission.
        </p>
        <p>
          Third-party names and marks appearing on the site are the property of
          their respective owners, and their appearance does not imply
          endorsement or affiliation.
        </p>
      </>
    ),
  },
  {
    id: "your-content",
    title: "What you send us",
    short:
      "You keep ownership of what you send. You give us the permission we need to read it, act on it, and use any suggestion you volunteer.",
    body: (
      <>
        <p>
          You retain ownership of material you submit through the brief or send
          to us. You grant us a non-exclusive, worldwide, royalty-free licence to
          store, reproduce and use that material for the purpose of assessing
          your enquiry, responding to you, and performing any engagement that
          follows.
        </p>
        <p>
          If you volunteer feedback, ideas or suggestions about our services or
          this site, we may use them without restriction, attribution or payment.
          This does not apply to your confidential business information, and it
          is not a licence to your project.
        </p>
      </>
    ),
  },
  {
    id: "third-parties",
    title: "Third-party services and links",
    short:
      "This site depends on other companies, and links to places we do not control.",
    body: (
      <>
        <p>
          The site is hosted and delivered by third-party infrastructure
          providers, and enquiry notifications are delivered by third-party email
          and messaging services. Those services are described in the{" "}
          <ThreadLink href="/privacy">Privacy Policy</ThreadLink>. We choose them
          with care, but we do not control them and are not responsible for their
          acts or omissions beyond our own obligations under applicable data
          protection law.
        </p>
        <p>
          Links to external sites are provided for convenience. We do not endorse
          them, we do not control their content or their handling of your data,
          and visiting them is at your own risk under their own terms.
        </p>
      </>
    ),
  },
  {
    id: "availability",
    title: "Availability and changes to the site",
    short:
      "The site is provided as it is, when it is. We may change or withdraw any part of it.",
    body: (
      <>
        <p>
          We do not guarantee that the site will be available uninterrupted or
          error-free. Access may be suspended, withdrawn or restricted for
          maintenance, for security, or for business reasons, generally without
          notice.
        </p>
        <p>
          The site makes heavy use of real-time three-dimensional rendering and
          adapts what it delivers to the capability of your device. Presentation
          therefore differs between devices by design, and reduced-motion and
          reduced-capability presentations carry the same content. We do not
          warrant that every feature will function on every browser, device or
          configuration.
        </p>
        <p>
          You are responsible for the arrangements needed to access the site, and
          for making sure everyone accessing it through your connection is aware
          of these terms.
        </p>
      </>
    ),
  },
  {
    id: "disclaimers",
    title: "Disclaimers",
    short:
      "The site is provided as-is. Where the law lets us exclude warranties, we do; where it does not, we do not try.",
    body: (
      <>
        <p className="conspicuous">
          To the fullest extent permitted by law, the site and all content on it
          are provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo;, and
          SATCORP disclaims all warranties, express, implied or statutory,
          including any implied warranties of merchantability, satisfactory
          quality, fitness for a particular purpose, title, accuracy and
          non-infringement.
        </p>
        <p>
          We do not warrant that the content of the site is accurate, complete or
          current, that defects will be corrected, or that the site or the
          servers that deliver it are free of harmful components.
        </p>
        <p>
          Nothing in these terms excludes or limits liability for death or
          personal injury caused by negligence, for fraud or fraudulent
          misrepresentation, or for any other liability that cannot lawfully be
          excluded or limited. Some jurisdictions do not allow the exclusion of
          implied warranties, so parts of this clause may not apply to you, and
          if you are a consumer your statutory rights are unaffected.
        </p>
      </>
    ),
  },
  {
    id: "liability",
    title: "Limitation of liability",
    short:
      "We are not liable for indirect or consequential loss, and our total liability is capped at what you paid us in the preceding twelve months, or one hundred US dollars if you paid us nothing.",
    body: (
      <>
        <p className="conspicuous">
          To the fullest extent permitted by law, SATCORP will not be liable for
          any indirect, incidental, special, consequential, exemplary or punitive
          damages, nor for loss of profit, revenue, business, goodwill,
          anticipated savings, data or reputation, however caused and whether or
          not the possibility of that loss was known.
        </p>
        <p className="conspicuous">
          SATCORP&rsquo;s total aggregate liability arising out of or in
          connection with the site, these terms, and any engagement, whether in
          contract, tort including negligence, breach of statutory duty or
          otherwise, is limited to the total fees you paid to SATCORP in the
          twelve months preceding the event giving rise to the claim, or one
          hundred United States dollars, whichever is greater.
        </p>
        <p>
          These limits apply to the fullest extent permitted by law, and apply
          even if a limited remedy is found to have failed of its essential
          purpose. They do not apply to the liabilities described at the end of
          the clause above, which cannot lawfully be excluded. Some jurisdictions
          do not allow the exclusion or limitation of certain damages, so parts
          of this clause may not apply to you.
        </p>
        <p>
          Each of us is responsible for our own compliance obligations. We are
          not liable for a failure to perform caused by an event outside our
          reasonable control, including infrastructure or platform outages,
          network failure, industrial action, civil disruption, act of
          government, or natural event.
        </p>
      </>
    ),
  },
  {
    id: "indemnity",
    title: "Indemnity",
    short:
      "If your material or your misuse of the site causes a claim against us, you cover it.",
    body: (
      <p>
        You agree to indemnify and hold harmless {LEGAL.entity} and anyone acting
        on its behalf against any claim, liability, loss, damage, cost and
        reasonable legal fees arising from your use of the site in breach of
        these terms, from your breach of applicable law, or from any material you
        supply to us infringing the rights of a third party. We will notify you
        of any such claim, allow you to control its defence with counsel
        reasonable to us, and cooperate at your expense, and you will not settle
        anything that imposes an obligation on us without our written consent.
      </p>
    ),
  },
  {
    id: "termination",
    title: "Suspension and termination",
    short: "We can withdraw access to the site. The clauses that should survive, do.",
    body: (
      <>
        <p>
          We may suspend or terminate your access to the site immediately and
          without notice if we reasonably believe you have breached these terms
          or that your conduct threatens the site, its data or another person.
        </p>
        <p>
          Termination does not affect any right or liability that has already
          accrued. The clauses covering intellectual property, what you send us,
          disclaimers, limitation of liability, indemnity, governing law and this
          clause survive termination.
        </p>
      </>
    ),
  },
  {
    id: "law",
    title: "Governing law and disputes",
    short: `${governingLaw().replace(/^the /, "The ")} governs. Talk to us first — most things end there.`,
    body: (
      <>
        <p>
          These terms, and any dispute or claim arising out of or in connection
          with them or their subject matter, are governed by {governingLaw()},
          without regard to conflict-of-laws principles. The United Nations
          Convention on Contracts for the International Sale of Goods does not
          apply.
        </p>
        <p>
          <strong>Talk to us first.</strong> Before commencing proceedings, you
          agree to raise the dispute with us in writing at <Mail /> and to allow
          thirty days for us to resolve it. Most disputes end at this stage, and
          it costs neither of us anything to try.
        </p>
        <p>
          If a dispute is not resolved that way, you and we submit to the
          exclusive jurisdiction of {governingForum()}. Nothing prevents either
          of us from seeking injunctive relief in any competent court to protect
          intellectual property or confidential information.
        </p>
        <p>
          <strong>If you are a consumer</strong> resident in the European Union,
          the United Kingdom, or another jurisdiction whose law gives you
          non-waivable protections, nothing in this clause deprives you of them.
          You keep the benefit of the mandatory consumer-protection rules of your
          country of residence, and you may bring proceedings in the courts of
          that country. Consumers in the European Union may also use the
          national alternative dispute resolution and consumer-complaint bodies
          available where they live.
        </p>
        <p>
          Any claim must be brought within one year of the events giving rise to
          it, or the longest shorter period that applicable law permits to be
          agreed. Disputes are resolved individually, and you and we each waive
          any right to bring or participate in a class, collective or
          representative action, to the extent that waiver is permitted where you
          live.
        </p>
      </>
    ),
  },
  {
    id: "copyright",
    title: "Copyright complaints",
    short:
      "If something here infringes your copyright, tell us and we will deal with it.",
    body: (
      <>
        <p>
          We respect intellectual property and expect the same. If you believe
          material on this site infringes your copyright, send a notice to{" "}
          <Mail /> containing:
        </p>
        <ol>
          <li>
            your physical or electronic signature, and your contact details;
          </li>
          <li>
            identification of the work you say is infringed, and of the material
            on this site you say infringes it, with a URL;
          </li>
          <li>
            a statement that you believe in good faith that the use is not
            authorised by the owner, its agent or the law;
          </li>
          <li>
            a statement, made under penalty of perjury, that the information in
            your notice is accurate and that you are the owner or authorised to
            act for the owner.
          </li>
        </ol>
        <p>
          We will investigate promptly and remove or disable material where the
          complaint is substantiated. Knowingly making a material
          misrepresentation in such a notice can carry liability for damages
          under section 512(f) of the United States Copyright Act.
        </p>
      </>
    ),
  },
  {
    id: "export",
    title: "Export controls and sanctions",
    short:
      "You confirm you are not somewhere, or someone, that we are prohibited from dealing with.",
    body: (
      <p>
        You represent that you are not located in a country subject to a
        comprehensive United States embargo, that you are not named on any United
        States, United Kingdom, European Union or United Nations restricted-party
        or sanctions list, and that you will not use the site or any deliverable
        in breach of applicable export-control or sanctions law. We may decline
        or terminate any engagement on that basis.
      </p>
    ),
  },
  {
    id: "accessibility",
    title: "Accessibility",
    short:
      "We build for reduced motion and assistive technology, and we want to hear about it when we fall short.",
    body: (
      <>
        <p>
          We aim to meet the Web Content Accessibility Guidelines 2.2 at level
          AA. The site honours the operating-system reduced-motion preference,
          and every animated or three-dimensional presentation has a
          reduced-motion counterpart carrying identical content. Redaction
          effects are presentation only, and the underlying text is always
          present for assistive technology.
        </p>
        <p>
          Accessibility is never finished. If any part of this site presents a
          barrier to you, write to <Mail /> describing the page and the
          difficulty, and we will address it and give you the information you
          were seeking by another means in the meantime.
        </p>
      </>
    ),
  },
  {
    id: "general",
    title: "General",
    short: "The usual machinery that keeps the rest of it working.",
    body: (
      <>
        <p>
          <strong>Entire agreement.</strong> These terms, the Privacy Policy and
          any signed engagement agreement are the whole agreement between us on
          their subject matter and replace anything said before. Neither of us
          relies on any statement not set out in them, though nothing excludes
          liability for fraudulent misrepresentation.
        </p>
        <p>
          <strong>Severability.</strong> If any provision is found unenforceable,
          it is modified to the minimum extent needed to make it enforceable, or
          severed if it cannot be, and the rest continues in force.
        </p>
        <p>
          <strong>No waiver.</strong> A delay or failure to enforce any provision
          is not a waiver of it.
        </p>
        <p>
          <strong>Assignment.</strong> You may not assign or transfer your rights
          under these terms without our written consent. We may assign ours on
          notice to you, including on incorporation of the business or on a sale
          or reorganisation, provided your rights are not diminished.
        </p>
        <p>
          <strong>No partnership.</strong> Nothing in these terms creates a
          partnership, joint venture, agency or employment relationship between
          us.
        </p>
        <p>
          <strong>Third parties.</strong> No one other than you and us has any
          right to enforce these terms.
        </p>
        <p>
          <strong>Language.</strong> These terms are written in English, and the
          English version prevails over any translation.
        </p>
        <p>
          <strong>Questions.</strong> Anything unclear in this document is worth
          asking about before it matters. Write to <Mail />.
        </p>
      </>
    ),
  },
];

export default function TermsPage() {
  return (
    <LegalDocument
      fileNumber="FILE 01 — TERMS"
      title="Terms of Service"
      lede={
        <>
          The terms on which this site is made available, and the defaults that
          govern work commissioned through it. Written to be read, not to be
          survived.
        </>
      }
      sections={SECTIONS}
    />
  );
}
