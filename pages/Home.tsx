import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import AiTrainer from "@/components/AITrainer";
import { Hero } from "@/components/Hero";
import MarqueText from "@/components/MarqueText";
import { Newsletter } from "@/components/Newsletter";
import { ProgramsSection } from "@/components/Programs";
import { TrainersSection } from "@/components/TrainersSection";
import Advantages from "./Advantages";
import Faq from "./Faq";

const Home: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const id = (location.state as { scrollTo?: string } | null)?.scrollTo;
        if (!id) return;

        requestAnimationFrame(() => {
            document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
            navigate("/", { replace: true, state: null });
        });
    }, [location.state, navigate]);

    return (
        <main>
            <section id="home">
                <Hero />
            </section>

            <MarqueText />

            <section id="programs" className="py-24 bg-zinc-950">
                <ProgramsSection />
            </section>

            {/* <section id="ai-trainer" className="py-24 bg-black relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/60 rounded-full blur-[120px] z-0" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-500/30 rounded-full blur-[120px] z-0" />
                <AiTrainer />
            </section> */}

            {/* <section id="trainers" className="py-24 bg-zinc-950">
                <TrainersSection />
            </section> */}

            <section>
                <Advantages withTopPadding={false} />
            </section>

            {/* <section className="py-24">
                <Newsletter />
            </section> */}

            <section>
                <Faq/>
            </section>
        </main>
    );
};

export default Home;