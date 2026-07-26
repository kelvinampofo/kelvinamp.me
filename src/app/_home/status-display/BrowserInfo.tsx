"use client";

interface BrowserInfoProps {
  name: string;
  version: string;
}

export default function BrowserInfo({ name, version }: BrowserInfoProps) {
  return `${name} ${version}`;
}
