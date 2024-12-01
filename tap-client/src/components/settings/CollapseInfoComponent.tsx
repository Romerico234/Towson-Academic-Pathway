import React from "react";

interface InfoProps {
  title: string;
  data?: any;
}

const CollapseInfo: React.FC<InfoProps> = ({ title, data="N/A" }) => {
  
  
    return (
        <div className="flex-col">
            <label>{title}</label>
            <div className="w-full border border-gray-300 bg-gray-100 text-gray-500 px-4 py-2 ">
                {data}
            </div>
        </div>
    );
  };
  
  export default CollapseInfo;