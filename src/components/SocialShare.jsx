import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  WhatsappIcon,
} from 'react-share';

function SocialShare({ url, title, text = "Share this page:" }) {
  const shareUrl = url || window.location.href;
  const shareTitle = title || "Jumpstarter Vibe Coding Training - Transform Your Coding Skills";

  return (
    <div className="social-sharing">
      <p className="social-sharing-text">{text}</p>
      <div className="social-buttons">
        <FacebookShareButton
          url={shareUrl}
          quote={shareTitle}
          className="social-button"
        >
          <FacebookIcon size={40} round />
        </FacebookShareButton>

        <TwitterShareButton
          url={shareUrl}
          title={shareTitle}
          className="social-button"
        >
          <TwitterIcon size={40} round />
        </TwitterShareButton>

        <LinkedinShareButton
          url={shareUrl}
          title={shareTitle}
          summary="Transform your coding skills from zero to hero with our immersive, hands-on training programs"
          source="Jumpstarter Vibe"
          className="social-button"
        >
          <LinkedinIcon size={40} round />
        </LinkedinShareButton>

        <WhatsappShareButton
          url={shareUrl}
          title={shareTitle}
          separator=" - "
          className="social-button"
        >
          <WhatsappIcon size={40} round />
        </WhatsappShareButton>
      </div>
    </div>
  );
}

export default SocialShare;

