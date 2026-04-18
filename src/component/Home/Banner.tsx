import React from 'react';

const Banner = () => {
    return (
        <section
            style={{
                height: '100vh',
                width: '100%',
                background: '#0c0c0c',
                color: '#ffffff',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'flex-start',
                padding: '0 8vw',
            }}
        >
            <p style={{ fontSize: '1rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#aaa', marginBottom: '1.5rem' }}>
                Creative Studio — 2025
            </p>
            <h1
                style={{
                    fontSize: 'clamp(3rem, 10vw, 9rem)',
                    fontWeight: 900,
                    lineHeight: 0.88,
                    textTransform: 'uppercase',
                    margin: 0,
                }}
            >
                We Build
                <br />
                Digital
                <br />
                <span style={{ color: '#0c3188' }}>Experiences</span>
            </h1>
            <p style={{ marginTop: '2.5rem', fontSize: '1.1rem', color: '#bbb', maxWidth: '480px', lineHeight: 1.6 }}>
                Crafting bold, interactive, and high-performance web products that leave a lasting impression.
            </p>
            <div style={{ marginTop: '3rem', display: 'flex', gap: '1rem' }}>
                <button
                    style={{
                        padding: '0.85rem 2.2rem',
                        background: '#0c3188',
                        color: '#fff',
                        border: 'none',
                        fontSize: '0.95rem',
                        letterSpacing: '0.05em',
                        cursor: 'pointer',
                        textTransform: 'uppercase',
                    }}
                >
                    View Work
                </button>
                <button
                    style={{
                        padding: '0.85rem 2.2rem',
                        background: 'transparent',
                        color: '#fff',
                        border: '1px solid #fff',
                        fontSize: '0.95rem',
                        letterSpacing: '0.05em',
                        cursor: 'pointer',
                        textTransform: 'uppercase',
                    }}
                >
                    Get in Touch
                </button>
            </div>

            {/* Scroll hint */}
            <div
                style={{
                    position: 'absolute',
                    bottom: '2.5rem',
                    left: '8vw',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    color: '#666',
                    fontSize: '0.8rem',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                }}
            >
                <span
                    style={{
                        width: '40px',
                        height: '1px',
                        background: '#666',
                        display: 'inline-block',
                    }}
                />
                Scroll to explore
            </div>
        </section>
    );
};

export default Banner;
