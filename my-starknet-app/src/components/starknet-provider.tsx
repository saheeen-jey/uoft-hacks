"use client";
import { ReactNode } from "react";

import { devnet, goerli, mainnet } from "@starknet-react/chains";
import { useState } from "react";
import {
  StarknetConfig,
  argent,
  braavos,
  publicProvider,
  useInjectedConnectors,
  voyager,
  starkscan,
  starkcompass,
  viewblock,
  type ExplorerFactory
} from "@starknet-react/core";





export function StarknetProvider({ children }: { children: ReactNode }) {
  
  const [explorer, setExplorer] = useState<ExplorerFactory>(() => voyager);

  const starknetConfig = {
    // your provider configuration
  };

  const { connectors } = useInjectedConnectors({
    // Show these connectors if the user has no connector installed.
    recommended: [argent()],
    // Hide recommended connectors if the user has any connector installed.
    includeRecommended: "onlyIfNoConnectors",
    // Randomize the order of the connectors.
    order: "random",
  });

  return (
    <StarknetConfig
      chains={[goerli]}
      provider={publicProvider()}
      connectors={connectors}
      explorer={voyager}
    >
      {children}
    </StarknetConfig>
  );
}
