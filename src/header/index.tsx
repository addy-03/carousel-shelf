import "./styles.scss";

const Navbar = () => {
  return (
    <header className="site-header">
      <a href="#" className="brand-link">
        <img
          src="carousel_shelf_logo.png"
          alt="Carousel Shelf"
          className="brand-logo"
        />
        <div className="brand-text-wrapper">
          <span className="brand-name">Carousel Shelf</span>
          <p className="brand-tagline">We make the sliders you love</p>
        </div>
      </a>

      <nav className="header-navbar">
        <ul className="nav-list">
          <li className="item">Transparent</li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
