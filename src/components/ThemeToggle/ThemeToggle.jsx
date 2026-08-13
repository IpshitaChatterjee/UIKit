import PropTypes from 'prop-types';
import { Moon, Sun } from 'geist-icons';
import Button from '../Button/Button.jsx';

/**
 * Uses Button's default inverse-solid pill treatment. Wired here as a
 * real light/dark switch: the icon reflects the *current* theme (sun
 * while light, moon while dark).
 */
function ThemeToggle({ theme, onToggle, className = '' }) {
  const isDark = theme === 'dark';

  return (
    <Button
      variant="solid"
      color="inverse-solid"
      shape="pill"
      size="xl"
      className={className}
      iconLeft={isDark ? <Moon /> : <Sun />}
      onClick={onToggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    />
  );
}

ThemeToggle.propTypes = {
  theme: PropTypes.oneOf(['light', 'dark']).isRequired,
  onToggle: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default ThemeToggle;
