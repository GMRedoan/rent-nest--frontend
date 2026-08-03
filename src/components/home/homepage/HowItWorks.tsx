import {
    Search,
    Send,
    BadgeCheck,
    CreditCard,
    ArrowRight,
} from "lucide-react";
import Animate from "@/components/reusable/Animate";

const steps = [
    {
        icon: Search,
        title: "Browse Properties",
        description:
            "Explore verified rental properties by location, category, and price to find the perfect place.",
    },
    {
        icon: Send,
        title: "Send Request",
        description:
            "Choose your preferred property and submit a rental request directly to the landlord.",
    },
    {
        icon: BadgeCheck,
        title: "Get Approved",
        description:
            "The landlord reviews your request and approves it if the property is available and active.",
    },
    {
        icon: CreditCard,
        title: "Pay & Move In",
        description:
            "Complete your secure online payment through Stripe and start your new rental journey.",
    },
];

export default function HowItWorksSection() {
    return (
        <section className="py-24">
            <div className="container">
                {/* Heading */}
                <Animate type="fadeDown">
                    <div className="mx-auto mb-16 max-w-3xl text-center">
                        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
                            Simple Process
                        </p>

                        <h2 className="mt-3 text-4xl font-bold md:text-5xl">
                            How <span className="text-primary">RentNest</span> Works
                        </h2>

                        <p className="mt-5 text-lg leading-8 text-muted-foreground">
                            Renting your next home is simple. Follow these four
                            easy steps and enjoy a smooth, transparent rental
                            experience from start to finish.
                        </p>
                    </div>
                </Animate>

                {/* Steps */}
                <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
                    {steps.map((step, index) => (
                        <Animate
                            key={step.title}
                            type="fadeUp"
                            delay={index * 0.12}
                        >
                            <div className="group relative rounded-3xl border bg-background p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-primary hover:shadow-xl">
                                {/* Step Number */}
                                <div className="absolute right-6 top-6 text-5xl font-bold text-primary/50">
                                    0{index + 1}
                                </div>

                                {/* Icon */}
                                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 transition group-hover:bg-primary group-hover:text-white">
                                    <step.icon className="h-8 w-8 text-primary group-hover:text-white" />
                                </div>

                                {/* Content */}
                                <h3 className="mt-8 text-2xl font-semibold">
                                    {step.title}
                                </h3>

                                <p className="mt-4 leading-7 text-muted-foreground">
                                    {step.description}
                                </p>
                            </div>
                        </Animate>
                    ))}
                </div>

                {/* Flow */}
                <Animate type="fadeUp" delay={0.5}>
                    <div className="mt-16 flex flex-wrap items-center justify-center gap-3 text-sm font-medium text-muted-foreground">
                        <span>Browse</span>
                        <ArrowRight className="h-4 w-4 text-primary" />
                        <span>Request</span>
                        <ArrowRight className="h-4 w-4 text-primary" />
                        <span>Approval</span>
                        <ArrowRight className="h-4 w-4 text-primary" />
                        <span>Payment</span>
                        <ArrowRight className="h-4 w-4 text-primary" />
                        <span>Move In 🎉</span>
                    </div>
                </Animate>
            </div>
        </section>
    );
}