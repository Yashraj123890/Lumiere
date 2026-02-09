import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import "../App.css";
import "./VisualMenu.css";

const DISHES = [
    {
        id: 1,
        name: "Truffle Risotto",
        price: "$45",
        description: "Acquerello rice, winter black truffle.",
        image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    },
    {
        id: 2,
        name: "Wagyu Striploin",
        price: "$120",
        description: "Robata grilled, smoked flaky salt.",
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-1.2.1&auto=format&fit=crop&w=1349&q=80"
    },
    {
        id: 3,
        name: "King Scallops",
        price: "$38",
        description: "Cauliflower mousseline, saffron essence.",
        image: "https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1349&q=80"
    },
    {
        id: 5,
        name: "Lobster Bisque",
        price: "$32",
        description: "Cognac cream, chive oil.",
        image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    },
    {
        id: 7,
        name: "Duck Confit",
        price: "$42",
        description: "Puy lentils, orange glaze.",
        image: "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    }
];

export function VisualMenu() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const onWheel = (e: WheelEvent) => {
            const isScrollingMainlyVertical = Math.abs(e.deltaY) > Math.abs(e.deltaX);

            if (isScrollingMainlyVertical) {
                // Determine if we can scroll horizontally in the requested direction
                const canScrollRight = container.scrollLeft < (container.scrollWidth - container.clientWidth - 2); // Buffer of 2px
                const canScrollLeft = container.scrollLeft > 0;

                const isGoingRight = e.deltaY > 0;
                const isGoingLeft = e.deltaY < 0;

                // If user wants to go right and we can go right -> scroll horizontally
                // If user wants to go left and we can go left -> scroll horizontally
                if ((isGoingRight && canScrollRight) || (isGoingLeft && canScrollLeft)) {
                    e.preventDefault();
                    e.stopPropagation();
                    container.scrollLeft += e.deltaY;
                }
                // Otherwise, we are at the edge. 
                // Do NOT preventDefault, so the event bubbles up and turns into a vertical page scroll.
            }
        };

        // We attach non-passive listener to be able to preventDefault
        container.addEventListener("wheel", onWheel, { passive: false });

        return () => {
            container.removeEventListener("wheel", onWheel);
        };
    }, []);

    return (
        <section id="visual-menu">
            <div
                ref={containerRef}
                className="menu-scroll"
                data-lenis-prevent // Hint to Lenis to let us handle this area
            >
                {DISHES.map((dish) => (
                    <DishCard key={dish.id} dish={dish} />
                ))}
                {/* Spacer for scroll end */}
                <div style={{ minWidth: "10vw" }} />
            </div>
        </section>
    );
}

function DishCard({ dish }: { dish: typeof DISHES[0] }) {
    return (
        <motion.div
            className="editorial-dish-card"
            whileHover={{ y: -5 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
            <div className="editorial-image-frame">
                {dish.image ? (
                    <img src={dish.image} alt={dish.name} loading="lazy" />
                ) : (
                    <div className="no-image-placeholder">
                        <span className="placeholder-text">{dish.name}</span>
                    </div>
                )}
                <div className="moody-overlay"></div>
            </div>
            <div className="editorial-dish-info">
                <div className="editorial-header">
                    <h3>{dish.name}</h3>
                    <span className="price">{dish.price}</span>
                </div>
                <p className="description">{dish.description}</p>
            </div>
        </motion.div>
    );
}
