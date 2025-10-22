import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { JSX, SVGProps } from "react"

export default function LandingPage() {
  return (
    <div className="flex min-h-[100dvh] flex-col bg-background text-foreground">
      <main className="flex-1">
        <section className="w-full bg-background py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid items-center gap-10 lg:grid-cols-[1fr_420px] xl:grid-cols-[1fr_520px]">
              <div className="flex flex-col justify-center space-y-6">
                <div className="inline-flex w-fit items-center rounded-full border border-primary/40 bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                  We Aren&apos;t Asking... Anymore.
                </div>
                <div className="space-y-4">
                  <h1 className="text-3xl font-bold tracking-tight text-primary sm:text-5xl xl:text-6xl/none">
                    Make corruption incompatible with reality.
                  </h1>
                  <p className="max-w-[640px] text-muted-foreground md:text-xl">
                    Nora&apos;s Law is a grassroots platform that turns testimony into mathematical proof. We leverage
                    data sovereignty, AI pattern analysis, and statistical certainty to help victims achieve justice
                    without relying on those in power.
                  </p>
                </div>
                <ul className="grid gap-2 text-sm text-muted-foreground sm:max-w-[520px]">
                  <li className="flex items-start gap-2">
                    <span className="mt-1 inline-flex h-2 w-2 rounded-full bg-primary" />
                    Victim-owned data collective that preserves every story and keeps control with the people who lived
                    it.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 inline-flex h-2 w-2 rounded-full bg-primary" />
                    AI-driven pattern recognition that connects incidents across decades, geographies, and institutions.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 inline-flex h-2 w-2 rounded-full bg-primary" />
                    Statistical analysis that reveals corruption as a mathematical improbability, not just a rhetorical claim.
                  </li>
                </ul>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
                    Share Your Story
                  </Button>
                  <Button
                    variant="outline"
                    className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                  >
                    Explore the Platform
                  </Button>
                </div>
              </div>
              <div className="relative mx-auto w-full max-w-[420px]">
                <div className="rounded-3xl border border-primary/20 bg-primary/5 p-10 text-center shadow-lg shadow-primary/10">
                  <NetworkIcon className="mx-auto h-32 w-32 text-primary" />
                  <p className="mt-6 text-lg font-semibold text-primary">
                    Truth, proven through mathematics. Power, rendered obsolete.
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Every contribution strengthens a decentralized archive that institutions cannot silence.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full bg-muted py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-background px-3 py-1 text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                  Why Nora&apos;s Law Exists
                </div>
                <h2 className="text-3xl font-bold tracking-tight sm:text-5xl">Corruption persists when truth is fragmented.</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Statutes of limitation, jurisdictional walls, and institutional gatekeeping were designed to erase
                  evidence and isolate victims. We dissolve those barriers by connecting every testimony, every document,
                  and every historical data point into a single, unstoppable narrative.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-10">
              <Card className="h-full">
                <CardContent className="flex h-full flex-col items-center justify-center gap-4 p-6 text-center">
                  <div className="rounded-full bg-primary p-4 text-primary-foreground">
                    <FragmentIcon className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-semibold">Isolated Stories</h3>
                  <p className="text-muted-foreground">
                    Survivors are dismissed as circumstantial because their voices are kept apart. We preserve and align
                    them into undeniable patterns.
                  </p>
                </CardContent>
              </Card>
              <Card className="h-full">
                <CardContent className="flex h-full flex-col items-center justify-center gap-4 p-6 text-center">
                  <div className="rounded-full bg-primary p-4 text-primary-foreground">
                    <TimerIcon className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-semibold">Time as a Barrier</h3>
                  <p className="text-muted-foreground">
                    Statutes of limitation bury accountability. Our historical forensics revive decades of suppressed
                    evidence in seconds.
                  </p>
                </CardContent>
              </Card>
              <Card className="h-full">
                <CardContent className="flex h-full flex-col items-center justify-center gap-4 p-6 text-center">
                  <div className="rounded-full bg-primary p-4 text-primary-foreground">
                    <ShieldIcon className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-semibold">Institutional Barriers</h3>
                  <p className="text-muted-foreground">
                    Systems protect themselves by controlling narratives. We decentralize proof so no one can close the
                    door on truth.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section className="w-full bg-background py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                  Mission &amp; Promise
                </div>
                <h2 className="text-3xl font-bold tracking-tight sm:text-5xl">
                  We eradicate systemic abuse through mathematical certainty.
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Nora&apos;s Law serves victims only. We are a nonprofit, grassroots guerrilla movement that creates
                  tools outside institutional control, amplifying voices with proof instead of petitions.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-stretch gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              <Card className="h-full">
                <CardContent className="flex h-full flex-col gap-4 p-6">
                  <div className="rounded-full bg-primary/15 p-3">
                    <HeartHandsIcon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">Serve Victims Only</h3>
                  <p className="text-muted-foreground">
                    Our allegiance is to survivors. We never sell insights to institutions or entities in power. Data
                    sovereignty is non-negotiable.
                  </p>
                </CardContent>
              </Card>
              <Card className="h-full">
                <CardContent className="flex h-full flex-col gap-4 p-6">
                  <div className="rounded-full bg-primary/15 p-3">
                    <SignalIcon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">Grassroots Infrastructure</h3>
                  <p className="text-muted-foreground">
                    We build parallel systems that decentralize evidence. Power cannot co-opt what it does not own or
                    control.
                  </p>
                </CardContent>
              </Card>
              <Card className="h-full md:col-span-2 lg:col-span-1">
                <CardContent className="flex h-full flex-col gap-4 p-6">
                  <div className="rounded-full bg-primary/15 p-3">
                    <SparkIcon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">Mathematics Over Negotiation</h3>
                  <p className="text-muted-foreground">
                    We calculate statistical improbabilities of innocence. When proof is algorithmic, corruption cannot
                    hide behind rhetoric.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section className="w-full bg-muted py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-background px-3 py-1 text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                  How The Platform Works
                </div>
                <h2 className="text-3xl font-bold tracking-tight sm:text-5xl">Proof generated in four key steps.</h2>
                <p className="max-w-[860px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  From intake to impact, every layer of Nora&apos;s Law reinforces the next. Testimony fuels the data
                  collective, AI surfaces patterns, mathematical forensics produce proof, and public exposure forces
                  change.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-4">
              <Card>
                <CardContent className="flex h-full flex-col gap-3 p-6">
                  <div className="rounded-full bg-primary/15 p-3">
                    <DatabaseIcon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold">Data Sovereignty</h3>
                  <p className="text-sm text-muted-foreground">
                    Secure, victim-owned submissions create a resilient archive immune to institutional tampering.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex h-full flex-col gap-3 p-6">
                  <div className="rounded-full bg-primary/15 p-3">
                    <MapNodesIcon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold">Pattern Intelligence</h3>
                  <p className="text-sm text-muted-foreground">
                    AI cross-references time, geography, actors, and institutions to surface recurring behaviors with
                    forensic precision.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex h-full flex-col gap-3 p-6">
                  <div className="rounded-full bg-primary/15 p-3">
                    <CalculatorIcon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold">Statistical Proof</h3>
                  <p className="text-sm text-muted-foreground">
                    Variance scoring and probability thresholds quantify the impossibility of coincidence.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex h-full flex-col gap-3 p-6">
                  <div className="rounded-full bg-primary/15 p-3">
                    <BeaconIcon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold">Public Exposure</h3>
                  <p className="text-sm text-muted-foreground">
                    Visualizations, reports, and alerts make denial impossible and mobilize communities for action.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section className="w-full bg-background py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                  The Platform Suite
                </div>
                <h2 className="text-3xl font-bold tracking-tight sm:text-5xl">
                  Technology designed to expose what exploitation tries to hide.
                </h2>
                <p className="max-w-[880px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Nora&apos;s Law unifies specialized tools that transform raw testimony into cases, evidence, and
                  immediate action. Each module was engineered to eliminate a barrier survivors face.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-6xl gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              <Card className="h-full">
                <CardContent className="flex h-full flex-col gap-4 p-6">
                  <div className="rounded-full bg-primary/15 p-3">
                    <FileSearchIcon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">Document Analyzer</h3>
                  <p className="text-muted-foreground">
                    Upload records, transcripts, and filings. Our AI extracts actors, timelines, and indicators of abuse
                    to feed the shared knowledge base.
                  </p>
                </CardContent>
              </Card>
              <Card className="h-full">
                <CardContent className="flex h-full flex-col gap-4 p-6">
                  <div className="rounded-full bg-primary/15 p-3">
                    <WorkflowIcon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">Case Builder</h3>
                  <p className="text-muted-foreground">
                    Assemble cross-jurisdictional timelines and evidence packages that visualize system-wide patterns
                    and support collective action.
                  </p>
                </CardContent>
              </Card>
              <Card className="h-full md:col-span-2 lg:col-span-1">
                <CardContent className="flex h-full flex-col gap-4 p-6">
                  <div className="rounded-full bg-primary/15 p-3">
                    <ChatSparkIcon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">Legal Assistant</h3>
                  <p className="text-muted-foreground">
                    Navigate statutes, rights, and next steps with AI that contextualizes law against the evidence in
                    the Nora&apos;s Law database.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section className="w-full bg-muted py-12 md:py-24 lg:py-32">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl/tight">
                This is not reform. This is accountability.
              </h2>
              <p className="mx-auto max-w-[640px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                We don&apos;t petition for visibility — we engineer it. When corruption must argue against mathematics,
                its defenses weaken. Join the movement building tools power cannot ignore.
              </p>
            </div>
            <div className="flex flex-col gap-2 justify-center min-[400px]:flex-row">
              <Button className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
                Join the Movement
              </Button>
              <Button
                variant="outline"
                className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              >
                Read the Mission
              </Button>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex w-full shrink-0 flex-col items-center gap-2 border-t px-4 py-6 sm:flex-row md:px-6">
        <p className="text-xs text-muted-foreground">© 2024 Nora&apos;s Law. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <a href="#" className="text-xs hover:underline underline-offset-4">
            Terms of Service
          </a>
          <a href="#" className="text-xs hover:underline underline-offset-4">
            Privacy
          </a>
        </nav>
      </footer>
    </div>
  )
}

function FragmentIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15.5 22v-5.5" />
      <path d="M12 16.5h-1.5" />
      <path d="M2 11.5h1.5" />
      <path d="M20.5 11.5H22" />
      <path d="M18 14.5h1.5" />
      <path d="M15.5 11.5h1.5" />
      <path d="M12 8.5h1.5" />
      <path d="M8.5 11.5h1.5" />
      <path d="M8.5 2v5.5" />
      <path d="M12 2v1.5" />
      <path d="M2 8.5h5.5" />
      <path d="M20.5 8.5H22" />
      <path d="M18 5.5h1.5" />
      <path d="M15.5 8.5h1.5" />
      <path d="M8.5 5.5h1.5" />
    </svg>
  )
}

function NetworkIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="16" y="16" width="6" height="6" rx="1" />
      <rect x="2" y="16" width="6" height="6" rx="1" />
      <rect x="9" y="2" width="6" height="6" rx="1" />
      <path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3" />
      <path d="M12 12V8" />
    </svg>
  )
}

function ShieldIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
    </svg>
  )
}

function TimerIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="10" x2="14" y1="2" y2="2" />
      <line x1="12" x2="12" y1="14" y2="18" />
      <path d="M19 11a7 7 0 1 0-7 7" />
      <path d="M12 2v4" />
      <path d="M12 8a4 4 0 0 0-4 4" />
    </svg>
  )
}

function HeartHandsIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 21.5s-7-4-7-10V6l7-3 7 3v5" />
      <path d="M10 13a3 3 0 0 1 4 0l3 3" />
      <path d="M14 17h6" />
      <path d="m17 14 3 3-3 3" />
    </svg>
  )
}

function SignalIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 20h.01" />
      <path d="M7 20v-4" />
      <path d="M12 20v-8" />
      <path d="M17 20V7" />
      <path d="M22 4v16" />
    </svg>
  )
}

function SparkIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m5 3-2 3" />
      <path d="m19 3 2 3" />
      <path d="m5 21-2-3" />
      <path d="m19 21 2-3" />
      <path d="M9 7h6l1 5-4 2-4-2z" />
      <path d="M10 12.5 9 17l3 2 3-2-1-4.5" />
    </svg>
  )
}

function DatabaseIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M3 5v6c0 1.7 4 3 9 3s9-1.3 9-3V5" />
      <path d="M3 11v6c0 1.7 4 3 9 3s9-1.3 9-3v-6" />
    </svg>
  )
}

function MapNodesIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="7" cy="5" r="2" />
      <circle cx="17" cy="5" r="2" />
      <circle cx="7" cy="19" r="2" />
      <circle cx="17" cy="19" r="2" />
      <path d="M7 7v10" />
      <path d="M17 7v10" />
      <path d="M9 5h6" />
      <path d="M9 19h6" />
    </svg>
  )
}

function CalculatorIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="4" y="2" width="16" height="20" rx="2" />
      <line x1="8" x2="16" y1="6" y2="6" />
      <rect x="8" y="10" width="3" height="3" rx="0.5" />
      <rect x="13" y="10" width="3" height="3" rx="0.5" />
      <rect x="8" y="15" width="3" height="3" rx="0.5" />
      <rect x="13" y="15" width="3" height="3" rx="0.5" />
    </svg>
  )
}

function BeaconIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2v4" />
      <path d="M10 6h4" />
      <path d="M8 10h8" />
      <path d="M6 14h12" />
      <path d="M4 18h16" />
      <path d="m8 22 4-6 4 6" />
    </svg>
  )
}

function FileSearchIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2H6a2 2 0 0 0-2 2v3" />
      <path d="M18 18v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-5" />
      <path d="m22 14-3-3h-1a2 2 0 0 0-2 2v1a2 2 0 0 0 2 2h4" />
      <path d="m5 11-3 3 3 3" />
      <path d="M9 2v4a2 2 0 0 0 2 2h5" />
      <path d="m21 14 .8.8a1.5 1.5 0 1 1-2.1 2.1L20 18" />
    </svg>
  )
}

function WorkflowIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
      <path d="M10 7h4" />
      <path d="M7 10v4" />
      <path d="M17 14v-4" />
      <path d="M14 17h-4" />
    </svg>
  )
}

function ChatSparkIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7 8h10" />
      <path d="M7 12h4" />
      <path d="M5 20v-2a4 4 0 0 1-4-4V6a4 4 0 0 1 4-4h14a4 4 0 0 1 4 4v8a4 4 0 0 1-4 4h-6l-4 4v-4" />
      <path d="m13 5 1.5-3L16 5" />
    </svg>
  )
}
