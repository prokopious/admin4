import { useRouter } from 'next/router'
import { AmplifyS3Image } from "@aws-amplify/ui-react"


const Image = () => {
  const router = useRouter()
  const { image } = router.query

  return <AmplifyS3Image imgKey={image} />
}

export default Image;