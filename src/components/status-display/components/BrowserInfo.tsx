"use client";

import { useBrowserInfo } from "../../../hooks/useBrowserInfo";

export default function BrowserInfoView() {
  const { name, version } = useBrowserInfo();

  return `${name} ${version}`;
}
