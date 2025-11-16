import { Bot, Sparkles, Asterisk, Boxes, HexagonIcon, MessagesSquare } from "lucide-react";

interface AIPlatformIconProps {
  platform: string;
  className?: string;
}

const AIPlatformIcon = ({ platform, className = "w-10 h-10" }: AIPlatformIconProps) => {
  const iconMap: Record<string, { Icon: typeof Bot; color: string }> = {
    ChatGPT: { Icon: Bot, color: "text-foreground" },
    Gemini: { Icon: Sparkles, color: "text-primary" },
    Claude: { Icon: Asterisk, color: "text-orange-500" },
    Copilot: { Icon: Boxes, color: "text-accent" },
    Perplexity: { Icon: HexagonIcon, color: "text-foreground" },
    "You.com": { Icon: MessagesSquare, color: "text-primary" },
    CharacterAI: { Icon: Bot, color: "text-accent" },
    Poe: { Icon: Bot, color: "text-purple-500" },
    HuggingFace: { Icon: Bot, color: "text-yellow-500" },
    Replika: { Icon: Bot, color: "text-pink-500" },
  };

  const { Icon, color } = iconMap[platform] || { Icon: Bot, color: "text-muted-foreground" };

  return <Icon className={`${className} ${color}`} />;
};

export default AIPlatformIcon;