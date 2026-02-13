import matter from 'gray-matter';

// Use import.meta.glob to get all markdown files in src/posts
const postFiles = import.meta.glob('../posts/*.md', { query: '?raw', eager: true });

export const getAllPosts = () => {
    const posts = Object.keys(postFiles).map((path) => {
        const slug = path.split('/').pop().replace('.md', '');
        const content = postFiles[path].default || postFiles[path];
        const { data, content: body } = matter(content);

        return {
            slug,
            ...data,
            body,
        };
    });

    // Sort by date descending
    return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
};

export const getPostBySlug = (slug) => {
    const posts = getAllPosts();
    return posts.find((p) => p.slug === slug);
};

export const getCategories = () => {
    const posts = getAllPosts();
    const categories = [...new Set(posts.map((p) => p.category))];
    return categories.filter(Boolean);
};

export const getTags = () => {
    const posts = getAllPosts();
    const tags = [...new Set(posts.flatMap((p) => p.tags || []))];
    return tags.filter(Boolean);
};
