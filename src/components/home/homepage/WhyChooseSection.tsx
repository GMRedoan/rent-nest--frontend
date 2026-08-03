import {
    BadgeCheck,
    Building2,
    CreditCard,
    Headset,
    MapPin,
    ShieldCheck,
} from "lucide-react";
import Animate from "@/components/reusable/Animate";

const features = [
    {
        icon: ShieldCheck,
        title: "Verified Listings",
        description:
            "Every property is carefully reviewed so you can browse with confidence.",
    },
    {
        icon: CreditCard,
        title: "Secure Payments",
        description:
            "Complete rental payments safely through our trusted Stripe integration.",
    },
    {
        icon: BadgeCheck,
        title: "Trusted Landlords",
        description:
            "Connect with verified landlords and enjoy a transparent rental experience.",
    },
    {
        icon: Building2,
        title: "Wide Property Selection",
        description:
            "Discover apartments, houses, studios, and commercial spaces in one place.",
    },
    {
        icon: MapPin,
        title: "Find by Location",
        description:
            "Search properties across multiple cities and neighborhoods with ease.",
    },
    {
        icon: Headset,
        title: "Reliable Support",
        description:
            "Our platform is designed to provide a smooth experience for both tenants and landlords.",
    },
];

export default function WhyChooseSection() {
    return (
        <section className="py-24">
            <div className="container">
                {/* Heading */}
                <Animate type="fadeDown">
                    <div className="mx-auto mb-16 max-w-3xl text-center">
                        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
                            Why Choose Us
                        </p>

                        <h2 className="mt-3 text-4xl font-bold md:text-5xl">
                            Why Choose
                            <span className="text-primary"> RentNest?</span>
                        </h2>

                        <p className="mt-5 text-lg leading-8 text-muted-foreground">
                            We simplify the rental journey with trusted
                            landlords, verified properties, secure online
                            payments, and an intuitive experience from search
                            to move-in.
                        </p>
                    </div>
                </Animate>

                {/* Cards */}
                <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
                    {features.map((feature, index) => (
                        <Animate
                            key={feature.title}
                            type="zoom"
                            delay={index * 0.1}
                        >
                            <div className="group rounded-3xl border bg-card p-8 transition-all duration-300 hover:-translate-y-2 hover:border-primary hover:shadow-xl">
                                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 transition group-hover:bg-primary">
                                    <feature.icon className="h-8 w-8 text-primary transition group-hover:text-white" />
                                </div>

                                <h3 className="mt-6 text-2xl font-semibold">
                                    {feature.title}
                                </h3>

                                <p className="mt-4 leading-7 text-muted-foreground">
                                    {feature.description}
                                </p>
                            </div>
                        </Animate>
                    ))}
                </div>

                {/* Bottom Banner */}
                <Animate type="fadeUp" delay={0.4}>
                    <div className="mt-16 rounded-3xl border bg-muted px-10 py-12 text-center text-foreground">
                        <h3 className="text-3xl font-bold">
                            A Better Way to Rent Properties
                        </h3>

                        <p className="mx-auto mt-4 max-w-3xl text-lg text-muted-foreground">
                            Whether you are searching for your dream home or
                            managing multiple rental properties, RentNest
                            provides a secure, transparent, and hassle-free
                            platform that helps everyone rent with confidence.
                        </p>
                    </div>
                </Animate>
            </div>
        </section>
    );
}