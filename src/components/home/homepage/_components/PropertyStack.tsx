/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Home, MapPin } from "lucide-react";
import { getProperties } from "@/server/properties/properties.service";
import { IProperty } from "@/types/property/property";

function usePrefersReducedMotion() {
    const [reduced, setReduced] = useState(false);

    useEffect(() => {
        const query = window.matchMedia("(prefers-reduced-motion: reduce)");
        setReduced(query.matches);
        const handler = () => setReduced(query.matches);
        query.addEventListener("change", handler);
        return () => query.removeEventListener("change", handler);
    }, []);

    return reduced;
}

function PropertyImage({
    src,
    alt,
}: {
    src: string;
    alt: string;
}) {
    const [failed, setFailed] = useState(false);
    const [loaded, setLoaded] = useState(false);

    if (!src || failed) {
        return (
            <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-muted to-muted/50">
                <Home className="h-12 w-12 text-muted-foreground/40" />
            </div>
        );
    }

    return (
        <Image
            src={src}
            alt={alt}
            fill
            sizes="(max-width: 768px) 90vw, 640px"
            className={`object-cover transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"
                }`}
            onLoad={() => setLoaded(true)}
            onError={() => setFailed(true)}
        />
    );
}

function StackSkeleton() {
    return (
        <div className="relative mx-auto h-162 w-full max-w-2xl animate-pulse">
            <div className="absolute inset-0 rounded-[32px] bg-muted" />
            <div className="absolute top-6 left-6 h-4 w-24 rounded bg-muted-foreground/20" />
            <div className="absolute bottom-8 left-8 h-28 w-64 rounded-2xl bg-background/60" />
        </div>
    );
}

export function PropertyStack() {
    const [active, setActive] = useState(0);
    const [properties, setProperties] = useState<IProperty[]>([]);
    const [loading, setLoading] = useState(true);
    const [isHovered, setIsHovered] = useState(false);
    const reducedMotion = usePrefersReducedMotion();
    const visibleProperties = properties.slice(0, 4);
    const count = visibleProperties.length;

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const res = await getProperties();

                if (!res.success) {
                    throw new Error("Failed to fetch properties");
                }
                setProperties(res.data as IProperty[]);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchProperties();
    }, []);

    useEffect(() => {
        if (isHovered || count <= 1) return;

        const id = setInterval(() => {
            setActive((prev) => (prev + 1) % count);
        }, 4500);

        return () => clearInterval(id);
    }, [isHovered, count]);

    if (loading) return <StackSkeleton />;
    if (count === 0) return null;

    const current = visibleProperties[active];

    const layers = visibleProperties.map((property, index) => {
        const offset = (index - active + count) % count;
        return { property, offset };
    });

    return (
        <div className="relative mx-auto h-152 w-full max-w-2xl">
            {/* Ambient glow */}
            <div className="absolute inset-0 rounded-[40px] bg-linear-to-br from-primary/20 via-transparent to-primary/5 blur-3xl" />

            <div className="relative h-full">
                {layers
                    .filter(({ offset }) => offset < 3)
                    .sort((a, b) => b.offset - a.offset)
                    .map(({ property, offset }) => {
                        const isActive = offset === 0;

                        const style =
                            offset === 0
                                ? {
                                    x: 0,
                                    y: -40,
                                    scale: 1,
                                    rotate: 0,
                                    opacity: 1,
                                }
                                : offset === 1
                                    ? {
                                        x: -35,
                                        y: -105,
                                        scale: 0.93,
                                        rotate: -7,
                                        opacity: 0.65,
                                    }
                                    : {
                                        x: -65,
                                        y: -155,
                                        scale: 0.86,
                                        rotate: -14,
                                        opacity: 0.35,
                                    };

                        return (
                            <motion.button
                                key={property.id}
                                type="button"
                                aria-label={
                                    isActive
                                        ? undefined
                                        : `Show ${property.title}`
                                }
                                tabIndex={isActive ? -1 : 0}
                                onClick={() =>
                                    !isActive &&
                                    setActive(visibleProperties.indexOf(property))
                                }
                                className="group absolute inset-0 origin-bottom-right rounded-[32px] text-left"
                                style={{ zIndex: 10 - offset }}
                                animate={style}
                                transition={
                                    reducedMotion
                                        ? { duration: 0.2 }
                                        : { duration: 0.9, ease: [0.22, 1, 0.36, 1] }
                                }
                            >
                                <div
                                    className={`relative h-full overflow-hidden rounded-[32px] shadow-2xl transition-[filter] duration-700 ${isActive ? "" : "grayscale-20 blur-[0.5px]"
                                        }`}
                                >
                                    <PropertyImage
                                        src={property?.images?.[0]}
                                        alt={property.title}
                                    />
                                    <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent" />

                                    {isActive && (
                                        <span className="absolute top-5 left-5 rounded-full bg-background/90 px-3 py-1 text-xs font-semibold tracking-wide text-foreground backdrop-blur-sm">
                                            {property.propertyType}
                                        </span>
                                    )}

                                    {isActive && (
                                        <Link
                                            href={`/properties/${property.id}`}
                                            className="pointer-events-auto absolute top-5 right-5 rounded-full bg-primary px-4 py-1.5 text-xs font-semibold text-primary-foreground opacity-0 shadow-lg transition-opacity duration-300 hover:bg-primary/90 group-hover:opacity-100 focus-visible:opacity-100"
                                        >
                                            View Property
                                        </Link>
                                    )}
                                </div>
                            </motion.button>
                        );
                    })}

                {/* Active property details */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={current.id}
                        initial={reducedMotion ? false : { opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={reducedMotion ? undefined : { opacity: 0, y: -12 }}
                        transition={{ duration: 0.35 }}
                        className="pointer-events-none absolute bottom-8 left-8 z-20 rounded-2xl bg-background/90 p-5 shadow-xl backdrop-blur-md"
                    >
                        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground">
                            <span>Featured Property</span>
                            <span className="text-primary">
                                {String(active + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
                            </span>
                        </div>

                        <h3 className="mt-2 text-xl font-bold">
                            {current.title}
                        </h3>

                        <div className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
                            <MapPin className="h-3.5 w-3.5" />
                            {current.location}
                        </div>

                        <p className="mt-3 text-2xl font-bold text-primary">
                            ${current.price}
                            <span className="text-base text-muted-foreground"> / month</span>
                        </p>
                    </motion.div>
                </AnimatePresence>

                {/* Progress dots */}
                <div
                    className="absolute right-10 bottom-14 z-20 flex gap-2"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    {visibleProperties.map((property, index) => (
                        <button
                            key={property.id}
                            type="button"
                            aria-label={`Go to ${property.title}`}
                            aria-current={index === active}
                            onClick={() => setActive(index)}
                            className={`h-2 rounded-full transition-all focus-visible:outline-2 focus-visible:outline-primary ${index === active
                                ? "w-6 bg-primary"
                                : "w-2 bg-background/70 hover:bg-background"
                                }`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}