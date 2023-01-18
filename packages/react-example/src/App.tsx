import React, { useEffect, useState } from 'react';
import { cachedFetch } from './network';
import '@preact/signals-react';

interface Person {
  name: string;
}

const DisplayPerson = () => {
  const [loading, setLoading] = useState(false);
  const [person, setPerson] = useState<Person>();

  useEffect(() => {
    console.log('getting user via cachedFetch');
    setLoading(true);
    cachedFetch('/api/users/1')
      .then((res: Person) => {
        console.log('setting person via useState', res);
        setPerson(res);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h1>Displaying Person 1</h1>
      {loading && <span>Loading...</span>}
      {person && <span>Name: {person.name}</span>}
    </div>
  );
};

const UpdatePerson = () => {
  let [inputValue, setInputValue] = useState('');

  function handleInputChange(e: React.FormEvent<HTMLInputElement>) {
    setInputValue(e.currentTarget.value);
  }

  function handleSubmit() {
    console.log('updating user via cachedFetch');
    cachedFetch('/api/users/1', {
      method: 'PUT',
      body: JSON.stringify({ name: inputValue }),
    }).then(() => {
      setInputValue('');
    });
  }

  return (
    <div>
      <h1>Updating Person 1</h1>
      <input type="text" value={inputValue} onInput={handleInputChange} />

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
