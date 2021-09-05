import {useState, useEffect} from 'react';
import DataTable from './components/DataTable';

function App() {

  const [data, setData] = useState([]);
  const [q, setQ] = useState('');
  const [searchColumns, setSearchColumns] = useState(['name'])

  useEffect(() => {
    fetch('https://swapi.dev/api/people/?format=json')
    .then(response => response.json())
    .then(d => setData(d.results))
  }, [])

  const search = (rows) => {
    // for searching by any of keys
    return rows.filter((row) => 
    searchColumns.some(
      (column) => row[column].toString().toLowerCase().indexOf(q.toLowerCase()) > -1
      )
    )
  }

  // get heading or keys  like name & height and ...
  const columns = data[0] && Object.keys(data[0]);

  const handleCheckboxFilter = (column) => (e) => {
    const checked = searchColumns.includes(column);
    setSearchColumns((prev) => (
      checked 
      ?  prev.filter(sc => sc !== column)
      : [...prev, column]
    ))
  }

  return (
    <div>
       <div>
        <input type="text" value={q} onChange={(e) => setQ(e.target.value)}/>
        { columns && 
         columns.map((column) => (
           <label>
             <input type="checkbox"
             checked={searchColumns.includes(column)}
             onChange={handleCheckboxFilter(column)} />
             {column}
           </label>
         ))}
       </div>
        <div>
          <DataTable data={search(data)}/>
        </div>
    </div>
    );
}

export default App;

// can use it insted of another fetch url >>>>  https://my.api.mockaroo.com/users.json?key=77f7cd00