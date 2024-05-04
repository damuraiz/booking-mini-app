import './App.css';
import MyDateRangePicker from './MyDateRangePicker';
import {ru} from "date-fns/locale";



function App() {
  return (
      <div className="App" style={{width: '100%'}}>
          <h1 style={{textAlign: 'center'}}>Выбор диапазона дат</h1>
          <div style={{margin: '0 auto'}}>
              <MyDateRangePicker locale={ru}/>
          </div>
      </div>
  );
}


export default App;
