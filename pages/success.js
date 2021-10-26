import Link from 'next/link'

export default function success() {
    return (
        <div id="logbox"><div id="success"><h3>Success!</h3><div>   <Link href="/add">
        <a>Add another product.</a>
      </Link></div></div> </div>
    )
}