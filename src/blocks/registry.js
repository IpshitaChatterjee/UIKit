import SocialPost from './SocialPost/SocialPost.jsx';

const blocks = [
  {
    slug: 'social-post',
    name: 'Social Post',
    description: 'Promo card with a heading, body copy, and a share/save action row.',
    figmaUrl:
      'https://www.figma.com/design/HGqhQjEaxdNnVVt7PLgAt1/Social-media?node-id=4426-8720',
    component: SocialPost,
  },
];

export default blocks;

export function getBlock(slug) {
  return blocks.find((block) => block.slug === slug);
}
