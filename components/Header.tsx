
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="text-center">
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
          Photo AI Studio
        </span>
      </h1>
      <p className="mt-2 text-lg text-gray-300">
        Create professional photoshoots in seconds.
      </p>
    </header>
  );
};

export default Header;
