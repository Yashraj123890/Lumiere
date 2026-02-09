import { useEffect, useState } from "react";
import Lenis from "lenis";
import { TamboProvider, useTamboThread, useTamboThreadInput } from "@tambo-ai/react";
import { components } from "./tambo/components";
import { motion, AnimatePresence } from "framer-motion";
import { VisualMenu } from "./tambo/VisualMenu";
import { Chefs } from "./tambo/Chefs";
import { VIPLounge } from "./tambo/VIPLounge";
import { Reservations } from "./tambo/Reservations";
import { AmbientAudio } from "./tambo/AmbientAudio";
import "./App.css";
import "./design-polish.css"; // Final Luxury Polish
import "./tambo/VisualMenu.css"; // Import the specific CSS

// Retrieve the API key from environment variables
const key = import.meta.env.VITE_TAMBO_API_KEY;
const IS_DEMO_MODE = !key || key === "your_tambo_api_key_here";
const TAMBO_API_KEY = key || "dummy-key-to-prevent-crash";

// ... existing code ...

<Section id="menu" title="Continental Classics">
  <p>Our menu is a curated selection of continental masterpieces.</p>
  <VisualMenu />
</Section>

// --- Components ---

// Extend window interface for Lenis global access if needed
declare global {
  interface Window {
    lenis: Lenis;
  }
}

function Header() {
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    // 1. Setup Intersection Observer for Active State
    const observerOptions = {
      root: null,
      // Focus detection on the top area of the screen where content lands
      // this prevents early triggering of bottom sections
      rootMargin: "-15% 0px -60% 0px",
      threshold: 0
    };

    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const sections = document.querySelectorAll("section[id]");
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setActiveSection(targetId.replace("#", ""));

    // 2. Immediate, Confident Scroll
    // Using Lenis directly allows for a precise curve without browser lag
    const targetElement = document.querySelector(targetId);
    if (targetElement && window.lenis) {
      window.lenis.scrollTo(targetElement as HTMLElement, {
        offset: -90, // Tighter offset to account for updated header height
        duration: 1.2, // Slightly faster for decisive feel
        // Custom easing: starts fast (immediate response), then slows smoothly
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        lock: false, // Allow user control if needed, feels less "stuck"
      });
    }
  };

  const navLinks = [
    { id: "menu", label: "Menu" },
    { id: "reservations", label: "Reservations" },
    { id: "chefs", label: "Chefs" },
    { id: "lounge", label: "VIP Lounge" },
  ];

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="site-header"
    >
      <div className="container header-content">
        <div className="logo">LUMIÈRE</div>
        <nav>
          <ul>
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  onClick={(e) => handleNavClick(e, `#${link.id}`)}
                  className={activeSection === link.id ? "active" : ""}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </motion.header>
  );
}

function Hero() {
  return (
    <section className="hero-section">
      <div className="hero-bg">
        {/* Placeholder for video or high-res image */}
        <div className="overlay"></div>
      </div>
      <div className="container hero-content">
        <motion.h1
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }} // Slower, elegant ease
        >
          Taste the <span className="text-gold">Extraordinary</span>
        </motion.h1>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="hero-subtitle"
        >
          A culinary journey through continental elegance.
        </motion.p>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <button className="btn-primary">Book a Table</button>
        </motion.div>
      </div>
    </section>
  );
}

function Section({ id, title, children }: { id: string, title: string, children: React.ReactNode }) {
  return (
    <section id={id} className="content-section">
      <div className="container">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="section-title"
        >
          {title}
        </motion.h2>
        {children}
      </div>
    </section>
  );
}

function ChatInterface() {
  const { thread, addThreadMessage } = useTamboThread();
  const { value, setValue, submit, isPending } = useTamboThreadInput();

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!value.trim()) return;

    if (IS_DEMO_MODE) {
      const userText = value;
      setValue(""); // Clear input immediately

      // 1. Add user message locally
      // We use 'any' to bypass strict type checking for the demo quick fix
      const userMsg = {
        id: Math.random().toString(36).substring(7),
        role: "user",
        content: [{ type: "text", text: userText }],
        createdAt: new Date().toISOString(),
        threadId: thread.id,
      };
      // @ts-ignore
      await addThreadMessage(userMsg, false);
      // 2. Simulate delay and add assistant response
      setTimeout(async () => {
        const assistantMsg = {
          id: Math.random().toString(36).substring(7),
          role: "assistant",
          content: [{ type: "text", text: "I can help you explore our menu or make a reservation." }],
          createdAt: new Date().toISOString(),
          threadId: thread.id,
          // Simple logic to show a demo component
          renderedComponent: (userText.toLowerCase().includes("hello") || userText.toLowerCase().includes("menu")) ? (
            <div className="greeting-card"><h3>Featured Dish</h3><p>Try our signature Truffle Risotto.</p></div>
          ) : undefined
        };
        // @ts-ignore
        await addThreadMessage(assistantMsg, false);
      }, 600);

      return;
    }

    // Normal submission if API key is present
    submit();
  };

  return (
    <div className="chat-interface">
      <div className="chat-messages">
        <AnimatePresence>
          {thread.messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={`message ${message.role}`}
            >
              <div className="message-content">
                {Array.isArray(message.content) ? (
                  message.content.map((part: any, i: number) =>
                    part.type === "text" ? <p key={i}>{part.text}</p> : null
                  )
                ) : (
                  <p>{String(message.content)}</p>
                )}
                {message.renderedComponent}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <form className="chat-input" onSubmit={handleSend}>
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Ask our concierge..."
          disabled={isPending && !IS_DEMO_MODE}
        />
        <button type="submit" disabled={(isPending && !IS_DEMO_MODE) || !value.trim()}>
          →
        </button>
      </form>
    </div>
  );
}

function App() {
  useEffect(() => {
    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    });

    // Make lenis globally accessible
    window.lenis = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      // Cleanup if necessary
      lenis.destroy();
      // @ts-ignore
      delete window.lenis;
    };
  }, []);

  return (
    <TamboProvider
      components={components}
      apiKey={TAMBO_API_KEY}
    >
      <div className="app-container">
        <Header />
        <main>
          <Hero />

          <Section id="menu" title="Continental Classics">
            <p>Our menu is a curated selection of continental masterpieces.</p>
            <VisualMenu />
          </Section>


          <Section id="reservations" title="Reserve Your Table">
            <Reservations />
          </Section>

          <Section id="chefs" title="Our Culinary Artists">
            <Chefs />
          </Section>

          <Section id="lounge" title="VIP Lounge">
            <VIPLounge />
          </Section>
        </main>

        {/* Floating Chat Interface */}
        <div className="floating-chat">
          <ChatInterface />
        </div>

        {/* Ambient Audio Layer */}
        <AmbientAudio />
      </div>
    </TamboProvider>
  );
}

export default App;
