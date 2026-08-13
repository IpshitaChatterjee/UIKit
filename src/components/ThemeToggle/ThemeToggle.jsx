import PropTypes from 'prop-types';
import { Moon, Sun } from 'geist-icons';
import Button from '../Button/Button.jsx';

/**
 * Matches the floating "button_default/pill/inverse-solid" icon button
 * from "POST-18" (node 4426:8720) in the Social media Figma file — shown
 * there with a sun glyph. Wired here as a real light/dark switch: the
 * icon reflects the *current* theme (sun while light, moon while dark).
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
