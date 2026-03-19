export type PrepTask = {
  id: number;
  title: string;
  station: string;
  dueTime: string;
  completed: boolean;
};

export type PrepTaskInput = Omit<PrepTask, "id" | "completed">;
