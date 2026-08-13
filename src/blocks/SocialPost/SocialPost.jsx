import PropTypes from 'prop-types';
import Button from '../../components/Button/Button.jsx';
import './SocialPost.css';

/**
 * Matches "POST-18" (node 4426:8720) in the Social media Figma file — a
 * promo card pairing a heading/body pair with a share/save action row.
 * Built from button_default/pill/primary (solid, node 241:3530) and its
 * soft variant, both in the "info" color family, size "l".
 */
function SocialPost({
  heading = 'Learn to ask the right questions',
  body = "The better the questions are which you're asking your stakeholders, clients or users, the higher the chance that you'll design something truly valuable to them.",
  primaryLabel = 'Share this',
  secondaryLabel = 'Save for later',
  onPrimaryClick,
  onSecondaryClick,
  className = '',
}) {
  return (
    <div className={['social-post', className].filter(Boolean).join(' ')}>
      <div className="social-post__copy">
        <h3 className="social-post__heading">{heading}</h3>
        <p className="social-post__body">{body}</p>
      </div>
      <div className="social-post__actions">
        <Button variant="solid" color="info" shape="pill" size="l" onClick={onPrimaryClick}>
          {primaryLabel}
        </Button>
        <Button variant="soft" color="info" shape="pill" size="l" onClick={onSecondaryClick}>
          {secondaryLabel}
        </Button>
      </div>
    </div>
  );
}

SocialPost.propTypes = {
  heading: PropTypes.string,
  body: PropTypes.string,
  primaryLabel: PropTypes.string,
  secondaryLabel: PropTypes.string,
  onPrimaryClick: PropTypes.func,
  onSecondaryClick: PropTypes.func,
  className: PropTypes.string,
};

export default SocialPost;
