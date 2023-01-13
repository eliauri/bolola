import { cloneElement, ReactElement } from "react"
import { useRouter } from "next/router"
import Link, { LinkProps } from "next/link"



export function ActiveLink({ 
    children,
    activeClassName,
    ...rest 
}) {
   
  const { asPath } = useRouter()
  const className = asPath === rest.href ? activeClassName : ""

  return <Link className={className}{...rest}>{children}</Link>
}