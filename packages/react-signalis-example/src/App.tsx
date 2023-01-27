import React, { useEffect, useState } from 'react';
import { useCachedFetch } from './network';

interface Person {
  id: string;
  name: string;
  pets: Array<Pet>;
}

interface Pet {
  id: string;
  name: string;
}

const DisplayPets = ({ pets }: { pets: Array<Pet> }) => {
  return (
    <div className="border-2 rounded border-green-500 border-solid my-2 mx-2">
      <p className="text-lg font-bold text-green-500">Display Pets List Component</p>
      <ul>
        {pets.map((pet) => {
          return <DisplayPet key={pet.id} pet={pet} />;
        })}
      </ul>
    </div>
  );
};

const DisplayPet = ({ pet }: { pet: Pet }) => {
  return (
    <div className="border-2 rounded border-red-500 border-solid my-2 mx-2">
      <p className="text-lg font-bold text-red-500">Display Pet Component</p>
      <li>{pet.name}</li>
    </div>
  );
};

const DisplayPerson = () => {
  const { fetch, data: person, loading } = useCachedFetch<Person>();

  useEffect(() => {
    fetch('/api/users/1');
  }, []);

  const pets = person && person.pets;
  console.log('person', person);

  return (
    <div className="border-2 rounded border-blue-500 border-solid my-2 mx-2">
      <h1 className="text-lg font-bold text-blue-500">Display Person 1</h1>
      {loading && <span>Loading...</span>}
      {person && (
        <div>
          <span>Name: {person.name}</span>
          <br />
          <br />
          <div>Pets:</div>
          <DisplayPets pets={pets} />
        </div>
      )}
    </div>
  );
};

const UpdatePerson = () => {
  const [inputValue, setInputValue] = useState('');

  function handleInputChange(e: React.FormEvent<HTMLInputElement>) {
    setInputValue(e.currentTarget.value);
  }

  const { fetch } = useCachedFetch();

  function handleSubmit() {
    fetch('/api/users/1', {
      method: 'PUT',
      body: JSON.stringify({ name: inputValue }),
    }).then(() => {
      setInputValue('');
    });
  }

  return (
    <div className="border-2 rounded border-violet-500 border-solid my-2 mx-2">
      <h1 className="text-lg font-bold text-violet-800">Update Person 1</h1>
      <input
        type="text"
        className="border border-black rounded mr-1"
        value={inputValue}
        onChange={handleInputChange}
      />
      <button
        type="button"
        className="px-2 py-1 font-semibold text-sm bg-slate-500 text-white rounded-md shadow-sm opacity-100"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  );
};

const UpdatePet = () => {
  const { fetch } = useCachedFetch();

  const [inputValue, setInputValue] = useState('');

  function handleInputChange(e: React.FormEvent<HTMLInputElement>) {
    setInputValue(e.currentTarget.value);
  }

  function handleSubmit() {
    fetch('/api/pets/1', {
      method: 'PUT',
      body: JSON.stringify({ name: inputValue }),
    }).then(() => {
      setInputValue('');
    });
  }

  return (
    <div className="border-2 rounded border-amber-600 border-solid my-2 mx-2">
      <h1 className="text-lg font-bold text-amber-600">Update Pet 1</h1>
      <input
        type="text"
        className="border border-black rounded mr-1"
        value={inputValue}
        onChange={handleInputChange}
      />
      <button
        type="button"
        className="px-2 py-1 font-semibold text-sm bg-slate-500 text-white rounded-md shadow-sm opacity-100"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  );
};

function App() {
  return (
    <div className="m-6">
      <DisplayPerson />
      <UpdatePerson />
      <UpdatePet />
    </div>
  );
}

export default App;
