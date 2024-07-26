import React from "react";

interface SkeletonLoadProps {
    count: number;
};

const SkeletonLoad = ({ count }: SkeletonLoadProps) => {
    return (
        <>
            {Array.from({ length: count }).map((_, index) => (
                <div key={index} className="w-[calc(90%)] h-2 bg-zinc-950 mt-4 mb-9 cursor-progress"></div>
            ))}
        </>
    );
};

export default SkeletonLoad;
