export {};

declare global {
  interface Window {
    MetaTraderWebTerminal: new (
      containerId: string,
      options: MetaTraderOptions
    ) => unknown;
  }

  interface MetaTraderOptions {
    version: number;
    servers: string[];
    server: string;
    utmCampaign?: string;
    utmSource?: string;
    startMode?: string;
    language?: string;
    colorScheme?: string;
  }
}
