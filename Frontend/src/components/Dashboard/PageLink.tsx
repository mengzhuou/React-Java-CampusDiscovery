import { HTMLProps } from 'react';
import cn from 'classnames';
import './PageLink.css';

export type Props = HTMLProps<HTMLAnchorElement> & { active?: boolean };

export default function PageLink({
  className,
  active,
  disabled,
  children,
  ...otherProps
}: Props) {
// cn is a good conditional rendering of classes that 
// allows you to create boolean class easily made it easier to maintain code
  const customClassName = cn('page-link', className, {
    active,
    disabled,
  });

  if (disabled) {
    return <span className={customClassName}>{children}</span>;
  }

  return (
    <a
      className={customClassName}
      aria-current={active ? 'page' : undefined} //aira-current="page" indicates the currently active link
      {...otherProps}
    >
      {children}
    </a>
  );
}