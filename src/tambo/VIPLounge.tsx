import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import "./VIPLounge.css";

export function VIPLounge() {
    return (
        <section className="vip-lounge-section">
            <div className="vip-container">
                <div className="vip-text-content">
                    {/* The title is handled by the parent Section component, but we can add a subtle lead-in if needed, or rely on the card itself */}
                    <p className="vip-subtitle">An invitation to a more private dining experience.</p>
                </div>

                <VIPCard />
            </div>
        </section>
    );
}

function VIPCard() {
    const cardRef = useRef<HTMLDivElement>(null);

    // Mouse position for tilt effect
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Smooth spring physics for the tilt
    const mouseX = useSpring(x, { stiffness: 40, damping: 20 });
    const mouseY = useSpring(y, { stiffness: 40, damping: 20 });

    const rotateX = useTransform(mouseY, [-0.5, 0.5], ["3deg", "-3deg"]); // Reduced for subtlety
    const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-3deg", "3deg"]);

    // Light sweep effect based on mouse position
    const shineX = useTransform(mouseX, [-0.5, 0.5], ["0%", "100%"]);
    const shineY = useTransform(mouseY, [-0.5, 0.5], ["0%", "100%"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();

        // Calculate normalized position (-0.5 to 0.5)
        const width = rect.width;
        const height = rect.height;
        const mouseXRel = e.clientX - rect.left;
        const mouseYRel = e.clientY - rect.top;

        const xPct = (mouseXRel / width) - 0.5;
        const yPct = (mouseYRel / height) - 0.5;

        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <div className="vip-card-perspective">
            <motion.div
                ref={cardRef}
                className="vip-card"
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d"
                }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                initial={{ opacity: 0, y: 50, rotateX: 10 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
                <div className="vip-card-content">
                    <div className="vip-logo">LUMIÈRE</div>
                    <div className="vip-number">0000 0000 0000 0000</div>
                    <div className="vip-footer">
                        <span className="vip-label">MEMBER SINCE</span>
                        <span className="vip-details">2025</span>
                    </div>
                    {/* Subtle grain/texture overlay */}
                    <div className="vip-texture"></div>
                </div>

                {/* Dynamic sheen effect */}
                <motion.div
                    className="vip-sheen"
                    style={{
                        background: useTransform(
                            [shineX, shineY],
                            ([sx, sy]) => `radial-gradient(circle at ${sx} ${sy}, rgba(255, 223, 0, 0.08), transparent 50%)` // Fainter, more gold
                        )
                    }}
                />

                {/* Ambient Depth Gradient (Static) */}
                <div className="vip-depth-overlay"></div>

                {/* Border Glow */}
                <div className="vip-border-glow"></div>
            </motion.div>
        </div>
    );
}
