import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

interface NavLinkProps {
  href: string;
  text: string;
}

export const NavLinkComponent: React.FC<NavLinkProps> = (props) => {
  const { href, text } = props;

  const routerPath = useRouter().asPath;

  const className = `cursor-pointer ${
    routerPath === href
      ? `link-underline-static link-underline-black`
      : `link-underline-black link-underline-reverse`
  }`;

  return (
    <div className={className}>
      <Link
        href={href}
        scroll={false}
      >
        {text}
      </Link>
    </div>
  );
};

export default NavLinkComponent;
