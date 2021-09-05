import {useState, useEffect} from 'react';
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

  const search = (rows) => {
    // get heading or keys  like name & height and ...
    const columns = rows[0] && Object.keys(rows[0]);
    // for searching by any of keys
    return rows.filter((row) => columns.some((column) => row[column].toString().toLowerCase().indexOf(q.toLowerCase()) > -1))
  }

  return (
    <div>
       <div>
        <input type="text" value={q} onChange={(e) => setQ(e.target.value)}/>
       </div>
        <div>
          <DataTable data={search(data)}/>
        </div>
    </div>
    );
}

export default App;
