import { useRouter } from "next/router"
import Link from "next/link"

export function ActiveLink({
  children,
  activeClassName,
  ...rest
}) {

  const { asPath } = useRouter()
  const className = asPath === rest.href ? activeClassName : ""

  return <Link className={className}{...rest}>{children}</Link>
}