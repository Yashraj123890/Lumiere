import { motion } from "framer-motion";
import "./Reservations.css";

export function Reservations() {
    return (
        <div className="reservations-content">
            <motion.p
                className="reservations-subtext"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
                We invite you to join us for an evening of culinary excellence.
            </motion.p>

            <motion.div
                className="reservation-action"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
                <a href="#" className="reservation-btn">
                    Book a Table
                </a>
            </motion.div>

            <motion.div
                className="concept-footer"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: 1 }}
            >
                <p className="concept-line">
                    An exploration of silence, space, and shadow in digital hospitality.
                </p>
            </motion.div>
        </div>
    );
}
