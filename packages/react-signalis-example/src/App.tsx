import React, { useEffect, useState } from 'react';
import { useCachedFetch } from './network';

interface Person {
  id: string;
  name: string;
  pets: Array<Pet>;
  car: Car;
}

interface Pet {
  id: string;
  name: string;
}

interface Car {
  id: string;
  make: string;
  model: string;
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

const DisplayCar = ({ car }: { car: Car }) => {
  return (
    <div className="border-2 rounded border-lime-700 border-solid my-2 mx-2">
      <p className="text-lg font-bold text-lime-700">Display Car Component</p>
      <p>
        Car: {car.make} {car.model}
      </p>
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
          <div>Name: {person.name}</div>
          <DisplayCar car={person.car} />
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

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
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
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="border border-black rounded mr-1"
          value={inputValue}
          onChange={handleInputChange}
        />
        <button
          type="submit"
          className="px-2 py-1 font-semibold text-sm bg-slate-500 text-white rounded-md shadow-sm opacity-100"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

const UpdatePet = () => {
  const { fetch } = useCachedFetch();

  const [inputValue, setInputValue] = useState('');

  function handleInputChange(e: React.FormEvent<HTMLInputElement>) {
    setInputValue(e.currentTarget.value);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
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
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="border border-black rounded mr-1"
          value={inputValue}
          onChange={handleInputChange}
        />
        <button
          type="submit"
          className="px-2 py-1 font-semibold text-sm bg-slate-500 text-white rounded-md shadow-sm opacity-100"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

const UpdateCar = () => {
  const { fetch } = useCachedFetch();

  const [makeValue, setMakeValue] = useState('');
  const [modelValue, setModelValue] = useState('');

  function handleMakeChange(e: React.FormEvent<HTMLInputElement>) {
    setMakeValue(e.currentTarget.value);
  }

  function handleModelChange(e: React.FormEvent<HTMLInputElement>) {
    setModelValue(e.currentTarget.value);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const payload: { make?: string; model?: string } = {};
    if (makeValue) {
      payload.make = makeValue;
    }

    if (modelValue) {
      payload.model = modelValue;
    }

    fetch('/api/cars/1', {
      method: 'PUT',
      body: JSON.stringify(payload),
    }).then(() => {
      setMakeValue('');
      setModelValue('');
    });
  }

  return (
    <div className="border-2 rounded border-fuchsia-600 border-solid my-2 mx-2">
      <h1 className="text-lg font-bold text-fuchsia-600">Update Car 1</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="make-input">Make</label>
        <input
          type="text"
          id="make-input"
          className="ml-1 border border-black rounded mr-1"
          value={makeValue}
          onChange={handleMakeChange}
        />
        <label htmlFor="model-input">Model</label>
        <input
          type="text"
          id="model-input"
          className="ml-1 border border-black rounded mr-1"
          value={modelValue}
          onChange={handleModelChange}
        />
        <button
          type="submit"
          className="px-2 py-1 font-semibold text-sm bg-slate-500 text-white rounded-md shadow-sm opacity-100"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

function App() {
  return (
    <div className="m-6">
      <DisplayPerson />
      <UpdatePerson />
      <UpdatePet />
      <UpdateCar />
    </div>
  );
}

export default App;
