import { signIn, signOut, useSession } from "next-auth/client";

import { FaGithub } from "react-icons/fa";
import { FiX } from "react-icons/fi";

import styles from "./styles.module.scss";

export function SignInButton() {
  const [ session ] = useSession();

  return session ? (
    <div className={styles.Container}>
      <button 
        type="button"
        onClick={() => signOut()}
      >
        <FaGithub size={20} color="#04d361" />
        <p>{session.user.name}</p>
        <FiX size={20} color="#737380" />
      </button>
    </div>
  ) : (
    <div className={styles.Container}>
      <button 
        type="button" 
        onClick={() => signIn("github")}>
        <FaGithub size={20} color="#eba417" />
        <p>Sign in with GitHub</p>
      </button>
    </div>
  );
}
