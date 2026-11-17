export interface Badge {
  id: number;
  level: string;
  name: string;
  rank: string;
  desc: string;
  req: string;
  unlocked: boolean;
  imgUnlocked: string;
  imgLocked: string;
}

export type ViewMode = 'fluid' | 'desktop' | 'tablet' | 'mobile' | 'badges';
