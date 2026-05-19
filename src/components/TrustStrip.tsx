import { Marquee } from "@/components/ui/Marquee";
import { Zap, MapPin, Bot, Clock, Wrench, Unlock, Phone, Star, BadgeCheck } from "lucide-react";

const items = [
  { Icon: Zap,         text: "Fast Delivery"       },
  { Icon: MapPin,      text: "UK Based"            },
  { Icon: Bot,         text: "AI-Powered"          },
  { Icon: Clock,       text: "24/7 Support"        },
  { Icon: Wrench,      text: "Custom Built"        },
  { Icon: Unlock,      text: "No Lock-In"          },
  { Icon: Phone,       text: "Free Consultation"   },
  { Icon: BadgeCheck,  text: "£0 Setup Fee"        },
  { Icon: Star,        text: "5-Star Service"      },
];

function TrustItem({ Icon, text }: { Icon: React.FC<{ size?: number; className?: string }>; text: string }) {
  return (
    <div className="flex items-center gap-2.5 px-5 py-2 select-none">
      <Icon size={14} className="text-blue-500 flex-shrink-0" />
      <span className="text-sm font-semibold text-gray-600 whitespace-nowrap">{text}</span>
      <span className="ml-3 text-gray-200 text-lg font-light">·</span>
    </div>
  );
}

export default function TrustStrip() {
  return (
    <div
      className="relative w-full overflow-hidden border-y"
      style={{
        borderColor: "rgba(59,111,245,0.1)",
        background: "rgba(59,111,245,0.02)",
      }}
    >
      <Marquee pauseOnHover duration="35s" gap="0rem" repeat={3}>
        {items.map(({ Icon, text }) => (
          <TrustItem key={text} Icon={Icon} text={text} />
        ))}
      </Marquee>
    </div>
  );
}
