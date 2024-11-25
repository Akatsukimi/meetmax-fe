import {
  Cake,
  CircleUserRound,
  Facebook,
  Globe,
  Instagram,
  MapPinHouse,
  Rss,
  Twitter,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ProfileIntro() {
  return (
    <Card className="p-4">
      <h2 className="mb-4 text-lg font-semibold">INTRO</h2>
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Globe size={16} />
          <Link
            href="https://uihut.com"
            className="text-sm text-muted-foreground hover:underline"
          >
            uihut.com
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <CircleUserRound size={16} />
          <span className="text-sm text-muted-foreground">Male</span>
        </div>
        <div className="flex items-center gap-2">
          <Cake size={16} />
          <span className="text-sm text-muted-foreground">
            Born June 18, 2001
          </span>
        </div>
        <div className="flex items-center gap-2">
          <MapPinHouse size={16} />
          <span className="text-sm text-muted-foreground">
            Sylhet, Bangladesh
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Facebook size={16} />
          <span className="text-sm text-muted-foreground">salehahmed</span>
        </div>
        <div className="flex items-center gap-2">
          <Twitter size={16} />
          <span className="text-sm text-muted-foreground">salehahmed</span>
        </div>
        <div className="flex items-center gap-2">
          <Instagram size={16} />
          <span className="text-sm text-muted-foreground">Saleh_ahmed</span>
        </div>
        <div className="flex items-center gap-2">
          <Rss size={16} />
          <span className="text-sm text-muted-foreground">
            52,844 Followers
          </span>
        </div>
        <Button variant="outline" className="w-full">
          Edit Details
        </Button>
      </div>
    </Card>
  );
}
