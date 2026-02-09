import { motion } from "framer-motion";
import "./Chefs.css";

const CHEFS = [
    {
        id: "chef-1",
        name: "Elena Arzak",
        role: "Executive Chef",
        bio: "Redefining tradition with avant-garde techniques.",
        // Placeholder for a high-quality B&W portrait
        image: "https://images.unsplash.com/photo-1583394293214-28ded15ee548?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: "chef-2",
        name: "Marcus Wareing",
        role: "Head of Pastry",
        bio: "Precision and passion in every delicate layer.",
        image: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: "chef-3",
        name: "Dominique Crenn",
        role: "Sous Chef",
        bio: "A poetic approach to seasonal ingredients.",
        image: "https://images.unsplash.com/photo-1581299894007-aaa50297cf16?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    }
];

export function Chefs() {
    return (
        <section className="chefs-section">
            <div className="chefs-container">
                {CHEFS.map((chef, index) => (
                    <ChefCard key={chef.id} chef={chef} index={index} />
                ))}
            </div>
        </section>
    );
}

function ChefCard({ chef, index }: { chef: typeof CHEFS[0], index: number }) {
    return (
        <motion.div
            className="chef-profile"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: index * 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
            <div className="chef-image-container">
                <img src={chef.image} alt={chef.name} className="chef-portrait" />
                <div className="chef-overlay">
                    <div className="chef-info-hover">
                        <span className="chef-role-hover">{chef.role}</span>
                        <p className="chef-bio-hover">{chef.bio}</p>
                    </div>
                </div>
            </div>
            <div className="chef-details">
                <h3 className="chef-name">{chef.name}</h3>
                <span className="chef-role-static">{chef.role}</span>
            </div>
        </motion.div>
    );
}
