import React from 'react';

const Card = ({ title, content }) => {
  return (
    <div className="bg-brand-card border border-brand-subtle rounded-lg overflow-hidden shadow-md p-6 mb-6">
      <h2 className="text-xl font-semibold text-brand-heading mb-4">{title}</h2>
      <div className="text-brand-foreground" dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
};

export default Card;
