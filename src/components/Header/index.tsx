import { SignInButton } from "../SignInButton";
import { ActiveLink } from "../ActiveLink";

import styles from "./styles.module.scss";

export function Header() {
  return (
    <header className={styles.Container}>
      <div className={styles.Content}>
        <div>
          <img src="/images/logo.svg" alt="" />
          <div>
            <ActiveLink activeClassName={styles.active} href="/">
              <a>Home</a>
            </ActiveLink>
            <ActiveLink activeClassName={styles.active} href="/posts">
              <a>Posts</a>
            </ActiveLink>
          </div>
        </div>
        <SignInButton/>
      </div>
    </header>
  );
}
