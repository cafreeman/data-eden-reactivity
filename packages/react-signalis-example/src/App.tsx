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
    <ul>
      {pets.map((pet) => {
        return <DisplayPet key={pet.id} pet={pet} />;
      })}
    </ul>
  );
};

const DisplayPet = ({ pet }: { pet: Pet }) => {
  return <li>{pet.name}</li>;
};

const DisplayPerson = () => {
  const { fetch, data: person, loading } = useCachedFetch<Person>();

  useEffect(() => {
    fetch('/api/users/1');
  }, []);

  const pets = person && person.pets;

  return (
    <div>
      <h1>Display Person 1</h1>
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
    <div>
      <h1>Update Person 1</h1>
      <input type="text" value={inputValue} onChange={handleInputChange} />
      <button type="button" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};

function App() {
  return (
    <div>
      <DisplayPerson />
      <UpdatePerson />
    </div>
  );
}

export default App;
