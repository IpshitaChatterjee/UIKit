import{n as e}from"./iframe-Co90qsuA.js";import{i as t,r as n,t as r}from"./prop-types-CMh7Yg2O.js";import{a as i,n as a}from"./rolldown-runtime-DkW27tQK.js";function o({variant:e=`soft`,size:t=`md`,shape:n=`rounded`,color:r=`neutral`,iconLeft:i=null,iconRight:a=null,children:o,className:s=``,...l}){let u=!o,d=[`badge`,`badge--${e}`,`badge--${t}`,`badge--${n}`,r!==`neutral`&&`badge--${r}`,u&&`badge--icon-only`,s].filter(Boolean).join(` `);return(0,c.jsxs)(`span`,{className:d,...l,children:[i&&(0,c.jsx)(`span`,{className:`badge__icon`,"aria-hidden":`true`,children:i}),o&&(0,c.jsx)(`span`,{className:`badge__label`,children:o}),a&&(0,c.jsx)(`span`,{className:`badge__icon`,"aria-hidden":`true`,children:a})]})}var s,c,l,u,d,f;function p(){return(p=a((()=>{s=i(r(),1),c=e(),l=[`solid`,`outline`,`soft`,`ghost`],u=[`md`,`sm`,`xs`],d=[`rounded`,`pill`],f=[`primary`,`neutral`,`success`,`danger`,`warning`,`info`,`verified`,`away`,`highlight`,`inverse`,`disabled`],o.propTypes={variant:s.default.oneOf(l),size:s.default.oneOf(u),shape:s.default.oneOf(d),color:s.default.oneOf(f),iconLeft:s.default.node,iconRight:s.default.node,children:s.default.node,className:s.default.string},o.__docgenInfo={description:`Badge — a static, non-interactive label in four emphasis levels
("solid"/"outline"/"soft"/"ghost", mirroring Button's Type variant), two
corner styles ("rounded"/"pill" — Badge has no "square" shape, unlike
Button), three sizes ("md"/"sm"/"xs"), and the "primary", "neutral",
"success", "danger", "warning", "info", "verified", "away", "highlight",
"inverse", or "disabled" color family.

Unlike Button.jsx, none of this is pulled from a verified Figma
component set: the "→ Badge" page (node 333:2, frame "Badge(Tag)"
335:7985) in the UI Design Kit only contains an empty taxonomy sheet —
row/column labels for Shape × Size × Variant × Color × Content-type,
with no fills, effects, or bound variables on any cell (confirmed via
get_design_context/get_metadata: zero component/instance nodes in the
grid body). So sizing, padding, and radius below are estimated to read
as a compact version of Button's own scale, and every color's actual
paint reuses Button's existing token mapping (color-tokens/primary/*,
/error/* for danger, /success/*, /warning/*, /info/*, and Button's
neutral-solid bg- and text-strongest pattern for "neutral"/"inverse") —
same reasoning Button.jsx already applies to its own Figma-unverified
"info" color. The taxonomy sheet's color columns also list "Verified",
"Away", "Highlight", and "Disabled" alongside the six above. "Disabled"
maps cleanly onto Button's existing bg-weak/text-disabled tokens.
"Verified"/"Away"/"Highlight" *do* have real Figma variable collections
(weakest/weak/base/strong/strongest, same shape as primary/error/
success/warning/info: sky for verified, yellow for away, fuchsia for
highlight — Figma names the last one "highlighted", kept as "highlight"
here to match the taxonomy sheet's column label) — these three
reference color-tokens-{verified,away,highlighted}-* below (see
Badge.css), now confirmed synced into build/css/tokens.css. Figma's
"away" variable has its own quirk, mirrored here rather than corrected:
"strong" is bound to the exact same yellow/regular/600 swatch as
"base" (no 700 step used), the same kind of copy-paste mismatch
Button.jsx's danger color already documents.

Badges are static labels, not controls: there's no hover/pressed/
focused state matrix here the way Button has one (nothing in the
taxonomy sheet suggested one either), and disabling is expressed by
\`color="disabled"\` rather than a \`disabled\` boolean prop.`,methods:[],displayName:`Badge`,props:{variant:{defaultValue:{value:`'soft'`,computed:!1},description:`Emphasis level, matches the Figma "Type" taxonomy label (unstyled in Figma — see file-level note).`,type:{name:`enum`,value:[{value:`'solid'`,computed:!1},{value:`'outline'`,computed:!1},{value:`'soft'`,computed:!1},{value:`'ghost'`,computed:!1}]},required:!1},size:{defaultValue:{value:`'md'`,computed:!1},description:`Badge scale, matches the Figma "Size" taxonomy label.`,type:{name:`enum`,value:[{value:`'md'`,computed:!1},{value:`'sm'`,computed:!1},{value:`'xs'`,computed:!1}]},required:!1},shape:{defaultValue:{value:`'rounded'`,computed:!1},description:`Corner style — "rounded" (soft corners) or "pill" (fully rounded). No "square", unlike Button.`,type:{name:`enum`,value:[{value:`'rounded'`,computed:!1},{value:`'pill'`,computed:!1}]},required:!1},color:{defaultValue:{value:`'neutral'`,computed:!1},description:`Color family — "primary" (purple), "neutral" (gray), "success" (green), "danger" (red), "warning" (orange), "info" (blue), "verified" (sky), "away" (yellow), "highlight" (fuchsia), "inverse" (for badges on a dark/colored surface), or "disabled" (muted).`,type:{name:`enum`,value:[{value:`'primary'`,computed:!1},{value:`'neutral'`,computed:!1},{value:`'success'`,computed:!1},{value:`'danger'`,computed:!1},{value:`'warning'`,computed:!1},{value:`'info'`,computed:!1},{value:`'verified'`,computed:!1},{value:`'away'`,computed:!1},{value:`'highlight'`,computed:!1},{value:`'inverse'`,computed:!1},{value:`'disabled'`,computed:!1}]},required:!1},iconLeft:{defaultValue:{value:`null`,computed:!1},description:"Icon rendered before the label, or alone when `children` is omitted.",type:{name:`node`},required:!1},iconRight:{defaultValue:{value:`null`,computed:!1},description:`Icon rendered after the label.`,type:{name:`node`},required:!1},className:{defaultValue:{value:`''`,computed:!1},description:``,type:{name:`string`},required:!1},children:{description:`Badge content — text or a number. Omit for an icon-only badge.`,type:{name:`node`},required:!1}}}})))()}var m,h,g,_,v,y,b,x,S,C,w,T,E,D,O;function k(){return(k=a((()=>{t(),p(),m=e(),h=[`solid`,`outline`,`soft`,`ghost`],g=[`md`,`sm`,`xs`],_=[`rounded`,`pill`],v=[`primary`,`neutral`,`success`,`danger`,`warning`,`info`,`verified`,`away`,`highlight`,`inverse`,`disabled`],y={title:`Badge/Default`,component:o,args:{children:`Badge`,variant:`soft`,size:`md`,shape:`rounded`,color:`neutral`},argTypes:{variant:{control:`select`,options:h},size:{control:`select`,options:g},shape:{control:`select`,options:_},color:{control:`select`,options:v}}},b={},x={render:e=>(0,m.jsx)(`div`,{style:{display:`flex`,alignItems:`center`,gap:16},children:g.map(t=>(0,m.jsx)(o,{...e,size:t},t))})},S={render:e=>(0,m.jsxs)(`div`,{style:{display:`grid`,gridTemplateColumns:`max-content repeat(4, max-content)`,gap:`16px 24px`,alignItems:`center`},children:[(0,m.jsx)(`div`,{}),h.map(e=>(0,m.jsx)(`div`,{style:{font:`500 12px/16px sans-serif`,color:`#6b6375`,textTransform:`capitalize`},children:e},e)),g.map(t=>(0,m.jsxs)(m.Fragment,{children:[(0,m.jsx)(`div`,{style:{font:`500 12px/16px sans-serif`,color:`#6b6375`},children:t},`${t}-label`),h.map(n=>(0,m.jsx)(o,{variant:n,size:t,shape:e.shape,color:e.color,children:`Badge`},`${t}-${n}`))]}))]})},C={render:()=>(0,m.jsxs)(`div`,{style:{display:`grid`,gridTemplateColumns:`max-content repeat(${v.length}, max-content)`,gap:`16px 24px`,alignItems:`center`},children:[(0,m.jsx)(`div`,{}),v.map(e=>(0,m.jsx)(`div`,{style:{font:`500 12px/16px sans-serif`,color:`#6b6375`,textTransform:`capitalize`},children:e},e)),h.map(e=>(0,m.jsxs)(m.Fragment,{children:[(0,m.jsx)(`div`,{style:{font:`500 12px/16px sans-serif`,color:`#6b6375`,textTransform:`capitalize`},children:e},`${e}-label`),v.map(t=>(0,m.jsx)(o,{variant:e,size:`md`,color:t,children:`Badge`},`${e}-${t}`))]}))]})},w={render:e=>(0,m.jsxs)(`div`,{style:{display:`grid`,gridTemplateColumns:`max-content repeat(${_.length}, max-content)`,gap:`16px 24px`,alignItems:`center`},children:[(0,m.jsx)(`div`,{}),_.map(e=>(0,m.jsx)(`div`,{style:{font:`500 12px/16px sans-serif`,color:`#6b6375`,textTransform:`capitalize`},children:e},e)),g.map(t=>(0,m.jsxs)(m.Fragment,{children:[(0,m.jsx)(`div`,{style:{font:`500 12px/16px sans-serif`,color:`#6b6375`},children:t},`${t}-label`),_.map(n=>(0,m.jsx)(o,{shape:n,size:t,variant:e.variant,color:e.color,children:`Badge`},`${t}-${n}`))]}))]})},T={render:e=>(0,m.jsx)(`div`,{style:{display:`flex`,alignItems:`center`,gap:16},children:g.map(t=>(0,m.jsx)(o,{variant:e.variant,size:t,shape:e.shape,color:e.color,iconLeft:(0,m.jsx)(n,{}),children:`Verified`},t))})},E={args:{children:`8`,shape:`pill`}},D={render:e=>(0,m.jsx)(`div`,{style:{display:`flex`,alignItems:`center`,gap:16},children:g.map(t=>(0,m.jsx)(o,{variant:e.variant,size:t,shape:e.shape,color:e.color,iconLeft:(0,m.jsx)(n,{}),"aria-label":`Verified`},t))})},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  render: args => <div style={{
    display: 'flex',
    alignItems: 'center',
    gap: 16
  }}>
      {SIZES.map(size => <Badge key={size} {...args} size={size} />)}
    </div>
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
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
          {VARIANTS.map(variant => <Badge key={\`\${size}-\${variant}\`} variant={variant} size={size} shape={args.shape} color={args.color}>
              Badge
            </Badge>)}
        </>)}
    </div>
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
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
          {COLORS.map(color => <Badge key={\`\${variant}-\${color}\`} variant={variant} size="md" color={color}>
              Badge
            </Badge>)}
        </>)}
    </div>
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
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
          {SHAPES.map(shape => <Badge key={\`\${size}-\${shape}\`} shape={shape} size={size} variant={args.variant} color={args.color}>
              Badge
            </Badge>)}
        </>)}
    </div>
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  render: args => <div style={{
    display: 'flex',
    alignItems: 'center',
    gap: 16
  }}>
      {SIZES.map(size => <Badge key={size} variant={args.variant} size={size} shape={args.shape} color={args.color} iconLeft={<CheckCircle />}>
          Verified
        </Badge>)}
    </div>
}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  args: {
    children: '8',
    shape: 'pill'
  }
}`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  render: args => <div style={{
    display: 'flex',
    alignItems: 'center',
    gap: 16
  }}>
      {SIZES.map(size => <Badge key={size} variant={args.variant} size={size} shape={args.shape} color={args.color} iconLeft={<CheckCircle />} aria-label="Verified" />)}
    </div>
}`,...D.parameters?.docs?.source}}},O=[`Playground`,`AllSizes`,`AllVariants`,`AllColors`,`AllShapes`,`WithIcon`,`Number`,`IconOnly`]})))()}k();export{C as AllColors,w as AllShapes,x as AllSizes,S as AllVariants,D as IconOnly,E as Number,b as Playground,T as WithIcon,O as __namedExportsOrder,y as default};