import React from 'react';
import Sidebar from './Sidebar';
import { motion, AnimatePresence } from 'framer-motion';

const Layout = ({ children, activeCategory, activeTag }) => {
    return (
        <div className="min-h-screen bg-stark-bg flex bg-hud text-white selection:bg-stark-primary/30">
            {/* Scanline overlay */}
            <div className="scanline pointer-events-none" />

            <Sidebar activeCategory={activeCategory} activeTag={activeTag} />

            <main className="flex-1 w-full overflow-y-auto">
                <header className="border-b border-stark-border/20 px-8 py-4 flex justify-between items-center bg-stark-bg/80 backdrop-blur-md sticky top-0 z-10">
                    <div className="flex items-center gap-4">
                        <div className="w-2 h-2 bg-stark-primary animate-ping rounded-full" />
                        <span className="font-mono text-[10px] text-stark-primary/50 tracking-widest uppercase">
                            Core Monitoring Initialized // Session: {Math.random().toString(36).substring(7).toUpperCase()}
                        </span>
                    </div>
                    <div className="font-mono text-[10px] text-white/30 hidden md:block">
                        {new Date().toISOString()}
                    </div>
                </header>

                <section className="p-4 md:p-8 max-w-6xl mx-auto">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={window.location.pathname}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            {children}
                        </motion.div>
                    </AnimatePresence>
                </section>
            </main>
        </div>
    );
};

export default Layout;
