import{n as e}from"./iframe-BN_vRQOK.js";import{a as t,i as n,o as r,r as i,t as a}from"./prop-types-BOCSTrhI.js";import{a as o,n as s}from"./rolldown-runtime-DkW27tQK.js";function c({variant:e=`soft`,size:t=`m`,shape:n=`rounded`,color:r=`neutral`,iconLeft:i=null,iconRight:a=null,children:o,className:s=``,...c}){let l=!o,d=[`badge`,`badge--${e}`,`badge--${t}`,`badge--${n}`,r!==`neutral`&&`badge--${r}`,l&&`badge--icon-only`,s].filter(Boolean).join(` `);return(0,u.jsxs)(`span`,{className:d,...c,children:[i&&(0,u.jsx)(`span`,{className:`badge__icon`,"aria-hidden":`true`,children:i}),o&&(0,u.jsx)(`span`,{className:`badge__label`,children:o}),a&&(0,u.jsx)(`span`,{className:`badge__icon`,"aria-hidden":`true`,children:a})]})}var l,u,d,f,p,m;function h(){return(h=s((()=>{l=o(a(),1),u=e(),d=[`solid`,`outline`,`soft`,`ghost`],f=[`m`,`s`,`xs`],p=[`rounded`,`pill`],m=[`primary`,`neutral`,`success`,`danger`,`warning`,`info`,`verified`,`away`,`highlight`,`inverse`,`disabled`],c.propTypes={variant:l.default.oneOf(d),size:l.default.oneOf(f),shape:l.default.oneOf(p),color:l.default.oneOf(m),iconLeft:l.default.node,iconRight:l.default.node,children:l.default.node,className:l.default.string},c.__docgenInfo={description:`Badge — a static, non-interactive label in four emphasis levels
("solid"/"outline"/"soft"/"ghost", matching Button's Type variant), two
corner styles ("rounded"/"pill" — Badge has no "square" shape, unlike
Button), three sizes ("m"/"s"/"xs"), and the "primary", "neutral",
"success", "danger", "warning", "info", "verified", "away", "highlight",
"inverse", or "disabled" color family.

Unlike the initial version of this file, every one of these is now
pulled from a real, populated Figma component set — "badge/{shape}/
{color}" (e.g. "badge/rounded/primary" node 335:12654, "badge/pill/
primary" node 338:27719, and one such pair per color) in the "→ Badge"
page of the UI Design Kit file. Verified per color via
get_design_context/get_variable_defs against the component's own bound
variables, not assumed to follow the same pattern as Button:

- Every color except neutral/disabled/inverse follows one clean rule:
  solid bg = {color}/strong (not /base — Badge's solid is a full step
  deeper than Button's own resting-state solid, since a static badge
  has no separate hover state to reserve /base for), outline border and
  outline/soft/ghost label = {color}/strong too, soft bg = {color}/
  weakest. "highlight" binds to Figma's "highlighted" collection (see
  Badge.css) — kept as "highlight" here to match the taxonomy sheet's
  column label instead.
- "neutral" (default) doesn't reuse Button's neutral-solid bg-strong/
  text-strongest pairing the earlier version of this file assumed:
  solid bg = bg/strong, soft bg = bg/weak (not bg/weakest), and every
  non-solid label/border is bg/strong (not text-strongest — a
  different, though close, token).
- "disabled" doesn't use text-disabled at all: solid bg = bg/medium
  with a *white* text/on-control label (kept, though visually unusual
  for a "disabled" state — that's what the component's own bound
  variable says), soft bg = bg/weak, and outline border / every non-
  solid label = bg/medium.
- "inverse" solid = bg/weakest bg with text/strongest label (both
  already matched Button's own inverse-solid mapping), soft = bg/heavy
  (not bg/strong) with a bg/weakest label, outline border = text/on-
  control (not stroke/medium). Figma's own outline/ghost label binding
  has a real inconsistency by size (xs/s read text/on-control, m reads
  bg/weakest, which would go near-invisible in dark mode) — normalized
  to text/on-control at every size rather than reproduced, the same
  kind of judgment call Button.jsx already makes for its own
  focus-ring-offset Figma quirk.

Structural details also came from the same component set: solid-only
text gets a 1px black-alpha-24 drop shadow (Shadow/Text/xs), radius is
a flat 6px/999px (rounded/pill) at every size — Badge doesn't scale
radius by size the way Button does — and each size uses Button's own
text-control-{m,s,xs}-500 type scale plus the L3-Component/{3xs,2xs,
xs,sm} spacing scale for padding/gap (see Badge.css; not yet synced
into tokens.css, so these stay literal fallbacks, same gap Button.css
documents for its own untokenized spacing). Icon size is 16px at "m",
12px at "s" and "xs" (not scaled a third time for "xs" the way an
earlier version of this file assumed) — Figma flanks the label with a
chevron-circle icon on both sides by default, exposed here as the
existing iconLeft/iconRight props rather than an always-on default, so
every color and variant can opt in the same way Button's icons do.
The Number/Icon-only subtypes in Figma additionally pin a fixed/min
width per size so digit badges read as a consistent circle — not
reproduced here; icon-only badges still just use --badge-py as
uniform padding, an approximation flagged rather than hidden.

Badges are static labels, not controls: there's no hover/pressed/
focused state matrix here the way Button has one, and disabling is
expressed by \`color="disabled"\` rather than a \`disabled\` boolean prop.`,methods:[],displayName:`Badge`,props:{variant:{defaultValue:{value:`'soft'`,computed:!1},description:`Emphasis level, matches the Figma "Type" variant.`,type:{name:`enum`,value:[{value:`'solid'`,computed:!1},{value:`'outline'`,computed:!1},{value:`'soft'`,computed:!1},{value:`'ghost'`,computed:!1}]},required:!1},size:{defaultValue:{value:`'m'`,computed:!1},description:`Badge scale, matches the Figma "Size" variant.`,type:{name:`enum`,value:[{value:`'m'`,computed:!1},{value:`'s'`,computed:!1},{value:`'xs'`,computed:!1}]},required:!1},shape:{defaultValue:{value:`'rounded'`,computed:!1},description:`Corner style — "rounded" (6px) or "pill" (fully rounded). No "square", unlike Button.`,type:{name:`enum`,value:[{value:`'rounded'`,computed:!1},{value:`'pill'`,computed:!1}]},required:!1},color:{defaultValue:{value:`'neutral'`,computed:!1},description:`Color family — "primary" (purple), "neutral" (gray), "success" (green), "danger" (red), "warning" (orange), "info" (blue), "verified" (sky), "away" (yellow), "highlight" (fuchsia), "inverse" (for badges on a dark/colored surface), or "disabled" (muted).`,type:{name:`enum`,value:[{value:`'primary'`,computed:!1},{value:`'neutral'`,computed:!1},{value:`'success'`,computed:!1},{value:`'danger'`,computed:!1},{value:`'warning'`,computed:!1},{value:`'info'`,computed:!1},{value:`'verified'`,computed:!1},{value:`'away'`,computed:!1},{value:`'highlight'`,computed:!1},{value:`'inverse'`,computed:!1},{value:`'disabled'`,computed:!1}]},required:!1},iconLeft:{defaultValue:{value:`null`,computed:!1},description:"Icon rendered before the label, or alone when `children` is omitted — matches Figma's flanking chevron-circle icon slot.",type:{name:`node`},required:!1},iconRight:{defaultValue:{value:`null`,computed:!1},description:`Icon rendered after the label — matches Figma's flanking chevron-circle icon slot.`,type:{name:`node`},required:!1},className:{defaultValue:{value:`''`,computed:!1},description:``,type:{name:`string`},required:!1},children:{description:`Badge content — text or a number. Omit for an icon-only badge.`,type:{name:`node`},required:!1}}}})))()}var g,_,v,y,b,x,S,C,w,T,E,D,O,k,A;function j(){return(j=s((()=>{r(),h(),g=e(),_=[`solid`,`outline`,`soft`,`ghost`],v=[`m`,`s`,`xs`],y=[`rounded`,`pill`],b=[`primary`,`neutral`,`success`,`danger`,`warning`,`info`,`verified`,`away`,`highlight`,`inverse`,`disabled`],x={title:`Badge/Default`,component:c,args:{children:`Badge`,variant:`soft`,size:`m`,shape:`rounded`,color:`neutral`},argTypes:{variant:{control:`select`,options:_},size:{control:`select`,options:v},shape:{control:`select`,options:y},color:{control:`select`,options:b}}},S={args:{iconLeft:(0,g.jsx)(i,{}),iconRight:(0,g.jsx)(n,{})}},C={render:e=>(0,g.jsx)(`div`,{style:{display:`flex`,alignItems:`center`,gap:16},children:v.map(t=>(0,g.jsx)(c,{...e,size:t,iconLeft:(0,g.jsx)(i,{}),iconRight:(0,g.jsx)(n,{})},t))})},w={render:e=>(0,g.jsxs)(`div`,{style:{display:`grid`,gridTemplateColumns:`max-content repeat(4, max-content)`,gap:`16px 24px`,alignItems:`center`},children:[(0,g.jsx)(`div`,{}),_.map(e=>(0,g.jsx)(`div`,{style:{font:`500 12px/16px sans-serif`,color:`#6b6375`,textTransform:`capitalize`},children:e},e)),v.map(t=>(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(`div`,{style:{font:`500 12px/16px sans-serif`,color:`#6b6375`},children:t},`${t}-label`),_.map(r=>(0,g.jsx)(c,{variant:r,size:t,shape:e.shape,color:e.color,iconLeft:(0,g.jsx)(i,{}),iconRight:(0,g.jsx)(n,{}),children:`Badge`},`${t}-${r}`))]}))]})},T={render:()=>(0,g.jsxs)(`div`,{style:{display:`grid`,gridTemplateColumns:`max-content repeat(${b.length}, max-content)`,gap:`16px 24px`,alignItems:`center`},children:[(0,g.jsx)(`div`,{}),b.map(e=>(0,g.jsx)(`div`,{style:{font:`500 12px/16px sans-serif`,color:`#6b6375`,textTransform:`capitalize`},children:e},e)),_.map(e=>(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(`div`,{style:{font:`500 12px/16px sans-serif`,color:`#6b6375`,textTransform:`capitalize`},children:e},`${e}-label`),b.map(t=>(0,g.jsx)(c,{variant:e,size:`m`,color:t,iconLeft:(0,g.jsx)(i,{}),iconRight:(0,g.jsx)(n,{}),children:`Badge`},`${e}-${t}`))]}))]})},E={render:e=>(0,g.jsxs)(`div`,{style:{display:`grid`,gridTemplateColumns:`max-content repeat(${y.length}, max-content)`,gap:`16px 24px`,alignItems:`center`},children:[(0,g.jsx)(`div`,{}),y.map(e=>(0,g.jsx)(`div`,{style:{font:`500 12px/16px sans-serif`,color:`#6b6375`,textTransform:`capitalize`},children:e},e)),v.map(t=>(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(`div`,{style:{font:`500 12px/16px sans-serif`,color:`#6b6375`},children:t},`${t}-label`),y.map(r=>(0,g.jsx)(c,{shape:r,size:t,variant:e.variant,color:e.color,iconLeft:(0,g.jsx)(i,{}),iconRight:(0,g.jsx)(n,{}),children:`Badge`},`${t}-${r}`))]}))]})},D={render:e=>(0,g.jsx)(`div`,{style:{display:`flex`,alignItems:`center`,gap:16},children:v.map(n=>(0,g.jsx)(c,{variant:e.variant,size:n,shape:e.shape,color:e.color,iconLeft:(0,g.jsx)(t,{}),children:`Verified`},n))})},O={args:{children:`8`,shape:`pill`}},k={render:e=>(0,g.jsx)(`div`,{style:{display:`flex`,alignItems:`center`,gap:16},children:v.map(n=>(0,g.jsx)(c,{variant:e.variant,size:n,shape:e.shape,color:e.color,iconLeft:(0,g.jsx)(t,{}),"aria-label":`Verified`},n))})},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  args: {
    iconLeft: <ChevronCircleLeftFill />,
    iconRight: <ChevronCircleRightFill />
  }
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  render: args => <div style={{
    display: 'flex',
    alignItems: 'center',
    gap: 16
  }}>
      {SIZES.map(size => <Badge key={size} {...args} size={size} iconLeft={<ChevronCircleLeftFill />} iconRight={<ChevronCircleRightFill />} />)}
    </div>
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
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
          {VARIANTS.map(variant => <Badge key={\`\${size}-\${variant}\`} variant={variant} size={size} shape={args.shape} color={args.color} iconLeft={<ChevronCircleLeftFill />} iconRight={<ChevronCircleRightFill />}>
              Badge
            </Badge>)}
        </>)}
    </div>
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
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
          {COLORS.map(color => <Badge key={\`\${variant}-\${color}\`} variant={variant} size="m" color={color} iconLeft={<ChevronCircleLeftFill />} iconRight={<ChevronCircleRightFill />}>
              Badge
            </Badge>)}
        </>)}
    </div>
}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
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
          {SHAPES.map(shape => <Badge key={\`\${size}-\${shape}\`} shape={shape} size={size} variant={args.variant} color={args.color} iconLeft={<ChevronCircleLeftFill />} iconRight={<ChevronCircleRightFill />}>
              Badge
            </Badge>)}
        </>)}
    </div>
}`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  render: args => <div style={{
    display: 'flex',
    alignItems: 'center',
    gap: 16
  }}>
      {SIZES.map(size => <Badge key={size} variant={args.variant} size={size} shape={args.shape} color={args.color} iconLeft={<CheckCircle />}>
          Verified
        </Badge>)}
    </div>
}`,...D.parameters?.docs?.source}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  args: {
    children: '8',
    shape: 'pill'
  }
}`,...O.parameters?.docs?.source}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  render: args => <div style={{
    display: 'flex',
    alignItems: 'center',
    gap: 16
  }}>
      {SIZES.map(size => <Badge key={size} variant={args.variant} size={size} shape={args.shape} color={args.color} iconLeft={<CheckCircle />} aria-label="Verified" />)}
    </div>
}`,...k.parameters?.docs?.source}}},A=[`Playground`,`AllSizes`,`AllVariants`,`AllColors`,`AllShapes`,`WithIcon`,`Number`,`IconOnly`]})))()}j();export{T as AllColors,E as AllShapes,C as AllSizes,w as AllVariants,k as IconOnly,O as Number,S as Playground,D as WithIcon,A as __namedExportsOrder,x as default};