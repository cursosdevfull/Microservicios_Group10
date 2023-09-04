export type BootstrapReturn = boolean | Error;

export interface Bootstrap {
  initialize(): Promise<BootstrapReturn>;
  close(): void;
}
