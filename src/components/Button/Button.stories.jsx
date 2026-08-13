import { ArrowCircleLeft, ArrowCircleRight } from 'geist-icons';
import Button from './Button';

const VARIANTS = ['solid', 'outline', 'soft', 'ghost'];
const SIZES = ['xl', 'l', 'm', 's', 'xs'];
const SHAPES = ['rounded', 'pill', 'square'];
const COLORS = ['primary', 'neutral-solid', 'neutral-light', 'danger', 'success', 'info', 'inverse-solid'];
const STATES = ['default', 'hover', 'pressed', 'focused', 'loading', 'disabled'];

export default {
  title: 'Button/Default',
  component: Button,
  args: {
    children: 'Hello world',
    variant: 'solid',
    size: 'm',
    shape: 'rounded',
    color: 'primary',
    loading: false,
    disabled: false,
    static: false,
  },
  argTypes: {
    variant: { control: 'select', options: VARIANTS },
    size: { control: 'select', options: SIZES },
    shape: { control: 'select', options: SHAPES },
    color: { control: 'select', options: COLORS },
    static: { control: 'boolean' },
    state: {
      control: 'select',
      options: ['default', 'hover', 'pressed', 'focused'],
      mapping: { default: undefined },
    },
    onClick: { action: 'clicked' },
  },
};

export const Playground = {
  args: {
    iconLeft: <ArrowCircleLeft />,
    iconRight: <ArrowCircleRight />,
    type: "button"
  },
};

export const AllSizes = {
  render: (args) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
      {SIZES.map((size) => (
        <Button key={size} {...args} size={size} />
      ))}
    </div>
  ),
  args: {
    children: 'Button',
    iconLeft: <ArrowCircleLeft />,
    iconRight: <ArrowCircleRight />,
    type: "button"
  },
};

// Renders every Type × Size at "default" state so the four emphasis
// levels (solid/outline/soft/ghost) can be compared side by side.
// Respects the `color` control so either family can be checked here too.
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
            <Button key={`${size}-${variant}`} variant={variant} size={size} color={args.color} iconLeft={<ArrowCircleLeft />} iconRight={<ArrowCircleRight />}>
              Hello world
            </Button>
          ))}
        </>
      ))}
    </div>
  ),
};

// Renders every Type × Color at "xl" so all seven color families (primary,
// neutral-solid, neutral-light, danger, success, info, inverse-solid) can
// be compared side by side across all four emphasis levels —
// "neutral-solid" comes from button_default/rounded/neutral-solid (node
// 213:6169), "neutral-light" from button_default/rounded/neutral-light
// (node 213:5468), "danger" from button_default/rounded/danger (node
// 213:3365), "success" from button_default/rounded/success (node
// 213:7571), "inverse-solid" from button_default/rounded/inverse-solid
// (node 213:4767) — meant for a dark/colored surface, so its "solid" cell
// reads as near-invisible against this story's white background; that's
// expected, not a bug. "info" isn't from a verified Figma component set
// — it's the same structure as "primary" with color-tokens/info/* swapped
// in (see Button.css). There used to be an "inverse-light" color too
// (pixel-identical to inverse-solid at the time) — removed from
// Storybook; the Figma component set still exists if it's needed again.
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
            <Button key={`${variant}-${color}`} variant={variant} size="xl" color={color} iconLeft={<ArrowCircleLeft />} iconRight={<ArrowCircleRight />}>
              Hello world
            </Button>
          ))}
        </>
      ))}
    </div>
  ),
};

// Renders every Shape × Size at "default" state — "rounded" comes from
// button_default/rounded/primary (node 213:6870), "pill" from
// button_default/pill/primary (node 241:3530). The two Figma component
// sets are identical apart from radius, which is why Button models this
// as one `shape` prop rather than a second component.
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
            <Button key={`${size}-${shape}`} shape={shape} size={size} color={args.color} iconLeft={<ArrowCircleLeft />} iconRight={<ArrowCircleRight />}>
              Hello world
            </Button>
          ))}
        </>
      ))}
    </div>
  ),
};

// Renders every size × state combination from the Figma component set
// (button_default/rounded/primary, node 213:6870) for the Type/Shape
// selected via controls, so the full matrix can be checked per type.
export const AllStates = {
  render: (args) => (
    <div style={{ display: 'grid', gridTemplateColumns: 'max-content repeat(6, max-content)', gap: '16px 24px', alignItems: 'center' }}>
      <div />
      {STATES.map((state) => (
        <div key={state} style={{ font: '500 12px/16px sans-serif', color: '#6b6375', textTransform: 'capitalize' }}>
          {state}
        </div>
      ))}
      {SIZES.map((size) => (
        <>
          <div key={`${size}-label`} style={{ font: '500 12px/16px sans-serif', color: '#6b6375' }}>
            {size}
          </div>
          {STATES.map((state) => (
            <Button
              key={`${size}-${state}`}
              variant={args.variant}
              size={size}
              shape={args.shape}
              color={args.color}
              iconLeft={<ArrowCircleLeft />}
              iconRight={<ArrowCircleRight />}
              state={state === 'default' || state === 'loading' || state === 'disabled' ? undefined : state}
              loading={state === 'loading'}
              disabled={state === 'disabled'}
            >
              Hello world
            </Button>
          ))}
        </>
      ))}
    </div>
  ),
};

export const IconOnly = {
  render: (args) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      {SIZES.map((size) => (
        <Button key={size} variant={args.variant} size={size} shape={args.shape} color={args.color} iconLeft={<ArrowCircleRight />} aria-label="Next" />
      ))}
    </div>
  ),
};

export const Loading = {
  args: {
    loading: true,
  },
};

export const Disabled = {
  args: {
    disabled: true,
    iconLeft: <ArrowCircleLeft />,
    iconRight: <ArrowCircleRight />,
  },
};
