import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer-section text-light pt-5 pb-3 mt-5">

      <div className="container">

        <div className="row g-5">

          {/* Company */}

          <div className="col-lg-4 col-md-6">

            <h3 className="fw-bold mb-3">
              <i className="bi bi-buildings-fill text-warning me-2"></i>
              DreamEstate
            </h3>

            <p className="text-light-emphasis">
              Helping families find their dream homes with trust,
              transparency, and premium real estate services.
            </p>

            <div className="d-flex gap-3 mt-4">

              <a href="#" className="social-icon">
                <i className="bi bi-facebook"></i>
              </a>

              <a href="#" className="social-icon">
                <i className="bi bi-instagram"></i>
              </a>

              <a href="#" className="social-icon">
                <i className="bi bi-twitter-x"></i>
              </a>

              <a href="#" className="social-icon">
                <i className="bi bi-linkedin"></i>
              </a>

            </div>

          </div>

          {/* Quick Links */}

          <div className="col-lg-2 col-md-6">

            <h5 className="fw-bold mb-3">Quick Links</h5>

            <ul className="list-unstyled footer-links">

              <li><Link to="/">Home</Link></li>

              <li><Link to="/properties">Properties</Link></li>

              <li><Link to="/addpropertymanual">Add Property</Link></li>

              <li><Link to="/demands">Customer Demands</Link></li>

            </ul>

          </div>

          {/* Categories */}

          <div className="col-lg-3 col-md-6">

            <h5 className="fw-bold mb-3">Property Types</h5>

            <ul className="list-unstyled footer-links">

              <li><a href="#">Apartments</a></li>

              <li><a href="#">Luxury Villas</a></li>

              <li><a href="#">Commercial</a></li>

              <li><a href="#">Farm Houses</a></li>

            </ul>

          </div>

          {/* Contact */}

          <div className="col-lg-3 col-md-6">

            <h5 className="fw-bold mb-3">Contact Us</h5>

            <p>
              <i className="bi bi-geo-alt-fill text-warning me-2"></i>
              Chandigarh, India
            </p>

            <p>
              <i className="bi bi-envelope-fill text-warning me-2"></i>
              info@dreamestate.com
            </p>

            <p>
              <i className="bi bi-telephone-fill text-warning me-2"></i>
              +91 98765 43210
            </p>

          </div>

        </div>

        <hr className="border-secondary my-4" />

        <div className="text-center">

          <small className="text-light-emphasis">
            © {new Date().getFullYear()} DreamEstate. All Rights Reserved.
            <br />
            Designed with ❤️ using React & Bootstrap
          </small>

        </div>

      </div>

    </footer>
  );
}