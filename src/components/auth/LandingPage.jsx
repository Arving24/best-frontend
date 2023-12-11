import logo from '../../../static/img/barapido_logo_whole.png';
import '../../../App.css';
import Button from 'react-bootstrap/Button';

function LandingPage() {
  return (

    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Barapido Enterprise Systems & Technologies
        </p>
        <a
          className="App-link"
          href="/dashboard"
          rel="noopener noreferrer"
        >
          <Button variant="primary">Proceed to Dashboard</Button>
        </a>
        {/* <br></br> */}
        {/* <a
          className="App-link"
          href="/clients/home"
          rel="noopener noreferrer"
        >
				  <Button variant="primary">Client Center</Button>
        </a> */}
      </header>
    </div>
  );
}

export default LandingPage;