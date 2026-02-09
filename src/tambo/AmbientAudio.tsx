import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import "./AmbientAudio.css";

// Using a publicly available creative commons sound file for ambient café noise
// This is a subtle loop of low hum
const AMBIENT_SOUND_URL = "https://cdn.freesound.org/previews/235/235583_2255776-lq.mp3";

export function AmbientAudio() {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        // Initialize audio
        const audio = new Audio(AMBIENT_SOUND_URL);
        audio.loop = true;
        audio.volume = 0; // Start at 0 for fade in
        audioRef.current = audio;

        return () => {
            audio.pause();
            audioRef.current = null;
        };
    }, []);

    // Handle fade in/out
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        let fadeInterval: number;

        if (isPlaying) {
            audio.play().catch(e => console.log("Audio play failed:", e));
            // Fade in to low volume (0.15)
            fadeInterval = window.setInterval(() => {
                if (audio.volume < 0.15) {
                    audio.volume = Math.min(0.15, audio.volume + 0.01);
                } else {
                    clearInterval(fadeInterval);
                }
            }, 100);
        } else {
            // Fade out
            fadeInterval = window.setInterval(() => {
                if (audio.volume > 0) {
                    audio.volume = Math.max(0, audio.volume - 0.01);
                } else {
                    audio.pause();
                    clearInterval(fadeInterval);
                }
            }, 100);
        }

        return () => clearInterval(fadeInterval);
    }, [isPlaying]);

    return (
        <div className="ambient-audio-control">
            <button
                onClick={() => setIsPlaying(!isPlaying)}
                className={`audio-toggle ${isPlaying ? "active" : ""}`}
                aria-label="Toggle ambient sound"
            >
                <div className="equalizer">
                    <motion.div
                        animate={isPlaying ? { height: [3, 8, 3] } : { height: 2 }}
                        transition={{ repeat: Infinity, duration: 0.8, ease: "easeInOut" }}
                        className="bar"
                    />
                    <motion.div
                        animate={isPlaying ? { height: [6, 12, 6] } : { height: 2 }}
                        transition={{ repeat: Infinity, duration: 1.1, ease: "easeInOut", delay: 0.2 }}
                        className="bar"
                    />
                    <motion.div
                        animate={isPlaying ? { height: [4, 10, 4] } : { height: 2 }}
                        transition={{ repeat: Infinity, duration: 0.9, ease: "easeInOut", delay: 0.4 }}
                        className="bar"
                    />
                </div>
            </button>
        </div>
    );
}
