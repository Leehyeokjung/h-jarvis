import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, Database, Tag, Shield, Cpu, Activity } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { getCategories, getTags } from '../lib/posts';

const Sidebar = ({ activeCategory, activeTag }) => {
    const categories = getCategories();
    const tags = getTags();
    const location = useLocation();

    return (
        <motion.aside
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="w-64 border-r border-stark-border/30 bg-stark-sub/40 backdrop-blur-xl p-6 hidden lg:flex flex-col gap-8 h-screen sticky top-0"
        >
            <Link to="/" className="flex items-center gap-2 mb-4 group cursor-pointer">
                <Cpu className="text-stark-primary animate-pulse group-hover:scale-110 transition-transform" size={24} />
                <h1 className="font-mono text-xl tracking-tighter neon-text group-hover:brightness-125 transition-all">HJARVIS</h1>
            </Link>

            <nav className="flex flex-col gap-6">
                <div>
                    <h2 className="text-xs font-mono text-stark-primary/50 uppercase tracking-widest mb-4 flex items-center gap-2">
                        <Database size={14} /> Categories
                    </h2>
                    <ul className="flex flex-col gap-2">
                        <li>
                            <Link
                                to="/"
                                className={`text-sm font-mono block px-3 py-2 rounded transition-all ${location.pathname === '/' ? 'bg-stark-primary/20 text-stark-primary' : 'text-white/60 hover:text-white hover:bg-white/5'}`}
                            >
                                ALL
                            </Link>
                        </li>
                        {categories.map(cat => (
                            <li key={cat}>
                                <Link
                                    to={`/category/${cat}`}
                                    className={`text-sm font-mono block px-3 py-2 rounded transition-all ${activeCategory === cat ? 'bg-stark-primary/20 text-stark-primary' : 'text-white/60 hover:text-white hover:bg-white/5'}`}
                                >
                                    {cat.toUpperCase()}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h2 className="text-xs font-mono text-stark-primary/50 uppercase tracking-widest mb-4 flex items-center gap-2">
                        <Tag size={14} /> Tags
                    </h2>
                    <div className="flex flex-wrap gap-2">
                        {tags.map(tag => (
                            <Link
                                key={tag}
                                to={`/tag/${tag}`}
                                className={`text-[10px] font-mono border px-2 py-1 rounded transition-all ${activeTag === tag ? 'border-stark-primary bg-stark-primary/20 text-stark-primary' : 'border-white/10 text-white/40 hover:border-stark-primary/50 hover:text-stark-primary'}`}
                            >
                                #{tag}
                            </Link>
                        ))}
                    </div>
                </div>
            </nav>

            <div className="mt-auto pt-6 border-t border-stark-border/20">
                <div className="flex items-center gap-2 text-[10px] font-mono text-stark-primary/40 uppercase">
                    <Shield size={12} /> Status: Online
                </div>
                <div className="flex items-center gap-2 text-[10px] font-mono text-stark-primary/40 uppercase mt-2">
                    <Activity size={12} /> Power: 100%
                </div>
            </div>
        </motion.aside>
    );
};

export default Sidebar;
