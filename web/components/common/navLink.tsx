import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

interface NavLinkProps {
  href: string;
  text?: string;
  active?: boolean | undefined;
  className?: string;
  children?: JSX.Element | JSX.Element[] | string;
}

export const NavLink: React.FC<NavLinkProps> = (props) => {
  const { href, text, active, className, children } = props;
  const router = useRouter();

  const isActive = active || router.asPath === href;
  const classNames = `cursor-pointer ${className ? className : ''} ${
    isActive
      ? `link-underline-static link-underline-black`
      : `link-underline-black link-underline-reverse`
  }`;

  const link =
    (router.asPath.startsWith('/#') || router.asPath === '/') &&
    href === '#anchor-hero'
      ? '/#hero'
      : router.asPath !== '/' && href === '#anchor-hero'
      ? '/'
      : href?.includes('#anchor')
      ? `/#${href.split('-')[1]}`
      : href;

  return (
    <Link
      className={classNames}
      href={link}
    >
      {children}
      {text}
    </Link>
  );
};

export default NavLink;
