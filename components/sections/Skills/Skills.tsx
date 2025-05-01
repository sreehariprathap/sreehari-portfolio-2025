"use client";

import React from "react";
import { motion } from "motion/react";
import SectionHeader from "@/components/SectionHeader";
import { SectionObserver } from "@/components/ui/section-theme-transition/theme-context";
import Image from "next/image";

// Organize skill icons into categories
const skillsData = {
  frontend: {
    title: "Frontend",
    skills: [
      { name: "HTML5", icon: "/skills/HTML5_logo_and_wordmark.svg.png" },
      { name: "CSS3", icon: "/skills/CSS3_logo_and_wordmark.svg.png" },
      { name: "JavaScript", icon: "/skills/js.jpg" },
      { name: "React", icon: "/skills/React.webp" },
      { name: "Angular", icon: "/skills/Angular_full_color_logo.svg.png" },
      { name: "Vue.js", icon: "/skills/Vue.js_Logo_2.svg.png" },
      { name: "Next.js", icon: "/skills/next-js-logo-7929BCD36F-seeklogo.com.png" },
      { name: "Tailwind CSS", icon: "/skills/tailwind-css-icon.webp" },
      { name: "Bootstrap", icon: "/skills/Bootstrap_logo.svg.png" },
      { name: "Sass", icon: "/skills/2560px-Sass_Logo_Color.svg.png" },
      { name: "Vite", icon: "/skills/vite.svg" },
    ],
  },
  backend: {
    title: "Backend",
    skills: [
      { name: "Node.js", icon: "/skills/node-js-icon-454x512-nztofx17.png" },
      { name: "NestJS", icon: "/skills/NestJS.svg" },
      { name: "Python", icon: "/skills/Python-logo-notext.svg.png" },
      { name: "FastAPI", icon: "/skills/fastapi.png" },
      { name: "C#", icon: "/skills/Csharp_Logo.png" },
      { name: ".NET", icon: "/skills/Microsoft_.NET_logo.svg.png" },
    ],
  },
  database: {
    title: "Database & Cloud",
    skills: [
      { name: "SQL", icon: "/skills/pngimg.com - database_PNG9.png" },
      { name: "Supabase", icon: "/skills/669e87d174d190a8ba60b861_supabase-TAiY.png" },
      { name: "Firebase", icon: "/skills/firebase_icon-logo_brandlogos.net_tcvck.png" },
      { name: "Azure", icon: "/skills/prod-microsoft-azure-devops-server.png" },
      { name: "Docker", icon: "/skills/97_Docker_logo_logos-512.webp" },
    ],
  },
  languages: {
    title: "Languages",
    skills: [
      { name: "TypeScript", icon: "/skills/Typescript_logo_2020.svg.png" },
      { name: "C#", icon: "/skills/Logo_C_sharp.svg.png" },
      { name: "Python", icon: "/skills/Python-logo-notext.svg.png" },
    ],
  },
  ai: {
    title: "AI & Machine Learning",
    skills: [
      { name: "AI", icon: "/skills/artificial-intelligence-ai-processor-chip-icon-symbol-for-graphic-design-logo-web-site-social-media-png.webp" },
      { name: "PyTorch", icon: "/skills/pytorch-logo.png" },
      { name: "TensorFlow", icon: "/skills/Tensorflow_logo.svg.png" },
      { name: "OpenCV", icon: "/skills/OpenCV_logo_black.png" },
    ],
  },
  devTools: {
    title: "Dev Tools & Others",
    skills: [
      { name: "Git", icon: "/skills/Git-Icon-1788C.png" },
      { name: "Jest", icon: "/skills/jest-logo-png-transparent.png" },
      { name: "Figma", icon: "/skills/Figma-logo.svg.png" },
      { name: "Jira", icon: "/skills/free-jira-icon-download-in-svg-png-gif-file-formats--logo-social-media-pack-logos-icons-1912014.webp" },
      { name: "Stripe", icon: "/skills/stripe.png" },
      { name: "GitHub", icon: "/skills/Octicons-mark-github.svg" },
    ],
  },
};

const SkillCategory = ({ title, skills }: { title: string; skills: { name: string; icon: string }[] }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      className="mb-8"
    >
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <div className="flex flex-wrap gap-4">
        {skills.map((skill) => (
          <div key={skill.name} className="flex flex-col items-center">
            <div className="w-12 h-12 relative bg-white dark:bg-neutral-800 rounded-md p-2 shadow-sm hover:shadow-md transition-shadow duration-300">
              <Image
                src={skill.icon}
                alt={skill.name}
                fill
                style={{ objectFit: "contain" }}
                className="p-1"
              />
            </div>
            <span className="text-xs mt-1 text-center">{skill.name}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default function Skills() {
  return (
    <section id="skills" className="py-20 relative">
      <SectionObserver sectionId="skills" />
      
      <div className="container max-w-4xl mx-auto px-4">
        <SectionHeader title="Skills" number="04" />
        
        <div className="mt-12 space-y-8">
          <p className="text-lg mb-8 leading-relaxed">
            Here are the technologies and tools I&apos;ve worked with throughout my career:
          </p>
          
          {Object.values(skillsData).map((category) => (
            <SkillCategory
              key={category.title}
              title={category.title}
              skills={category.skills}
            />
          ))}
        </div>
      </div>
    </section>
  );
}