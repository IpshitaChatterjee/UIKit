import PropTypes from 'prop-types';
import './Button.css';

const VARIANTS = ['solid', 'outline', 'soft', 'ghost'];
const SIZES = ['xl', 'l', 'm', 's', 'xs'];
const SHAPES = ['rounded', 'pill', 'square'];
const COLORS = ['primary', 'neutral-solid', 'neutral-light', 'danger', 'success', 'inverse-light', 'inverse-solid'];
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
 * Button — all four emphasis levels, in rounded, pill, or square corners,
 * in the "primary", "neutral-solid", "neutral-light", "danger",
 * "success", "inverse-light", or "inverse-solid" color family. Matches
 * the "button_default/{shape}/primary" (rounded 213:6870, pill 241:3530,
 * square 241:4611), "button_default/{shape}/neutral-solid" (rounded
 * 213:6169, pill 241:5692, square 241:6773), "button_default/{shape}/
 * neutral-light" (rounded 213:5468, pill 241:7854, square 242:8937),
 * "button_default/{shape}/danger" (rounded 213:3365, pill 242:10018,
 * square 242:11099), "button_default/{shape}/success" (rounded
 * 213:7571, pill 242:12180, square 242:13261), "button_default/{shape}/
 * inverse-light" (rounded 213:4066, pill 242:14342, square 242:16504),
 * and "button_default/{shape}/inverse-solid" (rounded 213:4767, pill
 * 242:15043, square 242:17205) component sets in the UI Design Kit
 * Figma file — identical apart from radius (shape) and color. The
 * "danger" component set has some mislabeled variants in Figma (its
 * "ghost" cells are tagged Type=rounded, State=danger, and Has text=xl/s
 * instead of true/false in a handful of spots), and "success" solid's
 * hover/pressed state has its white-overlay inner shadow bound to
 * shadows/interactive/error/inner instead of .../success/inner (same
 * hex value either way, clearly a copy-paste leftover) — both verified
 * against the underlying fills/effects rather than the variant/binding
 * names. "inverse-light" and "inverse-solid" are, as of this Figma file,
 * pixel-identical in every fill/effect checked (both draw from the same
 * bg/text/stroke scale used everywhere else — there's no separate
 * "inverse" hue the way error/success have — plus the shared
 * shadows/interactive/inverse/* and focus-ring/colors/inverse/* effect
 * families), so their CSS rules are combined rather than duplicated.
 * Both differ structurally from every other color here: outline/soft/
 * ghost's "loading" state reverts to the *default* background with
 * text/placeholder as the label color instead of reusing the hover
 * background, and "disabled" uses its own darker bg/text combination
 * per type rather than the bg-weak/bg-static + text-disabled pairing
 * shared by every other color — both make sense given inverse buttons
 * are meant to sit on a dark or colored surface. Also, Figma's focused-
 * state ring effects for outline/soft/ghost have the offset-spread (3px)
 * and ring-spread (6px) swapped onto the color-inner/color-outer tokens
 * relative to every other color family; the CSS below keeps the
 * semantic pairing used everywhere else (color-inner at 3px, color-outer
 * at 6px) since that's what actually produces a normal two-tone ring.
 */
function Button({
  variant = 'solid',
  size = 'm',
  shape = 'rounded',
  color = 'primary',
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
    color !== 'primary' && `btn--${color}`,
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
  /** Color family, matches the Figma component set — "primary" (purple), "neutral-solid" (near-black/gray), "neutral-light" (softer gray), "danger" (red), "success" (green), or "inverse-light"/"inverse-solid" (for buttons on dark/colored surfaces — currently styled identically). */
  color: PropTypes.oneOf(COLORS),
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
