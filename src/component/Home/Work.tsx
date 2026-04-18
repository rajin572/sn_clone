import React from 'react';

const projects = [
    { title: 'Luminex', category: 'Branding / Web', year: '2024' },
    { title: 'Archaica', category: 'UI Design / Dev', year: '2024' },
    { title: 'Vektora', category: 'Motion / 3D', year: '2023' },
    { title: 'Solari', category: 'Full-Stack / App', year: '2023' },
];

const Work = () => {
    return (
        <section
            style={{
                height: '100vh',
                width: '100%',
                background: '#f5f5f5',
                color: '#0c0c0c',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                padding: '0 8vw',
            }}
        >
            <p style={{ fontSize: '0.85rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#0c3188', marginBottom: '1.5rem' }}>
                Selected Work
            </p>
            <h2
                style={{
                    fontSize: 'clamp(2.5rem, 6vw, 6rem)',
                    fontWeight: 900,
                    lineHeight: 0.9,
                    textTransform: 'uppercase',
                    margin: '0 0 3rem',
                }}
            >
                Our
                <br />
                <span style={{ color: '#0c3188' }}>Projects</span>
            </h2>

            <div style={{ width: '100%', maxWidth: '900px' }}>
                {projects.map(({ title, category, year }, i) => (
                    <div
                        key={title}
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '1.25rem 0',
                            borderBottom: '1px solid #ddd',
                            cursor: 'pointer',
                        }}
                    >
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '1.5rem' }}>
                            <span style={{ fontSize: '0.75rem', color: '#aaa', fontWeight: 400 }}>0{i + 1}</span>
                            <span style={{ fontSize: 'clamp(1.3rem, 3vw, 2.2rem)', fontWeight: 900, textTransform: 'uppercase' }}>
                                {title}
                            </span>
                        </div>
                        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                            <span style={{ fontSize: '0.8rem', color: '#777', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                                {category}
                            </span>
                            <span style={{ fontSize: '0.8rem', color: '#aaa' }}>{year}</span>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Work;
