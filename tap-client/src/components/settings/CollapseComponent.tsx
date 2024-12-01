import React, { useState } from "react";

interface CollapseProps {
  title: string;
  children: React.ReactNode;
}

const Collapse: React.FC<CollapseProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleCollapse = () => setIsOpen(!isOpen);

  return (
    <div className="w-full max-w-md border  border-gray-300 rounded-md shadow-sm">
      {/* Title */}
      <div
        className="cursor-pointer px-4 py-2 bg-yellow-400 hover:bg-amber-200 flex justify-between items-center"
        onClick={toggleCollapse}
      >
        <h3 className="text-lg font-semibold">{title}</h3>
        <span>{isOpen ? '-' : '+' }</span>
      </div>

      {/* Content */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out text-wrap bg-white ${
          isOpen ? "max-h-[500px] pb-4" : "max-h-0"
        }`}
      >
        <div className="px-4 py-2">{children}</div>
      </div>
    </div>
  );
};

export default Collapse;
