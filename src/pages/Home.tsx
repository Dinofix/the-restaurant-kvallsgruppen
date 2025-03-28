import logo from '../assets/logo.png';
import backgroundVideo from '../assets/backgroundhomepage.mp4'; 
import "./../styles/_home.scss";

export const Home = () => {
  return (
    <div className='main'>
      <video autoPlay loop muted className="background-video"> 
        <source src={backgroundVideo} type="video/mp4" />
      </video>
      <div className="content">
        <img src={logo} className="logo" alt="Logo" />
        <div className="text-container">
          <p>Välkommen till TAH, din autentiska italienska kulinariska upplevelse mitt i hjärtat av Stockholm. Vi bjuder in dig att utforska en smakfull resa genom Italiens rika matkultur.
            På TAH får du uppleva genuina smaker av Italien, tillagade med kärlek och passion av våra erfarna kockar. Vårt varierade menyutbud erbjuder allt från klassiska pasta- och pizzarätter till läckra antipasti, färska sallader och utsökta efterrätter.
            Vi strävar efter att skapa en atmosfär av välkomnande och gemytlighet där varje måltid blir en minnesvärd upplevelse. Oavsett om du kommer för en romantisk middag för två, en familjevänlig lunch eller en festlig tillställning, så ser vi fram emot att få förgylla din dag med våra delikata rätter och vänliga service.
            Utforska våra menyer, boka ditt bord och låt oss ta dig med på en kulinarisk resa genom Italien här på TAH 
          </p>
        </div>
      </div>
    </div>
  );
};
