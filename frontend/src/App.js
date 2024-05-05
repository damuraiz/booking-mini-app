import './App.css';
import MyDateRangePicker from './MyDateRangePicker';
import {ru} from "date-fns/locale";
import {CalendarProvider} from './CalendarContext';



function App() {
  return (
      <div className="App" style={{width: '100%'}}>
          <h1 style={{textAlign: 'center'}}>Выбор диапазона дат</h1>
          <div style={{margin: '0 auto'}}>
              <CalendarProvider><MyDateRangePicker locale={ru}/></CalendarProvider>
              {/*<MyDateRangePicker locale={ru}/>*/}
          </div>
      </div>
  );
}


export default App;
