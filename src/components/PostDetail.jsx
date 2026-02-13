import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark as theme } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Giscus from '@giscus/react';
import { motion } from 'framer-motion';
import { Calendar, Tag as TagIcon, Clock, ChevronLeft } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPostBySlug } from '../lib/posts';
import Layout from './Layout';

const PostDetail = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const post = getPostBySlug(slug);

    if (!post) {
        return (
            <Layout>
                <div className="text-center py-20 font-mono text-stark-primary">
                    [ ERROR: POST_NOT_FOUND ]
                    <button onClick={() => navigate('/')} className="block mx-auto mt-4 stark-button">Return to Dashboard</button>
                </div>
            </Layout>
        );
    }

    return (
        <Layout activeCategory={post.category}>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="max-w-4xl mx-auto"
            >
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-white/40 hover:text-stark-primary transition-colors font-mono text-xs mb-8 uppercase tracking-widest"
                >
                    <ChevronLeft size={16} /> [ BACK_TO_FEED ]
                </button>

                <header className="mb-12">
                    <div className="flex items-center gap-4 mb-4 text-xs font-mono text-stark-primary/60">
                        <span className="border border-stark-primary/30 px-2 py-0.5 rounded uppercase">{post.category}</span>
                        <div className="flex items-center gap-1">
                            <Calendar size={14} /> {post.date}
                        </div>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 neon-text leading-tight">
                        {post.title}
                    </h1>
                    <p className="text-xl text-white/60 leading-relaxed font-sans italic border-l-2 border-stark-primary/30 pl-6 py-2">
                        {post.summary}
                    </p>
                </header>

                <article className="prose prose-invert prose-stark max-w-none mb-16">
                    <ReactMarkdown
                        components={{
                            code({ node, inline, className, children, ...props }) {
                                const match = /language-(\w+)/.exec(className || '');
                                return !inline && match ? (
                                    <div className="relative group my-8">
                                        <div className="absolute -top-3 left-4 px-2 py-0.5 bg-stark-sub border border-stark-border/50 rounded text-[10px] font-mono text-stark-primary z-10 uppercase tracking-widest">
                                            {match[1]}
                                        </div>
                                        <SyntaxHighlighter
                                            style={theme}
                                            language={match[1]}
                                            PreTag="div"
                                            className="rounded-lg !bg-stark-sub/80 border border-stark-border/30 !m-0 !pt-6 shadow-glow"
                                            {...props}
                                        >
                                            {String(children).replace(/\n$/, '')}
                                        </SyntaxHighlighter>
                                    </div>
                                ) : (
                                    <code className={`${className} bg-stark-primary/10 text-stark-primary px-1 rounded`} {...props}>
                                        {children}
                                    </code>
                                );
                            },
                            h1: ({ children }) => <h1 className="text-3xl font-bold mt-12 mb-6 text-white border-b border-stark-border/20 pb-2">{children}</h1>,
                            h2: ({ children }) => <h2 className="text-2xl font-bold mt-10 mb-4 text-white/90">{children}</h2>,
                            p: ({ children }) => <p className="text-white/80 leading-8 mb-6">{children}</p>,
                            ul: ({ children }) => <ul className="list-disc list-inside space-y-2 mb-6 text-white/80">{children}</ul>,
                            a: ({ children, href }) => <a href={href} className="text-stark-primary hover:underline underline-offset-4">{children}</a>,
                            blockquote: ({ children }) => (
                                <blockquote className="border-l-4 border-stark-primary/30 bg-stark-primary/5 p-4 my-6 italic text-white/70">
                                    {children}
                                </blockquote>
                            ),
                        }}
                    >
                        {post.body}
                    </ReactMarkdown>
                </article>

                <div className="hud-line" />

                <section className="mt-12 bg-stark-sub/30 p-8 rounded-xl border border-stark-border/20">
                    <h3 className="font-mono text-sm text-stark-primary tracking-[0.3em] mb-8 text-center uppercase">
                        dlgurwnd9604@hanyang.ac.kr
                    </h3>
                    <Giscus
                        id="comments"
                        repo="Leehyeokjung/hj-log"
                        repoId="R_kgDOROmzOQ"
                        category="Announcements"
                        categoryId="DIC_kwDOROmzOc4C2W4D"
                        mapping="title"
                        strict="0"
                        reactionsEnabled="1"
                        emitMetadata="0"
                        inputPosition="top"
                        theme="dark_high_contrast"
                        lang="ko"
                        loading="lazy"
                    />
                </section>
            </motion.div>
        </Layout>
    );
};

export default PostDetail;
