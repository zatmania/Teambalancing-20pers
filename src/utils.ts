import { Person, Team } from './types';

export const calculateAverageGrade = (members: Person[]): number => {
  if (members.length === 0) return 0;
  const sum = members.reduce((acc, member) => acc + member.grade, 0);
  return Number((sum / members.length).toFixed(2));
};

export const distributeTeams = (people: Person[]): Team[] => {
  // Trier les personnes par grade décroissant
  const sortedPeople = [...people].sort((a, b) => b.grade - a.grade);
  const teams: Team[] = Array.from({ length: 4 }, (_, i) => ({
    id: i + 1,
    members: [],
    averageGrade: 0
  }));

  // Distribution en serpentin pour équilibrer les équipes
  sortedPeople.forEach((person, index) => {
    const teamIndex = index % 4;
    teams[teamIndex].members.push(person);
    teams[teamIndex].averageGrade = calculateAverageGrade(teams[teamIndex].members);
  });

  return teams;
};