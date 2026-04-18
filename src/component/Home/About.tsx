import React from 'react';

const About = () => {
    return (
        <section
            style={{
                height: '100vh',
                width: '100%',
                background: '#ffffff',
                color: '#0c0c0c',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                padding: '0 8vw',
            }}
        >
            <p style={{ fontSize: '0.85rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#0c3188', marginBottom: '1.5rem' }}>
                About Us
            </p>
            <h2
                style={{
                    fontSize: 'clamp(2.5rem, 7vw, 7rem)',
                    fontWeight: 900,
                    lineHeight: 0.9,
                    textTransform: 'uppercase',
                    margin: 0,
                }}
            >
                We Are
                <br />
                Novak
                <br />
                <span style={{ color: '#0c3188' }}>Studio</span>
            </h2>

            <div
                style={{
                    marginTop: '3rem',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                    gap: '2rem',
                    maxWidth: '900px',
                }}
            >
                {[
                    { num: '08+', label: 'Years of Experience' },
                    { num: '120+', label: 'Projects Delivered' },
                    { num: '40+', label: 'Global Clients' },
                ].map(({ num, label }) => (
                    <div key={label} style={{ borderTop: '1px solid #ddd', paddingTop: '1.25rem' }}>
                        <p style={{ fontSize: '3rem', fontWeight: 900, margin: 0, color: '#0c3188' }}>{num}</p>
                        <p style={{ margin: '0.25rem 0 0', color: '#555', textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.85rem' }}>
                            {label}
                        </p>
                    </div>
                ))}
            </div>

            <p style={{ marginTop: '3rem', color: '#555', fontSize: '1.05rem', lineHeight: 1.7, maxWidth: '520px' }}>
                A multidisciplinary design &amp; development studio focused on building immersive digital products
                that drive real business outcomes.
            </p>
        </section>
    );
};

export default About;
