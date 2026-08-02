import DashboardCard from '@/components/dashboard/DashboardCard';
import Animate from '@/components/reusable/Animate';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { getMyProperties } from '@/server/properties/properties.service';
import { myPropertiesRentalReq } from '@/server/rental/rental.service';
import { getPropertyReviews } from '@/server/review/review.service';
import { getUser } from '@/server/user/user.service';
import {  BadgeCheck, BadgeDollarSign, BellRing, Building2, Camera, Clock3, Home,  Mail,  MessageSquare,  Plus,  Star, Wallet } from 'lucide-react';
import Image from 'next/image';

const LandlordDashboard = async () => {
    const  user = await getUser();
    const properties = await getMyProperties();
    const rentalRequests = await myPropertiesRentalReq();
    const reviews = await getPropertyReviews();
    const pendingRequestsCount = rentalRequests.success && rentalRequests.data ? rentalRequests.data.filter(req => req.status === 'PENDING').length : 0;
    const availablePropertiesCount = properties.success && properties.data ? properties.data.filter(property => property.status === 'AVAILABLE').length : 0;
    return (
        <div>
            <Animate type="fadeDown">
                <section className="relative overflow-hidden rounded-3xl">
                    <Image
                        src="https://images.unsplash.com/photo-1560518883-ce09059eeffa"
                        alt="Landlord Dashboard"
                        width={1600}
                        height={500}
                        className="h-70 w-full object-cover"
                    />

                    <div className="absolute inset-0 bg-linear-to-r from-black/75 via-black/50 to-black/20" />

                    <div className="absolute inset-0 flex flex-col justify-center px-10">

                        <Badge className="mb-5 w-fit">
                            🏠 Landlord Dashboard
                        </Badge>

                        <h1 className="max-w-2xl text-4xl font-bold text-white">
                            Welcome back,
                            <span className="text-primary"> {user.data?.name}</span>
                        </h1>

                        <p className="mt-3 max-w-xl text-white/80">
                            Manage your rental properties, monitor tenant requests,
                            and keep your listings updated from one place.
                        </p>

                    </div>
                </section>
            </Animate>
            <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">

                <Animate delay={0.05}>
                    <DashboardCard
                        title="Total Properties"
                        value={`${properties.data?.length || 0}`}
                        icon={<Building2 />}
                    />
                </Animate>

                <Animate delay={0.1}>
                    <DashboardCard
                        title="Available"
                        value={`${availablePropertiesCount}`}
                        icon={<Home />}
                    />
                </Animate>

                <Animate delay={0.15}>
                    <DashboardCard
                        title="Pending Requests"
                        value={`${pendingRequestsCount}`}
                        icon={<Clock3 />}
                    />
                </Animate>

                <Animate delay={0.2}>
                    <DashboardCard
                        title="Total Reviews"
                        value={`${reviews.data?.length || 0}`}
                        icon={<Star />}
                    />
                </Animate>                
            </div>
            <Animate type="fadeUp" delay={0.2}>
                <section>
                    <div className="py-8">
                        <h2 className="text-2xl font-bold">Landlord Tips</h2>
                        <p className="text-muted-foreground">
                            Best practices to improve your property management.
                        </p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

                        {[
                            {
                                title: "Professional Photos",
                                description:
                                    "Listings with high-quality images receive significantly more tenant interest.",
                                icon: Camera,
                            },
                            {
                                title: "Respond Quickly",
                                description:
                                    "Fast responses build trust and increase the chance of successful rentals.",
                                icon: MessageSquare,
                            },
                            {
                                title: "Competitive Pricing",
                                description:
                                    "Review nearby rental prices regularly to stay competitive.",
                                icon: BadgeDollarSign,
                            },
                            {
                                title: "Collect Reviews",
                                description:
                                    "Positive tenant reviews increase credibility for future renters.",
                                icon: Star,
                            },
                        ].map((tip, index) => (
                            <Animate
                                key={tip.title}
                                delay={0.05 * index}
                                type="zoom"
                            >
                                <Card className="group h-full rounded-3xl border transition-all duration-300 hover:-translate-y-2 hover:border-primary/40 hover:shadow-xl">
                                    <CardContent className="space-y-5 p-6">

                                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-all group-hover:scale-110">
                                            <tip.icon className="h-7 w-7" />
                                        </div>

                                        <div>
                                            <h3 className="font-semibold">
                                                {tip.title}
                                            </h3>

                                            <p className="mt-2 text-sm leading-7 text-muted-foreground">
                                                {tip.description}
                                            </p>
                                        </div>

                                    </CardContent>
                                </Card>
                            </Animate>
                        ))}

                    </div>
                </section>
            </Animate>

            <div className="mt-10 grid gap-6 lg:grid-cols-2">

                {/* Workflow */}

                <Animate type="fadeLeft">
                    <Card className="rounded-3xl">
                        <CardContent className="p-8">
                            <h2 className="text-2xl font-bold">
                                Rental Workflow
                            </h2>
                            <p className="mb-8 text-muted-foreground">
                                Follow these simple steps to manage your rentals.
                            </p>

                            <div className="space-y-2">

                                {[
                                    {
                                        title: "Add Property",
                                        icon: Plus,
                                    },
                                    {
                                        title: "Receive Requests",
                                        icon: Mail,
                                    },
                                    {
                                        title: "Approve Tenant",
                                        icon: BadgeCheck,
                                    },
                                    {
                                        title: "Receive Payment",
                                        icon: Wallet,
                                    },
                                    {
                                        title: "Collect Reviews",
                                        icon: Star,
                                    },
                                ].map((step, index) => (
                                    <div
                                        key={step.title}
                                        className="flex items-start gap-4"
                                    >
                                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
                                            <step.icon className="h-5 w-5" />
                                        </div>

                                        <div className="flex-1">

                                            <h4 className="font-semibold">
                                                {step.title}
                                            </h4>

                                            {index !== 4 && (
                                                <div className="ml-5 mt-3 h-8 w-px bg-border" />
                                            )}

                                        </div>

                                    </div>
                                ))}

                            </div>

                        </CardContent>
                    </Card>
                </Animate>

                {/* Reminder */}

                <Animate type="fadeRight">
                    <Card className="rounded-3xl border-primary/20 bg-primary/5">
                        <CardContent className="p-8">

                            <BellRing className="mb-6 h-12 w-12 text-primary" />

                            <h2 className="text-2xl font-bold">
                                Today s Reminder
                            </h2>

                            <p className="mt-5 leading-8 text-muted-foreground">
                                Keep your listings updated with attractive photos,
                                respond to rental requests promptly, and maintain
                                accurate pricing to increase visibility and tenant
                                engagement.
                            </p>

                            <div className="mt-8 rounded-2xl border border-primary/20 bg-background p-5">

                                <p className="font-medium">
                                    📌 Suggested Tasks
                                </p>

                                <ul className="mt-4 space-y-3 text-sm text-muted-foreground">

                                    <li>✔ Review pending rental requests.</li>

                                    <li>✔ Update property photos.</li>

                                    <li>✔ Check property availability.</li>

                                    <li>✔ Reply to tenant inquiries.</li>

                                </ul>

                            </div>

                        </CardContent>
                    </Card>
                </Animate>

            </div>
        </div>
    );
};

export default LandlordDashboard;