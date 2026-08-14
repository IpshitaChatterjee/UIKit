import{n as e}from"./iframe-DzDV7GKr.js";import{n as t,o as n,s as r,t as i}from"./prop-types-Cx-deHrA.js";import{a,n as o}from"./rolldown-runtime-DkW27tQK.js";function s(){return(0,u.jsxs)(`svg`,{className:`btn__spinner`,viewBox:`0 0 20 20`,fill:`none`,"aria-hidden":`true`,children:[(0,u.jsx)(`circle`,{cx:`10`,cy:`10`,r:`8`,stroke:`currentColor`,strokeOpacity:`0.35`,strokeWidth:`3`}),(0,u.jsx)(`path`,{d:`M18 10a8 8 0 0 0-8-8`,stroke:`currentColor`,strokeWidth:`3`,strokeLinecap:`round`})]})}function c({variant:e=`solid`,size:t=`m`,shape:n=`rounded`,color:r=`primary`,state:i,loading:a=!1,disabled:o=!1,static:c=!1,iconLeft:l=null,iconRight:d=null,children:f,className:p=``,type:m=`button`,...h}){let g=!f,_=[`btn`,`btn--${e}`,`btn--${t}`,`btn--${n}`,r!==`primary`&&`btn--${r}`,g&&`btn--icon-only`,a&&`btn--loading`,c&&`btn--static`,i&&`btn--force-${i}`,p].filter(Boolean).join(` `);return(0,u.jsxs)(`button`,{type:m,className:_,disabled:o,"aria-busy":a||void 0,...h,children:[a?(0,u.jsx)(s,{}):l&&(0,u.jsx)(`span`,{className:`btn__icon`,"aria-hidden":`true`,children:l}),f&&(0,u.jsx)(`span`,{className:`btn__label`,children:f}),!a&&d&&(0,u.jsx)(`span`,{className:`btn__icon`,"aria-hidden":`true`,children:d})]})}var l,u,d,f,p,m,h;function g(){return(g=o((()=>{l=a(i(),1),u=e(),d=[`solid`,`outline`,`soft`,`ghost`],f=[`xl`,`l`,`m`,`s`,`xs`],p=[`rounded`,`pill`,`square`],m=[`primary`,`neutral-solid`,`neutral-light`,`danger`,`success`,`info`,`inverse-solid`],h=[`hover`,`pressed`,`focused`],c.propTypes={variant:l.default.oneOf(d),size:l.default.oneOf(f),shape:l.default.oneOf(p),color:l.default.oneOf(m),state:l.default.oneOf(h),loading:l.default.bool,disabled:l.default.bool,static:l.default.bool,iconLeft:l.default.node,iconRight:l.default.node,children:l.default.node,className:l.default.string,type:l.default.oneOf([`button`,`submit`,`reset`])},c.__docgenInfo={description:`Button — all four emphasis levels, in rounded, pill, or square corners,
in the "primary", "neutral-solid", "neutral-light", "danger",
"success", "info", or "inverse-solid" color family. "info" isn't
pulled from a verified Figma component set — it's built by swapping
color-tokens/primary/* for color-tokens/info/*, following the same
structural pattern as "danger"/"success" (see Button.css). The rest
matches the "button_default/{shape}/primary" (rounded 213:6870, pill
241:3530, square 241:4611), "button_default/{shape}/neutral-solid"
(rounded 213:6169, pill 241:5692, square 241:6773), "button_default/
{shape}/neutral-light" (rounded 213:5468, pill 241:7854, square
242:8937), "button_default/{shape}/danger" (rounded 213:3365, pill
242:10018, square 242:11099), "button_default/{shape}/success"
(rounded 213:7571, pill 242:12180, square 242:13261), and
"button_default/{shape}/inverse-solid" (rounded 213:4767, pill
242:15043, square 242:17205) component sets in the UI Design Kit
Figma file — identical apart from radius (shape) and color. The
"danger" component set has some mislabeled variants in Figma (its
"ghost" cells are tagged Type=rounded, State=danger, and Has text=xl/s
instead of true/false in a handful of spots), and "success" solid's
hover/pressed state has its white-overlay inner shadow bound to
shadows/interactive/error/inner instead of .../success/inner (same
hex value either way, clearly a copy-paste leftover) — both verified
against the underlying fills/effects rather than the variant/binding
names. "inverse-solid" differs structurally from every other color
here: outline/soft/ghost's "loading" state reverts to the *default*
background with text/placeholder as the label color instead of
reusing the hover background/default text like every other color's
loading state, and outline/ghost's label/icon color varies by state
(text-on-control at rest, text-static once hover/pressed/focused)
rather than staying fixed — both make sense given inverse buttons are
meant to sit on a dark or colored surface. Also, Figma's focused-
state ring effects for outline/soft/ghost have the offset-spread (3px)
and ring-spread (6px) swapped onto the color-inner/color-outer tokens
relative to every other color family; the CSS below keeps the
semantic pairing used everywhere else (color-inner at 3px, color-outer
at 6px) since that's what actually produces a normal two-tone ring.
There used to be an "inverse-light" color too (pixel-identical to
inverse-solid at the time, so their CSS rules were combined) — removed
from Storybook; the Figma component set still exists if it's needed
again.`,methods:[],displayName:`Button`,props:{variant:{defaultValue:{value:`'solid'`,computed:!1},description:`Emphasis level, matches the Figma "Type" variant.`,type:{name:`enum`,value:[{value:`'solid'`,computed:!1},{value:`'outline'`,computed:!1},{value:`'soft'`,computed:!1},{value:`'ghost'`,computed:!1}]},required:!1},size:{defaultValue:{value:`'m'`,computed:!1},description:`Button scale, matches the Figma "Size" variant.`,type:{name:`enum`,value:[{value:`'xl'`,computed:!1},{value:`'l'`,computed:!1},{value:`'m'`,computed:!1},{value:`'s'`,computed:!1},{value:`'xs'`,computed:!1}]},required:!1},shape:{defaultValue:{value:`'rounded'`,computed:!1},description:`Corner style — "rounded" (soft corners), "pill" (fully rounded), or "square" (no rounding).`,type:{name:`enum`,value:[{value:`'rounded'`,computed:!1},{value:`'pill'`,computed:!1},{value:`'square'`,computed:!1}]},required:!1},color:{defaultValue:{value:`'primary'`,computed:!1},description:`Color family, matches the Figma component set — "primary" (purple), "neutral-solid" (near-black/gray), "neutral-light" (softer gray), "danger" (red), "success" (green), "info" (blue), or "inverse-solid" (for buttons on a dark/colored surface — inverts relative to the page's own light/dark state).`,type:{name:`enum`,value:[{value:`'primary'`,computed:!1},{value:`'neutral-solid'`,computed:!1},{value:`'neutral-light'`,computed:!1},{value:`'danger'`,computed:!1},{value:`'success'`,computed:!1},{value:`'info'`,computed:!1},{value:`'inverse-solid'`,computed:!1}]},required:!1},loading:{defaultValue:{value:`false`,computed:!1},description:`Shows a spinner in place of the left icon and blocks interaction, without disabling focus/announcement.`,type:{name:`bool`},required:!1},disabled:{defaultValue:{value:`false`,computed:!1},description:"Disables the button (native `disabled` attribute).",type:{name:`bool`},required:!1},static:{defaultValue:{value:`false`,computed:!1},description:`Opts out of the press-scale tactile effect, for contexts where that motion would be distracting.`,type:{name:`bool`},required:!1},iconLeft:{defaultValue:{value:`null`,computed:!1},description:"Icon rendered before the label, or alone when `children` is omitted.",type:{name:`node`},required:!1},iconRight:{defaultValue:{value:`null`,computed:!1},description:`Icon rendered after the label. Hidden while loading.`,type:{name:`node`},required:!1},className:{defaultValue:{value:`''`,computed:!1},description:``,type:{name:`string`},required:!1},type:{defaultValue:{value:`'button'`,computed:!1},description:``,type:{name:`enum`,value:[{value:`'button'`,computed:!1},{value:`'submit'`,computed:!1},{value:`'reset'`,computed:!1}]},required:!1},state:{description:`Forces a visual state regardless of real interaction — for documentation/testing only.`,type:{name:`enum`,value:[{value:`'hover'`,computed:!1},{value:`'pressed'`,computed:!1},{value:`'focused'`,computed:!1}]},required:!1},children:{description:"Button label. Omit for an icon-only button (then pass `aria-label`).",type:{name:`node`},required:!1}}}})))()}var _,v,y,b,x,S,C,w,T,E,D,O,k,A,j,M,N;function P(){return(P=o((()=>{n(),g(),_=e(),v=[`solid`,`outline`,`soft`,`ghost`],y=[`xl`,`l`,`m`,`s`,`xs`],b=[`rounded`,`pill`,`square`],x=[`primary`,`neutral-solid`,`neutral-light`,`danger`,`success`,`info`,`inverse-solid`],S=[`default`,`hover`,`pressed`,`focused`,`loading`,`disabled`],C={title:`Button/Default`,component:c,args:{children:`Hello world`,variant:`solid`,size:`m`,shape:`rounded`,color:`primary`,loading:!1,disabled:!1,static:!1},argTypes:{variant:{control:`select`,options:v},size:{control:`select`,options:y},shape:{control:`select`,options:b},color:{control:`select`,options:x},static:{control:`boolean`},state:{control:`select`,options:[`default`,`hover`,`pressed`,`focused`],mapping:{default:void 0}},onClick:{action:`clicked`}}},w={args:{iconLeft:(0,_.jsx)(t,{}),iconRight:(0,_.jsx)(r,{}),type:`button`}},T={render:e=>(0,_.jsx)(`div`,{style:{display:`flex`,alignItems:`center`,gap:16,flexWrap:`wrap`},children:y.map(t=>(0,_.jsx)(c,{...e,size:t},t))}),args:{children:`Button`,iconLeft:(0,_.jsx)(t,{}),iconRight:(0,_.jsx)(r,{}),type:`button`}},E={render:e=>(0,_.jsxs)(`div`,{style:{display:`grid`,gridTemplateColumns:`max-content repeat(4, max-content)`,gap:`16px 24px`,alignItems:`center`},children:[(0,_.jsx)(`div`,{}),v.map(e=>(0,_.jsx)(`div`,{style:{font:`500 12px/16px sans-serif`,color:`#6b6375`,textTransform:`capitalize`},children:e},e)),y.map(n=>(0,_.jsxs)(_.Fragment,{children:[(0,_.jsx)(`div`,{style:{font:`500 12px/16px sans-serif`,color:`#6b6375`},children:n},`${n}-label`),v.map(i=>(0,_.jsx)(c,{variant:i,size:n,color:e.color,iconLeft:(0,_.jsx)(t,{}),iconRight:(0,_.jsx)(r,{}),children:`Hello world`},`${n}-${i}`))]}))]})},D={render:()=>(0,_.jsxs)(`div`,{style:{display:`grid`,gridTemplateColumns:`max-content repeat(${x.length}, max-content)`,gap:`16px 24px`,alignItems:`center`},children:[(0,_.jsx)(`div`,{}),x.map(e=>(0,_.jsx)(`div`,{style:{font:`500 12px/16px sans-serif`,color:`#6b6375`,textTransform:`capitalize`},children:e},e)),v.map(e=>(0,_.jsxs)(_.Fragment,{children:[(0,_.jsx)(`div`,{style:{font:`500 12px/16px sans-serif`,color:`#6b6375`,textTransform:`capitalize`},children:e},`${e}-label`),x.map(n=>(0,_.jsx)(c,{variant:e,size:`xl`,color:n,iconLeft:(0,_.jsx)(t,{}),iconRight:(0,_.jsx)(r,{}),children:`Hello world`},`${e}-${n}`))]}))]})},O={render:e=>(0,_.jsxs)(`div`,{style:{display:`grid`,gridTemplateColumns:`max-content repeat(${b.length}, max-content)`,gap:`16px 24px`,alignItems:`center`},children:[(0,_.jsx)(`div`,{}),b.map(e=>(0,_.jsx)(`div`,{style:{font:`500 12px/16px sans-serif`,color:`#6b6375`,textTransform:`capitalize`},children:e},e)),y.map(n=>(0,_.jsxs)(_.Fragment,{children:[(0,_.jsx)(`div`,{style:{font:`500 12px/16px sans-serif`,color:`#6b6375`},children:n},`${n}-label`),b.map(i=>(0,_.jsx)(c,{shape:i,size:n,color:e.color,iconLeft:(0,_.jsx)(t,{}),iconRight:(0,_.jsx)(r,{}),children:`Hello world`},`${n}-${i}`))]}))]})},k={render:e=>(0,_.jsxs)(`div`,{style:{display:`grid`,gridTemplateColumns:`max-content repeat(6, max-content)`,gap:`16px 24px`,alignItems:`center`},children:[(0,_.jsx)(`div`,{}),S.map(e=>(0,_.jsx)(`div`,{style:{font:`500 12px/16px sans-serif`,color:`#6b6375`,textTransform:`capitalize`},children:e},e)),y.map(n=>(0,_.jsxs)(_.Fragment,{children:[(0,_.jsx)(`div`,{style:{font:`500 12px/16px sans-serif`,color:`#6b6375`},children:n},`${n}-label`),S.map(i=>(0,_.jsx)(c,{variant:e.variant,size:n,shape:e.shape,color:e.color,iconLeft:(0,_.jsx)(t,{}),iconRight:(0,_.jsx)(r,{}),state:i==="default"||i===`loading`||i===`disabled`?void 0:i,loading:i===`loading`,disabled:i===`disabled`,children:`Hello world`},`${n}-${i}`))]}))]})},A={render:e=>(0,_.jsx)(`div`,{style:{display:`flex`,alignItems:`center`,gap:16},children:y.map(t=>(0,_.jsx)(c,{variant:e.variant,size:t,shape:e.shape,color:e.color,iconLeft:(0,_.jsx)(r,{}),"aria-label":`Next`},t))})},j={args:{loading:!0}},M={args:{disabled:!0,iconLeft:(0,_.jsx)(t,{}),iconRight:(0,_.jsx)(r,{})}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  args: {
    iconLeft: <ArrowCircleLeft />,
    iconRight: <ArrowCircleRight />,
    type: "button"
  }
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  render: args => <div style={{
    display: 'flex',
    alignItems: 'center',
    gap: 16,
    flexWrap: 'wrap'
  }}>
      {SIZES.map(size => <Button key={size} {...args} size={size} />)}
    </div>,
  args: {
    children: 'Button',
    iconLeft: <ArrowCircleLeft />,
    iconRight: <ArrowCircleRight />,
    type: "button"
  }
}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  render: args => <div style={{
    display: 'grid',
    gridTemplateColumns: 'max-content repeat(4, max-content)',
    gap: '16px 24px',
    alignItems: 'center'
  }}>
      <div />
      {VARIANTS.map(variant => <div key={variant} style={{
      font: '500 12px/16px sans-serif',
      color: '#6b6375',
      textTransform: 'capitalize'
    }}>
          {variant}
        </div>)}
      {SIZES.map(size => <>
          <div key={\`\${size}-label\`} style={{
        font: '500 12px/16px sans-serif',
        color: '#6b6375'
      }}>
            {size}
          </div>
          {VARIANTS.map(variant => <Button key={\`\${size}-\${variant}\`} variant={variant} size={size} color={args.color} iconLeft={<ArrowCircleLeft />} iconRight={<ArrowCircleRight />}>
              Hello world
            </Button>)}
        </>)}
    </div>
}`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'grid',
    gridTemplateColumns: \`max-content repeat(\${COLORS.length}, max-content)\`,
    gap: '16px 24px',
    alignItems: 'center'
  }}>
      <div />
      {COLORS.map(color => <div key={color} style={{
      font: '500 12px/16px sans-serif',
      color: '#6b6375',
      textTransform: 'capitalize'
    }}>
          {color}
        </div>)}
      {VARIANTS.map(variant => <>
          <div key={\`\${variant}-label\`} style={{
        font: '500 12px/16px sans-serif',
        color: '#6b6375',
        textTransform: 'capitalize'
      }}>
            {variant}
          </div>
          {COLORS.map(color => <Button key={\`\${variant}-\${color}\`} variant={variant} size="xl" color={color} iconLeft={<ArrowCircleLeft />} iconRight={<ArrowCircleRight />}>
              Hello world
            </Button>)}
        </>)}
    </div>
}`,...D.parameters?.docs?.source}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  render: args => <div style={{
    display: 'grid',
    gridTemplateColumns: \`max-content repeat(\${SHAPES.length}, max-content)\`,
    gap: '16px 24px',
    alignItems: 'center'
  }}>
      <div />
      {SHAPES.map(shape => <div key={shape} style={{
      font: '500 12px/16px sans-serif',
      color: '#6b6375',
      textTransform: 'capitalize'
    }}>
          {shape}
        </div>)}
      {SIZES.map(size => <>
          <div key={\`\${size}-label\`} style={{
        font: '500 12px/16px sans-serif',
        color: '#6b6375'
      }}>
            {size}
          </div>
          {SHAPES.map(shape => <Button key={\`\${size}-\${shape}\`} shape={shape} size={size} color={args.color} iconLeft={<ArrowCircleLeft />} iconRight={<ArrowCircleRight />}>
              Hello world
            </Button>)}
        </>)}
    </div>
}`,...O.parameters?.docs?.source}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  render: args => <div style={{
    display: 'grid',
    gridTemplateColumns: 'max-content repeat(6, max-content)',
    gap: '16px 24px',
    alignItems: 'center'
  }}>
      <div />
      {STATES.map(state => <div key={state} style={{
      font: '500 12px/16px sans-serif',
      color: '#6b6375',
      textTransform: 'capitalize'
    }}>
          {state}
        </div>)}
      {SIZES.map(size => <>
          <div key={\`\${size}-label\`} style={{
        font: '500 12px/16px sans-serif',
        color: '#6b6375'
      }}>
            {size}
          </div>
          {STATES.map(state => <Button key={\`\${size}-\${state}\`} variant={args.variant} size={size} shape={args.shape} color={args.color} iconLeft={<ArrowCircleLeft />} iconRight={<ArrowCircleRight />} state={state === 'default' || state === 'loading' || state === 'disabled' ? undefined : state} loading={state === 'loading'} disabled={state === 'disabled'}>
              Hello world
            </Button>)}
        </>)}
    </div>
}`,...k.parameters?.docs?.source}}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  render: args => <div style={{
    display: 'flex',
    alignItems: 'center',
    gap: 16
  }}>
      {SIZES.map(size => <Button key={size} variant={args.variant} size={size} shape={args.shape} color={args.color} iconLeft={<ArrowCircleRight />} aria-label="Next" />)}
    </div>
}`,...A.parameters?.docs?.source}}},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  args: {
    loading: true
  }
}`,...j.parameters?.docs?.source}}},M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
  args: {
    disabled: true,
    iconLeft: <ArrowCircleLeft />,
    iconRight: <ArrowCircleRight />
  }
}`,...M.parameters?.docs?.source}}},N=[`Playground`,`AllSizes`,`AllVariants`,`AllColors`,`AllShapes`,`AllStates`,`IconOnly`,`Loading`,`Disabled`]})))()}P();export{D as AllColors,O as AllShapes,T as AllSizes,k as AllStates,E as AllVariants,M as Disabled,A as IconOnly,j as Loading,w as Playground,N as __namedExportsOrder,C as default};