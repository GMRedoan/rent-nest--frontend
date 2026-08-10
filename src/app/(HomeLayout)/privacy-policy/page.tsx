import {
    ArrowRight,
    CheckCircle2,
    Database,
    Eye,
    LockKeyhole,
    Mail,
    ShieldCheck,
    UserRound,
} from "lucide-react";
import Link from "next/link";
import { sections } from "./_components/section";

export const metadata = {
    title: "Privacy Policy | RentNest",
    description:
        "Learn how RentNest collects, uses, protects, and manages your personal information.",
};

export default function PrivacyPolicyPage() {
    return (
        <main className="min-h-screen bg-background">

            {/* Hero */}
            <section className="relative overflow-hidden border-b">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,hsl(var(--primary)/0.12),transparent_35%)]" />

                <div className="container relative py-20 md:py-28">
                    <div className="max-w-3xl">
                        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm font-medium text-primary">
                            <ShieldCheck className="h-4 w-4" />
                            Your privacy matters
                        </div>

                        <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
                            Privacy Policy
                        </h1>

                        <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
                            At RentNest, we believe finding and renting a
                            property should be simple, secure, and transparent.
                            This policy explains how we handle the information
                            you share with us.
                        </p>

                        <p className="mt-6 text-sm text-muted-foreground">
                            Last updated: August 11, 2026
                        </p>
                    </div>
                </div>
            </section>

            {/* Main */}
            <section className="container py-14 md:py-20">
                <div className="grid gap-12 lg:grid-cols-[240px_1fr]">

                    {/* Navigation */}
                    <aside className="hidden lg:block">
                        <div className="sticky top-24 rounded-2xl border bg-card p-5">
                            <p className="mb-4 text-sm font-semibold">
                                On this page
                            </p>

                            <nav className="space-y-1">
                                {sections.map((section) => (
                                    <a
                                        key={section.id}
                                        href={`#${ section.id } `}
                                        className="block rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-primary/5 hover:text-primary"
                                    >
                                        {section.title}
                                    </a>
                                ))}
                            </nav>
                        </div>
                    </aside>

                    {/* Content */}
                    <article className="max-w-4xl space-y-14">

                        {/* Introduction */}
                        <div className="rounded-3xl border border-primary/20 bg-primary/5 p-6 md:p-8">
                            <div className="flex gap-4">
                                <ShieldCheck className="mt-1 h-6 w-6 shrink-0 text-primary" />

                                <div>
                                    <h2 className="text-xl font-semibold">
                                        Our commitment
                                    </h2>

                                    <p className="mt-3 leading-7 text-muted-foreground">
                                        We collect only the information needed
                                        to provide and improve our rental
                                        services. We aim to handle your
                                        information responsibly and provide
                                        transparency about how it is used.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* 01 */}
                        <section id="information">
                            <SectionNumber number="01" />

                            <h2 className="mt-3 text-2xl font-bold md:text-3xl">
                                Information We Collect
                            </h2>

                            <p className="mt-4 leading-8 text-muted-foreground">
                                When you use RentNest, we may collect information
                                that helps us provide our services and maintain
                                your account.
                            </p>

                            <div className="mt-6 grid gap-4 sm:grid-cols-2">
                                <InfoItem
                                    icon={UserRound}
                                    title="Account Information"
                                    description="Name, email address, phone number, profile photo, and account details."
                                />

                                <InfoItem
                                    icon={Database}
                                    title="Property Information"
                                    description="Property details, location, pricing, images, availability, and rental information."
                                />

                                <InfoItem
                                    icon={Eye}
                                    title="Usage Information"
                                    description="Interactions with our platform, pages visited, and basic technical information."
                                />

                                <InfoItem
                                    icon={Mail}
                                    title="Communication"
                                    description="Information you provide when contacting us or communicating through the platform."
                                />
                            </div>
                        </section>

                        {/* 02 */}
                        <section id="usage">
                            <SectionNumber number="02" />

                            <h2 className="mt-3 text-2xl font-bold md:text-3xl">
                                How We Use Your Information
                            </h2>

                            <p className="mt-4 leading-8 text-muted-foreground">
                                We use collected information to operate RentNest,
                                connect tenants and landlords, and improve the
                                experience of our users.
                            </p>

                            <ul className="mt-6 space-y-4">
                                <ListItem>
                                    Create and manage your account.
                                </ListItem>

                                <ListItem>
                                    Help tenants discover and request rental
                                    properties.
                                </ListItem>

                                <ListItem>
                                    Help landlords manage properties and rental
                                    requests.
                                </ListItem>

                                <ListItem>
                                    Process and communicate information related
                                    to services and transactions.
                                </ListItem>

                                <ListItem>
                                    Improve the security, functionality, and
                                    performance of our platform.
                                </ListItem>

                                <ListItem>
                                    Communicate important updates about your
                                    account or our services.
                                </ListItem>
                            </ul>
                        </section>

                        {/* 03 */}
                        <section id="sharing">
                            <SectionNumber number="03" />

                            <h2 className="mt-3 text-2xl font-bold md:text-3xl">
                                Information Sharing
                            </h2>

                            <p className="mt-4 leading-8 text-muted-foreground">
                                RentNest does not sell your personal information.
                                Information may be shared when necessary to
                                provide a service, complete a transaction,
                                protect users, or comply with applicable legal
                                requirements.
                            </p>

                            <div className="mt-6 rounded-2xl border bg-card p-6">
                                <p className="font-semibold">
                                    Examples may include:
                                </p>

                                <ul className="mt-4 space-y-3 text-sm leading-7 text-muted-foreground">
                                    <li>
                                        • Sharing relevant tenant information
                                        with a landlord when a rental request
                                        requires it.
                                    </li>
                                    <li>
                                        • Using trusted service providers that
                                        help operate our platform.
                                    </li>
                                    <li>
                                        • Disclosing information when required
                                        by law or to protect our users and
                                        platform.
                                    </li>
                                </ul>
                            </div>
                        </section>

                        {/* 04 */}
                        <section id="security">
                            <SectionNumber number="04" />

                            <h2 className="mt-3 text-2xl font-bold md:text-3xl">
                                Data Security
                            </h2>

                            <p className="mt-4 leading-8 text-muted-foreground">
                                We take reasonable technical and organizational
                                measures to protect your information from
                                unauthorized access, misuse, alteration, or
                                disclosure.
                            </p>

                            <div className="mt-6 flex gap-4 rounded-2xl border border-green-500/20 bg-green-500/5 p-6">
                                <LockKeyhole className="h-6 w-6 shrink-0 text-green-600" />

                                <div>
                                    <h3 className="font-semibold">
                                        Security is an ongoing process
                                    </h3>

                                    <p className="mt-2 text-sm leading-7 text-muted-foreground">
                                        No online service can guarantee absolute
                                        security. We continuously work to improve
                                        the safeguards used to protect your
                                        information.
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* 05 */}
                        <section id="cookies">
                            <SectionNumber number="05" />

                            <h2 className="mt-3 text-2xl font-bold md:text-3xl">
                                Cookies & Similar Technologies
                            </h2>

                            <p className="mt-4 leading-8 text-muted-foreground">
                                RentNest may use cookies and similar technologies
                                to keep users signed in, remember preferences,
                                understand platform usage, and improve the
                                overall experience.
                            </p>
                        </section>

                        {/* 06 */}
                        <section id="rights">
                            <SectionNumber number="06" />

                            <h2 className="mt-3 text-2xl font-bold md:text-3xl">
                                Your Rights
                            </h2>

                            <p className="mt-4 leading-8 text-muted-foreground">
                                Depending on applicable law, you may have rights
                                regarding your personal information, including
                                requesting access, correction, deletion, or
                                information about how your data is handled.
                            </p>

                            <p className="mt-4 leading-8 text-muted-foreground">
                                You can contact us if you would like to make a
                                privacy-related request.
                            </p>
                        </section>

                        {/* 07 */}
                        <section id="retention">
                            <SectionNumber number="07" />

                            <h2 className="mt-3 text-2xl font-bold md:text-3xl">
                                Data Retention
                            </h2>

                            <p className="mt-4 leading-8 text-muted-foreground">
                                We retain information for as long as reasonably
                                necessary to provide our services, maintain
                                legitimate business records, resolve disputes,
                                enforce agreements, and meet applicable legal
                                obligations.
                            </p>
                        </section>

                        {/* 08 */}
                        <section id="contact">
                            <SectionNumber number="08" />

                            <h2 className="mt-3 text-2xl font-bold md:text-3xl">
                                Contact Us
                            </h2>

                            <p className="mt-4 leading-8 text-muted-foreground">
                                If you have questions about this Privacy Policy
                                or how your information is handled, please get
                                in touch with the RentNest team.
                            </p>

                            <div className="mt-6 flex flex-col gap-5 rounded-3xl border bg-muted/40 p-6 sm:flex-row sm:items-center sm:justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                                        <Mail className="h-5 w-5" />
                                    </div>

                                    <div>
                                        <p className="font-semibold">
                                            Have a privacy question?
                                        </p>

                                        <p className="text-sm text-muted-foreground">
                                            Contact our support team.
                                        </p>
                                    </div>
                                </div>

                                <Link
                                    href="/contact"
                                    className="inline-flex items-center gap-2 font-semibold text-primary hover:underline"
                                >
                                    Contact Us
                                    <ArrowRight className="h-4 w-4" />
                                </Link>
                            </div>
                        </section>

                    </article>
                </div>
            </section>
        </main>
    );
}

function SectionNumber({ number }: { number: string }) {
    return (
        <span className="text-sm font-bold tracking-[0.25em] text-primary">
            {number}
        </span>
    );
}

function ListItem({ children }: { children: React.ReactNode }) {
    return (
        <li className="flex gap-3 leading-7 text-muted-foreground">
            <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-primary" />
            <span>{children}</span>
        </li>
    );
}

function InfoItem({
    icon: Icon,
    title,
    description,
}: {
    icon: React.ElementType;
    title: string;
    description: string;
}) {
    return (
        <div className="rounded-2xl border bg-card p-5 transition-all duration-300 hover:border-primary/30 hover:shadow-md">
            <Icon className="h-6 w-6 text-primary" />

            <h3 className="mt-4 font-semibold">
                {title}
            </h3>

            <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {description}
            </p>
        </div>
    );
}
 