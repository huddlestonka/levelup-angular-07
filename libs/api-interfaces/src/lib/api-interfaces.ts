export interface BaseEntity {
  id: string | null;
  title?: string | null;
}

export interface Workout extends BaseEntity {
  title: string;
  description: string;
  movements?: Movement[];
}

export interface Movement extends BaseEntity {
  title: string;
  description: string;
  workoutId: any;
}
