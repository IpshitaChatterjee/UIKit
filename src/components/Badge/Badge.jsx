import PropTypes from 'prop-types';
import './Badge.css';

const VARIANTS = ['solid', 'outline', 'soft', 'ghost'];
const SIZES = ['md', 'sm', 'xs'];
const SHAPES = ['rounded', 'pill'];
const COLORS = ['primary', 'neutral', 'success', 'danger', 'warning', 'info', 'verified', 'away', 'highlight', 'inverse', 'disabled'];

/**
 * Badge — a static, non-interactive label in four emphasis levels
 * ("solid"/"outline"/"soft"/"ghost", mirroring Button's Type variant), two
 * corner styles ("rounded"/"pill" — Badge has no "square" shape, unlike
 * Button), three sizes ("md"/"sm"/"xs"), and the "primary", "neutral",
 * "success", "danger", "warning", "info", "verified", "away", "highlight",
 * "inverse", or "disabled" color family.
 *
 * Unlike Button.jsx, none of this is pulled from a verified Figma
 * component set: the "→ Badge" page (node 333:2, frame "Badge(Tag)"
 * 335:7985) in the UI Design Kit only contains an empty taxonomy sheet —
 * row/column labels for Shape × Size × Variant × Color × Content-type,
 * with no fills, effects, or bound variables on any cell (confirmed via
 * get_design_context/get_metadata: zero component/instance nodes in the
 * grid body). So sizing, padding, and radius below are estimated to read
 * as a compact version of Button's own scale, and every color's actual
 * paint reuses Button's existing token mapping (color-tokens/primary/*,
 * /error/* for danger, /success/*, /warning/*, /info/*, and Button's
 * neutral-solid bg- and text-strongest pattern for "neutral"/"inverse") —
 * same reasoning Button.jsx already applies to its own Figma-unverified
 * "info" color. The taxonomy sheet's color columns also list "Verified",
 * "Away", "Highlight", and "Disabled" alongside the six above. "Disabled"
 * maps cleanly onto Button's existing bg-weak/text-disabled tokens.
 * "Verified"/"Away"/"Highlight" *do* have real Figma variable collections
 * (weakest/weak/base/strong/strongest, same shape as primary/error/
 * success/warning/info: sky for verified, yellow for away, fuchsia for
 * highlight — Figma names the last one "highlighted", kept as "highlight"
 * here to match the taxonomy sheet's column label) — these three
 * reference color-tokens-{verified,away,highlighted}-* below (see
 * Badge.css), now confirmed synced into build/css/tokens.css. Figma's
 * "away" variable has its own quirk, mirrored here rather than corrected:
 * "strong" is bound to the exact same yellow/regular/600 swatch as
 * "base" (no 700 step used), the same kind of copy-paste mismatch
 * Button.jsx's danger color already documents.
 *
 * Badges are static labels, not controls: there's no hover/pressed/
 * focused state matrix here the way Button has one (nothing in the
 * taxonomy sheet suggested one either), and disabling is expressed by
 * `color="disabled"` rather than a `disabled` boolean prop.
 */
function Badge({
  variant = 'soft',
  size = 'md',
  shape = 'rounded',
  color = 'neutral',
  iconLeft = null,
  iconRight = null,
  children,
  className = '',
  ...rest
}) {
  const isIconOnly = !children;

  const classes = [
    'badge',
    `badge--${variant}`,
    `badge--${size}`,
    `badge--${shape}`,
    color !== 'neutral' && `badge--${color}`,
    isIconOnly && 'badge--icon-only',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={classes} {...rest}>
      {iconLeft && (
        <span className="badge__icon" aria-hidden="true">
          {iconLeft}
        </span>
      )}
      {children && <span className="badge__label">{children}</span>}
      {iconRight && (
        <span className="badge__icon" aria-hidden="true">
          {iconRight}
        </span>
      )}
    </span>
  );
}

Badge.propTypes = {
  /** Emphasis level, matches the Figma "Type" taxonomy label (unstyled in Figma — see file-level note). */
  variant: PropTypes.oneOf(VARIANTS),
  /** Badge scale, matches the Figma "Size" taxonomy label. */
  size: PropTypes.oneOf(SIZES),
  /** Corner style — "rounded" (soft corners) or "pill" (fully rounded). No "square", unlike Button. */
  shape: PropTypes.oneOf(SHAPES),
  /** Color family — "primary" (purple), "neutral" (gray), "success" (green), "danger" (red), "warning" (orange), "info" (blue), "verified" (sky), "away" (yellow), "highlight" (fuchsia), "inverse" (for badges on a dark/colored surface), or "disabled" (muted). */
  color: PropTypes.oneOf(COLORS),
  /** Icon rendered before the label, or alone when `children` is omitted. */
  iconLeft: PropTypes.node,
  /** Icon rendered after the label. */
  iconRight: PropTypes.node,
  /** Badge content — text or a number. Omit for an icon-only badge. */
  children: PropTypes.node,
  className: PropTypes.string,
};

export default Badge;
