import React, { useState } from 'react';
import { Users, UserPlus, RefreshCw } from 'lucide-react';
import { Person, Team } from './types';
import { distributeTeams } from './utils';

function App() {
  const [people, setPeople] = useState<Person[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [newPerson, setNewPerson] = useState({ name: '', grade: 15000 });

  const handleAddPerson = () => {
    if (people.length >= 20) {
      alert('Maximum 20 personnes !');
      return;
    }
    if (!newPerson.name) {
      alert('Veuillez entrer un nom');
      return;
    }
    if (newPerson.grade < 0 || newPerson.grade > 30000) {
      alert('Le grade doit être entre 0 et 30000 points');
      return;
    }
    setPeople([...people, { ...newPerson, id: Date.now() }]);
    setNewPerson({ name: '', grade: 15000 });
  };

  const handleDistribute = () => {
    if (people.length !== 20) {
      alert('Il faut exactement 20 personnes pour faire la répartition');
      return;
    }
    setTeams(distributeTeams(people));
  };

  const handleReset = () => {
    setPeople([]);
    setTeams([]);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <Users className="h-8 w-8 text-blue-600" />
            Répartition d'Équipes
          </h1>

          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Ajouter une personne ({people.length}/20)</h2>
            <div className="flex gap-4 mb-4">
              <input
                type="text"
                value={newPerson.name}
                onChange={(e) => setNewPerson({ ...newPerson, name: e.target.value })}
                placeholder="Nom"
                className="flex-1 p-2 border rounded"
              />
              <input
                type="number"
                min="0"
                max="30000"
                value={newPerson.grade}
                onChange={(e) => setNewPerson({ ...newPerson, grade: Number(e.target.value) })}
                placeholder="Points (0-30000)"
                className="w-40 p-2 border rounded"
              />
              <button
                onClick={handleAddPerson}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center gap-2"
              >
                <UserPlus className="h-5 w-5" />
                Ajouter
              </button>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Liste des personnes</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {people.map((person) => (
                <div key={person.id} className="bg-gray-50 p-3 rounded">
                  <p className="font-medium">{person.name}</p>
                  <p className="text-sm text-gray-600">{person.grade} points</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-4 justify-center mb-8">
            <button
              onClick={handleDistribute}
              className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 flex items-center gap-2"
            >
              <RefreshCw className="h-5 w-5" />
              Répartir les équipes
            </button>
            <button
              onClick={handleReset}
              className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700"
            >
              Réinitialiser
            </button>
          </div>

          {teams.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Équipes</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {teams.map((team) => (
                  <div key={team.id} className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold mb-2">
                      Équipe {team.id} - Moyenne: {team.averageGrade} points
                    </h3>
                    <div className="space-y-2">
                      {team.members.map((member) => (
                        <div key={member.id} className="flex justify-between bg-white p-2 rounded">
                          <span>{member.name}</span>
                          <span className="text-gray-600">{member.grade} points</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;