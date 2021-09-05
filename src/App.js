import { useState, useEffect } from 'react';
import './App.css';
import DataTable from './components/DataTable';

function App() {

  const [data, setData] = useState([]);
  const [q, setQ] = useState('');

  useEffect(() => {
    fetch('https://swapi.dev/api/people/?format=json')
    .then(response => response.json())
    .then(d => setData(d.results))
  }, [])

  return (
    <div>
      <div>
        <input type="text" value={q} onChange={(e) => setQ(e.target.value)} />
      </div>
      <div>
        <DataTable data={data} />
      </div>
    </div>
  );
}

export default App;
