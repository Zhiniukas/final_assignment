export type TEvent = {
  id: number;
  title: string | null;
  description: number | null;
  date: string | null;
  place: string | null;
  isArchived: boolean | null;
};

export type TEvents = TEvent[];
