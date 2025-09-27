export type Block = {
  block_name: string;
  attributes: Record<string, any>; // general, works for any block
};

export type PageProps = {
  blocks: Block[];
};
