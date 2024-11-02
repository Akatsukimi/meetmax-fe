import React from "react";
import {Ban, Check, Info, Phone, Trash2, Video, Volume2} from "lucide-react";

import {Button} from "../ui/button";
import {Separator} from "../ui/separator";
import PhotoCollapsible from "../messages/photo-collapsible";
import VideoCollapsible from "../messages/video-collapsible";
import OtherCollapsible from "../messages/other-collapsible";
import DocumentCollapsible from "../messages/document-collapsible";
import {Avatar, AvatarFallback, AvatarImage} from "../ui/avatar";
import {Card, CardContent, CardHeader, CardTitle} from "../ui/card";
import {Sheet, SheetContent, SheetHeader, SheetTrigger} from "../ui/sheet";
import {User} from "@/lib/types";

interface IConversationHeaderProps {
    recipient: User | undefined;
}

const ConversationHeader = ({recipient}: IConversationHeaderProps) => {
    return (
        <div className='w-full flex items-center justify-between p-4.5 bg-background text-foreground'>
            <div className='flex items-center gap-4.5'>
                <Avatar className='size-12'>
                    <AvatarImage src={recipient?.avatar}/>
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className='flex flex-col'>
                    <p className='text-base'>{recipient?.username || 'username'}</p>
                    <div className='flex items-center gap-4'>
                        <span className='text-xs text-foreground/50'>Active now</span>
                        <span className='size-2 bg-green-500 rounded-full'></span>
                    </div>
                </div>
            </div>
            <div className='flex items-center gap-1'>
                <Button variant='ghost' size='icon'>
                    <Phone/>
                </Button>
                <Button variant='ghost' size='icon'>
                    <Video/>
                </Button>
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant='ghost' size='icon'>
                            <Info/>
                        </Button>
                    </SheetTrigger>
                    <SheetContent className='space-y-7.5'>
                        <SheetHeader className='py-7.5 flex items-center justify-center bg-gray-50 rounded-2xl'>
                            <Avatar className='size-20'>
                                <AvatarImage src='https://github.com/shadcn.png'/>
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <div className='mt-5 space-y-2.5 text-center'>
                                <div>
                                    <p>Lakshitha Jayasinghe</p>
                                    <span>UI designer</span>
                                </div>
                                <div className='flex items-center gap-4 justify-center'>
                                    <span className='text-xs text-foreground/50'>Active now</span>
                                    <span className='size-2.5 bg-green-500 rounded-full'></span>
                                </div>
                            </div>
                        </SheetHeader>
                        <Card className='w-full border-none bg-gray-50'>
                            <CardHeader className='p-3.5'>
                                <CardTitle className='text-sm'>Privacy & Support</CardTitle>
                            </CardHeader>
                            <Separator/>
                            <CardContent className='p-3.5 space-y-1'>
                                <button
                                    className='w-full flex items-center gap-4.5 hover:bg-accent hover:text-accent-foreground p-1'>
                                    <Check className='size-4'/>
                                    <span className='text-sm'>Mark as Unread</span>
                                </button>
                                <button
                                    className='w-full flex items-center gap-4.5 hover:bg-accent hover:text-accent-foreground p-1'>
                                    <Volume2 className='size-4'/>
                                    <span className='text-sm'>Mute Conversation</span>
                                </button>
                                <button
                                    className='w-full flex items-center gap-4.5 hover:bg-accent hover:text-accent-foreground p-1'>
                                    <Ban className='size-4'/>
                                    <span className='text-sm'>Block</span>
                                </button>
                                <button
                                    className='w-full flex items-center gap-4.5 hover:bg-accent hover:text-accent-foreground p-1'>
                                    <Trash2 className='size-4'/>
                                    <span className='text-sm'>Delete Chat</span>
                                </button>
                            </CardContent>
                        </Card>
                        <Card className='w-full border-none bg-gray-50'>
                            <CardHeader className='p-3.5'>
                                <CardTitle className='text-sm'>Shared Files</CardTitle>
                            </CardHeader>
                            <Separator/>
                            <CardContent className='p-3.5 space-y-3.5'>
                                <DocumentCollapsible/>
                                <PhotoCollapsible/>
                                <VideoCollapsible/>
                                <OtherCollapsible/>
                            </CardContent>
                        </Card>
                    </SheetContent>
                </Sheet>
            </div>
        </div>
    );
};

export default ConversationHeader;
