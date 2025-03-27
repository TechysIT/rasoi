import * as React from "react";

import { HeroUIProvider } from "@heroui/system";

export function NextProvider({ children }: { children: React.ReactNode }) {
  return <HeroUIProvider>{children}</HeroUIProvider>;
}
