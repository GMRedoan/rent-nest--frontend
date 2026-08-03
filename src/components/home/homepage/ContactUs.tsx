/* eslint-disable react/no-unescaped-entities */
import {
    Mail,
    MapPin,
    Phone,
    Send,
} from "lucide-react";
import Animate from "@/components/reusable/Animate";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function ContactSection() {
    return (
        <section className="py-24">
            <div className="container">
                {/* Heading */}
                <Animate type="fadeDown">
                    <div className="mx-auto mb-16 max-w-3xl text-center">
                        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
                            Contact Us
                        </p>

                        <h2 className="mt-3 text-4xl font-bold md:text-5xl">
                            We'd Love to
                            <span className="text-primary"> Hear From You</span>
                        </h2>

                        <p className="mt-5 text-lg leading-8 text-muted-foreground">
                            Whether you're looking for your next home, managing
                            your property, or simply have a question, our team
                            is here to help.
                        </p>
                    </div>
                </Animate>

                <div className="grid gap-10 lg:grid-cols-5">
                    {/* Contact Info */}
                    <Animate
                        type="fadeRight"
                        className="lg:col-span-2"
                    >
                        <div className="h-full rounded-3xl bg-card px-8 py-6 text-primary-foreground">
                            <h3 className="text-3xl font-bold text-foreground">
                                Get in Touch
                            </h3>

                            <p className="mt-4 leading-7 text-muted-foreground">
                                Reach out to our support team anytime. We're
                                committed to making your rental experience
                                smooth and hassle-free.
                            </p>

                            <div className="mt-10 space-y-4">
                                <div className="flex items-start gap-4">
                                    <div className="rounded-xl bg-primary p-3">
                                        <MapPin className="h-6 w-6" />
                                    </div>

                                    <div>
                                        <h4 className="font-semibold text-foreground">
                                            Office Address
                                        </h4>

                                        <p className="mt-1 text-muted-foreground text-xs">
                                            Barishal, Bangladesh
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="rounded-xl bg-primary p-3">
                                        <Mail className="h-6 w-6" />
                                    </div>

                                    <div>
                                        <h4 className="font-semibold text-foreground">
                                            Email Address
                                        </h4>

                                        <p className="mt-1 text-muted-foreground text-xs">
                                            support@rentnest.com
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="rounded-xl bg-primary p-3">
                                        <Phone className="h-6 w-6" />
                                    </div>

                                    <div>
                                        <h4 className="font-semibold text-foreground">
                                            Phone Number
                                        </h4>

                                        <p className="mt-1 text-muted-foreground text-xs">
                                            +880 1712-345678
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Animate>

                    {/* Contact Form */}
                    <Animate
                        type="fadeLeft"
                        className="lg:col-span-3"
                    >
                        <div className="rounded-3xl border bg-card p-10 shadow-sm">
                            <form className="space-y-6">
                                <div className="grid gap-6 md:grid-cols-2">
                                    <div>
                                        <label className="mb-2 block font-medium">
                                            Full Name
                                        </label>
                                        <Input
                                            placeholder="John Doe"
                                        />
                                    </div>

                                    <div>
                                        <label className="mb-2 block font-medium">
                                            Email Address
                                        </label>
                                        <Input
                                            type="email"
                                            placeholder="john@example.com"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="mb-2 block font-medium">
                                        Subject
                                    </label>

                                    <Input
                                        placeholder="How can we help?"
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 block font-medium">
                                        Message
                                    </label>

                                    <Textarea
                                        rows={6}
                                        placeholder="Write your message..."
                                    />
                                </div>

                                <Button
                                    size="lg"
                                    className="w-full md:w-auto"
                                >
                                    <Send className="mr-2 h-5 w-5" />
                                    Send Message
                                </Button>
                            </form>
                        </div>
                    </Animate>
                </div>
            </div>
        </section>
    );
}