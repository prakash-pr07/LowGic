import React, { useEffect, useRef, useState } from "react";

const SectionWrapper = ({ children, className = "", id }) => {
  const sectionRef = useRef(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsActive(entry.isIntersecting),
      {
        threshold: 0.5,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id={id}
      className={`${className} transition-all duration-700 ease-in-out rounded-xl border-2 px-6 py-16 my-12 
        ${isActive ? "border-blue-500 ring-2 ring-blue-400 shadow-[0_0_25px_rgba(0,123,255,0.5)] scale-[1.01]" : "border-gray-800"}`}
    >
      {children}
    </section>
  );
};

export default SectionWrapper;