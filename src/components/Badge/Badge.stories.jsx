import { CheckCircle, ChevronCircleLeftFill, ChevronCircleRightFill } from 'geist-icons';
import Badge from './Badge';

const VARIANTS = ['solid', 'outline', 'soft', 'ghost'];
const SIZES = ['m', 's', 'xs'];
const SHAPES = ['rounded', 'pill'];
const COLORS = ['primary', 'neutral', 'success', 'danger', 'warning', 'info', 'verified', 'away', 'highlight', 'inverse', 'disabled'];

export default {
  title: 'Badge/Default',
  component: Badge,
  args: {
    children: 'Badge',
    variant: 'soft',
    size: 'm',
    shape: 'rounded',
    color: 'neutral',
  },
  argTypes: {
    variant: { control: 'select', options: VARIANTS },
    size: { control: 'select', options: SIZES },
    shape: { control: 'select', options: SHAPES },
    color: { control: 'select', options: COLORS },
  },
};

// Figma's badge/{shape}/{color} component set flanks the label with a
// chevron-circle icon on both sides by default (iconL/iconR both true) —
// mirrored here via the same iconLeft/iconRight props Button already uses.
export const Playground = {
  args: {
    iconLeft: <ChevronCircleLeftFill />,
    iconRight: <ChevronCircleRightFill />,
  },
};

export const AllSizes = {
  render: (args) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      {SIZES.map((size) => (
        <Badge key={size} {...args} size={size} iconLeft={<ChevronCircleLeftFill />} iconRight={<ChevronCircleRightFill />} />
      ))}
    </div>
  ),
};

// Renders every Type × Size at "neutral" (or the selected color) so the
// four emphasis levels can be compared side by side, flanking icons and
// all — matches Figma's own default appearance for every variant.
export const AllVariants = {
  render: (args) => (
    <div style={{ display: 'grid', gridTemplateColumns: 'max-content repeat(4, max-content)', gap: '16px 24px', alignItems: 'center' }}>
      <div />
      {VARIANTS.map((variant) => (
        <div key={variant} style={{ font: '500 12px/16px sans-serif', color: '#6b6375', textTransform: 'capitalize' }}>
          {variant}
        </div>
      ))}
      {SIZES.map((size) => (
        <>
          <div key={`${size}-label`} style={{ font: '500 12px/16px sans-serif', color: '#6b6375' }}>
            {size}
          </div>
          {VARIANTS.map((variant) => (
            <Badge key={`${size}-${variant}`} variant={variant} size={size} shape={args.shape} color={args.color} iconLeft={<ChevronCircleLeftFill />} iconRight={<ChevronCircleRightFill />}>
              Badge
            </Badge>
          ))}
        </>
      ))}
    </div>
  ),
};

// Renders every Type × Color at "m" so all eleven color families can be
// compared side by side across all four emphasis levels, flanking icons
// included. "inverse" reads as near-invisible against this story's white
// background on "solid" — expected, same as Button's own inverse-solid
// story, since it's meant for a dark/colored surface.
export const AllColors = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: `max-content repeat(${COLORS.length}, max-content)`, gap: '16px 24px', alignItems: 'center' }}>
      <div />
      {COLORS.map((color) => (
        <div key={color} style={{ font: '500 12px/16px sans-serif', color: '#6b6375', textTransform: 'capitalize' }}>
          {color}
        </div>
      ))}
      {VARIANTS.map((variant) => (
        <>
          <div key={`${variant}-label`} style={{ font: '500 12px/16px sans-serif', color: '#6b6375', textTransform: 'capitalize' }}>
            {variant}
          </div>
          {COLORS.map((color) => (
            <Badge key={`${variant}-${color}`} variant={variant} size="m" color={color} iconLeft={<ChevronCircleLeftFill />} iconRight={<ChevronCircleRightFill />}>
              Badge
            </Badge>
          ))}
        </>
      ))}
    </div>
  ),
};

// Renders every Shape × Size at "default" state — Badge has no "square"
// shape, unlike Button.
export const AllShapes = {
  render: (args) => (
    <div style={{ display: 'grid', gridTemplateColumns: `max-content repeat(${SHAPES.length}, max-content)`, gap: '16px 24px', alignItems: 'center' }}>
      <div />
      {SHAPES.map((shape) => (
        <div key={shape} style={{ font: '500 12px/16px sans-serif', color: '#6b6375', textTransform: 'capitalize' }}>
          {shape}
        </div>
      ))}
      {SIZES.map((size) => (
        <>
          <div key={`${size}-label`} style={{ font: '500 12px/16px sans-serif', color: '#6b6375' }}>
            {size}
          </div>
          {SHAPES.map((shape) => (
            <Badge key={`${size}-${shape}`} shape={shape} size={size} variant={args.variant} color={args.color} iconLeft={<ChevronCircleLeftFill />} iconRight={<ChevronCircleRightFill />}>
              Badge
            </Badge>
          ))}
        </>
      ))}
    </div>
  ),
};

export const WithIcon = {
  render: (args) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      {SIZES.map((size) => (
        <Badge key={size} variant={args.variant} size={size} shape={args.shape} color={args.color} iconLeft={<CheckCircle />}>
          Verified
        </Badge>
      ))}
    </div>
  ),
};

export const Number = {
  args: {
    children: '8',
    shape: 'pill',
  },
};

export const IconOnly = {
  render: (args) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      {SIZES.map((size) => (
        <Badge key={size} variant={args.variant} size={size} shape={args.shape} color={args.color} iconLeft={<CheckCircle />} aria-label="Verified" />
      ))}
    </div>
  ),
};
