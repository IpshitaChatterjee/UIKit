import PropTypes from 'prop-types';
import './Badge.css';

const VARIANTS = ['solid', 'outline', 'soft', 'ghost'];
const SIZES = ['m', 's', 'xs'];
const SHAPES = ['rounded', 'pill'];
const COLORS = ['primary', 'neutral', 'success', 'danger', 'warning', 'info', 'verified', 'away', 'highlight', 'inverse', 'disabled'];

/**
 * Badge — a static, non-interactive label in four emphasis levels
 * ("solid"/"outline"/"soft"/"ghost", matching Button's Type variant), two
 * corner styles ("rounded"/"pill" — Badge has no "square" shape, unlike
 * Button), three sizes ("m"/"s"/"xs"), and the "primary", "neutral",
 * "success", "danger", "warning", "info", "verified", "away", "highlight",
 * "inverse", or "disabled" color family.
 *
 * Unlike the initial version of this file, every one of these is now
 * pulled from a real, populated Figma component set — "badge/{shape}/
 * {color}" (e.g. "badge/rounded/primary" node 335:12654, "badge/pill/
 * primary" node 338:27719, and one such pair per color) in the "→ Badge"
 * page of the UI Design Kit file. Verified per color via
 * get_design_context/get_variable_defs against the component's own bound
 * variables, not assumed to follow the same pattern as Button:
 *
 * - Every color except neutral/disabled/inverse follows one clean rule:
 *   solid bg = {color}/strong (not /base — Badge's solid is a full step
 *   deeper than Button's own resting-state solid, since a static badge
 *   has no separate hover state to reserve /base for), outline border and
 *   outline/soft/ghost label = {color}/strong too, soft bg = {color}/weak
 *   (originally {color}/weakest — bumped a step in a later Figma update
 *   across every one of these eight colors, reconfirmed per color against
 *   each component's own bound variable rather than assumed to apply
 *   uniformly). "highlight" binds to Figma's "highlighted" collection
 *   (see Badge.css) — kept as "highlight" here to match the taxonomy
 *   sheet's column label instead.
 * - "neutral" (default) doesn't reuse Button's neutral-solid bg-strong/
 *   text-strongest pairing the earlier version of this file assumed:
 *   solid bg = bg/strong, soft bg = bg/weak (not bg/weakest), and every
 *   non-solid label/border is bg/strong (not text-strongest — a
 *   different, though close, token).
 * - "disabled" doesn't use text-disabled at all: solid bg = bg/medium
 *   with a *white* text/on-control label (kept, though visually unusual
 *   for a "disabled" state — that's what the component's own bound
 *   variable says), soft bg = bg/weak, and outline border / every non-
 *   solid label = bg/medium.
 * - "inverse" solid = bg/weakest bg with text/strongest label (both
 *   already matched Button's own inverse-solid mapping), soft = bg/heavy
 *   (not bg/strong) with a bg/weakest label, outline border = text/on-
 *   control (not stroke/medium). Figma's own outline/ghost label binding
 *   has a real inconsistency by size (xs/s read text/on-control, m reads
 *   bg/weakest, which would go near-invisible in dark mode) — normalized
 *   to text/on-control at every size rather than reproduced, the same
 *   kind of judgment call Button.jsx already makes for its own
 *   focus-ring-offset Figma quirk.
 *
 * Structural details also came from the same component set: solid-only
 * text gets a 1px black-alpha-24 drop shadow (Shadow/Text/xs), radius is
 * a flat 6px/999px (rounded/pill) at every size — Badge doesn't scale
 * radius by size the way Button does — and each size uses Button's own
 * text-control-{m,s,xs}-500 type scale plus the L3-Component/{3xs,2xs,
 * xs,sm} spacing scale for padding/gap (see Badge.css; not yet synced
 * into tokens.css, so these stay literal fallbacks, same gap Button.css
 * documents for its own untokenized spacing). Icon size is 16px at "m",
 * 12px at "s" and "xs" (not scaled a third time for "xs" the way an
 * earlier version of this file assumed) — Figma flanks the label with a
 * chevron-circle icon on both sides by default, exposed here as the
 * existing iconLeft/iconRight props rather than an always-on default, so
 * every color and variant can opt in the same way Button's icons do.
 * The Number/Icon-only subtypes in Figma additionally pin a fixed/min
 * width per size so digit badges read as a consistent circle — not
 * reproduced here; icon-only badges still just use --badge-py as
 * uniform padding, an approximation flagged rather than hidden.
 *
 * Badges are static labels, not controls: there's no hover/pressed/
 * focused state matrix here the way Button has one, and disabling is
 * expressed by `color="disabled"` rather than a `disabled` boolean prop.
 */
function Badge({
  variant = 'soft',
  size = 'm',
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
  /** Emphasis level, matches the Figma "Type" variant. */
  variant: PropTypes.oneOf(VARIANTS),
  /** Badge scale, matches the Figma "Size" variant. */
  size: PropTypes.oneOf(SIZES),
  /** Corner style — "rounded" (6px) or "pill" (fully rounded). No "square", unlike Button. */
  shape: PropTypes.oneOf(SHAPES),
  /** Color family — "primary" (purple), "neutral" (gray), "success" (green), "danger" (red), "warning" (orange), "info" (blue), "verified" (sky), "away" (yellow), "highlight" (fuchsia), "inverse" (for badges on a dark/colored surface), or "disabled" (muted). */
  color: PropTypes.oneOf(COLORS),
  /** Icon rendered before the label, or alone when `children` is omitted — matches Figma's flanking chevron-circle icon slot. */
  iconLeft: PropTypes.node,
  /** Icon rendered after the label — matches Figma's flanking chevron-circle icon slot. */
  iconRight: PropTypes.node,
  /** Badge content — text or a number. Omit for an icon-only badge. */
  children: PropTypes.node,
  className: PropTypes.string,
};

export default Badge;
