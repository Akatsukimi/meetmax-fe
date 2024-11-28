import { twMerge } from 'tailwind-merge';
import { clsx, type ClassValue } from 'clsx';
import {
  Facebook,
  Twitter,
  Instagram,
  Github,
  Linkedin,
  type LucideIcon,
  Globe,
} from 'lucide-react';
import React from 'react';
import { IconType } from 'react-icons';
import { FaTiktok } from 'react-icons/fa';
import { SocialPlatform } from './enum';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const PLATFORM_ICONS: Record<string, LucideIcon | IconType> = {
  [SocialPlatform.Portfolio]: Globe,
  [SocialPlatform.Facebook]: Facebook,
  [SocialPlatform.Twitter]: Twitter,
  [SocialPlatform.Instagram]: Instagram,
  [SocialPlatform.TikTok]: FaTiktok,
  [SocialPlatform.Github]: Github,
  [SocialPlatform.Linkedin]: Linkedin,
};

export const getSocialIcon = (
  platform: string,
  size: number = 16,
  className?: string,
) => {
  const Icon = PLATFORM_ICONS[platform];
  if (!Icon) return null;

  return React.createElement(Icon, {
    size,
    className: cn('', className),
  });
};
