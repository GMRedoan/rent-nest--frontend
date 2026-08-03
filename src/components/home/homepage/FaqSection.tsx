import Animate from "@/components/reusable/Animate";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
    {
        question: "How do I rent a property through RentNest?",
        answer:
            "Browse available properties, choose the one you like, submit a rental request, wait for the landlord's approval, and then complete your payment securely through Stripe.",
    },
    {
        question: "Can I send requests to multiple properties?",
        answer:
            "Yes. You can submit rental requests for multiple properties. Once one request is approved and completed, the remaining requests for that property can be managed by the landlord.",
    },
    {
        question: "Are online payments secure?",
        answer:
            "Absolutely. RentNest uses Stripe for payment processing, ensuring your payment information is handled securely and never stored on our servers.",
    },
    {
        question: "How do landlords manage rental requests?",
        answer:
            "Landlords can review incoming requests, approve or reject them, manage their properties, and monitor tenant activity directly from their dashboard.",
    },
    {
        question: "Can I update my profile after registration?",
        answer:
            "Yes. You can edit your profile information, upload a profile photo, update your phone number, and add a personal bio from your dashboard.",
    },
    {
        question: "Can tenants leave reviews?",
        answer:
            "Yes. After successfully completing a payment for an approved rental, tenants can submit a review about their rental experience.",
    },
];

export default function FAQSection() {
    return (
        <section className="py-24 bg-muted/30 rounded-3xl">
            <div>
                {/* Heading */}
                <Animate type="fadeDown">
                    <div className="mx-auto mb-14 max-w-3xl text-center">
                        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
                            Frequently Asked Questions
                        </p>

                        <h2 className="mt-3 text-4xl font-bold md:text-5xl">
                            Got Questions?
                            <span className="text-primary"> We have Got Answers</span>
                        </h2>

                        <p className="mt-5 text-lg leading-8 text-muted-foreground">
                            Everything you need to know about renting properties,
                            managing listings, payments, and using RentNest.
                        </p>
                    </div>
                </Animate>

                {/* FAQ */}
                <Animate type="fadeUp">
                    <div className="rounded-3xl border bg-background p-3 shadow-sm max-w-5xl mx-auto px-6">
                        <Accordion
                            type="single"
                            collapsible
                            className="w-full"
                        >
                            {faqs.map((faq, index) => (
                                <AccordionItem
                                    key={index}
                                    value={`item-${index}`}
                                    className="border-b last:border-none"
                                >
                                    <AccordionTrigger className="px-5 py-6 text-left text-lg font-semibold hover:no-underline">
                                        {faq.question}
                                    </AccordionTrigger>

                                    <AccordionContent className="px-5 pb-6 text-base leading-7 text-muted-foreground">
                                        {faq.answer}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                </Animate>

                {/* Bottom */}
                <Animate type="fadeUp" delay={0.2}>
                    <div className="mt-10 text-center">
                        <p className="text-primary">
                            Still have questions?
                        </p>

                        <h3 className="mt-2 text-2xl font-bold">
                            We are here to help.
                        </h3>

                        <p className="mt-3 text-muted-foreground">
                            Contact our support team if you need assistance with
                            your rental journey or managing your property.
                        </p>
                    </div>
                </Animate>
            </div>
        </section>
    );
}