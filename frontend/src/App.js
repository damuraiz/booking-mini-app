import './App.css';
import MyDateRangePicker from './MyDateRangePicker';
import {ru} from "date-fns/locale";
import {CalendarProvider} from './CalendarContext';



function App() {
  return (
      <div className="App" style={{width: '100%'}}>
          <div>
              {/*<h1 style={{textAlign: 'center'}}>Уютная квартира@Сурин</h1>*/}
          </div>
          <div style={{margin: '0 auto'}}>
              <CalendarProvider>
                  <MyDateRangePicker locale={ru}/>
              </CalendarProvider>
          </div>
      </div>
  );
}


export default App;
