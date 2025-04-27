import { navLinks } from "../../../../constants/navLinks";
import styles from "./Navigation.module.scss";
import { NavLink } from "react-router-dom";

export const Navigation = () => {
  return (
    <nav className={styles.nav}>
      <ul className={styles.nav__list}>
        {navLinks.map((link) => (
          <li className={styles.nav__item} key={link.path}>
            <NavLink to={link.path} className={styles.nav__link}>
              {link.text}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
