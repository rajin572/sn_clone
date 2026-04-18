import React from 'react';

const testimonials = [
    {
        quote: 'Novak transformed our product vision into a world-class digital experience. Absolutely exceptional work.',
        name: 'Sarah Müller',
        role: 'CEO, Archaica GmbH',
    },
    {
        quote: "The team's attention to detail and performance-first approach set them apart from every studio we've worked with.",
        name: 'James Larson',
        role: 'CTO, Luminex Corp',
    },
    {
        quote: 'From concept to launch in six weeks. The outcome exceeded every expectation we had.',
        name: 'Priya Nair',
        role: 'Head of Product, Solari',
    },
];

const Testimonial = () => {
    return (
        <section
            style={{
                height: '100vh',
                width: '100%',
                background: '#0c3188',
                color: '#ffffff',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                padding: '0 8vw',
            }}
        >
            <p style={{ fontSize: '0.85rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginBottom: '1.5rem' }}>
                Testimonials
            </p>
            <h2
                style={{
                    fontSize: 'clamp(2.5rem, 6vw, 6rem)',
                    fontWeight: 900,
                    lineHeight: 0.9,
                    textTransform: 'uppercase',
                    margin: '0 0 3.5rem',
                }}
            >
                What
                <br />
                Clients Say
            </h2>

            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                    gap: '2rem',
                    maxWidth: '1000px',
                }}
            >
                {testimonials.map(({ quote, name, role }) => (
                    <div
                        key={name}
                        style={{
                            background: 'rgba(255,255,255,0.08)',
                            border: '1px solid rgba(255,255,255,0.15)',
                            padding: '2rem',
                        }}
                    >
                        <p style={{ fontSize: '1rem', lineHeight: 1.7, color: 'rgba(255,255,255,0.85)', margin: '0 0 1.5rem' }}>
                            &ldquo;{quote}&rdquo;
                        </p>
                        <p style={{ fontWeight: 700, margin: 0, fontSize: '0.95rem' }}>{name}</p>
                        <p style={{ margin: '0.2rem 0 0', fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                            {role}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Testimonial;
