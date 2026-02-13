import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getAllPosts } from '../lib/posts';
import PostCard from './PostCard';
import Layout from './Layout';
import { motion } from 'framer-motion';
import { Search, Filter } from 'lucide-react';

const Dashboard = () => {
    const { category, tag } = useParams();
    const posts = useMemo(() => getAllPosts(), []);

    const filteredPosts = useMemo(() => {
        return posts.filter(post => {
            if (category && post.category !== category) return false;
            if (tag && !post.tags?.includes(tag)) return false;
            return true;
        });
    }, [posts, category, tag]);

    return (
        <Layout activeCategory={category} activeTag={tag}>
            <header className="mb-12">
                <div className="flex items-center gap-3 mb-2">
                    <Filter size={18} className="text-stark-primary" />
                    <h1 className="text-2xl font-mono uppercase tracking-[0.2em]">
                        {category ? `Category: ${category}` : tag ? `Tag: #${tag}` : 'Main Dashboard'}
                    </h1>
                </div>
                <div className="hud-line" />
                <div className="flex justify-between items-center text-[10px] font-mono text-white/30 uppercase">
                    <span>Files Detected: {filteredPosts.length}</span>
                    <span>Security Level: Level 4</span>
                </div>
            </header>

            {filteredPosts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredPosts.map((post, index) => (
                        <motion.div
                            key={post.slug}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <PostCard post={post} />
                        </motion.div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 border border-dashed border-stark-border/30 rounded-lg">
                    <Search size={48} className="mx-auto text-white/10 mb-4" />
                    <p className="font-mono text-white/40 uppercase">No matching protocols found in database.</p>
                    <Link to="/" className="mt-4 inline-block stark-button">Reset Search</Link>
                </div>
            )}
        </Layout>
    );
};

export default Dashboard;
