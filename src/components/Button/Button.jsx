import PropTypes from 'prop-types';
import './Button.css';

const VARIANTS = ['solid', 'outline', 'soft', 'ghost'];
const SIZES = ['xl', 'l', 'm', 's', 'xs'];
const SHAPES = ['rounded', 'pill', 'square'];
const FORCED_STATES = ['hover', 'pressed', 'focused'];

function Spinner() {
  return (
    <svg className="btn__spinner" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="10" r="8" stroke="currentColor" strokeOpacity="0.35" strokeWidth="3" />
      <path d="M18 10a8 8 0 0 0-8-8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

/**
 * Primary button — all four emphasis levels, in rounded, pill, or square
 * corners. Matches the "button_default/rounded/primary" (node 213:6870),
 * "button_default/pill/primary" (node 241:3530) and
 * "button_default/square/primary" (node 241:4611) component sets in the
 * UI Design Kit Figma file — identical in every respect but radius.
 */
function Button({
  variant = 'solid',
  size = 'm',
  shape = 'rounded',
  state,
  loading = false,
  disabled = false,
  iconLeft = null,
  iconRight = null,
  children,
  className = '',
  type = 'button',
  ...rest
}) {
  const isIconOnly = !children;

  const classes = [
    'btn',
    `btn--${variant}`,
    `btn--${size}`,
    `btn--${shape}`,
    isIconOnly && 'btn--icon-only',
    loading && 'btn--loading',
    state && `btn--force-${state}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled}
      aria-busy={loading || undefined}
      {...rest}
    >
      {loading ? (
        <Spinner />
      ) : (
        iconLeft && (
          <span className="btn__icon" aria-hidden="true">
            {iconLeft}
          </span>
        )
      )}
      {children && <span className="btn__label">{children}</span>}
      {!loading && iconRight && (
        <span className="btn__icon" aria-hidden="true">
          {iconRight}
        </span>
      )}
    </button>
  );
}

Button.propTypes = {
  /** Emphasis level, matches the Figma "Type" variant. */
  variant: PropTypes.oneOf(VARIANTS),
  /** Button scale, matches the Figma "Size" variant. */
  size: PropTypes.oneOf(SIZES),
  /** Corner style — "rounded" (soft corners), "pill" (fully rounded), or "square" (no rounding). */
  shape: PropTypes.oneOf(SHAPES),
  /** Forces a visual state regardless of real interaction — for documentation/testing only. */
  state: PropTypes.oneOf(FORCED_STATES),
  /** Shows a spinner in place of the left icon and blocks interaction, without disabling focus/announcement. */
  loading: PropTypes.bool,
  /** Disables the button (native `disabled` attribute). */
  disabled: PropTypes.bool,
  /** Icon rendered before the label, or alone when `children` is omitted. */
  iconLeft: PropTypes.node,
  /** Icon rendered after the label. Hidden while loading. */
  iconRight: PropTypes.node,
  /** Button label. Omit for an icon-only button (then pass `aria-label`). */
  children: PropTypes.node,
  className: PropTypes.string,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
};

export default Button;
