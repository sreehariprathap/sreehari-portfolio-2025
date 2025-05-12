"use client"

import Image from "next/image";
import Link from "next/link";
import { Download, Github, Linkedin, Mail, Twitter } from "lucide-react";
import { ModeToggle } from "./themeToggle";

interface SocialConnectProps {
    linkedinUrl?: string;
    githubUrl?: string;
    twitterUrl?: string;
    email?: string;
}

const SocialConnect = ({
    linkedinUrl = "https://linkedin.com/in/your-profile",
    githubUrl = "https://github.com/your-username",
    twitterUrl = "https://twitter.com/your-handle",
    email = "mailto:your-email@example.com"
}: SocialConnectProps) => {
    return (
        <div className="flex flex-col">
            <div className="flex items-center justify-start gap-5 w-full py-4 px-2">
                {/* Left side - Profile Image and Theme Toggle */}
                <div className="flex flex-col items-center gap-2">
                    <div className="relative h-16 w-16 overflow-hidden rounded-full border-2 border-gray-300 dark:border-gray-700">
                        <Image
                            src="/hari.png"
                            alt="Sreehari Prathap"
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                </div>

                {/* Right side - Social Icons */}
                <div className="flex items-center gap-4">
                    <Link href={linkedinUrl} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile">
                        <div className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors">
                            <Linkedin className="h-6 w-6" />
                        </div>
                    </Link>
                    <Link href={githubUrl} target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile">
                        <div className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors">
                            <Github className="h-6 w-6" />
                        </div>
                    </Link>
                    <Link href={twitterUrl} target="_blank" rel="noopener noreferrer" aria-label="Twitter Profile">
                        <div className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors">
                            <Twitter className="h-6 w-6" />
                        </div>
                    </Link>
                    <Link href={email} target="_blank" rel="noopener noreferrer" aria-label="Email">
                        <div className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors">
                            <Mail className="h-6 w-6" />
                        </div>
                    </Link>
                </div>
            </div>
            <div className="flex gap-4 items-center">
            <ModeToggle />

                <span className="group flex gap-1 items-center cursor-pointer hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
                    <span className="relative">
                        Download my Resume
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-current group-hover:w-full transition-all duration-300"></span>
                    </span>
                    <Download className="w-4 h-4"/>
                </span>
            </div>
        </div>
    );
};

export default SocialConnect;