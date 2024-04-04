import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

function Footer() {
  return (
    <footer className={ styles.footer } data-testid="footer">
      <div>
        <Link to="/meals">
          <img
            src="src/images/mealIcon.svg"
            alt="Meals Icon"
            data-testid="meals-bottom-btn"
          />
        </Link>
        <Link to="/drinks">
          <img
            src="src/images/drinkIcon.svg"
            alt="Drinks Icon"
            data-testid="drinks-bottom-btn"
          />
        </Link>
      </div>
    </footer>
  );
}

export default Footer;
