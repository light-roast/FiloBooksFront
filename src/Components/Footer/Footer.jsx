import '@fortawesome/fontawesome-free/css/all.min.css';
import './Footer.css'
function Footer() {
    return ( <>
    <footer>
        <p id="cero">Desarrollado para ControlBox Corp.</p>
        <a id="uno" className="link" href="https://github.com/light-roast" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-github"></i> @light-roast.
        </a>
        <a id="dos" className="link" href="https://www.linkedin.com/in/danielecheverri-fullstackdeveloper/" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-linkedin"></i> Linkedin.
        </a>
        <a id="tres" className="link" href="mailto:echeverri121@example.com" target="_blank" rel="noopener noreferrer">
            <i className="far fa-envelope"></i> echeverri121@gmail.com 
        </a>
    </footer>
    </> 
    );
}

export default Footer;