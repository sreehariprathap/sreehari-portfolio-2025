import { FlipWords } from "./ui/flip-words";
import { ModeToggle } from "./themeToggle";
import SocialConnect from "./SocialConnect";

const Hero = () => {
    const words = ["Software Developer", "UI/UX Designer", "AI/ML Engineer"];
    return (
        <div className="p-5 flex flex-col items-start justify-between h-screen">
            <div className="flex flex-col justify-start gap-3">
                <div className="flex justify-between items-center">
                    <h1 className="text-7xl font-bold ml-2">Sreehari <span className="font-normal">Prathap</span>.</h1>
                </div>
                <FlipWords words={words} />
                <p className="ml-2 text-xl pt-3">
                    &quot;Fueled by a passion for learning and building, I create impactful solutions for people through programming and AI.&quot;{" "}
                </p>
            </div>
            
            {/* Social Connect component */}
            <div className="flex flex-col gap-2">
                <SocialConnect 
                    linkedinUrl="https://linkedin.com/in/sreehariprathap" 
                    githubUrl="https://github.com/sreehariprathap"
                    twitterUrl="https://twitter.com/sreehariprathap"
                    email="mailto:mail@sreehariprathap.com"
                />
                <ModeToggle />
            </div>
        </div>
    )
}
export default Hero