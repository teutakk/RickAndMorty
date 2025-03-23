import { IntlProvider } from 'react-intl';
import './App.css';
import CharacterDetails from './characters/CharacterDetails';
import { useSelector } from 'react-redux';
import { translate } from './translations/translate';
import Footer from './Footer/Footer';

function App() {

  const language = useSelector((state) => state.language.language);

  return (
    <div className="App">
      <IntlProvider locale='en'
        formats={{number:'en'}}
        messages={translate[language]}
      >
        <CharacterDetails />
        <Footer />
      </IntlProvider>
      {/* <div>Internship Task</div> */}
    </div>
  );
}

export default App;
