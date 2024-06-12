// This component represents the website's footer, which displays the creator's name and a link to their GitHub profile
function Footer() {
    return (
      <footer className="bg-white border-t border-gray-200 mx-3 py-4 d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
       <div className="col-md-4 d-flex align-items-center">
      <a href="/" className="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1">
        TEFO
      </a>
      <span className="mb-3 mb-md-0 text-muted">© 2024 Tsoaela Industries (Pty) Ltd</span>
    </div>

    {/* <ul className="nav col-md-4 list-unstyled d-flex">
      <li className="ms-3"><a className="text-muted" href="#">X</a></li>
      <li className="ms-3"><a className="text-muted" href="#">I</a></li>
      <li className="ms-3"><a className="text-muted" href="#">F</a></li>
    </ul> */}
      </footer>
    );
  }
  
  export default Footer;
  