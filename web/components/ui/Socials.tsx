import { site } from '@/lib/site';
import { FacebookIcon, InstagramIcon, YoutubeIcon } from './Icons';

export default function Socials({ className = '' }: { className?: string }) {
  return (
    <div className={`socials ${className}`}>
      <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
        <InstagramIcon />
      </a>
      <a href={site.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
        <FacebookIcon />
      </a>
      <a href={site.social.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube">
        <YoutubeIcon />
      </a>
    </div>
  );
}
