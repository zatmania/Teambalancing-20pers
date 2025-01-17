export interface Person {
  id: number;
  name: string;
  grade: number; // Grade de 0 à 30000 points
}

export interface Team {
  id: number;
  members: Person[];
  averageGrade: number;
}