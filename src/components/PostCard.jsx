import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, Tag as TagIcon, ArrowRight } from 'lucide-react';

const PostCard = ({ post }) => {
    return (
        <motion.article
            whileHover={{ scale: 1.01, x: 5 }}
            className="stark-panel group relative overflow-hidden"
        >
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-stark-primary/0 group-hover:bg-stark-primary/5 transition-all duration-500" />

            <div className="p-6 relative z-10">
                <div className="flex justify-between items-start mb-4">
                    <span className="text-[10px] font-mono text-stark-primary border border-stark-primary/30 px-2 py-0.5 rounded">
                        {post.category?.toUpperCase() || 'GENERAL'}
                    </span>
                    <div className="flex items-center gap-1 text-[10px] font-mono text-white/40">
                        <Calendar size={12} />
                        {post.date}
                    </div>
                </div>

                <Link to={`/post/${post.slug}`}>
                    <h2 className="text-xl font-bold mb-3 group-hover:text-stark-primary transition-colors neon-text">
                        {post.title}
                    </h2>
                </Link>

                <p className="text-white/60 text-sm mb-6 line-clamp-2 leading-relaxed">
                    {post.summary}
                </p>

                <div className="flex justify-between items-center">
                    <div className="flex gap-2">
                        {(post.tags || []).slice(0, 3).map(tag => (
                            <span key={tag} className="text-[10px] text-white/40 font-mono">#{tag}</span>
                        ))}
                    </div>

                    <Link
                        to={`/post/${post.slug}`}
                        className="stark-button flex items-center gap-2 group/btn"
                    >
                        Access <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>

            {/* Decorative lines */}
            <div className="absolute top-0 right-0 w-16 h-[1px] bg-stark-primary/30" />
            <div className="absolute top-0 right-0 w-[1px] h-16 bg-stark-primary/30" />
        </motion.article>
    );
};

export default PostCard;
