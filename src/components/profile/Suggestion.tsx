import Image from "next/image";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import avatar from "@/assets/avatar.png";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Cake, SendHorizontal } from "lucide-react";

export default function Suggestion({ className }: { className?: string }) {
  return (
    <div className={cn("space-y-7.5", className)}>
      <Card className="p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">You Might Like</h3>
          <Link href="#" className="text-sm text-primary hover:underline">
            See All
          </Link>
        </div>
        <Separator className="mt-3 mb-5" />
        <div className="flex flex-col items-start gap-5">
          <div className="flex items-center gap-5">
            <Image
              src={avatar}
              alt="Profile photo"
              width={50}
              height={50}
              className="rounded-full"
            />
            <div>
              <h3 className="font-semibold">Radovan SkillArena</h3>
              <p className="text-sm text-muted-foreground">
                Founder & CEO at Trophy
              </p>
            </div>
          </div>
          <div className="flex justify-around w-full gap-7">
            <Button variant="outline" className="flex-1">
              Ignore
            </Button>
            <Button className="flex-1">Add friend</Button>
          </div>
        </div>
      </Card>

      <Card className="p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Birthday</h3>
          <Link href="#" className="text-sm text-primary hover:underline">
            See All
          </Link>
        </div>
        <Separator className="mt-3 mb-5" />
        <div className="flex justify-between gap-5 mb-3.5">
          <Image src={avatar} alt="avatar" width={50} height={50} />
          <div className="flex-1 flex flex-col">
            <span className="text-base font-medium">Donald Trump</span>
            <span className="text-xs text-muted-foreground">
              Birthday today
            </span>
          </div>
        </div>
        <div className="flex gap-2 mb-4">
          <Input
            className="focus-visible:ring-offset-0"
            placeholder="Send them loving wishes"
          />
          <Button className="rounded-full p-2 w-11" variant="default">
            <SendHorizontal />
          </Button>
        </div>
        <div className="p-2 bg-gray-50 flex justify-between rounded-lg gap-3">
          <div className="p-3 bg-[#FFAB00]/20 rounded-sm h-fit">
            <Cake className="text-[#FFAB00]" size={20} />
          </div>
          <div className="flex flex-col">
            <span className="text-base">Upcoming birthdays</span>
            <span className="text-xs text-muted-foreground">
              See others have upcoming birthdays
            </span>
          </div>
        </div>
      </Card>
    </div>
  );
}
